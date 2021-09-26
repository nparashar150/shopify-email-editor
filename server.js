require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userSchema = require("./model/user.model");
app.use(
    cors({
        origin: "*",
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(process.env.ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Mongoose Connected");
    }
});

app.post("/user", async (req, res) => {
    try {
        const { shop, date, templateJSON, data } = req.body;
        const existingUser = await userSchema.findOne({ shop });
        if (existingUser) { 
            return res.status(400).send({status: 400, message: 'Shopname exists'});
         }
        const dataPOST = await userSchema.create({
            shop,
            data,
            date, 
            templateJSON
        });
        return res.json(dataPOST).status(201).send({status: 201, message: "Success"});
    }
    catch (error) {
        console.log(error);
    }
});
app.patch("/user/:shop", async (req, res) => {
    try {
        const { shop, date, templateJSON } = req.body;
        const existingUser = await userSchema.findOne({ shop });
        if (existingUser) { 
            const data = await userSchema.findOneAndUpdate(shop, {
                date, 
                templateJSON
            });
            await data.save();
            return res.status(201).json(data).send({status: 201, message: "Update Acknowledged"});
        } else {
            return res.status(400).send({status: 400 ,message : "The user is not saved in Database."});
        }
    } catch (error) {
        return res.status(400).send({status: 400, message: error});
    }
});
app.get("/admin/userdata/:password", async (req, res) => {
    try {
        const psswd = req.params.password;
        if (psswd === process.env.USERDATA_PASSWORD_STRING) {
            const data = await userSchema.find({});
            res.status(201).json(data);
        } else {
            res.status(400).send("You do not have access to this Route");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/user/:username", async (req, res) => {
    try {
        const user = req.params.username;
        const data = await userSchema.findOne({user});
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/", (req, res) => {
    res.send("Email-App-Backend");
});
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Express running on http://localhost:${process.env.SERVER_PORT}`);
});
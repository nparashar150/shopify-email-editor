import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import { Button, EmailEditorWrapper, ExportWrapper } from './EmailElements';
import axios from 'axios';
let ans = "";
const EmailEditorComponent = (props) => {
  const emailEditorRef = useRef(null);
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }
  const exportHtml = (e) => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      e.preventDefault()
      downloadFile({
        data: html,
        fileName: 'design.html',
        fileType: 'text/html',
      })
    });
  }
  const exportJson = (e) => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design } = data;
      const templateJSON = JSON.stringify(design);
      const shop = `${ans}`;
      const date = new Date();
      const PATCH = {shop, templateJSON, date}
      axios.patch(`https://email-editor-np150-backend.herokuapp.com/user/${ans}`, {...PATCH})
      .then(
        res => {
          console.log(res);
        }
      ).catch(
        error => {
          console.log(error);
        }
    )
      e.preventDefault()
      downloadFile({
        data: templateJSON,
        fileName: 'design.json',
        fileType: 'application/json',
      })
    });
  }
  
  const onLoad = async () => {
    const shopname = prompt('Enter your Shopify Shop name');
    ans = shopname;
    await axios.get(`http://localhost:5000/user/${shopname}`)
    .then(
        res => {
            console.log(res);
            if(res.data) {
              const templateJson = JSON.parse(res.data[0].templateJSON);
              emailEditorRef.current.editor.loadDesign(templateJson);
              alert(`Welcome back to our app ${ans}`);
            } else {
              alert(`The user with "${ans}" does not exist.`);
            }
        } 
    ).catch (
        err => {
            console.log(err);
        }
    );
  };

  const savePATCH= () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design } = data;
      const templateJSON = JSON.stringify(design);
      const shop = `${ans}`;
      const date = new Date();
      const PATCH = {shop, templateJSON, date}
      axios.patch(`https://email-editor-np150-backend.herokuapp.com/user/${ans}`, {...PATCH})
      .then(
        res => {
          console.log(res);
        }
      ).catch(
        error => {
          console.log(error);
        }
    )
    });
  }

  // window.addEventListener('beforeunload', (e) => {
  //   e.preventDefault();
  //   savePATCH();
  //   e.returnValue = "";
  // })
  
  // The event lister is not wokring as I wanted it to be working.
  // Regards 
  return (
    <>
      <EmailEditorWrapper>
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      </EmailEditorWrapper>
      <ExportWrapper>
        <Button onClick={exportHtml}>Export HTML</Button>
        <Button onClick={exportJson}>Export JSON</Button>
        <Button onClick={savePATCH}>Save JSON</Button>
      </ExportWrapper>
    </>
  );
};

export default EmailEditorComponent;
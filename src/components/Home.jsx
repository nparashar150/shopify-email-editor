import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { background, primary, secondary } from './Color';

const HomeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh;
    gap: 1rem;
    background: ${background};
`;
const ButtonLink = styled(Link)`
    margin-top: auto;
    text-align: center;
    padding: 1rem 2rem;
    line-height: 2rem;
    border-radius: 0.5rem;
    background-color: ${primary};
    border: 1px solid ${secondary};
    text-decoration: none;
    color: ${secondary};
    font-size: 1.25rem;
    transition: 0.375s all ease-in-out;
    &:hover,
    &:focus {
        color: ${background};
        background: ${secondary};
    }
`;
const Heading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5vh;
    margin-bottom: -5vh;
    font-size: 2rem;
    font-weight: 500;
    color: ${secondary};
`;
const Home = () => {
    return (
        <>
            <Heading>Email Editor App</Heading>
            <HomeWrapper>
                <ButtonLink to="/create" >New Template</ButtonLink>
                <ButtonLink to="/edit" >Last Saved</ButtonLink>
            </HomeWrapper>
        </>
    )
}

export default Home;
export const username = "Naman";
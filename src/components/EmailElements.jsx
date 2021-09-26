import styled from "styled-components";
import { background, dark } from "./Color";

export const EmailWrapper = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${background};
`;

export const Button = styled.a`
    width: 7rem;
    display: block;
    z-index: 5;
    cursor: pointer;
    height: 3rem;
    border: 1px solid ${dark+"50"};
    border-radius: .25rem;
    transition: 0.25s all ease-in-out;
    background: ${background};
    text-align: center;
    text-decoration: none;
    color: ${dark};
    padding: 0 1rem;
    line-height: 3rem;
    margin: auto;
    &:hover,
    &:focus {
        filter: drop-shadow(0px 5px 5px ${dark+"50"});
    }
`;

export const EmailEditorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80vw;
    height: 80vh;
    flex-direction: column;
`;

export const ExportWrapper = styled.div`
    width: 15vw;
    height: 80vh;
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: none;
`;
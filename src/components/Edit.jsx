import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import { Button, EmailEditorWrapper, ExportWrapper } from './EmailElements';
import { username } from './Home';
import axios from 'axios';
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
      const jsonDesign = JSON.stringify(design)
      e.preventDefault()
      downloadFile({
        data: jsonDesign,
        fileName: 'design.json',
        fileType: 'application/json',
      })
    });
  }
  
  const onLoad = async () => {
    await axios.get(`http://localhost:3300/user/${username}`)
    .then(
        res => {
            // console.log(res.data.templateJSON);
            const templateJson = JSON.parse(res.data.templateJSON);
            emailEditorRef.current.editor.loadDesign(templateJson);
        } 
    ).catch (
        err => {
            console.log(err);
        }
    );
  };

  return (
    <>
      <EmailEditorWrapper>
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      </EmailEditorWrapper>
      <ExportWrapper>
        <Button onClick={exportHtml}>Export HTML</Button>
        <Button onClick={exportJson}>Export JSON</Button>
      </ExportWrapper>
    </>
  );
};

export default EmailEditorComponent;
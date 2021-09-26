import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import { Button, EmailEditorWrapper, ExportWrapper } from './EmailElements';
import { template } from './template';
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
  };
  const onLoad = () => {
    const templateJson = template;
    emailEditorRef.current.editor.loadDesign(templateJson);
  };
  const savePOST = () => {
    const ans = prompt("Enter your Shopify Shop name");
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design } = data;
      const templateJSON = JSON.stringify(design);
      const shop = `${ans}`;
      const date = new Date();
      const PATCH = {shop, templateJSON, date}
      axios.post(`https://email-editor-np150-backend.herokuapp.com/user/`, {...PATCH})
      .then(
        res => {
          console.log(res);
          if (res.data) {
            alert(`Saved your Current State at ${shop}`);
          } else {
            alert('Error saving Online, download file for now');
          }
        }
      ).catch(
        error => {
          console.log(error);
        }
    )
    });
  };

  return (
    <>
      <EmailEditorWrapper>
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      </EmailEditorWrapper>
      <ExportWrapper>
        <Button onClick={exportHtml}>Export HTML</Button>
        <Button onClick={exportJson}>Export JSON</Button>
        <Button onClick={savePOST}>Save JSON</Button>
      </ExportWrapper>
    </>
  );
};

export default EmailEditorComponent;
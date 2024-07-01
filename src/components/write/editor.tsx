"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Dispatch, SetStateAction } from 'react';



interface EditorProps {
    content: string, 
    setContent: Dispatch<SetStateAction<string>>
}

const Editor = ({content, setContent}: EditorProps) => {

  return (
    <ReactQuill
    theme="bubble"
    value={content}
    onChange={setContent}
    placeholder="Tell Your Story ..."
    className="write my-5"
    id="body"
  />
  );
};

export default Editor;

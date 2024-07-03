import dynamic from 'next/dynamic';
import "react-quill/dist/quill.bubble.css";
import { Dispatch, SetStateAction } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface EditorProps {
    value: string, 
    onChange: Dispatch<SetStateAction<string>>
}

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <ReactQuill
      theme="bubble"
      value={value}
      onChange={onChange}
      placeholder="Tell Your Story ..."
      className="write my-5"
    />
  );
};

export default Editor;

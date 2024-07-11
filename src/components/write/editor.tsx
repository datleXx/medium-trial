import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import ToggleBar from './toggle-bar'; // Ensure the correct import path
import debounce from 'lodash/debounce';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showToggleBar, setShowToggleBar] = useState(true);
  const quillRef = useRef<ReactQuill>(null);

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
  };

  const handleImageUpload = () => {
    if (typeof document === 'undefined') return; // Ensure this runs only on the client side

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0]; // Using optional chaining here
      if (file) {
        const fileUrl = URL.createObjectURL(file as Blob);
        console.log(fileUrl);

        // Insert the uploaded image into the editor
        const quillEditor = quillRef.current?.getEditor(); // Using optional chaining here
        if (quillEditor) {
          const range = quillEditor.getSelection();
          if (range) {
            quillEditor.insertEmbed(range.index, 'image', fileUrl);
          }
        }
      }
    };
  };

  const updateToggleBarPosition = useCallback(() => {
    if (typeof document === 'undefined') return; // Ensure this runs only on the client side

    const quillEditor = quillRef.current?.getEditor();
    if (!quillEditor) return;

    const range = quillEditor.getSelection();
    if (range) {
      const bounds = quillEditor.getBounds(range.index);
      const toggleButton = document.querySelector('.toggle-bar');
      if (toggleButton) {
        (toggleButton as HTMLElement).style.top = `${bounds.top + 27.265625}px`;
      }
    }
  }, []);

  const debouncedUpdateToggleBarPosition = useCallback(debounce(updateToggleBarPosition, 0), [updateToggleBarPosition]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const quillEditor = quillRef.current?.getEditor();
      if (!quillEditor) return;

      const handleSelectionChange = () => {
        debouncedUpdateToggleBarPosition();
      };

      const handleTextChange = () => {
        debouncedUpdateToggleBarPosition();
      };

      quillEditor.on('selection-change', handleSelectionChange);
      quillEditor.on('text-change', handleTextChange);

      return () => {
        quillEditor.off('selection-change', handleSelectionChange);
        quillEditor.off('text-change', handleTextChange);
        debouncedUpdateToggleBarPosition.cancel();
      };
    }
  }, [debouncedUpdateToggleBarPosition]);

  return (
    <div className="relative">
      {showToggleBar && (
        <ToggleBar
          showAttachments={showAttachments}
          toggleAttachments={toggleAttachments}
          handleImageUpload={handleImageUpload}
        />
      )}
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        placeholder="Tell Your Story ..."
        className="write my-5"
        theme="bubble"
      />
    </div>
  );
};

export default Editor;

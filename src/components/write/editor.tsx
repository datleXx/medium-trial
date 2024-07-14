import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.bubble.css";
import ToggleBar from "./toggle-bar"; // Ensure the correct import path
import debounce from "lodash/debounce";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showToggleBar, setShowToggleBar] = useState(true);
  const [showPlaceHolder, setShowPlaceHolder] = useState(true);
  const quillRef = useRef<ReactQuill>(null);
  const toggleBarRef = useRef<HTMLDivElement>(null);

  const handleToggleClick = () => {
    setShowPlaceHolder(false);
    // Hide placeholder and adjust toolbar position
    const quillEditor = quillRef.current?.getEditor();
    if (quillEditor) {
      quillEditor.root.dataset.placeholder = ""; 
    }
  };

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
  };

  const handleImageUpload = () => {
    if (typeof document === "undefined") return; // Ensure this runs only on the client side

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0]; // Using optional chaining here
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const quillEditor = quillRef.current?.getEditor(); // Using optional chaining here
          if (quillEditor) {
            const range = quillEditor.getSelection();
            if (range) {
              quillEditor.insertEmbed(
                range.index,
                "image",
                reader.result as string
              );
              quillEditor.insertText(range.index + 1, "\n"); // Insert a new line after the image
              quillEditor.setSelection(range.index + 2, 0); // Move the cursor to the right of the image and to the new line
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const updateToggleBarPosition = useCallback(() => {
    if (typeof document === "undefined") return; // Ensure this runs only on the client side

    const quillEditor = quillRef.current?.getEditor();
    if (!quillEditor) return;

    const range = quillEditor.getSelection();
    if (range) {
      const bounds = quillEditor.getBounds(range.index);
      const toggleButton = toggleBarRef.current;
      if (toggleButton) {
        (toggleButton as HTMLElement).style.top = `${bounds.top - 6}px`;
      }
    }
  }, []);

  const debouncedUpdateToggleBarPosition = useCallback(
    debounce(updateToggleBarPosition, 0),
    [updateToggleBarPosition]
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      const quillEditor = quillRef.current?.getEditor();
      if (!quillEditor) return;

      const handleSelectionChange = () => {
        debouncedUpdateToggleBarPosition();
      };

      const handleTextChange = () => {
        debouncedUpdateToggleBarPosition();
      };

      quillEditor.on("selection-change", handleSelectionChange);
      quillEditor.on("text-change", handleTextChange);

      return () => {
        quillEditor.off("selection-change", handleSelectionChange);
        quillEditor.off("text-change", handleTextChange);
        debouncedUpdateToggleBarPosition.cancel();
      };
    }
  }, [debouncedUpdateToggleBarPosition]);

  return (
    <div className="relative">
      {showToggleBar && (
        <div
          ref={toggleBarRef}
          className="absolute z-50"
          onClick={handleToggleClick}
        >
          <ToggleBar
            showAttachments={showAttachments}
            toggleAttachments={toggleAttachments}
            handleImageUpload={handleImageUpload}
          />
        </div>
      )}
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        placeholder={showPlaceHolder ? "Tell Your Story ..." : ""}
        className="write my-5"
        theme="bubble"
      />
    </div>
  );
};

export default Editor;

import React from 'react';
import { MdImage, MdVideoLibrary, MdAudiotrack, MdAttachFile } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

interface ToggleBarProps {
  showAttachments: boolean;
  toggleAttachments: () => void;
  handleImageUpload: () => void;
}

const ToggleBar: React.FC<ToggleBarProps> = ({ showAttachments, toggleAttachments, handleImageUpload }) => (
  <div className="absolute flex items-center space-x-2 toggle-bar left-[-50px]">
    <button onClick={toggleAttachments} className="p-2 rounded-full border border-gray-300">
      {showAttachments ? <AiOutlineClose className="text-xl" /> : <AiOutlinePlus className="text-xl" />}
    </button>
    {showAttachments && (
      <div className="flex items-center space-x-2">
        <button onClick={handleImageUpload} className="p-2 rounded-full border border-gray-300">
          <MdImage className="text-xl text-green-600" />
        </button>
        <button className="p-2 rounded-full border border-gray-300">
          <MdVideoLibrary className="text-xl text-green-600" />
        </button>
        <button className="p-2 rounded-full border border-gray-300">
          <MdAudiotrack className="text-xl text-green-600" />
        </button>
        <button className="p-2 rounded-full border border-gray-300">
          <MdAttachFile className="text-xl text-green-600" />
        </button>
      </div>
    )}
  </div>
);

export default ToggleBar;

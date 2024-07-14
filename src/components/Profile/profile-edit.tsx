import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { api } from "~/trpc/react";
import { Avatar } from "@nextui-org/react";

interface ProfileEditModalProps {
  isVisible: boolean;
  onClose: () => void;
  id: string;
}
function readFile(file: File) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsBinaryString(file);
  });
}
const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isVisible,
  onClose,
  id,
}) => {
  const session = useSession();
  const [name, setName] = useState(session.data?.user?.name ?? "");
  const [pronouns, setPronouns] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileMetaData, setFileMetaData] = useState({
    name: "",
    type: "",
    size: 0,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mutation = api.user.updateUser.useMutation();
  const { data: user } = api.user.fetchUser.useQuery({ id });
  const { mutateAsync } = api.user.downloadFile.useMutation();

  useEffect(() => {
    const fetchProfileImg = async () => {
      try {
        if (user?.image_key) {
          const imageObject = await mutateAsync({ key: user.image_key });
          if (imageObject) {
            setSelectedImage(imageObject.link);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    if (user) {
      void fetchProfileImg();
    }
  }, [user, mutateAsync]);
  

  if (!isVisible) return null;

  const handleSave = async () => {
    await mutation.mutateAsync({
      id,
      username: name,
      pronoun: pronouns,
      shortbio: bio,
      image_key: selectedImage ?? "",
      image_metadata: fileMetaData,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
    setSelectedImage(null);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const handleUpdateClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blob = (await readFile(file)) as string;
      const base64data = btoa(blob);
      const metadata = { name: file.name, size: file.size, type: file.type };
      console.log(metadata)
      setFileMetaData(metadata);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(base64data);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 flex w-full max-w-lg flex-col gap-5 rounded-lg bg-white p-6 shadow-lg sm:mx-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="font-sans text-2xl font-semibold">Profile Information</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="mt-4">
          <div className="mb-4 flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-500">Photo</label>
            <div className="flex items-center gap-4">
              <Avatar
                className="rounded-full"
                alt="userImg"
                size="lg"
                src={
                  selectedImage ??
                  session.data?.user?.image ??
                  "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                }
              />
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 text-sm">
                  <button onClick={handleUpdateClick} className="text-green-600">
                    Update
                  </button>
                  <button className="text-red-600">Remove</button>
                </div>
                <div className="text-sm text-gray-400">
                  Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                </div>
              </div>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="mb-4 flex flex-col gap-2">
            <div className="block text-sm font-normal text-gray-700">Name*</div>
            <input
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
              className="mt-1 block rounded-md border-gray-300 bg-gray-100 p-2 shadow-sm"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <div className="block text-sm font-normal text-gray-700">Pronoun</div>
            <input
              type="text"
              value={pronouns}
              onChange={handleInputChange(setPronouns)}
              className="mt-1 block rounded-md border-gray-300 bg-gray-100 p-2 shadow-sm"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="block text-sm font-normal text-gray-700">Short Bio</label>
            <textarea
              value={bio}
              onChange={handleInputChange(setBio)}
              className="mt-1 block rounded-md border-gray-300 bg-gray-100 p-2 shadow-sm"
            />
          </div>
          <div className="mb-4 flex cursor-pointer flex-col gap-2 border-t">
            <div className="flex flex-col gap-3 py-4">
              <div className="flex items-center justify-between">
                <div className="font-sans text-sm font-normal">About Pages</div>
                <FiExternalLink />
              </div>
              <div className="w-[70%] font-sans text-xs text-gray-400">
                Personalize with images and more to paint more of a vivid of yourself than your Short bio
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="rounded-full border border-green-400 px-4 py-2 text-sm text-green-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-full bg-green-600 px-3 py-1 text-sm text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;

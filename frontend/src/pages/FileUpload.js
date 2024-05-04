import * as React from "react";
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  currentImage: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, currentImage }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/png',
    onDrop: acceptedFiles => {
      onFileSelected(acceptedFiles[0]);
    }
  });

  return (
    <section {...getRootProps()} className="flex justify-center items-center px-5 py-6 mt-6 text-xs rounded-md bg-neutral-700">
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        {currentImage ? (
          <img src={currentImage} alt="Uploaded" className="w-32 h-32 object-cover" />
        ) : (
          <img src="upload_icon_url" alt="Upload Icon" className="w-12 aspect-square" />
        )}
        <p className="self-stretch mt-3 font-medium tracking-wide text-stone-100">
          {isDragActive ? "Drop the file here..." : (currentImage ? "Drag and drop to replace the document" : "Drag and drop a document")}
        </p>
        <p className="mt-3 tracking-normal text-neutral-400">or</p>
        <button className="justify-center px-4 py-2.5 mt-3 text-base font-semibold tracking-wider text-green-400 rounded-2xl border border-green-400 border-solid">
          SELECT FILE
        </button>
      </div>
    </section>
  );
};

export default FileUpload;

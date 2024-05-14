import * as React from "react";
import { useDropzone } from 'react-dropzone';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
const supabase = createClient(supabaseUrl, supabaseKey);

interface FileUploadProps {
  onFileReady: (url: string) => void;  // Callback to pass the URL back to the parent component
  currentImage: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileReady, currentImage }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/png, image/jpeg',
    multiple: false,  // Only allow one file at a time
    onDrop: acceptedFiles => {
      handleUpload(acceptedFiles[0]);  // Process only the first file
    }
  });

  const handleUpload = async (file: File) => {
    const path = 'editeventsprint3';
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${path}/${fileName}`;

    try {
      const { error, data } = await supabase.storage.from('userimg').upload(filePath, file);
      if (error) {
        throw error;
      }
      if (data) {
        const url = `${supabaseUrl}/storage/v1/object/public/userimg/${filePath}`;
        onFileReady(url);  // Pass the URL back to the parent component
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <section {...getRootProps()} className="flex justify-center items-center px-5 py-3 mt-6 text-xs rounded-md bg-neutral-700">
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        {currentImage ? (
          <img src={currentImage} alt="Uploaded" className="w-32 h-32 object-cover" />
        ) : (
          <p className="text-stone-100">{isDragActive ? "Drop the file here..." : "Drag and drop an image here or click to select"}</p>
        )}
      </div>
    </section>
  );
};

export default FileUpload;

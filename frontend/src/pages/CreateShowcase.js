import React, { useState } from "react";
import PartnerPage from "./PartnershipModal";
import { createClient } from "@supabase/supabase-js";

const Icon = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="rounded-full aspect-square bg-green-400 bg-opacity-20 w-[52px]" />
);

const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
const supabase = createClient(supabaseUrl, supabaseKey);

const ShowcaseForm = (userRequest, contentRequest, imagesRequest) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("guest");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadPostImages = async (files) => {
      const urls = [];

      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`; // Ensure unique file names
        try {
          const blob = await file.arrayBuffer(); // Convert file to blob
          const { data, error } = await supabase.storage
            .from('showcaseimg')
            .upload(fileName, blob, {
              contentType: file.type,
            });

          if (error) {
            console.error('Error uploading post images:', error.message);
          } else {
            console.log('Image uploaded successfully:', data);
            const url = `${supabaseUrl}/storage/v1/object/public/showcaseimg/${fileName}`;
            urls.push(url); // Collect the URLs of uploaded images
          }
        } catch (error) {
          console.error('Error handling the file upload:', error);
        }
      }

      return urls; // Return array of URLs after all uploads are complete
    };

    if (userRole !== "partner") {
          setIsModalOpen(true);
          return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/showcase/", {
        method: "POST",
        body: JSON.stringify({
        "user": userRequest,
        "content": contentRequest,
        "image": imagesRequest,
        }),
      });

      // clear page lagi
      setContent("");
      setImages([]);
    } catch (error) {
      console.error("Failed to submit post:", error);
    }
  };

   async function handleImageChange(e) {
     const files = Array.from(e.target.files);
     const imageUrls = files.map(file => URL.createObjectURL(file));
     setImages(imageUrls);
   }

  const ActionButton = ({ iconSrc, iconAlt, children, onClick }) => (
      <button type="button" className="flex items-center justify-center px-8 py-3 bg-green-400 rounded-3xl" onClick={onClick}>
        <img src={iconSrc} alt={iconAlt} className="w-5 h-5 mr-2" />
        {children}
      </button>
    );

  const Avatar = React.memo(({ avatarSrc }) => {
    const defaultAvatar = 'frontend/public/avatar.png'; // path to the default avatar
    return (
      <div className="flex justify-center items-center self-start aspect-square">
        <img loading="lazy" alt="User avatar" src={avatarSrc || defaultAvatar} className="rounded-full bg-green-400 bg-opacity-20 w-[39px] h-[39px]" />
      </div>
    );
  });

  const closeModal = () => setIsModalOpen(false);

  return (
               <>
                 <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded-lg bg-neutral-800">
                   <div className="flex items-center gap-4">
                     <Avatar avatarSrc={undefined} /> {/* Update this as necessary */}
                     <textarea
                       value={content}
                       onChange={(e) => setContent(e.target.value)}
                       className="textarea bg-transparent mb-4 w-[686px] h-12 py-1 text-base focus:outline-none text-[#F3F1ED]"
                       placeholder="Any thoughts, jobs, links you want to share?"
                     />
                   </div>
                   <div className="flex items-center gap-4">
                     <>
                           <form className="form" onSubmit={(e) => e.preventDefault()}>
                             {/* Image Upload */}
                             <label htmlFor="image-upload" className="image-upload-label">
                               <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fb975a2ee80526bf1c672d3b773278da2e66220e974b2a00c324524d3e639ee?" alt="Upload Icon" style={{cursor: 'pointer'}} />
                               <input
                                 type="file"
                                 accept="image/*"
                                 id="image-upload"
                                 onChange={handleImageChange}
                                 multiple
                                 style={{ display: "none" }}
                               />
                             </label>

                             {/* Preview Uploaded Images */}
                             <div className="image-preview">
                               {images.map((image, index) => (
                                 <img key={index} src={image} alt={`Preview ${index + 1}`} style={{width: '100px', height: '100px'}} />
                               ))}
                             </div>
                           </form>
                         </>
                     {userRole === "partner" ? (
                       <ActionButton
                         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/87d329086d474267eefa028bbdfc0d43dc221b5f90c5f97e97715b02f5092ef6?apiKey=50c5361058c6465f94eb30dfd5c845d1&"
                         iconAlt="Post as partner icon"
                         onClick={handleSubmit}
                       >
                         Post as Partner
                       </ActionButton>
                     ) : (
                       <button type="submit" className="flex items-center justify-center px-8 py-3 bg-green-400 rounded-3xl">
                         POST
                       </button>
                     )}
                   </div>
                 </form>
                 {isModalOpen && (
                   <div className="modal">
                     <PartnerPage />
                     <button onClick={closeModal}>Close</button>
                   </div>
                 )}
               </>
             );
};

export default ShowcaseForm;

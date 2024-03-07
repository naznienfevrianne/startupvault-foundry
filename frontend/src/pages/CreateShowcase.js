import React, { useState } from "react";
import PartnerPage from "./PartnershipModal";

const Icon = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="rounded-full aspect-square bg-green-400 bg-opacity-20 w-[52px]" />
);

const ShowcaseForm = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("guest");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== "partner") {
          setIsModalOpen(true);
          return;
    }

    const formData = new FormData();
    formData.append("content", content);
    images.forEach((image) => {
      formData.append("image", image);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/showcase/", {
        method: "POST",
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) throw new Error("Network response was not ok.");

      // clear page lagi
      setContent("");
      setImages([]);
      // tambahin success message
    } catch (error) {
      console.error("Failed to submit post:", error);
      // tambahin error message
    }
  };

  const handleImageChange = (e) => {
    // Get all selected files
    const files = Array.from(e.target.files);

    // Map each file to a URL and store in state
    const imageUrls = files.map(file => URL.createObjectURL(file));

    // Update your state to include all selected images
    setImages(imageUrls); // Assuming you have a state called 'images' to store these URLs

    // Store image URLs in localStorage
    // Note: Local storage can only store strings, so we need to convert the array to a string
    localStorage.setItem("images", JSON.stringify(imageUrls));
  };


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
            <Avatar />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea bg-transparent mb-4 w-[686px] h-12 py-1 text-base focus:outline-none text-[#F3F1ED]"
              placeholder="Any thoughts, jobs, links you want to share?"
            />
          </div>
          <div className="flex items-center gap-4">
            <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      onChange={handleImageChange}
                      multiple
            />
            {userRole === "partner" ? (
              <button type="submit" className="button">Post</button>
            ) : (
              <ActionButton
                iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/87d329086d474267eefa028bbdfc0d43dc221b5f90c5f97e97715b02f5092ef6?apiKey=50c5361058c6465f94eb30dfd5c845d1&"
                iconAlt="Post as partner icon"
                onClick={() => setIsModalOpen(true)}
              >
                Post as Partner
              </ActionButton>
            )}
          </div>
        </form>
        {isModalOpen && (
          <div className="modal">
            <PartnerPage />
            <p>You must be a partner to post content.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </>
    );
};

export default ShowcaseForm;

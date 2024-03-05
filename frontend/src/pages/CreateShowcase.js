import React, { useState } from "react";

const Icon = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="rounded-full aspect-square bg-green-400 bg-opacity-20 w-[52px]" />
);

const SocialPostForm = () => {
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
    setImages([...e.target.files]);
  };

  const ActionButton = ({ iconSrc, iconAlt, children, onClick }) => (
      <button type="button" className="flex items-center justify-center px-8 py-3 bg-green-400 rounded-3xl" onClick={onClick}>
        <img src={iconSrc} alt={iconAlt} className="w-5 h-5 mr-2" />
        {children}
      </button>
    );

  const closeModal = () => setIsModalOpen(false);

  return (
      <>
        <form onSubmit={handleSubmit} className="flex gap-4 p-6 rounded-lg bg-neutral-800">
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="textarea" placeholder="Any thoughts, jobs, links you want to share?" />
          <input type="file" multiple onChange={handleImageChange} />
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
        </form>
        {isModalOpen && (
          <div className="modal">
            {/* Modal content here. Include a button or mechanism to close the modal. */}
            <p>You must be a partner to post content.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </>
    );
};

export default SocialPostForm;

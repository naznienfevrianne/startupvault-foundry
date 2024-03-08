import React from "react";

interface ImageComponentProps {
  src: string;
  alt: string;
  styleClass: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, styleClass }) => (
  <div className={styleClass}>
    <img loading="lazy" src={src} alt={alt} className="object-cover h-full w-full" />
  </div>
);

interface GalleryProps {
  images: { src: string; alt: string }[];
}

const DynamicImageGallery: React.FC<GalleryProps> = ({ images }) => {
  // Function to determine class based on image count
  const getClassForImage = (imageCount: number, index: number): string => {
    switch (imageCount) {
      case 1:
        return "w-full h-full";
      case 2:
        return "w-1/2 h-full";
      case 3:
        if (index < 2) {
          return "w-1/2 h-1/2";
        } else {
          return "w-full h-1/2";
        }
      case 4:
        return "w-1/2 h-1/2";
      default:
        return "";
    }
  };

  const containerClass = images.length === 3 ? "h-[640px]" : "h-[320px]";

  return (
    <section
      className={`dynamic-gallery self-stretch mt-4 rounded-2xl border border-solid border-neutral-700 flex flex-wrap ${containerClass}`}
      style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}
    >
      {images.map((image, index) => (
        <div key={index} className={`flex ${getClassForImage(images.length, index)}`}>
          <ImageComponent src={image.src} alt={image.alt} styleClass="m-auto" />
        </div>
      ))}
    </section>
  );
};

export default DynamicImageGallery;

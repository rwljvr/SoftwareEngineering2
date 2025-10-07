import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./ImageGallery.css";

const ImageGallery = ({ images }) => {
  const [index, setIndex] = useState(-1);

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`gallery-${i}`}
          className="thumbnail"
          onClick={() => setIndex(i)}
        />
      ))}

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((src) => ({ src }))}
      />
    </div>
  );
};

export default ImageGallery;

import { useState } from "react";

import Image1 from '../asset/sam1.jpg';
import Image2 from '../asset/sam2.jpg';
import Image3 from '../asset/sam3.jpg';
import Image4 from '../asset/wild1.jpg';
import Image5 from '../asset/wild2.jpg';
import Image6 from '../asset/wild3.jpg';


const SortableList = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: Image1,
      alt: "Image 1",
      name: "Football",
    },
    {
      id: 2,
      src: Image2,
      alt: "Image 2",
      name: "HNG",
    },
    {
      id: 3,
      src: Image4,
      alt: "Image 2",
      name: "HNG",
    },
    {
      id: 4,
      src: Image5,
      alt: "Image 2",
      name: "HNG",
    },
    {
      id: 5,
      src: Image6,
      alt: "Image 2",
      name: "HNG",
    },
    
    {
      id: 6,
      src: Image3,
      alt: "Image 3",
      name: "Baseball",
    },
    // Add more image objects as needed
  ]);

  const [dragItemIndex, setDragItemIndex] = useState();
  const [dragOverItemIndex, setDragOverItemIndex] = useState();

  const handleDragStart = (index) => {
    setDragItemIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = () => {
    const newImages = [...images];
    const draggedImage = newImages.splice(dragItemIndex, 1)[0];
    newImages.splice(dragOverItemIndex, 0, draggedImage);
    setImages(newImages);
  };

  const handleDragEnter = (index) => {
    setDragOverItemIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverItemIndex(undefined);
  };

  const handleDragEnd = () => {
    setDragItemIndex(undefined);
    setDragOverItemIndex(undefined);
  };

  return (
    <div className="imag-container">
      {/* <h1>Sortable Images with Names</h1> */}
      <div className="image-list">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={
              dragOverItemIndex === index
                ? "image-list-item next-position"
                : "image-list-item"
            }
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
          >
            <img src={image.src} alt={image.alt} />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortableList;

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import '../App.css';

import Image1 from '../asset/sam1.jpg';
import Image2 from '../asset/sam2.jpg';
import Image3 from '../asset/sam3.jpg';

const initialImages = [
  { id: '1', src: Image1, alt: 'Image 1' },
  { id: '2', src: Image2, alt: 'Image 2' },
  { id: '3', src: Image3, alt: 'Image 3' },
];

const Gallery = () => {
  const [images, setImages] = useState(initialImages);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newImages = [...images];
    const [movedImage] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, movedImage);

    setImages(newImages);
  };

  const onDrop = (acceptedFiles) => {
    const totalFiles = acceptedFiles.length;
    let uploadedCount = 0;

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Simulate an upload delay
        setTimeout(() => {
          uploadedCount++;
          const progress = (uploadedCount / totalFiles) * 100;
          setUploadProgress(progress);

          if (uploadedCount === totalFiles) {
            setUploadProgress(0); // Reset progress bar
          }
        }, 1000); // Simulated 1-second delay, replace with actual upload code

        // Add the uploaded file to the gallery
        setImages((prevImages) => [
          ...prevImages,
          { id: Date.now().toString(), src: reader.result, alt: file.name },
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className="gallery-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <svg
          width="157px"
          height="157px"
          viewBox="0 0 1024 1024"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          {/* ... SVG Path Data ... */}
        </svg>
        <p className="drag-txt">Drag & drop images here, or click to select files</p>
      </div>
      {uploadProgress > 0 && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${uploadProgress}%` }}>
            {Math.round(uploadProgress)}%
          </div>
        </div>
      )}
      <div className="image-grid">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="image-gallery" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="image-container"
              >
                {images.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="gallery-image"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Gallery;
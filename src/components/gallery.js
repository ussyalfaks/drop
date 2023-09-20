import { useState, useEffect } from "react";
import { MrMiyagi } from '@uiball/loaders';

import Image1 from '../asset/football.jpg';
import Image2 from '../asset/team.jpg';
import Image3 from '../asset/street.jpg';
import Image4 from '../asset/dev.jpg';
import Image5 from '../asset/benz.jpg';
import Image6 from '../asset/flag.jpg';

         

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dragItemIndex, setDragItemIndex] = useState();
  const [dragOverItemIndex, setDragOverItemIndex] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const loadedImages = [
        {
          id: 1,
          src: Image1,
          alt: "Football stadium",
          name: "Football",
        },
        {
          id: 2,
          src: Image2,
          alt: "Team of developers",
          name: "team",
        },
        {
          id: 3,
          src: Image4,
          alt: "Frontend dev coding",
          name: "Developer",
        },
        {
          id: 4,
          src: Image5,
          alt: "Black benz car",
          name: "Benz",
        },
        {
          id: 5,
          src: Image6,
          alt: "Nigerian Flag",
          name: "Flag",
        },
        {
          id: 6,
          src: Image3,
          alt: "New York Street",
          name: "street",
        },
      ];
      setImages(loadedImages);
      setIsLoading(false);
    }, 2000); 
  }, []);

  const handleDragStart = (index) => {
    setDragItemIndex(index);
     // Disable scrolling
    window.addEventListener("touchmove", preventScrolling, {
      passive: false,
    });
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
      // Re-enable scrolling
      window.removeEventListener("touchmove", preventScrolling, {
        passive: true,
      });
  };
  const handleTouchStart = (index) => {
    setDragItemIndex(index);
   
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    const touchY = event.touches[0].clientY;
    const elements = document.getElementsByClassName("image-list-item");

    for (let i = 0; i < elements.length; i++) {
      const rect = elements[i].getBoundingClientRect();
      if (touchY >= rect.top && touchY <= rect.bottom) {
        setDragOverItemIndex(i);
        break;
      }
    }
  };

  const handleTouchEnd = () => {
    const newImages = [...images];
    const draggedImage = newImages.splice(dragItemIndex, 1)[0];
    newImages.splice(dragOverItemIndex, 0, draggedImage);
    setImages(newImages);
    setDragItemIndex(undefined);
    setDragOverItemIndex(undefined);
    
  };
  const preventScrolling = (event) => {
    event.preventDefault();
  };
  return (
    <div className="image-container">
      <div className="header-container">
        <h1>Image Gallery</h1>
        <input
          type="text"
          placeholder="Search images by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {isLoading ? (
        <p className="loader">

        <MrMiyagi 
         size={100}
         lineWeight={3.5}
         speed={1} 
         color="black" 
        /></p>
      ) : (
        <div className="image-list">
          {images
            .filter((image) =>
              image.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((image, index) => (
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
                onTouchStart={() => handleTouchStart(index)}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={
                    dragOverItemIndex === index ? "next-position" : ""
                  }
                />
                <p className="image-name">{image.name}</p>
              </div>
              
            ))}
        </div>
        
      )}
    </div>
  );
};



export default Gallery;
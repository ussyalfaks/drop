import { useState, useEffect } from "react";
import { MrMiyagi } from '@uiball/loaders';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import app from '../components/firebase';




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
  const auth = getAuth(app);
  const navigate = useNavigate();
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
          name: "Team",
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

   // Logout function
   const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/'); // Redirect to the login page
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });};
  return (
  <>
    <div className="logout-button">
        <button onClick={logout}>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z" fill="#0F1729"></path> </g></svg>{" "}
          Logout
        </button>
      </div>
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
    </div></>
  );
};



export default Gallery;
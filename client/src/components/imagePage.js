// client/src/App.js
import { useState, useEffect } from "react";
import "./imagePage.css";


const randomValueInRange = (min, max) => Math.random() * (max - min) + min;

const random1 = randomValueInRange(0.2, 1.8);
const random2 = randomValueInRange(0.2, 1.8);
const random3 = randomValueInRange(0.2, 1.8);
const random4 = randomValueInRange(0.2, 1.8);

function ImagePage() {
  
  document.documentElement.style.setProperty('--random1', random1);
  document.documentElement.style.setProperty('--random2', random2);
  document.documentElement.style.setProperty('--random3', random3);
  document.documentElement.style.setProperty('--random4', random4);

  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [imageSrc, setImageSrc] = useState(""); // State to hold the image source
  const [loading, setLoading] = useState(false); // State to track loading status


  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value when it changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(inputValue != null){
      console.log(inputValue)
      setImageSrc(null);
      setLoading(true);
      const stringInput  = inputValue;
      setInputValue("");
  
      const inputElement = document.querySelector('.sb input');
      inputElement.disabled = true;
  
      try {
        const response = await fetch("http://localhost:8080/detail", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({data: `${stringInput}`})
        });
    
        const data = await response.json();
        setImageSrc(data.message[0].url);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      } finally {
        setLoading(false); // Set loading back to false
        inputElement.disabled = false;
      }
    }
  }

  return (
    <div className="body">
      <main>
      {loading ? (
          <p className="target">Loading...</p>
        ) : (
          <img src={imageSrc} alt="" />
        )}
        <div className="nav">
          <form onSubmit={handleSubmit} className="sb">
            <div className="rsb">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><path fill="#000000" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg>
            <input
              type="text"
              placeholder="Describe whats on your mind"
              value={inputValue}
              onChange={handleInputChange}
            />
            </div>
          </form>
          <svg
      className="download"
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
      >
        <path d="M4.406 1.342A5.53 5.53 0 018 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 010-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 00-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 010 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
        <path d="M7.646 15.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 14.293V5.5a.5.5 0 00-1 0v8.793l-2.146-2.147a.5.5 0 00-.708.708l3 3z" />
          </svg>
        </div>
      </main>
    </div>
  );
}

export default ImagePage;

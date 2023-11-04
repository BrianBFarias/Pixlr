// client/src/App.js
import { useState, useEffect } from "react";
import "./imagePage.css";


const randomValueInRange = (min, max) => Math.random() * (max - min) + min;

const random1 = randomValueInRange(0.2, 1.8);
const random2 = randomValueInRange(0.2, 1.8);
const random3 = randomValueInRange(0.2, 1.8);
const random4 = randomValueInRange(0.2, 1.8);

function ChatPage() {
  
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
      <textarea disabled className="target" name="output" id="" cols="30" rows="10" value={""}></textarea>
        <div className="sin-nav">
          <form onSubmit={handleSubmit} className="sb">
            <div className="rsb">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><path fill="#000000" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg>
            <input
              type="text"
              placeholder="lets chat"
              value={inputValue}
              onChange={handleInputChange}
            />
            </div>
          </form>
        
        </div>
      </main>
    </div>
  );
}

export default ChatPage;

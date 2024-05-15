import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import { createClient } from "@supabase/supabase-js";
import { useParams } from 'react-router-dom';
import DatePicker from "react-date-picker";



const EventDetails = () => {
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState({
    name: '',
    summary: '',
    desc: '',
    location: '',
    date: "",
    price: 0,
    link: '',
    image: null,
    isVerified: 1,

  });

  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    setFormChanged(true);
    setEventDetails(prevDetails => ({ ...prevDetails, isVerified: 0 }));
  }, [eventDetails.name, eventDetails.desc, eventDetails.location, eventDetails.date, eventDetails.price, eventDetails.link, eventDetails.image]);

  const myCookies = new Cookies();
  const token = myCookies.get('token')

  let { eventId } = useParams(); // Assuming eventId is passed as a query parameter in the URL
  console.log(eventId);

  let descValid = true;

  const [wordCount, setWordCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(' ');

  const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
  const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    fetchDataEvent();
  }, []);

  const fetchDataEvent = async () => {
    try {
        const response = await fetch(`https://startupvault-foundry.vercel.app/event/${eventId}/`, {
            method: "GET", 
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const entry = await response.json();
        setEventDetails(entry);

    } catch (error) {
        console.error("Error:", error);
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
  
    // Validate description word count
    const wordCount = newDescription.trim().split(/\s+/).length;
    setWordCount(wordCount);

    setEventDetails({
        ...eventDetails,
        desc: newDescription,
    });
    
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setPicture(imageUrl);
  
      // Upload and then update state
      uploadUserImg(file, fileName).then(photoUrl => {
        console.log("Photo URL:", photoUrl); // Check if this logs a valid URL
        setEventDetails(prevDetails => {
          console.log("Previous Details:", prevDetails); // Check the state before update
          return {
            ...prevDetails,
            image: photoUrl,
          };
        });
      }).catch(error => console.error("Error during image upload:", error));
    }
  };
    
  const handleDragOver = (e) => {
    e.preventDefault();
  };
    

  // const storedPicture = eventDetails.image;
  const [picture, setPicture] = useState("");

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  const storedValue = eventDetails.name;
  const valueWithoutSpaces = storedValue.replace(/\s/g, '');
  const fileName = valueWithoutSpaces + "/" + generateRandomString(25);

  const handlePictureChange = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (!file) return; // Make sure a file was selected

    const imageUrl = URL.createObjectURL(file);
    setPicture(imageUrl);

    // Upload the image first
    const fileName = generateFileName(file); // Assume you have a function to generate file names

    uploadUserImg(file, fileName).then(photoUrl => {
        // Update state after the image has been uploaded
        setEventDetails(prevDetails => ({
            ...prevDetails,
            image: photoUrl, // Use the URL from the upload function
        }));
    }).catch(error => console.error("Error uploading image:", error));
};

// Ensure you pass both file and fileName when uploading
const uploadUserImg = async (file, fileName) => {
    try {
        // Upload the image to Supabase Storage
        const { data, error } = await supabase.storage.from('userimg').upload(fileName, file);
        if (error) {
            console.error('Error uploading Picture:', error.message);
            throw error;
        } else {
            console.log('Image uploaded successfully:', fileName);
            return `${supabaseUrl}/storage/v1/object/public/userimg/${fileName}`;
        }
    } catch (error) {
        console.error('Error during image upload:', error);
        throw error;
    }
};

function generateFileName(file) {
    const ext = file.name.split('.').pop();
    const randomString = generateRandomString(25); // Your existing random string generator
    return `${randomString}.${ext}`;
}

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://startupvault-foundry.vercel.app/event/${eventId}/`, {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventDetails),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      console.log(eventDetails);
      navigate('/event');

    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formChanged) {
        handleUpdate();
    } else {
        console.log("No changes made to the event details.");
        navigate('/event'); // Optionally navigate back if no changes are detected
    }
  };

  return (
    <div className="flex flex-col justify-center bg-black min-h-screen px-20">
    <NavBar status=""/>
    <main className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
      <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
      <section className="flex flex-col w-[60%] max-md:w-full">
      <form onSubmit={handleSubmit}>
          <div className="px-5 pt-9 pb-20">
              <div className="flex flex-wrap gap-5 justify-between content-center self-start pr-14 text-stone-100 max-md:pr-5">
                  <h2 className="text-5xl font-semibold tracking-wider leading-[54px]">Edit Event Details</h2>
                  <button className="flex gap-1.5 justify-center px-3.5 py-1.5 my-auto text-xl tracking-wide rounded-xl border border-solid shadow-sm bg-neutral-400 bg-opacity-40 border-neutral-400">
                      <span>editing mode</span>
                      {/* Add your image component here */}
                  </button>
              </div>
              {/* Add profile picture change section */}
              <div className="mt-5 flex flex-col">
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Name</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={eventDetails.name}
                    onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                    required
                  />
              </div>
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Describe your event
                    <span className={`text-${descValid ? 'green-400' : 'red-500'} ml-2 text-sm`}>
                    {wordCount} words
                    </span>
                </div>
                <textarea
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer`}
                placeholder=""
                value={eventDetails.desc}
                onChange={handleDescriptionChange}
                rows={3} // Set the number of rows
                required
                />
                {/* <div className={`text-${descValid ? 'green-400' : 'red-500'} ml-2`}>
                {wordCount} words
                </div> */}
                {!descValid && (
                    <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Location</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={eventDetails.location}
                    onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                    required
                  />
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Date (dd/mm/yy)</div>
                <div className="flex gap-2">
                <input
                type="date"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                value={eventDetails.date}
                onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
                required
                />
                </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Price</div>
                <div className="flex gap-2">
                <input
                    type="number"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={eventDetails.price}
                    onChange={(e) => setEventDetails({ ...eventDetails, price: e.target.value })}
                    required
                  />
                </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Link</div>
                <div className="flex gap-2">
                <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={eventDetails.link}
                    onChange={(e) => setEventDetails({ ...eventDetails, link: e.target.value })}
                    required
                  />
                </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Upload Image</div>
                <div
                    className="flex justify-center items-center self-stretch px-5 py-6 mt-5 text-xs rounded-md bg-neutral-700 max-w-[608px] max-md:px-5"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {/* Your drag and drop area */}
                    <div className="flex flex-col items-center max-w-full w-[155px]">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc866c360c6157f64788184c766bee97748f3b79686562e4cd4da186ed2eb26c?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="w-12 aspect-square"
                        alt="Drag and drop"
                    />
                    <div className="self-stretch mt-3 -mr-px font-medium tracking-wide text-stone-100">
                        Drag and Drop document
                    </div>
                    <div className="mt-3 tracking-normal text-neutral-400">or</div>
                    <label
                        htmlFor="file-input"
                        className="justify-center px-4 py-2.5 mt-3 text-base font-semibold tracking-wider text-green-400 rounded-2xl border border-green-400 border-solid cursor-pointer"
                    >
                        SELECT FILE
                        <input
                        type="file"
                        accept="image/*"
                        id="file-input"
                        onChange={handlePictureChange}
                        style={{ display: 'none' }}
                        />
                    </label>
                    </div>
                </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Preview</div>
                {/* Preview of the selected image */}
                <div className="flex items-center mt-3">
                    {picture ? (
                    <img
                        src={picture}
                        loading="lazy"
                        className="bg-green-700 rounded-xl w-[300px] h-auto"
                        alt="Selected Image"
                    />
                    ) : (
                    <div className="flex flex-1 items-center">
                        <img
                         src={eventDetails.image}
                        loading="lazy"
                        className="bg-white-700 rounded-xl w-[300px] h-auto"
                        alt="Placeholder"
                        />
                    </div>
                    )}
                </div>
                
              <div className="flex gap-2 mt-5 pr-20 text-xl font-semibold tracking-widest">
                  <a type="button" href="/event" className="px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">cancel</a>
                  <button className="px-5 py-2 text-black bg-green-400 rounded-2xl" type="submit">save</button>
              </div>
          </div>
        </form>
      </section>
      </aside>
      </main>
    </div>
  );
};

export default EventDetails;
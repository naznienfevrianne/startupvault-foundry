import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

function MOUSubmission(props) {

    const navigate = useNavigate();
    const storedMOU = localStorage.getItem("MOU") | ""
    const [MOU, setMOU] = useState(storedMOU)
    const storedMOUFile = localStorage.getItem("MOUFile") | ""
    const [MOUFile, setMOUFile] = useState(storedMOUFile) 
    const [errorMessage, setErrorMessage] = useState(' ');
    const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
    const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
    const supabase = createClient(supabaseUrl, supabaseKey);
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      
        return result;
      }
    const handleMOUChange = (e) => {
        let file = e.target.files[0];
        const pdfUrl = URL.createObjectURL(file)
        setMOU(pdfUrl);
        setMOUFile(file);
        try {
            localStorage.setItem("MOUFile", file); // nama file
            localStorage.setItem("MOU", pdfUrl); // yg diupload
        } catch (error) {
            console.error("Error reading file: ", error);
        }
    };
    const deleteMOU = () => {
        setMOU(null);
        };

    function handlePrevious () {
        navigate("/partnerForm")
    }

    const uploadPartnerImg = (fileName) => {
        fetch(localStorage.getItem("partnerLogo"))
        .then(response => response.blob())
        .then(async blob => {
        // Upload the image to Supabase Storage
        const { data, error } = supabase.storage
            .from('partnerimg')
            .upload(fileName, blob);

        if (error) {
            console.error('Error uploading partnerlogo:', error.message);
        } else {
            console.log('Image uploaded successfully:', data);
            
            return supabaseUrl + "/storage/v1/object/public/partnerimg/" + fileName;
        }
        })
        .catch(error => {
        console.error('profilePicture fetching image from localhost:', error);
        });
      }
      const uploadPartnerMOU = (fileName) => {
        fetch(localStorage.getItem("MOU"))
        .then(response => response.blob())
        .then(async blob => {
        // Upload the image to Supabase Storage
        const { data, error } = supabase.storage
            .from('partnermou')
            .upload(fileName, blob);

        if (error) {
            console.error('Error uploading partnermou:', error.message);
        } else {
            console.log('Image uploaded successfully:', data);
            
            return supabaseUrl + "/storage/v1/object/public/partnermou/" + fileName;
        }
        })
        .catch(error => {
        console.error('partnermou fetching image from localhost:', error);
        });
      }
    
      const uploadUserImg = (fileName) => {
        fetch(localStorage.getItem("profilePicture"))
        .then(response => response.blob())
        .then(async blob => {
        // Upload the image to Supabase Storage
        const { data, error } = supabase.storage
            .from('userimg')
            .upload(fileName, blob);

        if (error) {
            console.error('Error uploading profilePicture:', error.message);
        } else {
            console.log('Image uploaded successfully:', data);
            
            return supabaseUrl + "/storage/v1/object/public/userimg/" + fileName;
        }
        })
        .catch(error => {
        console.error('profilePicture fetching image from localhost:', error);
        });
      }
      
    const handleSubmit = async () => {
        if(!MOU) {
            setErrorMessage("Please upload your MOU")
        } else {
            try {
                const storedValue = localStorage.getItem("partnerName");
                // Remove all spaces from the stored value
                const valueWithoutSpaces = storedValue.replace(/\s/g, '');
                const fileName = valueWithoutSpaces + "/" + generateRandomString(25)
    
                const partnerLogoUrl = uploadPartnerImg(fileName)
                const partnerMOUUrl = uploadPartnerMOU(fileName)
                const userimgURL = uploadUserImg(fileName)
                console.log(JSON.stringify({
                  "location": localStorage.getItem("partnerLocation"),
                  "desc": localStorage.getItem("partnerDescription"),
                  "interest": localStorage.getItem("partnerInterest"),
                  "website": localStorage.getItem("partnerWebsite"),
                  "mou": supabaseUrl + "/storage/v1/object/public/partnermou/" + fileName,
                  "linkedin": "https://linkedin.com/in/" + localStorage.getItem("partnerLinkedin"),
                  "logo": supabaseUrl + "/storage/v1/object/public/partnerimg/" + fileName,
                  "name": localStorage.getItem("partnerName"),
              }))
                const response = await fetch("http://localhost:8000/auth/partnerorg/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "location": localStorage.getItem("partnerLocation"),
                        "desc": localStorage.getItem("partnerDescription"),
                        "interest": localStorage.getItem("partnerInterest"),
                        "website": localStorage.getItem("partnerWebsite"),
                        "mou": supabaseUrl + "/storage/v1/object/public/partnermou/" + fileName,
                        "linkedin": "https://linkedin.com/in/" + localStorage.getItem("partnerLinkedin"),
                        "logo": supabaseUrl + "/storage/v1/object/public/partnerimg/" + fileName,
                        "name": localStorage.getItem("partnerName"),
                    })
                })
      
                if (response.ok) {
                  const data = await response.json();
                  alert("Submission successful!");
                  console.log(data);
                  const pk = data.id
                  const responsePartner = await fetch("http://localhost:8000/auth/partner/", {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          "email": localStorage.getItem("email"),
                          "role": "partner",
                          "password": localStorage.getItem("password"),
                          "isVerified": 0,
                          "image": supabaseUrl + "/storage/v1/object/public/userimg/" + fileName, // profile picture
                          "linkedin": "https://linkedin.com/" + localStorage.getItem("linkedin"),
                          "name": localStorage.getItem("name"),
                          "phoneNumber": localStorage.getItem("phoneNumber"),
                          "partnerOrganization": pk
                      })
                  })
                  if (!responsePartner.ok) {
                    const partnerJsonData = await responsePartner.json();
                    console.log(partnerJsonData);
                  } else {
                    const partnerJsonData = await responsePartner.json();
                    alert("Submission successful!");
                    console.log(partnerJsonData);
                    localStorage.clear()
                    navigate("/login")
                  }
                } else {
                  const jsonData = await response.json();
                    console.log(jsonData);
                    
                }  
            } catch (error) {
                console.error("Error:", error);
                alert("Error: " + error.message);
            }
        }
    }
  return (
    <div className="flex flex-col justify-center pb-20 bg-black min-h-screen">
      <div className="flex justify-center items-center px-32 py-8 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-0 mb-8 w-full max-w-[1120px] max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto text-4xl font-semibold tracking-wider leading-[70.8px] text-stone-100 max-md:max-w-full max-md:text-4xl">
              VERIFICATION
            </div>
            <div className="flex gap-2.5 my-auto">
              <div className="shrink-0 w-3.5 bg-green-900 rounded-full border border-green-900 border-solid h-[15px] stroke-[1px]" />
              <div className="shrink-0 w-3.5 bg-green-400 rounded-full border border-green-400 border-solid h-[15px] stroke-[1px]" />
            </div>
          </div>
          <div className="mt-0 text-base tracking-normal text-white max-md:max-w-full">
            As a part of our verification process, please sign the MOU document
            we have provided and submit the signed document.
          </div>
          {!MOU ? (
        

            <div className="flex justify-center items-center px-16 py-8 mt-3 text-base whitespace-nowrap rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col items-center max-w-full w-[178px]">
               <img
                 loading="lazy"
                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d32c79d9fa28e723fb7fdf30696b54be6b5bd2cebbac134534511155a82bba1?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                 className="w-16 aspect-square"
               />
        <div className="self-stretch mt-3 font-medium tracking-wide text-stone-100">
                Drag and drop document
              </div>
         <div className="mt-3 tracking-normal text-neutral-400">or</div>
            <label htmlFor="MOU-upload" className="justify-center px-5 py-3 mt-3 text-l font-semibold tracking-widest text-green-400 rounded-3xl border border-green-400 border-solid hover:border-green-600 border-solid cursor-pointer">SELECT FILE</label>
            <input
              type="file"
              accept=".pdf"
              id="MOU-upload"
              onChange={handleMOUChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      ) : (
        
        <div className="flex gap-2.5 self-start px-3 py-3 mt-3 text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-solid bg-green-400 bg-opacity-20 border-[color:var(--brand,#64EB8B)] text-stone-100">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2eb1a4a819d2a070f192a5e0474b58e7bd87cd1a993b40548d71a50a0cfc81e1?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
            className="w-6 aspect-square"
          />
          <div className="flex-auto self-start mt-1">
            {MOUFile.name}
          </div>
          <img
            onClick={deleteMOU}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a56fd396fdab4213e78daed12611689f2e3db816efc9c0281e2b8b0ba63f5b4?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
            className="w-6 aspect-square cursor-pointer"
          />
        </div>
      )}

          {errorMessage && (
            <div className="mt-1 text-red-500 text-sm mb-2">{errorMessage}</div>
            )}
          <div className="flex gap-5 justify-between mt-3 w-full text-l font-semibold tracking-widest whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div 
            onClick = {handlePrevious}
            type="button"
            className="flex flex-1 gap-2.5 justify-center px-5 py-3 rounded-3xl border border-solid border-stone-100 text-stone-100 hover:border-green-600 border-solid cursor-pointer">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/89284abb4a3a9f6ed90954b4580f829c637307abcfe8f168c546f55998b55f61?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                className="shrink-0 w-6 aspect-square"
              />
              <div>PREV</div>
            </div>
            <div 
             onClick = {handleSubmit}
             type="button"
            className="flex flex-1 gap-2.5 justify-center px-5 py-3 text-black bg-green-400 rounded-3xl hover:border-green-600 border-solid cursor-pointer">
              <div>SUBMIT</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4baa0d556ae8a9ee2e6515bc316fd51328e25450530dcce0face96f9b00fe160?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                className="shrink-0 w-6 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MOUSubmission;

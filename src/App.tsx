import {  ChangeEvent, useRef, useState } from "react";
import frame from "./assets/frame.svg";
import * as htmlToImage from 'html-to-image';
import pigImage from './assets/pig.jpg'

function App() {
  const [imgSrc, setImgSrc] = useState(pigImage)
  const imageRef = useRef<HTMLDivElement>(null);

  async function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImgSrc(event!.target!.result as string);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error reading image file:", error);
      }
    } else {
      setImgSrc("");
    }
  }


  async function download(url: string) {
    const link = document.createElement("a")
    link.download = "stand-with-israel.png"
    link.href = url
    link.click()
  }

  return (
    <>
    <h1 className="text-4xl text-center justify-center items-center w-full pt-5 pb-8">!Stand With Israel</h1>
      <div className="flex flex-col w-[80vw] items-center justify-center m-auto">
        <div className="flex justify-center items-center self-center">
          <div className="relative" ref={imageRef}>
            <img
              className="w-full rounded-xl h-auto lg:h-[50vh]"
              src={imgSrc}
            />
            <img className="absolute left-0 bottom-0" src={frame} />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div>
          <label htmlFor="file-upload" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-2xl">העלה תמונה</label>
          <input onChange={handleInput} id="file-upload" type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" />
          </div>
          <button onClick={async () => {
            const element = document.querySelector(".image")
            console.log(element)
            const dataUrl = await htmlToImage.toPng(imageRef.current as HTMLElement)
            download(dataUrl)
          }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-2xl">הורדה</button>
        </div>
      
      </div>
    </>
  );
}

export default App;

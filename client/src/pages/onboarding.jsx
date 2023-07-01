import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

function onboarding() {
  const [{ userInfo }] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  const [hover, setHover] = useState(false);
  const imageRef = useRef(null);

  const handleClick = (e) => {
    imageRef.current.click();
  };

  const uploadphoto = (e) => {
    const file = e.target.files[0];

    file && setImage(URL.createObjectURL(file));
  };

  const validateDetails = () => {
    return !(name.length < 3);
  };

  const onBoarderHandler = () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
      } catch (error) {}
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-6 bg-panel-header-background h-screen w-screen">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="whatsapp" height={200} width={200} />
        <span className="text-4xl text-white ">Whatsapp</span>
      </div>

      <h2 className="text-white text-2xl">Create new account</h2>
      <div className="flex mt-6 gap-6 pl-6">
        <div className="flex flex-col items-center justify-center">
          <Input name="DisplayName" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="mt-5">
            <button
              className="bg-search-input-container-background p-5 rounded-lg flex items-center justify-center gap-7 text-white"
              onClick={onBoarderHandler}
            >
              Create porfile
            </button>
          </div>
        </div>
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleClick}
        >
          <input
            type="file"
            ref={imageRef}
            onChange={uploadphoto}
            style={{ display: "none" }}
          />
          <div
            className={`z-10  rounded-full absolute w-48 h-48 right-0 top-0 flex-col gap-2 flex items-center justify-center text-center bg-photopicker-overlay-background ${
              hover ? "visible" : "hidden"
            }`}
          >
            <FaCamera className={`text-4xl text-white`} />
            <span className="text-white text-2xl">Change your profile</span>
          </div>
          <Avatar size="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;

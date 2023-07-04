import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

function onboarding() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(
    userInfo?.profileImage || "/default_avatar.png"
  );
  const [hover, setHover] = useState(false);
  const imageRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push("/login");
    else if (!newUser && userInfo.email) router.push("/");
  }, [userInfo, newUser, router]);

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

  const onBoarderHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.data.id,
              name,
              email,
              profileImage: image,
              status: about,
            },
          });

          return router.push("/onboarding");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-6 bg-panel-header-background h-screen w-screen">
      <div className="flex items-center justify-center gap-2">
        <Image src="/logo.png" alt="logo" height={200} width={200} className="rounded-full" />
        <span className="text-4xl text-white ">WEASEL</span>
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

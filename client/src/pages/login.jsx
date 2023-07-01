import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseApp } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import {  useRouter } from "next/router";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

const login = () => {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  useEffect(() => {
    userInfo?.id && router.push("/");
  },[userInfo]);

  const handelOnclick = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseApp, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });

        if (!data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: true,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "",
            },
          });
          return router.push("/onboarding");
        } else {
          const {
            data: { id, name, email, profilePicture: profileImage, about },
          } = data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status: about,
            },
          });
          return router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col gap-6 bg-panel-header-background h-screen w-screen">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="whatsapp" height={200} width={200} />
        <span className="text-4xl text-white ">Whatsapp</span>
      </div>
      <button
        className="flex items-center justify-center gap-7 cursor-pointer bg-search-input-container-background p-5 rounded-lg"
        onClick={handelOnclick}
      >
        <FcGoogle className="text-2xl" />
        <span className="text-white text-2xl">Login with google</span>
      </button>
    </div>
  );
};

export default login;

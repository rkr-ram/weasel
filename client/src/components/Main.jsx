import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseApp } from "@/utils/FirebaseConfig";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Main() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    redirectLogin && router.push("/login");
  }, [redirectLogin]);

  onAuthStateChanged(firebaseApp, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } =await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });
    if (!data.status) {
      router.push("/login");
    }
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
    
  }
  });
  return <div>{userInfo?.name}</div>;
}

export default Main;

import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import React, { useState } from "react";

function onboarding() {
  const [{userInfo}] = useStateProvider()
  const [name,setName]=useState(userInfo?.name || "")
  const [about,setAbout]=useState("")

  return <div className="flex items-center justify-center flex-col gap-6 bg-panel-header-background h-screen w-screen">
  <div className="flex items-center justify-center gap-2">
    <Image src="/whatsapp.gif" alt="whatsapp" height={200} width={200} />
    <span className="text-4xl text-white ">Whatsapp</span>
  </div>
  
    <h2 className="text-white text-2xl">Create new account</h2>
    <div className="flex mt-6 gap-6">
      <div className="flex flex-col items-center justify-center">
        <Input name="DisplayName" state={name} setState={setName} label/>
        <Input name="About" state={about} setState={setAbout} label/>
      </div>
    </div>
</div>;
}

export default onboarding;

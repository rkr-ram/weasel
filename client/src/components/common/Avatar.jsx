import Image from "next/image";
import React from "react";

function Avatar({ size, image, setImage }) {
  return (
    <div>
      {size === "sm" && (
        <div className="relative h-10 w-10">
          <Image src={image} className="rounded-full" fill alt="Avatar" />
        </div>
      )}
      {size === "lg" && (
        <div className="relative h-14 w-14">
          <Image src={image} className="rounded-full" fill  alt="Avatar"/>
        </div>
      )}
      {size === "xl" && (
        <div className="relative h-48 w-48">
          <Image src={image} className="rounded-full" fill  alt="Avatar"/>
        </div>
      )}
    </div>
  );
}

export default Avatar;

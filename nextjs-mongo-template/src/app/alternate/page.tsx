'use client'

import Image from "next/image";
import React, { useEffect } from "react";
import MongoImage from "../../images/mongo_logo.png";
import '../../styles/globals.css';

export default function Alternate() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl">Next.js Mongo Template</h1>
      </div>
      <div className="flex flex-row gap-10 items-center">
        <div className="inline-block align-middle">
          <Image src="./next.svg" alt="Next.js logo" className="dark:invert" width={190} height={38} />
        </div>
        <div>
          <Image src={MongoImage} alt="MongoDB logo" width={190} height={38} />
        </div>
      </div>
      <div className="mt-10">
        <p>Edit <code>src/app/pages/alternate.tsx</code> and save to reload.</p>
      </div>
      <div className="mt-5">
        <a
          target="_blank"
          href="https://nextjs.org/learn?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=home"
          className="text-blue-500 underline"
        >
          Learn Next.js
        </a>
      </div>

      <div className="mt-5 w-100 ">
        <button className="bg-gray-200 hover:bg-gray-400 text-black text-md py-1 px-2 rounded m-2" onClick={() => { window.location.href = "./" }}>Go Back</button>
      </div>
    </div>
  );
}

'use client'

import Image from "next/image";
import { datadogRum } from '@datadog/browser-rum';
require('dotenv').config();
import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Form from "next/form"; // You can remove this if unused
import MongoImage from "../images/mongo_logo.png";
const { DateTime } = require("luxon");
import '../styles/globals.css';

let rumApplicationId:string = process.env.NEXT_PUBLIC_RUM_APPLICATION_ID || "";
let rumClientToken:string = process.env.NEXT_PUBLIC_RUM_CLIENT_TOKEN || "";


datadogRum.init({
    applicationId: rumApplicationId,
    clientToken: rumClientToken,
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.com',
    service: 'nextjs-mongo-template',
    env: 'production',
    // Specify a version number to identify the deployed version of your application in Datadog
    version: '1.0.1',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    defaultPrivacyLevel: 'allow',
  //allowedTracingUrls: ["http://localhost:3001/", "https://react-mongo-template.herokuapp.com/"],
  allowedTracingUrls: [
    { match: /http:\/\/localhost:3001/, propagatorTypes: ["datadog"] },
    { match: /http:\/\/10\.0\.2\.2:3001/, propagatorTypes: ["datadog"] },
    { match: /https:\/\/react-mongo-template\.herokuapp\.com/, propagatorTypes: ["datadog"] }
  ],
});

export default function Home() {

  type Message = {
    _id: string,
    message: string,
    created_date: Date
    // add other properties as needed
  };

  var [messages, setMessages] = useState<Message[]>([]);
  var [newMessage, setNewMessage] = useState("");
  var [loading, setLoading] = useState(true);


  const renderMessages = () => {
    API.findAllMessages().then((res) => {
      setMessages((messages) => res.data);
      setLoading(loading => false);
    });
  };

  const saveMessage = () => {
    if (newMessage !== "") {
      API.createMessage(newMessage, new Date()).then((res) => {
        renderMessages();
        setNewMessage(newMessage => "");
      });
    } else if (newMessage === "") {
      throw new Error("Test Error: Message input is empty");
    }
  };

  const deleteMessage = (message_id: string) => {
    API.deleteOneMessage(message_id).then((res) => {
      renderMessages();
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      renderMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);


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
        <p>Edit <code>src/app/layout.tsx</code> and save to reload.</p>
      </div>
      <div className="mt-10">
        <a
          target="_blank"
          href="https://nextjs.org/learn?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=home"
          className="text-blue-500 underline"
        >
          Learn Next.js
        </a>
      </div>
      <div className="mt-10">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message here"
          className="bg-gray-900 rounded-md p-2 w-80 outline-none"
        />
      </div>
      <div className="mt-10">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { saveMessage(); }}>
          Submit
        </button>
      </div>
      <div className="mt-10">
        {messages.map((message, i) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg card bg-gray-900 m-2 w-screen p-3" key={i}>
            <p className="quotation">"{message.message}"</p>
            <p className="mt-2">{DateTime.fromISO(message.created_date).toLocaleString(DateTime.DATETIME_MED)}</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2" onClick={() => deleteMessage(message._id)}>Delete</button>
          </div>)
        )}
      </div>
    </div>
  );
}

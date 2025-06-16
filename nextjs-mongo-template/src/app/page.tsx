'use client'

import Image from "next/image";
import { datadogLogs } from '@datadog/browser-logs'
import React, { useState, useEffect } from "react";
import API from "../utils/API";
import MongoImage from "../images/mongo_logo.png";
const { DateTime } = require("luxon");
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../styles/globals.css';

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
  var [isOpen, setIsOpen] = useState(false);


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

  const generateBrowserLogs = () => {
    datadogLogs.logger.info(
      "User clicked 'Generate Browser Log' button - INFO level",
      { custom_timestamp: new Date() }
    );
    datadogLogs.logger.warn(
      "User clicked 'Generate Browser Log' button - WARN level",
      { custom_timestamp: new Date() }
    );
    datadogLogs.logger.error(
      "User clicked 'Generate Browser Log' button - ERROR level",
      { custom_timestamp: new Date() }
    );
    datadogLogs.logger.debug(
      "User clicked 'Generate Browser Log' button - DEBUG level",
      { custom_timestamp: new Date() }
    );
  }

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
      <div className="mt-5">
        <a
          target="_blank"
          href="https://nextjs.org/learn?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=home"
          className="text-blue-500 underline"
        >
          Learn Next.js
        </a>
      </div>
      <div className="mt-5">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message here"
          className="bg-gray-900 rounded-md p-2 w-80 outline-none"
        />
      </div>
      <div className="mt-5">
        <button className="bg-blue-700 hover:bg-blue-900 text-white text-sm py-1 px-3 rounded" onClick={() => { saveMessage(); }}>
          Submit
        </button>
      </div>
      <div className="mt-5">
        {messages.map((message, i) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg card bg-gray-900 m-2 w-screen p-3" key={i}>
            <p className="quotation">"{message.message}"</p>
            <p className="mt-2">{DateTime.fromISO(message.created_date).toLocaleString(DateTime.DATETIME_MED)}</p>
            <button className="bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-2 rounded mt-2" onClick={() => deleteMessage(message._id)}>Delete</button>
          </div>)
        )}
      </div>
      <div className="mt-5 border-t-4 border-gray-900 w-100 ">
        <div className={isOpen == true ? "mt-5 rounded p-3 rounded-b-none accordion-header text-middle bg-gray-900" : "mt-5 rounded p-3 accordion-header bg-gray-900"} onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>Additional RUM Functionality {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} </div>
        <div className={isOpen ? "visible rounded-b flex-col bg-gray-900" : "invisible rounded-b bg-gray-900 flex-col"}>
          <div className="items-center flex-row">
            <button className="bg-gray-200 hover:bg-gray-400 text-black text-xs py-1 px-2 rounded m-2" onClick={() => { window.location.href = "./alternate" }}>Alternate Page</button>
            <button className="bg-yellow-400 hover:bg-yellow-600 text-black text-xs py-1 px-2 rounded m-2" onClick={() => { generateBrowserLogs(); }}>Generate Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

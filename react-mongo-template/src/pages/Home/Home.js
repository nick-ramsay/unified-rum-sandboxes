import React, { useState, useEffect } from "react";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import { } from "../../sharedFunctions/sharedFunctions";
import API from "../../utils/API";
import moment from "moment";
import logo from "../../../src/logo.svg";
import GithubLogo from "../../images/github_logos/GitHub_Logo_White.png";
import mongoLogo from "../../images/mongo_logo.png";
import "./style.css";

const Home = () => {
  var [messages, setMessages] = useState([]);

  const renderMessages = () => {
    API.findAllMessages().then((res) => {
      setMessages((messages) => res.data);
    });
  };

  const saveMessage = (event) => {
    let newMessage = document.getElementById("messageInput").value;
    if (newMessage !== "") {
      API.createMessage(newMessage, new Date()).then((res) => {
        renderMessages();
        document.getElementById("messageInput").value = "";
      });
    } else if (newMessage === "") {
      throw new Error("Test Error: Message input is empty");
    }
  };

  const deleteMessage = (event) => {
    let messageDeletionID = event.currentTarget.dataset.message_id;
    API.deleteOneMessage(messageDeletionID).then((res) => {
      renderMessages();
    });
  };

  const saveNewMessageEnterKey = () => {
    var input = document.getElementById("messageInput");
    var saveBtn = document.getElementById("submitNewMessageBtn");

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitNewMessageBtn").click();
        input.focus();
      }
    });

    saveBtn.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitNewMessageBtn").click();
        input.focus();
      }
    });
  }

  //START: Datadog RUM Functions

  const triggerRuntimeError = () => {
    const obj = {};
    const a = obj.name.surname;
    console.log(a) // ⬅️ - Just to get rid of warning about "a" not being used
  }

  const generateManualRumError = () => {
    datadogRum.addError("My error message goes here", {
      session_id: datadogRum.getInternalContext().session_id,
      name: "This was my manually triggered error"
    });
  }

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

  const fetchDummyJson = () => {
    fetch('https://dummyjson.com/products/1')
      .then(res => res.json())
      .then(json => console.log(json))
  }

  const applyGlobalContextAttribute = () => {
    let item_1 = String(Math.round(Math.random() * 100000));
    let item_2 = String(Math.round(Math.random() * 100000));
    let item_3 = String(Math.round(Math.random() * 100000));

    datadogRum.setGlobalContextProperty("my_custom_attribute.message", "Congrats! You applied a global context attribute...");
    datadogRum.setGlobalContextProperty("tag_string", item_1);
    datadogRum.setGlobalContextProperty("tag_array", [item_1, item_2, item_3]);
  }

  const applyUser = () => {
    datadogRum.setUser({
      id: '1234',
      name: 'John Doe',
      email: 'john@doe.com',
      plan: 'premium'
    })
  }

  const applyUserProperties = () => {
    datadogRum.setUserProperty('data', {
      testUserProperty: "XYZ789"
    });
  }
  //END: Datadog RUM Functions
  ///////////////////////////////////////////

  const fetchDummyJsonApi = () => {
    fetch("https://dummyjson.com/c/eb3d-d728-4cdf-ab19", {
      method: "post",
      body: JSON.stringify({ username: "example" })
    })
  }

  useEffect(() => {
    renderMessages();
    fetchDummyJsonApi();
    applyUser();
    datadogRum.addTiming("use_effect_called");
  }, []);

  return (
    <div>
      <div className="App" data-bs-theme="dark">
        <div className="container">
          <div className="row">
            <header className="App-header p-4">
              <h1>React MongoDB Template</h1>
              <img src={logo} className="App-logo" alt="logo" />
              <img src={mongoLogo} className="mongo-logo" alt="mongo_logo" />
              <p>
                Edit <code>src/pages/Home/Home.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form className="mt-3">
                <div className="form-row text-center">
                  <div className="col">
                    <input
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          console.log("Testing!");
                          saveMessage();
                        }
                      }}
                      type="text"
                      placeholder="Enter your message here"
                      className="form-control"
                      id="messageInput"
                      name="messageInput"
                      aria-describedby="messageHelp"

                    />
                  </div>
                </div>
                <div className="col mt-3">
                  <div
                    type="button"
                    id="submitNewMessageBtn"
                    className="btn btn-sm btn-custom"
                    tabIndex="0"
                    onClick={saveMessage}
                    onKeyUp={saveNewMessageEnterKey}
                    data-dd-action-name="Clicked Custom Action Button Again"
                  >
                    Submit
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <p style={{ color: "#e83e8c" }} className="mt-3 mb-1">
              {messages.length === 0
                ? "No Messages"
                : messages.length +
                (messages.length > 1 ? " messages" : " message")}
            </p>
          </div>
          <div className="row">
            <div className="col-md-12">
              {messages.map((message, i) => (
                <div className="mt-2 mb-2 message-card" key={i}>
                  <div className="pt-1">
                    <div style={{ fontStyle: "italic" }} className="mt-1 mb-1">
                      "{message.message}"
                    </div>
                    <div style={{ color: "#61dafb" }} className="mb-2">
                      {moment(message.created_date).format("DD MMMM YYYY h:mm A")}
                    </div>
                    <div
                      className="btn btn-sm btn-custom-red mb-1 mt-1"
                      data-message_id={message._id}
                      onClick={deleteMessage}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-md-12">
              <div class="accordion accordion-flush" data-bs-theme="dark" id="accordionAdditionalRumFunctions">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#additional-rum-functions" aria-expanded="false" aria-controls="flush-collapseOne">
                      Additional RUM Functionality
                    </button>
                  </h2>
                  <div id="additional-rum-functions" class="accordion-collapse collapse" data-bs-parent="#accordionAdditionalRumFunctions">
                    <div class="accordion-body">
                      <div className="row">
                        <div className="col-md-6">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => triggerRuntimeError()}
                          >
                            Trigger Runtime Error
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => generateManualRumError()}
                          >
                            Generate Manual RUM Error Event
                          </button>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => generateBrowserLogs()}
                          >
                            Generate Browser Logs
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => fetchDummyJson()}>
                            Call DummyJSON
                          </button>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => applyGlobalContextAttribute()}>
                            Apply Global Context
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button className="btn btn-sm btn-outline-light" onClick={() => window.location.href = "./alternate"}>Go to Alternative View</button>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <button className="btn btn-sm btn-outline-success" onClick={() => applyUserProperties()}>
                            Set User Property
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 pt-3 pb-3">
            <a
              href="https://github.com/nick-ramsay/react-mongo-template-docker"
              target="_blank"
              rel="noopener noreferrer"
              title="Check out this repo on GitHub!"
              className="github-link"
            >
              <img className="github-logo" src={GithubLogo} alt="GitHub_logo" />
            </a>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Home;

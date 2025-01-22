import React, { useEffect } from "react";
import { datadogRum } from "@datadog/browser-rum";
import { } from "../../sharedFunctions/sharedFunctions";
import logo from "../../../src/logo.svg";
import GithubLogo from "../../images/github_logos/GitHub_Logo_White.png";
import "./style.css";


const Alternate = () => {


  useEffect(() => {
    datadogRum.addTiming("use_effect_called");
  }, []);


  return (
    <div>
      <div className="App">
        <header className="App-header p-4">
          <h1>
            React MongoDB Template
          </h1>
          <h4><code>Alternative Page</code></h4>
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            Edit <code>src/pages/Alternate/Alternate.js</code> and save to reload.
          </p>

        </header>
        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <button className="btn btn-sm btn-outline-light" onClick={() => window.location.href = "./"}>Go to Home View</button>
            </div>
          </div>
          <div className="row mt-4">
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

      </div>
    </div>
  );
};

export default Alternate;

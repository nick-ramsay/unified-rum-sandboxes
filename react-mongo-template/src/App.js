import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import keys from "./keys";
import "./App.css";

import Home from "../src/pages/Home/Home";
import Alternate from "../src/pages/Alternate/Alternate";

import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs'

datadogRum.init({
  applicationId: keys.ddrum.react_rum_application_id,
  clientToken: keys.ddrum.react_rum_client_token,
  site: keys.ddrum.react_rum_dd_site,
  service: 'react-mongo-template',
  env: 'production',
  version: keys.ddrum.react_rum_dd_version,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  traceSampleRate: 100,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
  //allowedTracingUrls: ["http://localhost:3001/", "https://react-mongo-template.herokuapp.com/"],
  allowedTracingUrls: [
    { match: /http:\/\/localhost:3001/, propagatorTypes: ["datadog"] },
    { match: /https:\/\/react-mongo-template\.herokuapp\.com/, propagatorTypes: ["datadog"] }
  ],
  // beforeSend: (event, context) => {
  //   // collect a RUM resource's response headers
  //   return true
  // },
});

datadogLogs.init({
  clientToken: keys.ddrum.react_rum_client_token,
  site: keys.ddrum.react_rum_dd_site,
  service: 'react-mongo-template',
  env: 'production',
  version: keys.ddrum.react_rum_dd_version,
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})

datadogRum.setUser({
  id: '1234',
  name: 'John Doe',
  email: 'john@doe.com',
  plan: 'premium',
})



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home />
      ),
    },
    {
      path: "/alternate",
      element: (
        <Alternate />
      ),
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
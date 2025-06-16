"use client"

import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs'
require('dotenv').config();

let rumApplicationId: string = process.env.NEXT_PUBLIC_RUM_APPLICATION_ID || "";
let rumClientToken: string = process.env.NEXT_PUBLIC_RUM_CLIENT_TOKEN || "";
let rumVersion: string = process.env.NEXT_PUBLIC_RUM_VERSION || "";


datadogRum.init({
    applicationId: rumApplicationId,
    clientToken: rumClientToken,
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.com',
    service: 'nextjs-mongo-template',
    env: 'production',
    // Specify a version number to identify the deployed version of your application in Datadog
    version: rumVersion,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    defaultPrivacyLevel: 'allow',
    trackViewsManually: false,
    silentMultipleInit: true,
    //allowedTracingUrls: ["http://localhost:3001/", "https://react-mongo-template.herokuapp.com/"],
    allowedTracingUrls: [
        { match: /http:\/\/localhost:3001/, propagatorTypes: ["datadog"] },
        { match: /http:\/\/10\.0\.2\.2:3001/, propagatorTypes: ["datadog"] },
        { match: /https:\/\/react-mongo-template\.herokuapp\.com/, propagatorTypes: ["datadog"] }
    ],
});

datadogLogs.init({
    clientToken: rumClientToken,
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
    service: 'nextjs-mongo-template'
});

export default function DatadogInit() {
    // Render nothing - this component is only included so that the init code
    // above will run client-side
    return null;
}
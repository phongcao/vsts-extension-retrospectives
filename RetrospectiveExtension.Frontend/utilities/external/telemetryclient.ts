//---------------------------------------------------------------------
// <copyright file="TelemetryClient.ts">
//    This code is licensed under the MIT License.
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//    PARTICULAR PURPOSE AND NONINFRINGEMENT.
// </copyright>
// <summary>Application Insights Telemetry Client Class</summary>
//---------------------------------------------------------------------
// Source: https://github.com/ALM-Rangers/telemetryclient-vsts-extension

/// <reference types="vss-web-extension-sdk" />
import { ApplicationInsights, SeverityLevel } from "@microsoft/applicationinsights-web"
import environment from '../../config/environment'

export class TelemetryClientSettings {
  public key: string;
  public enableCorsCorrelation: boolean;
  public enableRequestHeaderTracking: boolean;
  public enableResponseHeaderTracking: boolean;

  // TOCHECK: Engin Polat
  // public extensioncontext: string="default";
  // public disableTelemetry: string = "false";
  // public disableAjaxTracking: string = "false";
  // public enableDebug: string = "false";
}

export class TelemetryClient {
  private static _instance: TelemetryClient;
  public ExtensionContext: string;
  private IsAvailable: boolean = true;
  private appInsights: ApplicationInsights;

  private constructor(settings: TelemetryClientSettings) {
    try {
      const webContext = VSS.getWebContext();

      const appInsights_new = new ApplicationInsights({ config: {
        instrumentationKey: settings.key,
        enableCorsCorrelation:settings.enableCorsCorrelation,
        enableRequestHeaderTracking:settings.enableRequestHeaderTracking,
        enableResponseHeaderTracking:settings.enableRequestHeaderTracking
      }});

      this.appInsights=appInsights_new;
      this.appInsights.loadAppInsights();
      this.appInsights.setAuthenticatedUserContext(webContext.user.id, webContext.collection.id);
    }
    catch (e) {
      console.log(e);
    }

   }

  public static getClient(): TelemetryClient | null {

    if (!TelemetryClient._instance) {
      console.log("Creating new TelemetryClient!");

      if(environment.AppInsightsInstrumentKey != '')
        TelemetryClient._instance = new TelemetryClient({ key:environment.AppInsightsInstrumentKey, enableCorsCorrelation:true,enableRequestHeaderTracking:true, enableResponseHeaderTracking:true});
      else
      {
        console.warn("Missing ApplicationInsights Instrumentation key.");
        return null;
      }
    }

    return TelemetryClient._instance;
  }

  public trackPageView(name?: string, url?: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }, duration?: number) {
    try {
      properties["duration"]=duration.toString();
      this.appInsights.trackPageView({name: name, measurements: measurements, properties:properties, uri:url})
    }
    catch (e) {
      console.log(e);
    }
  }

  public trackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    try {
      console.log("Tracking event: " + this.ExtensionContext + "." + name);
      this.appInsights.trackEvent({ name: name, properties: properties, measurements: measurements });
    }
    catch (e) {
      console.log(e);
    }
  }

  public trackException(exception: Error) {
    try {
      this.appInsights.trackException({ exception });
    }
    catch (e) {
      console.log(e);
    }
  }

  public trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: { [name: string]: string; }) {
    try {
      // this.appInsights.trackMetric(this.ExtensionContext + "." + name, average, sampleCount, min, max, properties);
      this.appInsights.trackMetric({ name: name, properties: properties, average: average, min: min, max: max });
    }
    catch (e) {
      console.log(e);
    }
  }

  public trackTrace(message: string, properties?: { [name: string]: string }, severityLevel?: SeverityLevel) {
    try {
      // this.appInsights.trackTrace(this.ExtensionContext + "." + message, properties, severityLevel);
      this.appInsights.trackTrace( {severityLevel:severityLevel,message:message,properties:properties});
    }
    catch (e) {
      console.log(e);
    }
  }
}

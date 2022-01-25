import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { init as sdkInit }  from 'azure-devops-extension-sdk';
import { isHostedAzureDevOps } from './utilities/azureDevOpsContextHelper';
import { getProjectId } from './utilities/servicesHelper';
import './css/main.scss';
import {  appInsights } from './utilities/external/telemetryClient';

import FeedbackBoardContainer, { FeedbackBoardContainerProps } from './components/feedbackBoardContainer';
// import { TelemetryClient } from './utilities/external/telemetryclient';

initializeIcons();
appInsights.trackEvent({name:"Startup",properties:{"version":"2"}});
appInsights.trackMetric({name:"startup Time",average:5});
// let client = TelemetryClient.getClient();

sdkInit()
  .then(() => {
    Promise.all([isHostedAzureDevOps(), getProjectId()]).then(res => {
      const feedbackBoardContainerProps: FeedbackBoardContainerProps = {
        isHostedAzureDevOps: res[0],
        projectId: res[1]
      };

      ReactDOM.render(
        <FeedbackBoardContainer {...feedbackBoardContainerProps}/>,
        document.getElementById('root') as HTMLElement,
      );
    });
  });

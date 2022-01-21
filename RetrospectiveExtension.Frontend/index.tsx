/// <reference types="vss-web-extension-sdk" />

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/main.scss';

import FeedbackBoardContainer, { FeedbackBoardContainerProps } from './components/feedbackBoardContainer';
import { TelemetryClient } from './utilities/external/telemetryclient';

initializeIcons();

// let client = TelemetryClient.getClient();

// client.trackEvent("hello there 12345");
const feedbackBoardContainerProps: FeedbackBoardContainerProps = {
  projectId: VSS.getWebContext().project.id
};

ReactDOM.render(
  <FeedbackBoardContainer {...feedbackBoardContainerProps}/>,
  document.getElementById('root') as HTMLElement,
);

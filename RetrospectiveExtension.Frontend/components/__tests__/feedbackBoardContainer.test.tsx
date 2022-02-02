import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { CommonServiceIds } from 'azure-devops-extension-api';
import { mocked } from 'ts-jest/utils';
import { v4 as uuid } from 'uuid';
import FeedbackBoardContainer, { FeedbackBoardContainerProps } from '../feedbackBoardContainer';
import clickWorkflowStateCallback from '../feedbackBoardContainer'

// const workflowStageMock = jest.requireMock('../../interfaces/workItem');

jest.mock('../workflowStage', () => {
    const mockWorkFlowStage = {
        display: 'test',
        value: 'Collect',
        isActive: true,
        clickEventCallback: jest.fn()
    }

    return mockWorkFlowStage;
}); 

// jest.mock()

// Mock Environment
jest.mock('../../config/environment', () => {
  const mockEnv = {
    CollaborationStateServiceUrl: "https://serviceurl",
  };

  return mockEnv;
});

// Mock Azure DevOps Extension SDK
jest.mock('azure-devops-extension-sdk', () => {
  const mockExtensionDataService = {
    getExtensionDataManager: jest.fn(),
  };

  const mockLocationService = {
    getResourceAreaLocation: jest.fn().mockImplementation(() => 'https://hosturl'),
  };

  const mockProjectPageService = {
    getProject: jest.fn().mockImplementation(() => {
      const mockProjectInfo = {
        id: "id",
        name: "name",
      };

      return mockProjectInfo;
    }),
  };

  const mockUser = {
    id: "userId",
  };

  const mockExtensionContext = {
    id: "contextId",
  };

  const mockSdk = {
    getService: jest.fn().mockImplementation(id => {
      if (id == CommonServiceIds.LocationService)
        return mockLocationService;
      else if (id == CommonServiceIds.ProjectPageService)
        return mockProjectPageService;
      else
        return mockExtensionDataService;
    }),
    getUser: jest.fn().mockImplementation(() => mockUser),
    getExtensionContext: jest.fn().mockImplementation(() => mockExtensionContext),
    getAccessToken: jest.fn().mockImplementation(() => 'token'),
  };

  return mockSdk;
});

// Mock Azure DevOps Extension API
jest.mock('azure-devops-extension-api/Core', () => {
  const mockCore = {
    CoreRestClient: {
      RESOURCE_AREA_ID: "resourceAreaId",
    },
  };

  return mockCore;
});

jest.mock('azure-devops-extension-api/Core/CoreClient', () => {});
jest.mock('azure-devops-extension-api/WebApi', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking/WorkItemTracking', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient', () => {
  const mockWorkItemTrackingClient = {
    WorkItemTrackingRestClient: {},
  };

  return mockWorkItemTrackingClient;
});

jest.mock('azure-devops-extension-api/Common', () => {
  const mockCommon = {
    getClient: jest.fn(),
  };

  return mockCommon;
});

const feedbackBoardContainerProps: FeedbackBoardContainerProps = {
  isHostedAzureDevOps: false,
  projectId: "1",
};

describe(`The Feedback Board Component`, () => {
  it.skip("Renders a Feedback Board Container Component", () => {
    const component = TestRenderer.create(
      <FeedbackBoardContainer {...feedbackBoardContainerProps} />
    );
  });
});
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import ActionItemDisplay, { ActionItemDisplayProps, ActionItemDisplayState } from '../actionItemDisplay';
import { CommonServiceIds } from 'azure-devops-extension-api';

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

let mockOnUpdateActionItem = jest.fn(() => { });

const defaultTestProps: ActionItemDisplayProps = {
    feedbackItemId: '101',
    feedbackItemTitle: 'Test Feedback Item Title',
    team: undefined,
    boardId: 'Test Board Id',
    boardTitle: 'Test Board Title',
    defaultIteration: '1',
    defaultAreaPath: '/testPath',
    actionItems: [],
    nonHiddenWorkItemTypes: [],
    allWorkItemTypes: [],
    allowAddNewActionItem: false,
    onUpdateActionItem: mockOnUpdateActionItem
}

describe('Action Item Display component', () => {
  it ('renders correctly when there are no action items.', () => {
    const tree = TestRenderer
      .create(<ActionItemDisplay {...defaultTestProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it ('renders correctly when action items exist', () => {
      
  })
});
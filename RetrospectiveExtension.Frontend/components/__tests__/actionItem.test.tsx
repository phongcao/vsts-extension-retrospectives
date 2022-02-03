import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import ActionItem, { ActionItemProps, ActionItemState } from '../actionItem';
import { CommonServiceIds } from 'azure-devops-extension-api';

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

const defaultTestProps: ActionItemProps = {
    feedbackItemId: '',
    boardId: '',
    actionItem: undefined,
    nonHiddenWorkItemTypes: [],
    allWorkItemTypes: [],
    areActionIconsHidden: false,
    shouldFocus: false,
    onUpdateActionItem: mockOnUpdateActionItem
}

describe('Action Item component', () => {
  it.skip ('renders correctly.', () => {
    const tree = TestRenderer
      .create(<ActionItem {...defaultTestProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
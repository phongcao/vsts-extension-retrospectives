import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import ActionItemDisplay, {
  ActionItemDisplayProps,
  ActionItemDisplayState,
} from "../actionItemDisplay";
import { CommonServiceIds } from "azure-devops-extension-api";
import { mockEnv } from "../__mocks__/config/environment";
import { mockCore } from "../__mocks__/azure-devops-extension-api/Core/Core";
import { mockCommon } from "../__mocks__/azure-devops-extension-api/Common/Common";
import { MockSDK } from "../__mocks__/azure-devops-extension-sdk/sdk";

jest.mock("../../config/environment", () => {
  return mockEnv;
});

// Mock Azure DevOps Extension SDK
jest.mock("azure-devops-extension-sdk", () => {
  return MockSDK;
});

// Mock Azure DevOps Extension API
jest.mock("azure-devops-extension-api/Core", () => {
  return mockCore;
});

jest.mock("azure-devops-extension-api/Core/CoreClient", () => {});
jest.mock("azure-devops-extension-api/WebApi", () => {});
jest.mock("azure-devops-extension-api/WorkItemTracking", () => {});
jest.mock(
  "azure-devops-extension-api/WorkItemTracking/WorkItemTracking",
  () => {}
);
jest.mock(
  "azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient",
  () => {
    const mockWorkItemTrackingClient = {
      WorkItemTrackingRestClient: {},
    };

    return mockWorkItemTrackingClient;
  }
);

jest.mock("azure-devops-extension-api/Common", () => {
  return mockCommon;
});

let mockOnUpdateActionItem = jest.fn(() => {});

const defaultTestProps: ActionItemDisplayProps = {
  feedbackItemId: "101",
  feedbackItemTitle: "Test Feedback Item Title",
  team: undefined,
  boardId: "Test Board Id",
  boardTitle: "Test Board Title",
  defaultIteration: "1",
  defaultAreaPath: "/testPath",
  actionItems: [],
  nonHiddenWorkItemTypes: [],
  allWorkItemTypes: [],
  allowAddNewActionItem: false,
  onUpdateActionItem: mockOnUpdateActionItem,
};

describe("Action Item Display component", () => {
  it("renders correctly when there are no action items.", () => {
    const tree = TestRenderer.create(
      <ActionItemDisplay {...defaultTestProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when action items exist", () => {});
});

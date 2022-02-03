import * as React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mocked } from 'jest-mock';
import { mockEnv } from '../__mocks__/config/environment';
import { mockCore } from '../__mocks__/node_modules/azure-devops-extension-api/Core';
import { mockWorkItemTrackingClient } from '../__mocks__/node_modules/azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient';
import { mockCommon } from '../__mocks__/node_modules/azure-devops-extension-api/Common';
import { MockSDK } from '../__mocks__/azure-devops-extension-sdk/sdk';
import {WorkflowPhase} from '../../interfaces/workItem';
import { v4 as uuid } from 'uuid';
import FeedbackItem from '../feedbackItem';
import FeedbackColumn from '../feedbackColumn';
import Dialog from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, TooltipOverflowMode } from 'office-ui-fabric-react';
Enzyme.configure({ adapter: new Adapter() });

// Base render constants, these may change if the FeedbackItem component is changed.
const childDialogCount = 5;

// Mock Environment
jest.mock('../../config/environment', () => { return mockEnv; });

// Mock Azure DevOps Extension SDK
jest.mock('azure-devops-extension-sdk', () => { return MockSDK; });

// Mock Azure DevOps Extension API
jest.mock('azure-devops-extension-api/Core', () => { return mockCore; });

jest.mock('azure-devops-extension-api/Core/CoreClient', () => {});
jest.mock('azure-devops-extension-api/WebApi', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking/WorkItemTracking', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient', () => {
  return mockWorkItemTrackingClient;
});

jest.mock('azure-devops-extension-api/Common', () => {
  return mockCommon;
});

const testTeamId = uuid();
const testBoardId = uuid();
const testWorkItemType = mocked({
  _links:[],
  color: '#cc293d',
  description: 'Test Work Item Type Description',
  fieldInstances: [],
  fields: [],
  icon: {
    id: uuid(),
    url: ''
  },
  isDisabled: true,
  name: 'Test Work Item Type Name',
  referenceName: 'Test Work Item Type Reference Name',
  states:[],
  transitions: {},
  url: '',
  xmlForm: '',
});
const testColumnUuidOne = uuid();
const testColumnUuidTwo = uuid();
const testColumnTwoTitle = 'Test Feedback Column Two';
const testUpvotes = Math.floor(Math.random() * 10);
const testGroupedItemProps = mocked({
  groupedCount: 0,
  isGroupExpanded: false,
  isMainItem: true,
  parentItemId: '',
  setIsGroupBeingDragged: jest.fn((isBeingDragged) => { }),
  toggleGroupExpand: jest.fn(() => {}),
  updateGroupCardStackHeight: jest.fn(() => {}),
});
const testFeedbackItem = mocked({
  id: uuid(),
  element: mocked({
    innerText:'Test Inner Text',
    innerHtml:'<div>Test Inner HTML</div>'
  }),
  boardId: testBoardId,
  title: 'Test Feedback Item',
  description: 'Test Feedback Item Description',
  columnId: testColumnUuidOne,
  upvotes: testUpvotes,
  voteCollection: { [uuid()]: testUpvotes },
  createdDate: new Date(),
  createdByProfileImage: 'testProfileImageSource',
  groupedItemProps: testGroupedItemProps,
  userIdRef: uuid(),
  timerSecs: Math.floor(Math.random() * 60),
  timerstate: false,
  timerId: uuid(),
});
const testColumnItem = mocked({
  feedbackItem: testFeedbackItem,
  actionItems: [],
  newlyCreated: false,
  showAddedAnimation: false,
  shouldHaveFocus: false,
  hideFeedbackItems: false,
});

const testColumnIds: string[] = [testColumnUuidOne, testColumnUuidTwo];
const testColumnsObj: any = {};
testColumnsObj[testColumnUuidOne] = {
  columnProperties:
  {
    id: testColumnUuidOne,
    title: 'Test Feedback Column One',
    iconClass: 'far fa-smile',
    accentColor: '#008000',
  },
  columnItems:
    [
      {
        feedbackItem: testFeedbackItem,
        actionItems: []
      },
    ]
};
testColumnsObj[testColumnUuidTwo] = {
  columnProperties:
  {
    id: TooltipOverflowMode,
    title: testColumnTwoTitle,
    iconClass: 'far fa-smile',
    accentColor: '#008100',
  },
  columnItems: []
};
const testColumns = mocked(testColumnsObj);

const testColumnProps = mocked({
  columns: testColumns,
  columnIds: testColumnIds,
  columnName: testColumns[testColumnUuidOne].columnProperties.title,
  columnId: testColumnUuidOne,
  accentColor: testColumns[testColumnUuidOne].columnProperties.accentColor,
  iconClass: testColumns[testColumnUuidOne].columnProperties.iconClass,
  workflowPhase: WorkflowPhase.Act,
  isDataLoaded: false,
  columnItems: testColumns[testColumnUuidOne].columnItems,
  team: {
    id: uuid(),
    identity:{
      customDisplayName:'Test Web API Identity Custom Display Name',
      descriptor:{
        identifier:'Test Identifier',
        identityType:'Test Identity Type'
      },
      id: uuid(),
      isActive: true,
      isContainer: false,
      masterId: uuid(),
      memberIds:[],
      memberOf:[],
      members:[],
      metaTypeId:5,
      properties:[],
      providerDisplayName:'Test Web API Identity Provider Display Name',
      resourceVersion:10,
      socialDescriptor:'Test Social Descriptor',
      subjectDescriptor:'Test Subject Descriptor',
      uniqueUserId:500,
    },
    name: 'Test Web API Team Name',
    description: 'Test Web API Team Description',
    identityUrl: '',
    projectId: uuid(),
    projectName: 'Test Azure DevOps Retrospectives Extension',
    url: ''
  },
  boardId: uuid(),
  boardTitle: 'Test Feedback Board',
  defaultActionItemIteration: testTeamId,
  defaultActionItemAreaPath: testTeamId,
  nonHiddenWorkItemTypes: [testWorkItemType],
  allWorkItemTypes: [testWorkItemType],
  isBoardAnonymous: false,
  shouldFocusOnCreateFeedback: false,
  hideFeedbackItems: false,
  onVoteCasted: jest.fn(() => { }),
  addFeedbackItems: jest.fn((
    columnId, columnItems, shouldBroadcast, newlyCreated, showAddedAnimation, shouldHaveFocus, hideFeedbackItems) => {

  }),
  removeFeedbackItemFromColumn: jest.fn((
    columnIdToDeleteFrom, feedbackItemIdToDelete, shouldSetFocusOnFirstAvailableItem) => { }),
  refreshFeedbackItems: jest.fn((feedbackItems, shouldBroadcast) => { }),
});

describe('Feedback Item', () => {
  test('Render a Feedback Item with no child Feedback Items.', () => {
    const testProps = FeedbackColumn.createFeedbackItemProps(
      testColumnProps, testColumnItem, true);

    const component = shallow(<FeedbackItem {...testProps} />);

    // Expect all child Dialogs
    const childDialogs = component.find(Dialog);
    expect(childDialogs).toHaveLength(childDialogCount);
    expect(childDialogs.findWhere((child) =>
      child.prop("hidden") === true)).toHaveLength(childDialogCount);

    /* Expect Default buttons for actions for each child dialog.
       Expect the Move Feedback Button to only exist for the second column. */
    const defaultButtons = component.findWhere((child) => child.type() === DefaultButton);
    expect(defaultButtons).toHaveLength(childDialogCount);
    expect(defaultButtons.findWhere((child) =>
      child.prop("className") === "move-feedback-item-column-button").
      html()).toContain(testColumnTwoTitle);

    // Expect the vote count to be propagated in multiple areas of the rendered component.
    const voteButtons = component.findWhere((child) =>
      child.prop("className") === "feedback-action-button feedback-add-vote");
    expect(voteButtons).toHaveLength(2);
    voteButtons.forEach((voteNode) => {
      expect(voteNode.html()).toContain(`Current vote count is ${testUpvotes}`);
    });
  });
});
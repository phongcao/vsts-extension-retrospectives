import * as React from 'react';
import moment from 'moment';
import { shallow, ShallowWrapper } from 'enzyme';
import { mocked } from 'jest-mock';
import { WorkflowPhase } from '../../interfaces/workItem';
import { v4 as uuid } from 'uuid';
import FeedbackItem from '../feedbackItem';
import FeedbackColumn from '../feedbackColumn';
import EditableDocumentCardTitle from '../editableDocumentCardTitle';
import Dialog from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, TooltipOverflowMode } from 'office-ui-fabric-react';
import ActionItemDisplay from '../actionItemDisplay';

// Base render constants, these may change if the FeedbackItem component is changed.
const childDialogCount = 5;

let testUpvotes = Math.floor(Math.random() * 10) + 1;

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
const testGroupedItemProps = mocked({
  groupedCount: 0,
  isGroupExpanded: false,
  isMainItem: true,
  parentItemId: '',
  setIsGroupBeingDragged: jest.fn((isBeingDragged) => { }),
  toggleGroupExpand: jest.fn(() => {}),
  updateGroupCardStackHeight: jest.fn((clientHeight) => {}),
});
const testFeedbackItem = mocked({
  id: uuid(),
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

const testChildFeedbackItem = mocked({
  id: uuid(),
  boardId: testBoardId,
  title: 'Test Child Feedback Item',
  description: 'Test Child Feedback Item Description',
  columnId: testColumnUuidOne,
  upvotes: 0,
  voteCollection: {},
  createdDate: new Date(),
  createdByProfileImage: 'testProfileImageSource',
  groupedItemProps: testGroupedItemProps,
  userIdRef: uuid(),
  timerSecs: Math.floor(Math.random() * 60),
  timerstate: false,
  timerId: uuid(),
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
      {
        feedbackItem: testChildFeedbackItem,
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
  boardId: testBoardId,
  boardTitle: 'Test Feedback Board',
  defaultActionItemIteration: testTeamId,
  defaultActionItemAreaPath: testTeamId,
  nonHiddenWorkItemTypes: [testWorkItemType],
  allWorkItemTypes: [testWorkItemType],
  isBoardAnonymous: false,
  shouldFocusOnCreateFeedback: false,
  hideFeedbackItems: false,
  onVoteCasted: jest.fn(() => {}),
  addFeedbackItems: jest.fn((
    columnId, columnItems, shouldBroadcast, newlyCreated, showAddedAnimation, shouldHaveFocus, hideFeedbackItems) => {
  }),
  removeFeedbackItemFromColumn: jest.fn((
    columnIdToDeleteFrom, feedbackItemIdToDelete, shouldSetFocusOnFirstAvailableItem) => { }),
  refreshFeedbackItems: jest.fn((feedbackItems, shouldBroadcast) => { }),
});

describe('Feedback Item', () => {
  it('can be rendered with no child Feedback Items.', () => {
    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes);

    /* Expect no Expand Feedback Group button */
    const expandButton = component.findWhere(
      (child) => child.prop("className") === "feedback-expand-group");
    expect(expandButton).toMatchObject({});
  });

  it('can be rendered with collapsed child Feedback Items.', () => {
    testGroupedItemProps.groupedCount = 1;
    testGroupedItemProps.isMainItem = true;
    testFeedbackItem.groupedItemProps = testGroupedItemProps;

    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes);

    /* Expect Expand Feedback Group button */
    const expandButton = component.findWhere(
      (child) => child.prop("className") === "feedback-expand-group");
    expect(expandButton).toBeDefined();
    expect(expandButton.prop("aria-label")).toBe(
      "Expand Feedback Group button. Group has 2 items.");
  });

  it('can be rendered with expanded child Feedback Items.', () => {
    testGroupedItemProps.groupedCount = 1;
    testGroupedItemProps.isMainItem = true;
    testGroupedItemProps.isGroupExpanded = true;
    testFeedbackItem.groupedItemProps = testGroupedItemProps;

    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes);

    /* Expect Expand Feedback Group button */
    const expandButton = component.findWhere(
      (child) => child.prop("className") === "feedback-expand-group");
    expect(expandButton).toBeDefined();
    expect(expandButton.prop("aria-label")).toBe(
      "Collapse Feedback Group button. Group has 2 items.");
  });

  it('can have zero upvotes.', () => {
    testUpvotes = 0;
    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes);
  });

  it('can have more than zero upvotes.', () => {
    testUpvotes = Math.floor(Math.random() * 10) + 1;
    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes);
  });

  it('has voting enabled during the Vote stage.', () => {
    testColumnProps.workflowPhase = WorkflowPhase.Vote;
    testUpvotes = 0;
    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes);
  });

  it('has voting disabled during the Collect stage.', () => {
    testColumnProps.workflowPhase = WorkflowPhase.Collect;
    testUpvotes = 0;
    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes, true);

    console.log(component.debug());
  });

  it('has voting disabled during the Group stage.', () => {
    testColumnProps.workflowPhase = WorkflowPhase.Group;
    testUpvotes = 0;
    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes, true);

    console.log(component.debug());
  });

  it('has voting disabled during the Act stage.', () => {
    testColumnProps.workflowPhase = WorkflowPhase.Act;
    testUpvotes = 0;
    const component = createBasicFeedbackItem(testUpvotes);
    verifyBasicLayout(component, testUpvotes);

    console.log(component.debug());
  });
});

const createBasicFeedbackItem = (voteCount: number) => {
  testFeedbackItem.upvotes = voteCount;
  testFeedbackItem.voteCollection = { [uuid()]: voteCount };
  const testProps = FeedbackColumn.createFeedbackItemProps(
    testColumnProps, testColumnItem, true);

  const wrapper = shallow(
    <FeedbackItem {...testProps} groupedItemProps={testGroupedItemProps} />);
  return wrapper.children().dive();
};

const verifyBasicLayout = (
  component: ShallowWrapper,
  currentUpvoteCount: number,
  isVotingDisabled = false) => {
  // Expect all child Dialogs to be hidden.
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
  if(isVotingDisabled){
    expect(voteButtons).toHaveLength(0);
  }
  else{
    expect(voteButtons).toHaveLength(2);
  voteButtons.forEach((voteNode) => {
    expect(voteNode.html()).toContain(`Current vote count is ${currentUpvoteCount}`);
  });
  expect(component.findWhere((child) =>
    child.prop("title") === "Vote").
      findWhere((nestedChild) =>
        nestedChild.prop("className") === "feedback-upvote-count").text()).
    toEqual(` ${currentUpvoteCount}`);
  }

  // Expect basic values of the Feedback Item to be propagated in multiple areas of the rendered component.
  expect(component.findWhere((child) =>
    child.prop("className") === "anonymous-created-date").text()).
    toEqual(moment(testFeedbackItem.createdDate).format('MMM Do, YYYY h:mm a'));

  expect(component.findWhere((child) =>
    child.prop("className") === "card-id").text()).
    toEqual(`#${testColumns[testColumnUuidOne].columnItems.findIndex(
      (columnItem: { feedbackItem: { id: string; }; }) =>
        columnItem.feedbackItem.id === testFeedbackItem.id)}`);

  expect(component.findWhere((child) =>
  child.type() === EditableDocumentCardTitle).prop("title")).
  toEqual(testFeedbackItem.title);

  const actionItemDisplay = component.findWhere((child) =>
    child.type() === ActionItemDisplay);
  if(testColumnProps.workflowPhase != WorkflowPhase.Act) {
    expect(actionItemDisplay).toHaveLength(0);
    expect(component.findWhere((child) => child.prop("title") === "Timer")).toHaveLength(0);
  } else {
    expect(actionItemDisplay.prop("feedbackItemId")).toEqual(testFeedbackItem.id);
    expect(actionItemDisplay.prop("feedbackItemTitle")).toEqual(testFeedbackItem.title);
    expect(actionItemDisplay.prop("boardId")).toEqual(testBoardId);
    expect(actionItemDisplay.prop("boardTitle")).toEqual(testColumnProps.boardTitle);

    expect(component.findWhere((child) =>
      child.prop("title") === "Timer").html()).
      toContain(`${testFeedbackItem.timerSecs} (seconds)`);
  }
};
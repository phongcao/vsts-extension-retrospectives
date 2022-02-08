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
const voteButtonCount = 2;

let testUpvotes = 0;
let testGroupedCount = 0;
let testGroupParentId = '';

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
  groupedCount: testGroupedCount,
  isGroupExpanded: false,
  isMainItem: true,
  parentItemId: testGroupParentId,
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

const testChildGroupedItemProps = mocked({
  groupedCount: testGroupedCount,
  isGroupExpanded: false,
  isMainItem: false,
  parentItemId: testGroupParentId,
  setIsGroupBeingDragged: jest.fn((isBeingDragged) => { }),
  toggleGroupExpand: jest.fn(() => {}),
  updateGroupCardStackHeight: jest.fn(() => {}),
});
const testChildFeedbackItem = mocked({
  id: uuid(),
  element: mocked({
    innerText:'Test Inner Text',
    innerHtml:'<div>Test Inner HTML</div>'
  }),
  boardId: testBoardId,
  title: 'Test Child Feedback Item',
  description: 'Test Child Feedback Item Description',
  columnId: testColumnUuidOne,
  upvotes: 0,
  voteCollection: {},
  createdDate: new Date(),
  createdByProfileImage: 'testProfileImageSource',
  groupedItemProps: testChildGroupedItemProps,
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
    const testProps = FeedbackColumn.createFeedbackItemProps(
      testColumnProps, testColumnItem, true);

    const wrapper = shallow(<FeedbackItem {...testProps} />);
    const component = wrapper.children().dive();
    verifyBasicLayout(component, testUpvotes);
  });

  it('can be rendered with child Feedback Items.', () => {
    const testGroupParentId = testFeedbackItem.id;
    const testProps = FeedbackColumn.createFeedbackItemProps(
      testColumnProps, testColumnItem, true);

    const wrapper = shallow(<FeedbackItem {...testProps} />);
    const component = wrapper.children().dive();
    verifyBasicLayout(component, testUpvotes);

    console.log(component.debug());
  });

  it('can have zero upvotes.', () => {
    testUpvotes = 0;
    testFeedbackItem.upvotes = testUpvotes;
    testFeedbackItem.voteCollection = { [uuid()]: testUpvotes };

    const testProps = FeedbackColumn.createFeedbackItemProps(
      testColumnProps, testColumnItem, true);

    const wrapper = shallow(<FeedbackItem {...testProps} />);
    const component = wrapper.children().dive();
    verifyBasicLayout(component, testUpvotes);
  });

  it('can have more than zero upvotes.', () => {
    testUpvotes = Math.floor(Math.random() * 10) + 1;
    testFeedbackItem.upvotes = testUpvotes;
    testFeedbackItem.voteCollection = { [uuid()]: testUpvotes };
    const testProps = FeedbackColumn.createFeedbackItemProps(
      testColumnProps, testColumnItem, true);

    const wrapper = shallow(<FeedbackItem {...testProps} />);
    const component = wrapper.children().dive();
    verifyBasicLayout(component, testUpvotes);
  });
});

  describe('Workflow Phase Tests', () => {
    test('Verify isDeleteItemConfirmationDialogHidden, isMarkedForDeletion, and isLocalDelete are set to true when deletion is selected.', () => {});

    test('Verify the Add and Remove Votes buttons are enabled during WorkflowPhase.Vote.', () => {});

    test('Verify the Add and Remove Votes buttons are disabled during WorkflowPhases which are not WorkflowPhase.Vote', () => {});

    test('Verify when either the Add or Remove Buttons are clicked, showVotedAnimation is set to true, the buttons are disabled, and onVoteCasted is called.', () => {});

    test('Verify during WorkflowPhase.Act, the ActionItemDisplay component is a rendered child component.', () => {});

    test('Verify during WorkflowPhase.Act, the Timer button is rendered.', () => {});
  });

  describe('Grouped Feedback Tests', () => {
    test('Verify a child Feedback Item cannot be upvoted or downvoted.', () => {});

    test('Verify a parent Feedback Item can be upvoted or downvoted.', () => {});

    test('Verify a child Feedback Item can be deleted without deleting the parent Feedback Item', () => {});

    test('Verify groupItemCount is incremented when child Feedback Items are added.', () => {});

    test('Verify groupItemCount is decremented when child Feedback Items are removed.', () => {});

    test('Verify the feedback-expand-group button renders when isMainItem is true and isNotGrouped item is false.', () => {});

    test('Verify the feedback-expand-group button does not render when isMainItem is false and isNotGroupedItem is true.', () => {});

    test('Verify the feedback-expand-group button\'s text changes as the number of child Feedback Items changes.', () => {});
  });

  describe('Mobile Actions Dialog Tests', () => {
    test('Verify when isMobileFeedbackItemActionsDialogHidden is true, the Mobile Actions Dialog has hidden set to true.', () => {});

    test('Verify when isMobileFeedbackItemActionsDialogHidden is false, the Mobile Actions Dialog has hidden set to false.', () => {});

    test('Verify when the Close button is clicked, isMobileFeedbackItemActionsDialogHidden is set to true and the Mobile Actions Dialog has hidden is set to true.', () => {});
  });

  describe('Group Feedback Dialog Tests', () => {
    test('Verify when isGroupFeedbackItemDialogHidden is true, the Group Feedback Dialog has hidden set to true.', () => {});

    test('Verify when isGroupFeedbackItemDialogHidden is false, the Group Feedback Dialog has hidden set to false.', () => {});

    test('Verify when the Close button is clicked, isGroupFeedbackItemDialogHidden is set to true and the Group Feedback Dialog has hidden is set to true.', () => {});
  });

  describe('Remove Feedback from Group Dialog Tests', () => {
    test('Verify when isRemoveFeedbackItemFromGroupConfirmationDialogHidden is true, the Remove Feedback from Group Dialog has hidden set to true.', () => {});

    test('Verify when isRemoveFeedbackItemFromGroupConfirmationDialogHidden is false, the Remove Feedback from Group Dialog has hidden set to false.', () => {});

    test('Verify when the Cancel button is clicked, isRemoveFeedbackItemFromGroupConfirmationDialogHidden is set to true and the Remove Feedback from Group Dialog has hidden is set to true.', () => {});
  });

const verifyBasicLayout = (component: ShallowWrapper, currentUpvoteCount: number) => {
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
  expect(voteButtons).toHaveLength(voteButtonCount);
  voteButtons.forEach((voteNode) => {
    expect(voteNode.html()).toContain(`Current vote count is ${currentUpvoteCount}`);
  });
  expect(component.findWhere((child) =>
    child.prop("title") === "Vote").
      findWhere((nestedChild) =>
        nestedChild.prop("className") === "feedback-upvote-count").text()).
    toEqual(` ${currentUpvoteCount}`);

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
  expect(actionItemDisplay.prop("feedbackItemId")).toEqual(testFeedbackItem.id);
  expect(actionItemDisplay.prop("feedbackItemTitle")).toEqual(testFeedbackItem.title);
  expect(actionItemDisplay.prop("boardId")).toEqual(testBoardId);
  expect(actionItemDisplay.prop("boardTitle")).toEqual(testColumnProps.boardTitle);

  expect(component.findWhere((child) =>
    child.prop("title") === "Timer").html()).
    toContain(`${testFeedbackItem.timerSecs} (seconds)`);
};
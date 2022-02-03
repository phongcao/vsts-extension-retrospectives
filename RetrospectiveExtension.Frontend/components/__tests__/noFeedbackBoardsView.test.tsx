import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import NoFeedbackBoardsView, { NoFeedbackBoardsViewProps } from '../noFeedbackBoardsView';

let mockOnCreateBoardClick = jest.fn(() => { });

const defaultTestProps: NoFeedbackBoardsViewProps = {
  onCreateBoardClick: mockOnCreateBoardClick
}

describe('No Feedback Boards View component', () => {
  it ('renders correctly.', () => {
    const tree = TestRenderer
      .create(<NoFeedbackBoardsView {...defaultTestProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
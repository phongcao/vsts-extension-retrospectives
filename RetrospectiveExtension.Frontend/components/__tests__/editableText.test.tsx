import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import EditableText, { EditableTextProps } from '../editableText';

let mockOnSave = jest.fn(() => { });

let defaultTestProps: EditableTextProps = {
  text: '',
  isChangeEventRequired: false,
  onSave: mockOnSave
}

describe('Editable Text Component', () => {

  it ('renders correctly.', () => {
    const tree = TestRenderer
      .create(<EditableText {...defaultTestProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it ('updates text appropriately.', () => {
    let testTextProps = defaultTestProps;
    testTextProps['text'] = 'Test Text';
    
    const tree = TestRenderer
      .create(<EditableText {...testTextProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
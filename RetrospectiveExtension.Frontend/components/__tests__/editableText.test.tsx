import * as React from 'react';
import Enzyme, { shallow } from 'enzyme';
// import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
import EditableText, { EditableTextProps } from '../editableText';

Enzyme.configure({ adapter: new Adapter() });

let mockOnSave = jest.fn(() => { });

let defaultTestProps: EditableTextProps = {
  text: '',
  isChangeEventRequired: false,
  onSave: mockOnSave
}

describe('Editable Text Component', () => {

  it.skip('renders correctly.', () => {
    const wrapper = shallow(<EditableText {...defaultTestProps} />);
    const component = wrapper.children().dive();
    //expect(toJson(component)).toMatchSnapshot();
  });

  it.skip('updates text appropriately.', () => {
    let testTextProps = defaultTestProps;
    testTextProps['text'] = 'Test Text';

    const wrapper = shallow(<EditableText {...defaultTestProps} />);
    const component = wrapper.children().dive();
    //expect(toJson(wrapper)).toMatchSnapshot();
  });
});
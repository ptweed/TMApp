import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import IconButton from '../IconButton'

jest.mock('@expo/vector-icons', () => ({
  FontAwesome5: ''
}))

describe('IconButton Component', () => {
  it('IconButton renders correctly active', () => {
    const onPressEvent = jest.fn();
    const formB = render(<IconButton iconName='plus' iconColor='#039BE5' iconSize={20} disabled={true} onPress={onPressEvent} />).toJSON();
    expect(formB).toMatchSnapshot();
  });
  
  it('IconButton fires onPress event successfully', () => {
    const onPressEvent = jest.fn();
    const { getByTestId, getByText, queryByTestId } = render(<IconButton iconName='plus' iconColor='#039BE5' iconSize={20} 
        disabled={true} onPress={onPressEvent} />)
    const button = getByTestId("topLevelButtonContainer")
    fireEvent.press(button)
    expect(onPressEvent.mock.calls.length).toBe(1);
    expect(button).toMatchSnapshot();
  });
});
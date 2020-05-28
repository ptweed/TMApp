import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import SimpleButton from '../SimpleButton'
import Captions from '../../utils/Captions'

describe('SimpleButton Component', () => {
  it('SimpleButton renders correctly active', () => {
    const onPressEvent = jest.fn();
    const formB = render(<SimpleButton title={Captions.taskCreate} textColor='#039BE5' textSize={20} onPress={onPressEvent} />).toJSON();
    expect(formB).toMatchSnapshot();
  });

  it('SimpleButton fires onPress event successfully', () => {
    const onPressEvent = jest.fn();
    const { getByTestId, getByText, queryByTestId } = render(<SimpleButton title={Captions.taskCreate} textColor='#039BE5' 
        textSize={20} onPress={onPressEvent} />)
    const button = getByTestId("topLevelButtonContainer")
    fireEvent.press(button)
    expect(onPressEvent.mock.calls.length).toBe(1);
    expect(button).toMatchSnapshot();
  });

});
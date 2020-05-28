import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import FormButton from '../FormButton'
import Captions from '../../utils/Captions'

describe('FormButton Component', () => {
  it('FormButton renders correctly active', () => {
    const onPressEvent = jest.fn();
    const formB = render(<FormButton buttonType='outline' title={Captions.taskCreate} buttonColor='#039BE5' disabled={false} 
                                  loading={false} onPress={onPressEvent} />).toJSON();
    expect(formB).toMatchSnapshot();

  });

  it('FormButton renders correctly disabled', () => {
    const onPressEvent = jest.fn();
    const formB = render(<FormButton buttonType='outline' title={Captions.taskCreate} buttonColor='#039BE5' disabled={true} 
                                  loading={false} onPress={onPressEvent} />).toJSON();
    expect(formB).toMatchSnapshot();

  });

  it('FormButton renders correctly active loading', () => {
    const onPressEvent = jest.fn();
    const formB = render(<FormButton buttonType='outline' title={Captions.taskCreate} buttonColor='#039BE5' disabled={false} 
                                  loading={true} onPress={onPressEvent} />).toJSON();
    expect(formB).toMatchSnapshot();

  });

  it('FormButton fires onPress event successfully', () => {
    const onPressEvent = jest.fn();
    const { getByTestId, getByText, queryByTestId } = render(<FormButton buttonType='outline' title={Captions.taskCreate} buttonColor='#039BE5' disabled={false} 
                                  loading={true} onPress={onPressEvent} />)
    const button = getByTestId("topLevelButtonContainer")
    fireEvent.press(button)
    expect(onPressEvent.mock.calls.length).toBe(1);
    expect(button).toMatchSnapshot();
  });

});
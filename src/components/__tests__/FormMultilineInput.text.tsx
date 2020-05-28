import React from 'react'
import { render } from 'react-native-testing-library'
import Captions from '../../utils/Captions'
import FormMultilineInput from '../FormMultilineInput'

jest.mock('@expo/vector-icons', () => ({
    FontAwesome5: ''
}))
  
describe('FormMultilineInput Component', () => {
  it('FormMultilineInput renders correctly', () => {

    const formI = render(<FormMultilineInput
        name='task'
        placeholder={Captions.taskPlaceholder}
        autoCapitalize='none'
        iconName='edit'
        iconColor='#2C384A'
/>
    ).toJSON();
    expect(formI).toMatchSnapshot();

  });

});
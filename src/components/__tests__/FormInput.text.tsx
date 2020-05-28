import React from 'react'
import { render } from 'react-native-testing-library'
import Captions from '../../utils/Captions'
import FormInput from '../FormInput'

jest.mock('@expo/vector-icons', () => ({
    FontAwesome5: ''
}))
  
describe('FormInput Component', () => {
  it('FormInput renders correctly', () => {

    const formI = render(<FormInput
        name='Enter task'
        placeholder={Captions.taskPlaceholder}
        iconName='edit'
        iconColor='#2C384A'
/>
    ).toJSON();
    expect(formI).toMatchSnapshot();

  });

});
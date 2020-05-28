import React from 'react'
import { render } from 'react-native-testing-library'
import LandingLogo from '../LandingLogo'

jest.mock('@expo/vector-icons', () => ({
    FontAwesome5: ''
}))
  
describe('LandingLogo Component', () => {
  it('LandingLogo renders correctly', () => {

    const formI = render(<LandingLogo/>).toJSON();
    expect(formI).toMatchSnapshot();

  });

});
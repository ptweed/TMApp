import React from 'react'
import { render } from 'react-native-testing-library'
import TopHeader from '../TopHeader'

jest.mock('@expo/vector-icons', () => ({
    FontAwesome5: ''
}))
  
describe('TopHeader Component', () => {
  it('TopHeader renders correctly', () => {
    const onPressEvent = jest.fn();
    const topHeader = render(<TopHeader isConneced={true} onPress={onPressEvent} />).toJSON();
    expect(topHeader).toMatchSnapshot();
  });

});
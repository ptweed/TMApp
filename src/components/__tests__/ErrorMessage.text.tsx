import React from 'react'
import { render } from 'react-native-testing-library'
import ErrorMessage from '../ErrorMessage'

describe('ErrorMessage Component', () => {
  it('Error Message renders error correctly', () => {
    let errorMessage = render(<ErrorMessage errorValue="test error" />)
    const errorResult =  errorMessage.queryByText("test error")
    expect(errorResult).toBeTruthy()
  });

});
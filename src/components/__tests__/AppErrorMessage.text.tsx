import React from 'react'
import { render } from 'react-native-testing-library'
import AppErrorMessage from '../AppErrorMessage'
import Captions from '../../utils/Captions'

describe('ErrorMessage Component', () => {
  it('Error Message renders error correctly - non network error', () => {
    let errorMessage = render(<AppErrorMessage errorValue="test error" />)
    const errorResult =  errorMessage.queryByText(Captions.errorApology + ":\n\n" + "test error")
    expect(errorResult).toBeTruthy()
  });

  it('Error Message renders error correctly -  network error', () => {
    let errorMessage = render(<AppErrorMessage errorValue="Network Error test" />)
    const errorResult =  errorMessage.queryByText(Captions.infrastructureError)
    expect(errorResult).toBeTruthy()
  });

});
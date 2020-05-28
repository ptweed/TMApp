import React from 'react';
import AppContainer from './src/navigation';
import Amplify from 'aws-amplify'
import {YellowBox} from 'react-native'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './src/slices'
import { getEnvConfig} from './src/utils/Config'

// Set this flag to 'dev' for AWS Amplify dev or 'prod' for AWS Amplify prod environment.
// The AWS Amplify configuration is defined in ./src/utils/EnvConfig.js.
// See EnvConfig.example.js for a template to use.  The eastiest way to generate the configuration settings 
// is to configure your Amplify environments using Auth and GraphQL APIs for two environments (dev and prod)
// and copy the respective configurations from the ./aws-exports.js file that Amplify generates for you
// when you configure one of those environments

const env = 'dev' // 'dev' or 'prod'
console.log('Running in env: ' + env )
console.log('---------------------------')

Amplify.configure({
  ...getEnvConfig(env),
  Analytics: {
    disabled: true,
  },
})

const store = configureStore({ reducer: rootReducer })

export default function App() {

  React.useEffect(() => {
    console.log('App loaded')
    YellowBox.ignoreWarnings(['Warning:', 'Cannot connect', 'Non-serializable'])
  });


  return <Provider store={store}><AppContainer /></Provider>
}


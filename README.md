# Task Master - Organization on the go

<p align="center">
  <img width="100" height="100" src="assets/icon_small.png">
</p>

# Table of Contents

1. [Overview](##Overview)
2. [Primary Technologies](##Primary-Technologies)
3. [Install](##Install)
4. [AWS Amplify Environment Configuration](##AWS-Amplify-Environment-Configuration)

## Overview

This is a demonstration app to show capabilities of developing a React Native cross platform mobile application.  It is a simple task management app.  The goal was to use various capabilities that exist in most apps that manage data.

1. Cloud user management 
    - Login
    - Logout
    - Sign Up
    - Forgot Password
2. State management
3. Navigation
    - Tabbed
    - Modal popup
    - Splash screen
4. Cloud data storage
    - Owners view their own data but not other people's data

This project was bootstrapped with [Expo](https://github.com/expo/expo).

<!-- ## Table of Contents

* [Technologies](##Technologies) -->

## Primary Technologies
The following technologies are used in this app. 

- [React Native](https://reactnative.dev/) - React Native for cross platform mobile development 
- [Expo](https://github.com/expo/expo) - React Native project bootstrapping
- [AWS Amplify](https://aws.amazon.com/amplify/) - Amazon Web Services Amplify for secure, scalable mobile apps (using Cognito for `auth`, `GraphQL` for querying and mutating data stored in `DynamoDB`)
- [React Navigation](https://reactnavigation.org/) - navigation
- [Redux Toolkit](https://redux-toolkit.js.org/) - application state management 
- [Formik](https://jaredpalmer.com/formik/) - form management
- [Yup](https://github.com/jquense/yup) - form validation
- [React Native Testing Library](https://github.com/callstack/react-native-testing-library) - Lightweight React Native testing utilities
- [Jest](https://jestjs.io/docs/en/getting-started.html) - testing framework

## Install
Pull the code and run the following command to install all dependencies

```sh
yarn install
```
> You will need to ensure you have your environment and cli tools configured for [Expo CLI](https://docs.expo.io/) and [AWS Amplify CLI](https://github.com/aws-amplify/amplify-cli)

## AWS Amplify Environment Configuration 
Ensure you follow the [AWS Amplify](https://aws-amplify.github.io/docs/js/tutorials/building-react-native-apps/) guide on generating the Amazon Web Services backend `auth` and `GraphQL` services.

Expo [release channel](https://docs.expo.io/distribution/release-channels/) configuration was not working for me, so given this is a demo app using Expo I opted for a coded environment flag (env) set in the App.js file.  

Set the env flag to 'dev' for AWS Amplify dev or 'prod' for AWS Amplify prod environment.  The AWS Amplify configuration is defined in `./src/utils/EnvConfig.js` - a file you will need to create.  `EnvConfig.example.js` is provided for a template to use.

The eastiest way to generate the configuration settings is to configure your Amplify environments using Auth and GraphQL APIs for two environments (dev and prod).  When each environment is generated copy the respective configurations from the `./aws-exports.js` file.
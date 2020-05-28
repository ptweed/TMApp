module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json',
        diagnostics: {
          warnOnly: true,
        },
      },
    },
    // transform: {
    // //   '^.+\\.(js)$': 'babel-jest',
    //   "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/jest-expo-ts/preprocessor.js"
    // },
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/', '<rootDir>/.history/', '/node_modules/'],
    cacheDirectory: '.jest/cache',
    // transformIgnorePatterns: ['node_modules/@bam.tech/react-native-text-input'],
    // transformIgnorePatterns: [
    //     'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)',
    //   ],
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|TMApp|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base|formik|yup|aws-amplify|@expo/.*|react-native-vector-icons|react-native-elements|@expo/vector-icons|react-native-elements)",
        // "node_modules/react-native-elements",
        // "node_modules/@aws-sdk/.*",
        // "node_modules/redux",
        ],
    // setupFiles: ['./src/utils/test.setup.tsx'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };

    
// module.exports = {
//     "haste": {
//       "defaultPlatform": "ios",
//       "platforms": ["android", "ios", "native"],
//       "providesModuleNodeModules": ["react-native"]
//     },
//     "moduleNameMapper": {
//       "^[./a-zA-Z0-9$_-]+\\.(bmp|gif|jpg|jpeg|png|psd|svg|webp)$":
//         "RelativeImageStub",
//       "^React$": "<rootDir>/node_modules/react",
//       "^react$": "<rootDir>/node_modules/react",
//       "^react-native$": "<rootDir>/node_modules/react-native",
//       "^react-native/(.*)$": "<rootDir>/node_modules/react-native/$1",
//       "^[./a-zA-Z0-9$_-]+\\.(ttf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$":
//         "RelativeImageStub",
//       "^react-native-vector-icons$": "<rootDir>/node_modules/@expo/vector-icons"
//     },
//     "modulePathIgnorePatterns": [
//       "<rootDir>/node_modules/react-native/Libraries/react-native/"
//     ],
//     "transformIgnorePatterns": [
//       "node_modules/(?!((jest-)?react-native|react-clone-referenced-element|expo(nent)?|@expo(nent)?/.*|react-navigation))"
//     ],
//     "setupFiles": [
//       "<rootDir>/node_modules/react-native/jest/setup.js",
//       "<rootDir>/node_modules/jest-expo/src/setup.js"
//     ],
//     "testEnvironment": "node",
//     "moduleFileExtensions": ["js", "jsx", "ts", "tsx"],
//     "transform": {
//       "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
//       "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/jest-expo-ts/preprocessor.js"
//     },
//     "testMatch": [
//       "**/__tests__/**/*.js?(x)",
//       "**/?(*.)(spec|test).js?(x)",
//       "**/__tests__/**/*.ts?(x)",
//       "**/?(*.)(spec|test).ts?(x)"
//     ]
//   };
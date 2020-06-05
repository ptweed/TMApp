import React, { Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Input, Alert } from 'react-native'
import SimpleButton from '../components/SimpleButton'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Auth, a } from 'aws-amplify'
import Captions from '../utils/Captions'
import * as SecureStore from 'expo-secure-store'
import { CheckBox, withTheme } from 'react-native-elements'
import * as LocalAuthentication from 'expo-local-authentication'
import BioMetricButton from '../components/BioMetricButton' 

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label(Captions.emailLabel)
      .email(Captions.emailValidation)
      .required(Captions.emailRequired),
    password: Yup.string()
      .label(Captions.passwordLabel)
      .required(Captions.passwordRequired)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        Captions.passwordValidation
      ),
  })

const APP_KEY = 'TMAppCredentials'


export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {error: '', useTouchID: false, email: '', password: '', 
            loggingInBiometrics: false, touchIDEnabled: false, hasStoredCreds:false,
            biometricType: 'fingerprint', biometricIcon: 'fingerprint'}
      }

    _isMounted = false

    signIn = async (values, {setSubmitting}) => {
        if (this._isMounted) {
            setSubmitting(true)
            const { email, password, useTouchID } = values
            const creds = { userName: email, password: password, useTouchID: useTouchID }
            console.log('TMAppCredentials: ' + JSON.stringify(creds))
            await SecureStore.setItemAsync(APP_KEY, JSON.stringify(creds)).catch((reason) => {throw {message:'logging in STORAGE promise error: ' + reason } })

            this.login(email, password)
            setSubmitting(false)
        }
    }

    login = async (email, password) => {
        if (this._isMounted) {
            try {
                this.setState({error: '', loggingInBiometrics: true })
                // console.log('email: ' + email)
                // console.log('password: ' + password)
                const user = await Auth.signIn(email, password)
                this.setState({loggingInBiometrics: false})
                user && this.props.parentNav.navigate('App')

            } catch (err) {
                this.setState({loggingInBiometrics: false})
    
                if (typeof err === "string") {
                    console.log('logging in error: ' + err)
                } else {
                    console.log('logging in error: ' + JSON.stringify(err))
                    if (err.code === 'UserNotConfirmedException') {
                        this.setState({error: Captions.accountNotVerifiedYet})
                    } else if (err.code === 'PasswordResetRequiredException') {
                        this.setState({error: Captions.existingUser})
                    } else if (err.code === 'NotAuthorizedException') {
                        this.setState({error: Captions.incorrectEmailOrPassword})
                    } else if (err.code === 'UserNotFoundException') {
                        this.setState({error: Captions.userDoesNotExist})
                    } else {
                        this.setState({error: err.code})
                    }
                }
            }
        }

    }

    getStoredCredentials = async () => {
        let value = await SecureStore.getItemAsync(APP_KEY)
        // console.log('getStoredCredentials value: ' + value)
        if (value !== null ) {
            this.setState({error: '', useTouchID: JSON.parse(value).useTouchID, email: JSON.parse(value).userName, password: JSON.parse(value).password, hasStoredCreds: true })
        } else {
            this.setState({hasStoredCreds: false}) 
        }
    }

    storeUseTouchID = async (usingTouchID) => {
        console.log('storeUseTouchID value: ' + usingTouchID)
        let value = await SecureStore.getItemAsync(APP_KEY)
        // console.log('retrieved useTouchID value: ' + value)
        if (value !== null ) {
            
            let valueJSON = JSON.parse(value)
            let creds = {...valueJSON, useTouchID: usingTouchID}
            await SecureStore.setItemAsync(APP_KEY, JSON.stringify(creds)).catch((reason) => {throw {message:'logging in STORAGE promise error: ' + reason } })
        } else {
            const creds = { userName: '', password: '', useTouchID: usingTouchID }
            await SecureStore.setItemAsync(APP_KEY, JSON.stringify(creds)).catch((reason) => {throw {message:'logging in STORAGE promise error: ' + reason } })
        }
    }

    loginBiometrics = async () => {
        if (this._isMounted) {
            let compatible = await LocalAuthentication.hasHardwareAsync()
            let biometricRecords = await LocalAuthentication.isEnrolledAsync()
            this.setState({touchIDEnabled: compatible && biometricRecords})
            await this.getStoredCredentials()
            console.log('has stored creds: ' + this.state.hasStoredCreds)

            console.log('about to get auth types...')
            console.log('compatible? ' + compatible)
            console.log('biometricRecords? ' + biometricRecords)

            if (compatible && biometricRecords) {
                console.log('about to get auth types...2')
                let authTypes = await LocalAuthentication.supportedAuthenticationTypesAsync()
                console.log('biometric auth types: ' + authTypes.toString())
    
                if (authTypes[0] === 1) {
                    this.setState({biometricType: 'fingerprint', biometricIcon: 'fingerprint'})
                } else {
                    this.setState({biometricType: 'facial recognition', biometricIcon: 'face-recognition'})
                }
            }

            if (this.state.touchIDEnabled && this.state.useTouchID && this.state.hasStoredCreds.toString()) {
                console.log('login biometric attempt')
                let result = await LocalAuthentication.authenticateAsync({promptMessage: "Sign In"});
                console.log('login biometric result: ' + JSON.stringify(result))
                if (result.success) {
                    console.log('login biometric result success calling login ')
                    this.login(this.state.email, this.state.password)
                } else {
                    console.log('login biometric failed')
                }
            }
        }
    }

    handleSubmit = (values, {setSubmitting}) => {
        if (values.email.length > 0 && values.password.length > 0) {
            if (this._isMounted) {
                this.signIn(values, {setSubmitting})
            }
        }
    }

    goToSignup = () => this.props.navigation.navigate('SignUp')

    goToSignupCode = () => this.props.navigation.navigate('ConfirmSignUp')

    goToForgotten = () => this.props.navigation.navigate('Forgot')

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            console.log('Login screen loaded')
            // SecureStore.deleteItemAsync(APP_KEY)
            this.loginBiometrics()
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
  
    render() {
        // this.getStoredCredentials()

    return (
        <SafeAreaView style={styles.container}>
            <Formik
            enableReinitialize
            initialValues={{ email: this.state.email, password: '', useTouchID: this.state.useTouchID }}
            onSubmit={(values, {setSubmitting}) => {
                try {
                    if (this._isMounted) {
                        this.handleSubmit(values, {setSubmitting})
                    }
                } catch(err) {
                    if (this._isMounted) {
                        setSubmitting(false)
                        this.setState({loggingInBiometrics: false})
                    }
                }
            }}
            validationSchema={validationSchema}>
                {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, setFieldValue }) => (
                    <Fragment>
                    <FormInput
                        name='email'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        placeholder={Captions.emailPlaceholder}
                        autoCapitalize='none'
                        iconName='envelope'
                        iconColor='#2C384A'
                        onBlur={handleBlur('email')}
                    />
                    <ErrorMessage errorValue={touched.email && errors.email} />
                    <FormInput
                        name='password'
                        value={values.password}
                        onChangeText={handleChange('password')}
                        placeholder={Captions.passwordPlaceholder}
                        secureTextEntry
                        iconName='lock'
                        iconColor='#2C384A'
                        onBlur={handleBlur('password')}
                    />
                    <ErrorMessage errorValue={touched.password && errors.password} />
                    { this.state.touchIDEnabled && this.state.hasStoredCreds &&
                            <CheckBox
                                containerStyle={styles.checkBoxContainer}
                                center
                                checkedIcon='check-box'
                                iconType='material'
                                uncheckedIcon='check-box-outline-blank'
                                title={'Use ' + this.state.biometricType}
                                checkedTitle={'You are using ' + this.state.biometricType}
                                checkedColor='#039BE5'
                                checked={values.useTouchID}
                                onPress={() => { setFieldValue('useTouchID', !values.useTouchID); this.setState({useTouchID: !values.useTouchID }); this.storeUseTouchID(!values.useTouchID) } }
                            />          
                    }
                    {this.state.hasStoredCreds && this.state.useTouchID &&
                        <BioMetricButton iconColor='#039BE5'  
                            iconSize={20} iconName={this.state.biometricIcon} onPress={() => { this.loginBiometrics()}} 
                            disabled={!this.props.isConnected} />
}
                    {this.state.error !== '' && <ErrorMessage errorValue={this.state.error} />}
                    <View style={styles.buttonContainer}>
                        <FormButton
                        buttonType='outline'
                        onPress={handleSubmit}
                        title={Captions.login}
                        buttonColor='#039BE5'
                        disabled={!isValid || isSubmitting || !this.props.isConnected}
                        loading = { isSubmitting || this.state.loggingInBiometrics }
                        />
                    </View>
                    </Fragment>
                )
                }
            </Formik>
            <SimpleButton
                title={Captions.signUpForAccount}
                onPress={this.goToSignup}
                textSize={18}
                textColor='#F57C00'
            />
            <SimpleButton
                title={Captions.signUpForAccountConfirm}
                onPress={this.goToSignupCode}
                textSize={18}
                textColor='#F57C00'
            />
            <SimpleButton
            title={Captions.forgottenPassword}
            onPress={this.goToForgotten}
                textSize={18}
                textColor='#F57C00'
            />
            
        </SafeAreaView>
    )
        }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 15
  },
  checkBoxContainer: {
      backgroundColor: 'white',
      borderWidth: 0,
  }
})
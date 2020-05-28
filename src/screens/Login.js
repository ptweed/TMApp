import React, { Fragment } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import SimpleButton from '../components/SimpleButton'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Auth } from 'aws-amplify'
import Captions from '../utils/Captions'

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

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {error: ''};
      }

    _isMounted = false

    signIn = async (values, {setSubmitting}) => {
        const { email, password } = values

        console.log('props signin: ' + JSON.stringify(this.props))


        if (this._isMounted) {
            try {
                this.setState({error: ''})
                console.log('login form values: ' + JSON.stringify(values))
                const user = await Auth.signIn(email, password)
                user && this.props.parentNav.navigate('App')
            } catch (err) {
                setSubmitting(false)
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
            this.setState({error: ''})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
  
    render() {

    return (
        <SafeAreaView style={styles.container}>
            <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, {setSubmitting}) => {
                try {
                    if (this._isMounted) {
                        this.handleSubmit(values, {setSubmitting})
                    }
                } catch(err) {
                    if (this._isMounted) {
                        setSubmitting(false)
                    }
                }
            }}
            validationSchema={validationSchema}>
                {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur }) => (
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
                    {this.state.error !== '' && <ErrorMessage errorValue={this.state.error} />}
                    <View style={styles.buttonContainer}>
                        <FormButton
                        buttonType='outline'
                        onPress={handleSubmit}
                        title={Captions.login}
                        buttonColor='#039BE5'
                        disabled={!isValid || isSubmitting || !this.props.isConnected}
                        loading = { isSubmitting }
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
})
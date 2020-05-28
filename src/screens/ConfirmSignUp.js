import React, {Fragment} from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import SimpleButton from '../components/SimpleButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Auth } from 'aws-amplify'
import Captions from '../utils/Captions'

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label(Captions.emailLabel)
      .email(Captions.emailValidation)
      .required(Captions.emailRequired),
    code: Yup.string()
      .label(Captions.verificationCodeLabel)
      .required(Captions.verificationCodeRequired),
  })

export default class ConfirmSignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {error: '', email: (this.props.route.params) ? this.props.route.params.email : '' };
  }

  _isMounted = false

  confirmSignUp = async (values, {setSubmitting}) => {
    const { email, code } = values
    this.setState({error: ''})

    try {
      await Auth.confirmSignUp(email, code)
      this.props.navigation.navigate('Login')
    } catch (err) {
      this.setState({error: err.message})
      console.log('ConfirmSignUp() error: ' + JSON.stringify(err))
      setSubmitting(false)
      if (err.code === 'UserNotConfirmedException') {
        this.setState({error: Captions.accountNotVerifiedYet})
      } else if (err.code === 'PasswordResetRequiredException') {
          this.setState({error: Captions.existingUser})
      } else if (err.code === 'NotAuthorizedException') {
          if (err.message.includes("Current status is CONFIRMED")) {
            console.log('already confirmed user')
            this.setState({error: Captions.verificationCodeAlreadyConfirmed})
          } else {
            console.log('verification code does not exist')
            this.setState({error: Captions.verificationCodeDoesNotExist})
          }
      } else if (err.code === 'UserNotFoundException') {
          this.setState({error: Captions.userDoesNotExist})
      } else if (err.code === 'CodeMismatchException') {
        this.setState({error: Captions.verificationCodeDoesNotExist})
      } else {
          this.setState({error: err.code})
      }
    }
  }

  handleSubmit = (values, {setSubmitting}) => {
    if (values.code.length > 0 && values.email.length > 0) {
      if (this._isMounted) {
        this.confirmSignUp(values, {setSubmitting})
      }
    }
  }

  handleResend = async (email) => {
    if (this._isMounted) {
      try {
        console.log('ConfirmSignUp() resend email : ' + email)
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
          console.log('valid email ')
          await Auth.resendSignUp(email)
          this.props.navigation.navigate('Login')
        }
        else {
          console.log('invalid email - FAIL')
        }
      } catch (err) {
        if (err.code === 'UserNotFoundException') {
          this.setState({error: Captions.userDoesNotExist})
        } else {
          this.setState({error: err.message})
        }
      }
    }
  }

  goToLogin = () => this.props.navigation.navigate('Login')

  componentDidMount() {
    console.log('Confirm sign up screen loaded')
    this._isMounted = true
  }

  componentWillUnmount() {
      this._isMounted = false;
  }

  render() {
    const {error} = this.state

    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{ code: '', email: this.state.email }}
          values={{ code: '', email: this.state.email }}
          onSubmit={(values, {setSubmitting}) => {
            this.handleSubmit(values, {setSubmitting})
          }}
          validationSchema={validationSchema}>
          {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, validateForm, validateField }) => (
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
                <ErrorMessage errorValue={errors.email} />
                <FormInput
                  name='code'
                  value={values.code}
                  onChangeText={handleChange('code')}
                  placeholder={Captions.verificationCodePlaceholder}
                  autoCapitalize='none'
                  iconName='hashtag'
                  iconColor='#2C384A'
                  onBlur={handleBlur('code')}
                />
                <ErrorMessage errorValue={touched.code && errors.code} />
                {error !== '' && <ErrorMessage errorValue={error} />}
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title={Captions.verify}
                    buttonColor='#039BE5'
                    disabled={!isValid || isSubmitting || !this.props.isConnected}
                    loading = { isSubmitting }
                  />
                </View>
                <SimpleButton
                  title={Captions.resendVerificationCode}
                  onPress={() => this.handleResend(values.email)}
                  textSize={18}
                  textColor='#F57C00'
                />
              </Fragment>
            )
          }
        </Formik>
        <SimpleButton
          title={Captions.backToLogin}
          onPress={this.goToLogin}
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
  }
})
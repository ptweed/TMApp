import React, {Fragment} from 'react'
import { StyleSheet, SafeAreaView, View, Text} from 'react-native'
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
      .email(Captions.emailPlaceholder)
      .required(Captions.emailRequired),
    password: Yup.string()
      .label(Captions.passwordLabel)
      .required(Captions.passwordRequired)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        Captions.passwordValidation
      ),
    confirmPassword: Yup.string()
      .label(Captions.confirmPasswordLabel)
      .required(Captions.confirmPasswordRequired)
      .oneOf([Yup.ref("password"), null], Captions.confirmPasswordVerification)
})

export default class SignUp extends React.Component {

    _isMounted = false
    state = { error: '' }

    signUp = async (values, {setSubmitting}) => {
        const { email, password, confirmPassword } = values
        if (password !== confirmPassword) {
          this.setState({error: Captions.passwordsDoNotMatch })
        } else {
          this.setState({error: ''})

          try {
            const user = await Auth.signUp(email, password)

            user && this.props.navigation.navigate('ConfirmSignUp', { email: email, password: password })
          } catch (err) {
            setSubmitting(false)
            this.setState({error: err.ErrorMessage})
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

  componentDidMount() {
      this._isMounted = true
      console.log('Signup screen loaded')
    }

  componentWillUnmount() {
      this._isMounted = false;
  }
 
  handleSubmit = (values, {setSubmitting}) => {
    if (values.email.length > 0 && values.password.length > 0 && values.confirmPassword.length > 0) {
      if (this._isMounted) {
          this.signUp(values, {setSubmitting})
      }
    }
  }

  goToLogin = () => this.props.navigation.navigate('Login')

  render() {
    const {error} = this.state 
    
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          onSubmit={(values, {setSubmitting}) => {
            try {
                this.handleSubmit(values, {setSubmitting})
            } catch(err) {
                setSubmitting(false)
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
                <FormInput
                  name='confirmPassword'
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder={Captions.confirmPasswordPlaceholder}
                  secureTextEntry
                  iconName='lock'
                  iconColor='#2C384A'
                  onBlur={handleBlur('confirmPassword')}
                />
                <ErrorMessage errorValue={touched.confirmPassword && errors.confirmPassword} />
                {error !== '' && <ErrorMessage errorValue={error} />}
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title={Captions.signUp}
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
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10,
  }
})
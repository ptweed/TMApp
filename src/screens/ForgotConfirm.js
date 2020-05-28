import React, {Fragment} from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import SimpleButton from '../components/SimpleButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ScrollView } from 'react-native-gesture-handler'
import { Auth } from 'aws-amplify'
import Captions from '../utils/Captions'

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label(Captions.emailLabel)
      .email(Captions.emailPlaceholder)
      .required(Captions.emailRequired),
    code: Yup.string()
      .label(Captions.verificationCodeLabel)
      .required(Captions.verificationCodeRequired),
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

export default class ForgotConfirm extends React.Component {

  _isMounted = false
  state = { error: '' }

  forgotConfirm = async (values, {setSubmitting}) => {
    const { email, code, password } = values 
    this.setState({error: ''})
 
    try {

      await Auth.forgotPasswordSubmit(email, code, password)
      const user = await Auth.signIn(email, password)
      user && this.props.parentNav.navigate('App')

    } catch (err) {
      this.setState({error: err.message})
      setSubmitting(false)
      if (err.code === 'UserNotConfirmedException') {
        this.setState({error: Captions.accountNotVerifiedYet})
      } else if (err.code === 'UserNotFoundException') {
        this.setState({error: Captions.userDoesNotExist})
      }
    }
  }

  handleSubmit = (values, {setSubmitting}) => {
    if (values.email.length > 0 && values.code.length > 0 && values.password.length > 0 && values.confirmPassword.length > 0) {
      if (this._isMounted) {
        this.forgotConfirm(values, {setSubmitting})
      }
    }
  }

  goToLogin = () => this.props.navigation.navigate('Login')

  componentDidMount() {
    this._isMounted = true
    console.log('Forgot confirmation screen loaded')
  }

  componentWillUnmount() {
      this._isMounted = false;
  }

  render() {
    const {error} = this.state 
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <Formik
          initialValues={{ email: '', code: '', password: '', confirmPassword: '' }}
          onSubmit={(values, {setSubmitting}) => {
            this.handleSubmit(values, {setSubmitting})
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
                  name='code'
                  value={values.code}
                  onChangeText={handleChange('code')}
                  placeholder={Captions.confirmationCodePlaceholder}
                  autoCapitalize='none'
                  iconName='hashtag'
                  iconColor='#2C384A'
                  onBlur={handleBlur('code')}
                />
                <ErrorMessage errorValue={touched.code && errors.code} />
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
                    title={Captions.confirm}
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
        </ScrollView>
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
    marginTop: 0,
  }
})
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
      .email(Captions.emailPlaceholder)
      .required(Captions.emailRequired),
  })

export default class Forgot extends React.Component {

  constructor(props) {
    super(props);
  }

  _isMounted = false
  state = { error: '' }

  forgot = async (values, {setSubmitting}) => {
    const { email } = values
    this.setState({error: ''})

    try {
      const user = await Auth.forgotPassword(email)
      user && this.props.navigation.navigate('ForgotConfirm')

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
    if (values.email.length > 0) {
      if (this._isMounted) {
        this.forgot(values, {setSubmitting})
      }
    }
  }

  goToLogin = () => this.props.navigation.navigate('Login')

  componentDidMount() {
    this._isMounted = true
    console.log('Forgot screen loaded')
  }

  componentWillUnmount() {
      this._isMounted = false;
  }

  render() {
    const {error} = this.state

    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{ email: '' }}
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
                {error !== '' && <ErrorMessage errorValue={error} />}
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title={Captions.sendCode}
                    buttonColor='#039BE5'
                    disabled={!isValid || isSubmitting || !this.props.isConnected }
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
    margin: 15
  }
})
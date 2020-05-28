import React, {useState, useEffect, Fragment} from 'react'
import { StyleSheet, SafeAreaView, View, Text, PointPropType} from 'react-native'
import FormMultilineInput from '../components/FormMultilineInput'
import FormButton from '../components/FormButton'
import SimpleButton from '../components/SimpleButton'
import ErrorMessage from '../components/ErrorMessage'
import { Formik } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-native-datepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import OfflineNotifier from '../components/OfflineNotifier'
import { useDispatch, useSelector } from 'react-redux'
import { createNewTask, saveTask, tasksSelector } from '../slices/tasks'
import Captions from '../utils/Captions'

const validationSchema = Yup.object().shape({
    task: Yup.string()
      .label(Captions.taskLabel)
      .required(Captions.taskRequired),
    dueDate: Yup.string()
      .label(Captions.dueDateLabel)
      .required(Captions.dueDateRequired),
  })

const TaskCreate = (props) => {

  const dispatch = useDispatch()
  const { tasks, loading, hasErrors, error } = useSelector(tasksSelector)
  const [isConnected, setIsConnected] = useState(true)
  const [editTask, setEditTask] = useState({dueDate: props.route.params ? props.route.params.dueDate : new Date().toLocaleDateString(), 
                                            task: props.route.params ? props.route.params.task : '', 
                                            status: props.route.params ? props.route.params.status : 'new', 
                                            id: props.route.params ? props.route.params.id : '', 
                                            owner: props.route.params ? props.route.params.owner : '' })

  useEffect(() => {
    console.log('Task Create screen loaded')
    if (props.route.params) {
      setEditTask(props.route.params)
      console.log('Editing task : ' + JSON.stringify(editTask))
    }          
  })
  

  const handleSubmit = (values, {setSubmitting}) => {
    console.log('TaskCreate screen handleSubmit() values: ' + JSON.stringify(values))
    if (values.task.length > 0 && values.dueDate.toString().length > 0) {
      try {
          if (props.route.params) {
            let editedTask = {...props.route.params, task: values.task, dueDate: new Date(values.dueDate) }
            console.log('Saving edited task : ' + JSON.stringify(editedTask))
            dispatch(saveTask(editedTask))
          } else {
            console.log('Creating task : ' + JSON.stringify({ task: values.task, dueDate: new Date(values.dueDate), status: "new" } ))
            dispatch(createNewTask({ task: values.task, dueDate: new Date(values.dueDate), status: "new" }))
          }
          props.navigation.navigate('TabsScreen')
      } catch (err) {
        console.log('Error in handleSubmit on TaskCreate screen : ' + JSON.stringify(err))
        setSubmitting(false)
      }
    }
  }

  const cancel = () => props.navigation.navigate('TabsScreen')

  const offlineStateChanged = async isConnected => {
        setIsConnected(isConnected)
  }

  return (
    <SafeAreaView style={styles.container}>
      <OfflineNotifier offlineStateChanged={offlineStateChanged} />
      <Formik
        initialValues={{ task: editTask.task, dueDate: new Date(editTask.dueDate) }}
        values={{ task: editTask.task, dueDate: new Date(editTask.dueDate) }}
        onSubmit={(values, {setSubmitting}) => {
            try {
              handleSubmit(values, {setSubmitting})
            } catch(err) {
                console.log('Erro submitting task: ' + JSON.stringify(err))
                setSubmitting(false)
            }
        }}
        validationSchema={validationSchema}>
        {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, setFieldValue }) => (
            <Fragment>
                <View style={{alignItems: 'center'}}>
                    <Text style= {{ fontSize: 25, color: "#000", margin: 50, }}>{editTask.task === '' ? Captions.newTask : Captions.editTask }</Text>
                </View>
              <FormMultilineInput
                name='task'
                value={values.task}
                onChangeText={handleChange('task')}
                placeholder={Captions.taskPlaceholder}
                autoCapitalize='none'
                iconName='edit'
                iconColor='#2C384A'
                onBlur={handleBlur('task')}
              />
              <ErrorMessage errorValue={touched.task && errors.task} />

            <DatePicker
                  style={{width: 200, left: 25}}
                  date={values.dueDate} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder={Captions.dueDatePlaceholder}
                  format="MM/DD/YYYY"
                  confirmBtnText={Captions.dueDateConfirm}
                  cancelBtnText={Captions.dueDateCancel}
                  iconComponent={<FontAwesome5 name="calendar-alt" size={26} style={{position: 'absolute', left: 0, top: 4}} />}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange={date => setFieldValue('dueDate', date)}
                />
              <ErrorMessage errorValue={touched.dueDate && errors.dueDate} />
              {error !== '' && <ErrorMessage errorValue={error} />}
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title={editTask.task === '' ? Captions.taskCreate : Captions.taskSave }
                  buttonColor='#039BE5'
                  disabled={!isValid || isSubmitting || !isConnected}
                  loading = { isSubmitting }
                />
              </View>
            </Fragment>
          )
        }
      </Formik>
      <SimpleButton
        title={Captions.taskCancel}
        onPress={cancel}
        textSize={18}
        textColor='#F57C00'
      />
    </SafeAreaView>
  )
}

export default TaskCreate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 15
  },
  calContainer: {

    flexDirection:'row',
    alignItems:'center',
  },
})
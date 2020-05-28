import React, {useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Dimensions, Text, SafeAreaView, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import { saveTask, removeTask } from '../slices/tasks'
import { isTablet } from './Platform'

const Task = (props) => {
  const dispatch = useDispatch()

  const [filterDate, setFilterDate] = useState(new Date())
  const [calcWidth, setCalcWidth] = useState(250)
  const [checkStyle, setCheckStyle] = useState({margin: 10, marginLeft: 20, opacity: .7, color: '#FF9900'})
  const [editStyle, setEditStyle] = useState({margin: 10, marginLeft: 20, opacity: .7, color: 'rgb(0,106,255)'})
  const [deleteStyle, setDeleteStyle] = useState({flexDirection:'row', alignItems: 'flex-end', margin: 10, 
                                        marginLeft: 10, opacity: 0.6, color: 'red'})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let date = new Date()
    date.setDate(date.getDate() - 1)
    setFilterDate(date)

    if (isTablet()) setCalcWidth(Dimensions.get('screen').width - 130)

    if (!props.isConnected) {
      setCheckStyle( {...checkStyle, color: 'grey'} )
      setEditStyle( {...editStyle, color: 'grey'} )
      setDeleteStyle( {...deleteStyle, color: 'grey'} )
    }

    setSaving(false)

    const onChange = () => {
      if (isTablet()) setCalcWidth(Dimensions.get('screen').width - 130)
    };
    
    Dimensions.addEventListener('change', onChange)
    return () => Dimensions.removeEventListener('change', onChange);
  }, [props.task])

  const editTask = (task) => {
    props.navigation.navigate('TaskCreate', task)
  }

  const updateTask = async task => {
    setSaving(true)

    const updatedTask = {
        ...task,
        status: task.status === 'new' ? 'completed' : 'new'
    }
    console.log('Updating task: ' + JSON.stringify(updatedTask))

    dispatch(saveTask(updatedTask))

    console.log('DONE Updating task: ' + JSON.stringify(updatedTask))
  }

  const deleteTask = async task => {
    setSaving(true)
    console.log('Deleting task: ' + JSON.stringify(task))

    dispatch(removeTask(task))
  }

  return (
    <SafeAreaView style={styles.container} >
    {
      props.task.status === 'new' && (
        <TouchableWithoutFeedback onPress={() => props.isConnected && updateTask(props.task)} style={styles.touchable}>
            <View>
            <FontAwesome5 name="circle"
              style={checkStyle}
              size={22}
            />
        </View>
        </TouchableWithoutFeedback>
      )
    }
    {
      props.task.status === 'completed' && (
        <TouchableWithoutFeedback onPress={() => props.isConnected && updateTask(props.task)}>
            <View>
            <FontAwesome5 name="check-circle"
              style={checkStyle}
              size={22}
            />
        </View>
        </TouchableWithoutFeedback>
      )
    }
    <View style={styles.dateAndTextContainer}>
      <View style={styles.dateAndEditContainer}>
        {
            (new Date(props.task.dueDate) - filterDate < 0) && (props.task.status === 'new') && (<Text style={styles.dueDateOverdue}>{new Date(props.task.dueDate).toLocaleDateString()}</Text>) 
        }
        {
            (new Date(props.task.dueDate) - filterDate < 0) && (props.task.status === 'completed') && (<Text style={styles.dueDate}>{new Date(props.task.dueDate).toLocaleDateString()}</Text>) 
        }
        {
            (new Date(props.task.dueDate) - filterDate > 0) && (<Text style={styles.dueDate}>{new Date(props.task.dueDate).toLocaleDateString()}</Text>) 
        }
        <TouchableWithoutFeedback onPress={() => props.isConnected && editTask(props.task)}>
          <View>
            <FontAwesome5 name="edit"
              style={editStyle}
              size={22}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Text style={{...styles.task, width: calcWidth }} >{props.task.task}</Text>
    </View>
    <TouchableWithoutFeedback onPress={() => props.isConnected && deleteTask(props.task)}>
        <View>
          <FontAwesome5 name="times-circle"
              size={22}
              style={deleteStyle}
          />
      </View>
    </TouchableWithoutFeedback>
    {saving &&
    <View style={styles.savingContainer}>
        <ActivityIndicator color='black' size="large" />
    </View>
    }
    </SafeAreaView>
  )
}

const styles = {
  container: {
    borderBottom: '1px solid rgba(255, 222, 0, 1)',
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "rgb(255,255,255)",
    marginRight:10,
    marginLeft:10,
    marginBottom:5,
    marginTop:5,
  },
  touchable: {
    activeOpacity: 1.0,
  },
  dateAndTextContainer: {
    flexDirection:'column',
  },
  dateAndEditContainer: {
    flexDirection:'row',
  },
  task: {
    textAlign: 'left',
    fontSize: 18,
    marginTop:2,
    marginBottom:10,
  },
  dueDate: {
    textAlign: 'left',
    fontSize: 18,
    color:'grey',
    marginTop:11,
    marginBottom:2,
  },
  dueDateOverdue: {
    textAlign: 'left',
    fontSize: 18,
    color:'red',
    marginTop:11,
    marginBottom:2,
  },
  iconContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  savingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
    opacity: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
}

export default Task
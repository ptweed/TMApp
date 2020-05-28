import React from 'react'
import { RefreshControl, StyleSheet, Text, SafeAreaView, ScrollView, View, ActivityIndicator } from 'react-native'
import Task from '../components/Task'
import { useSelector } from 'react-redux'
import { lateTasksSelector } from '../slices/tasks'
import AppErrorMessage from '../components/AppErrorMessage'
import Captions from '../utils/Captions'

const TasksByDate = (props) => {

  const { tasks, loading, hasErrors, error } = useSelector(lateTasksSelector)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{Captions.lateTasksTitle}</Text>
      </View>
      {props.isRefreshing ? 
      <View style={{ flex: 1,  backgroundColor: "#C2185B", paddingTop: 20 }}>
        <ActivityIndicator color='black' size="large" />
      </View> : 
      null
      }
      { hasErrors ? <AppErrorMessage errorValue={error} /> : 
      <ScrollView 
      style={styles.list} 
      refreshControl={
        <RefreshControl refreshing={props.isRefreshing} onRefresh={props.onRefresh} />
      }
      >
      {
        tasks.length > 0 ?
          tasks.map((item, index) => (
            <Task key={index} task={item}
              isConnected={props.isConnected}
              navigation={props.navigation} 
              ></Task>
          ))
          :
          loading ? null : 
          <View style={styles.noTasksContainer}>
            <Text style={styles.noTasks}>{Captions.noLateTasks}</Text>
          </View>
      }
      </ScrollView>
      }
      {loading && tasks.length === 0 &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator color='black' size="large" />
        </View>
      }
    </SafeAreaView>
  )
}

export default TasksByDate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#fff',
    marginTop:0,
  },
  header: {
    marginTop: 0,
  },
  list: {
    marginTop: 0,
  },
  title: {
    alignItems: 'center', 
    justifyContent: 'center', 
    height:35, 
    backgroundColor: 'red', 
    borderBottomColor: 'black', 
    borderBottomWidth: 1
  },
  titleText: {
    fontSize: 20, 
    color: 'white'
  },
  noTasksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 80,
    height:200,
    backgroundColor: 'rgba(255,204,203, 0.4)',
    borderRadius: 10,
    padding: 20,
  },
  noTasks: {
    fontSize: 20, 
    color: 'black'
  },
  loadingContainer: {
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
})
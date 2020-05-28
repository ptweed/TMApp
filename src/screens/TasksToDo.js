import React from 'react'
import { RefreshControl, StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator, View } from 'react-native'
import Task from '../components/Task'
import { useSelector } from 'react-redux'
import { todoTasksSelector } from '../slices/tasks'
import AppErrorMessage from '../components/AppErrorMessage'
import Captions from '../utils/Captions'

const TasksToDo = (props) => {
  const { tasks, loading, hasErrors, error } = useSelector(todoTasksSelector)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{Captions.todoTasksTitle}</Text>
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
            <Text style={styles.noTasks}>{Captions.noTasksGetStarted}</Text>
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

export default TasksToDo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    flexDirection: 'column',
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
    backgroundColor: 'lightgreen', 
    borderBottomColor: 'black', 
    borderBottomWidth: 1
  },
  titleText: {
    fontSize: 20, 
    color: 'black'
  },
  noTasksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 80,
    height:200,
    backgroundColor: 'rgba(144,238,144, 0.4)',
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
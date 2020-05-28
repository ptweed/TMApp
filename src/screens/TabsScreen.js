import { StyleSheet, SafeAreaView} from 'react-native'
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksAll from '../screens/TasksAll'
import TasksByDate from '../screens/TasksByDate'
import TasksToDo from '../screens/TasksToDo'
import { FontAwesome5 } from '@expo/vector-icons';
import TopHeader from '../components/TopHeader'
import { Auth } from 'aws-amplify'
import * as SecureStore from 'expo-secure-store'
import OfflineNotifier from '../components/OfflineNotifier'
import { useDispatch } from 'react-redux'
import { fetchTasks } from '../slices/tasks'
import { useNavigation } from '@react-navigation/native';

const Tabs = createBottomTabNavigator();

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
  })

const TabsScreen = (props) => {
    const dispatch = useDispatch()
    const [isConnected, setIsConnected] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const nav = useNavigation()

    refreshTasks = () => {
        console.log('TabScreen() refreshing')
        if (isConnected) {
            setIsRefreshing(true)
            dispatch(fetchTasks())
            setIsRefreshing(false)
        }
    }
  
    useEffect(() => {
      console.log('TabScreen() props: ' + JSON.stringify(props))
      dispatch(fetchTasks())
    }, [dispatch])
  
    const offlineStateChanged = async isConnected => {
        setIsConnected(isConnected)
    }

    const onLogout = async () => {
        try {
            await Auth.signOut()
            await SecureStore.setItemAsync(
                'TMAppCreds',
                ''
              );
            props.mainNav.navigate('AuthScreen', { screen: 'Login' } )
        } catch (error) {
            console.log('Logout error: ' + JSON.stringify(error))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader logout={onLogout} navigation={props.navigation} isConnected={isConnected} ></TopHeader>
            <OfflineNotifier offlineStateChanged={offlineStateChanged} />
            <Tabs.Navigator initialRouteName="To Do" headerMode='float'
            tabBarOptions={{
                // inactiveTintColor: '#fff',
                inactiveTintColor: '#000',
                // activeTintColor: 'rgb(0,106,255)',
                activeTintColor: 'black',
                // showLabel: false,
                activeBackgroundColor: '#fff',
                
                inactiveBackgroundColor: 'rgb(240,240,250)',
                // inactiveBackgroundColor: 'rgb(0,106,255)',
                // inactiveTintColor: 'white' 
                style: {
                    borderTopWidth: 1,
                    borderTopColor: 'black',
                }
              }}
            >
                <Tabs.Screen name="To Do" 
                    options={{ tabBarIcon: ({ color }) => ( <FontAwesome5 name="clipboard-list" color={color} size={26} /> ), }} 
                >
                    {props => <TasksToDo {...props} 
                    isConnected={isConnected} navigation={props.navigation} onRefresh={refreshTasks} isRefreshing={isRefreshing} />}
                </Tabs.Screen>
                <Tabs.Screen name="Late" 
                options={{ tabBarIcon: ({ color }) => ( <FontAwesome5 name="clock" color={color} size={26} /> ), }} 
                >
                    {props => <TasksByDate {...props} 
                    isConnected={isConnected} navigation={props.navigation} onRefresh={refreshTasks} isRefreshing={isRefreshing} />}
                </Tabs.Screen>
                <Tabs.Screen name="All" 
                options={{ tabBarIcon: ({ color }) => ( <FontAwesome5 name="tasks" color={color} size={26} /> ), }} 
                >
                    {props => <TasksAll {...props} 
                    isConnected={isConnected} navigation={props.navigation} onRefresh={refreshTasks} isRefreshing={isRefreshing} />}
                </Tabs.Screen>
            </Tabs.Navigator>
        </SafeAreaView>
    )
}

export default TabsScreen 
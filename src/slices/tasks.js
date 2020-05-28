import { createSlice, createSelector } from '@reduxjs/toolkit'
import { API, graphqlOperation } from 'aws-amplify'
import { createTask, updateTask, deleteTask } from '../graphql/mutations'
import { listTasks } from '../graphql/queries'


export const initialState = {
  loading: false,
  hasErrors: false,
  tasks: [],
  error: null,
}

// Create slice and actions 
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasksState: state => {
      state.loading = true
      state.hasErrors = false
      state.error = null
    },
    getTasksStateSuccess: (state, { payload }) => {
      state.tasks = payload
      state.loading = false
      state.hasErrors = false
      state.error = null
    },
    getTasksStateFailure: (state, { payload }) => {
      state.loading = false
      state.hasErrors = true
      state.error = payload
    },
    newTaskState: state => {
      state.loading = true
      state.hasErrors = false
      state.error = null
    },
    newTaskStateFailure: (state, { payload }) => {
      state.loading = false
      state.hasErrors = true
      state.error = payload
    },
    updateTaskState: state => {
      state.loading = true
      state.hasErrors = false
      state.error = null
    },
    updateTaskStateFailure: (state, { payload }) => {
      state.loading = false
      state.hasErrors = true
      state.error = payload
    },
    deleteTaskState: state => {
      state.loading = true
      state.hasErrors = false
      state.error = null
    },
    deleteTaskStateFailure: (state, { payload }) => {
      state.loading = false
      state.hasErrors = true
      state.error = payload
    },
  },
})

// Export Actions
export const { getTasksState, getTasksStateSuccess, getTasksStateFailure,
                newTaskState, newTaskStateSuccess, newTaskStateFailure,
                updateTaskState, updateTaskStateSuccess, updateTaskStateFailure,
                deleteTaskState, deleteTaskStateSuccess, deleteTaskStateFailure } = tasksSlice.actions

// Export Selectors
export const tasksSelector = state => state.tasks

export const todoTasksSelector = state => {
    let tasksState = state.tasks 
    let tasksStateTasks = tasksState.tasks.filter(t => t.status === 'new')
    return {...tasksState, tasks: tasksStateTasks }
}

export const lateTasksSelector = state => {

    let date = new Date()
    date.setDate(date.getDate() - 1)

    let tasksState = state.tasks 
    let tasksStateTasks = tasksState.tasks.filter(t => new Date(t.dueDate) - date < 0).filter(t => t.status === 'new')
    return {...tasksState, tasks: tasksStateTasks }
}

// Default reducer
export default tasksSlice.reducer

// Create Thunks
export function fetchTasks() {
  return async dispatch => {
    dispatch(getTasksState())

    try {
      console.log('fetchTasks()')
      const taskData = await API.graphql(graphqlOperation(listTasks))
      const unsortedTasks = taskData.data.listTasks.items
      const sortedTasks = unsortedTasks.slice().sort(function(a,b){
        return  new Date(a.dueDate) - new Date(b.dueDate);
      });

      dispatch(getTasksStateSuccess(sortedTasks))
    } catch (error) {
      console.log('fetchTasks() error: ' + JSON.stringify(error))
      dispatch(getTasksStateFailure(JSON.stringify(error)))
    }
  }
}

export function createNewTask(task) {
    return async dispatch => {
        dispatch(newTaskState())

        try {
          console.log('createNewTask() with task: ' + JSON.stringify(task))
          await API.graphql(graphqlOperation(createTask, {input: task}))

          dispatch(fetchTasks())
        } catch (error) {
          dispatch(newTaskStateFailure(error))
        }
    }
}

export function saveTask(task) {
    return async dispatch => {
        dispatch(updateTaskState())

        try {

          console.log('saveTask() with task: ' + JSON.stringify(task))
          await API.graphql(graphqlOperation(updateTask, {input: task}));

          dispatch(fetchTasks())
        } catch (error) {
          dispatch(updateTaskStateFailure(error))
        }
    }
}

export function removeTask(task) {
    return async dispatch => {
        dispatch(deleteTaskState())

        try {
          console.log('removeTask()')
          const taskID = { id: task.id }
          await API.graphql(graphqlOperation(deleteTask, {input: taskID}));

          dispatch(fetchTasks())
        } catch (error) {
          dispatch(deleteTaskStateFailure(error))
        }
    }
}

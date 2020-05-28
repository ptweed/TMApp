/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($owner: String!) {
    onCreateTask(owner: $owner) {
      id
      task
      dueDate
      owner
      status
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($owner: String!) {
    onUpdateTask(owner: $owner) {
      id
      task
      dueDate
      owner
      status
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($owner: String!) {
    onDeleteTask(owner: $owner) {
      id
      task
      dueDate
      owner
      status
    }
  }
`;

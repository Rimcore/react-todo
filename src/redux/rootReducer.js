const initialState = {
  todoList: []
}
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_JSON' : {
      return {
        todoList: action.data
      }
    }
    case 'CHANGE_TASK_STATUS': {
      let newTodoList = [...state.todoList]
      newTodoList[action.id].completed = !newTodoList[action.id].completed
      return {
        todoList: newTodoList
      }
    }
  }
  return state
}
import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios/axios'
import './index.css';
import rootReduser from './redux/rootReducer'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux';
import TodoList from './components/TodoList/TodoList'

const store = createStore(rootReduser)

const loadJSON = async () => {
  try {
    const response = await axios.get(`/todos`)
    store.dispatch({ type: 'LOAD_JSON', data: response.data})
  } catch (e) {
    console.error(e)
  }
}

const app = (
  <Provider store={store}>
    <TodoList />
  </Provider>
)

loadJSON()
ReactDOM.render(app, document.getElementById('root'));

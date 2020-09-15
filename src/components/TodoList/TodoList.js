import React, { Component } from 'react'
import axios from '../../axios/axios'
import './TodoList.scss'
import Todo from './Todo/Todo'
import {connect} from 'react-redux'


class TodoList extends Component {
  state = {
    filter: -1,
    needle: ""
  }

  normalize(str) {
    return str.replace(/\t/g, " ")
              .replace(/\u00A0/g, " ")
              .replace(/\s+/g, " ")
              .replace(/^\s/g, "")
              .replace(/\s$/g, "")
              .toLowerCase();
  }

  findNeedle = (title) => {
    if (this.state.needle.length < 2) return true
    let found = false
    let stack = this.normalize(title)
    let needle = this.normalize(this.state.needle)
    let splittedNeedle = needle.split(" ")
    splittedNeedle.forEach(needlePart => {
      if (stack.indexOf(needlePart) !== -1) found = true
    })
    return found
  }

  render() {
    const cls = ["","",""]
    cls[this.state.filter + 1] = ' TodoList_header-button--selected'
    return (
      <div className={'TodoList'} >
        <div className={'TodoList_header'}>
          <button
            className={'TodoList_header-button' + cls[0]}
            onClick={() => this.setState({filter: -1})}
          >All</button>
          <button
            className={'TodoList_header-button' + cls[1]}
            onClick={() => this.setState({filter: 0})}
          >Done</button>
          <button
            className={'TodoList_header-button' + cls[2]}
            onClick={() => this.setState({filter: 1})}
          >Undone</button>
          <input
            placeholder='Поиск'
            value={this.state.needle}
            onChange={event => this.setState({ needle: event.target.value })}
          />
        </div>
        {this.props.todoList.map((todo, index) => {
          if (
            this.state.filter != todo.completed &&
            this.findNeedle(todo.title)
          ) {
            return (
              <Todo
                key={index}
                id={index}
                title={todo.title}
                completed={todo.completed}
              />
            )
          } else {
            return false
          }
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todoList: state.todoList
  }
}

export default connect(mapStateToProps)(TodoList)
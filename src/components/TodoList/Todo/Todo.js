import React from 'react'
import './Todo.scss'
import {connect} from 'react-redux'

class Todo extends React.Component {
  render() {
    let cls = "Todo"
    let checked = false
    if (this.props.completed) {
      cls = "Todo Todo--completed"
      checked = true
    }
    return (
      <div className={cls}>
        <h4>{this.props.id + 1}</h4>
        <p>{this.props.title}</p>
        <label className={'Todo-checkbox'}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => this.props.changeStatus(this.props.id)}
          />
          Done
        </label>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todoList: state.todoList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatus: id => dispatch({ type: 'CHANGE_TASK_STATUS', id: id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
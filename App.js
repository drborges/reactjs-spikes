import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor() {
    super()
    this.state = { input: '' }
    this.update = this.update.bind(this)
  }

  update(e) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.input).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.input).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.input).value
    })
  }

  // components in ReactJS may have a 'ref' props attribute which is used
  // to uniquely identify a component allowing it to be manipulated by ReactDOM
  render() {
    return (
      <div>
        <div>{this.props.greeting}</div>
        <br />
        <Slider ref="red" update={this.update} />
        <span>{this.state.red}</span>
        <Slider ref="green" update={this.update} />
        <span>{this.state.green}</span>
        <Slider ref="blue" update={this.update} />
        <span>{this.state.blue}</span>
      </div>
    )
  }
}

App.propTypes = {
  greeting: React.PropTypes.string
}

App.defaultProps = {
  greeting: 'Hello World!'
}


/*
 * Child component
 */
class Slider extends React.Component {
  render() {
    return (
      <div>
        <input ref="input" type="range"
             min="0"
             max="255"
             onChange={this.props.update} />
      </div>
    )
  }
}

/*
 * Stateless component is nothing but a closure
 */
const MirroredLabel = (props) => {
  return (
    <div>
      <input type="text" onChange={props.update} />
      <h1>{props.value}</h1>
    </div>
  )
}

export default App

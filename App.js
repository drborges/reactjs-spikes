import React from 'react';

class App extends React.Component {

  constructor() {
    super()
    this.state = { input: '' }
  }

  update(e) {
    this.setState({ input: e.target.value })
  }

  render() {
    return (
      <div>
        <div>{this.props.greeting}</div>
        <MirroredLabel value={this.state.input} update={this.update.bind(this)} />
        <MirroredLabel value={this.state.input} update={this.update.bind(this)} />
        <MirroredLabel value={this.state.input} update={this.update.bind(this)} />
        <MirroredLabel value={this.state.input} update={this.update.bind(this)} />
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

const MirroredLabel = (props) => {
  return (
    <div>
      <input type="text" onChange={props.update} />
      <h1>{props.value}</h1>
    </div>
  )
}

export default App

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
        <input type="text" onChange={this.update.bind(this)} />
        <h1>{this.state.input}</h1>
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

export default App

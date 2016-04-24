import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';
import { autobind } from 'core-decorators';

let firebase = {
  GET: (path) => {
    return (Target) => {
      return class extends Target {

        constructor() {
          super()
          this.key = path.slice(1)
          this.state = this.state || {}
          this.state[this.key] = {}
          this.fref = new Firebase(`https://userxp.firebaseio.com${path}`)
        }

        componentWillMount() {
          this.fref.on("child_added", function(dataSnapshot) {
            this.state[this.key][dataSnapshot.key()] = dataSnapshot.val()
            this.setState(this.state);
          }.bind(this));
        }
      }
    }
  },

  POST: (path) => {
    return (Target) => {
      return class extends Target {
        constructor() {
          super()
          this.key = path.slice(1)
          this.state = this.state || {}
          this.fref = new Firebase(`https://userxp.firebaseio.com${path}`)
        }

        @autobind
        post() {
          console.log(this.state)
          let ref = this.fref.push()
          ref.set(this.state)
          console.log(ref.toString())
        }
      }
    }
  }
}

@firebase.GET('/users')
class App extends React.Component {
  render() {
    let rows = Object.keys(this.state.users).map((id) => {
      return <UserRow key={id} data={this.state.users[id]} />
    })

    return (
      <div>
        <NewUser />
        <ul>
          {rows}
        </ul>
      </div>
    )
  }
}


@firebase.POST('/users')
class NewUser extends React.Component {

  @autobind
  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  @autobind
  onLevelChange(e) {
    this.setState({ level: e.target.value });
  }

  render() {
    return (
      <div>
        <input type="text"
               value={this.state.name}
               onChange={this.onNameChange} />
        <input type ="text"
               value={this.state.level}
               onChange={this.onLevelChange} />
             <button onClick={this.post}>Create</button>
      </div>
    )
  }
}

const UserRow = (props) =>
  <li>
    <span>User: {props.data.name} ({props.data.level})</span>
  </li>

export default App

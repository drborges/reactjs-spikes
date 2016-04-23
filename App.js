import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';

@FirebaseModel('/users')
class App extends React.Component {
  render() {
    let rows = this.state.users.map((user, id) => {
      return <UserRow key={id} data={user} />
    })

    return (
      <ul>
        {rows}
      </ul>
    )
  }
}

const UserRow = (props) => {
  return (
    <li>
      <span>User: {props.data.name} ({props.data.level})</span>
    </li>
  )
}

function FirebaseModel(path) {
  return function Decorator(Target) {
    return class Decorated extends Target {

      constructor() {
        super()
        this.key = path.slice(1)
        this.state = {}
        this.state[this.key] = []
      }

      componentWillMount() {
        this.fref = new Firebase(`https://userxp.firebaseio.com${path}`)

        this.fref.on("child_added", function(dataSnapshot) {
          this.state[this.key][dataSnapshot.key()] = dataSnapshot.val()
          this.setState(this.state);
        }.bind(this));
      }
    }
  }
}



export default App

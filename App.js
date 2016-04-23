import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    this.fref = new Firebase('https://userxp.firebaseio.com/users')
    this.fref.on("child_added", function(dataSnapshot) {
      this.state.users.push(dataSnapshot.val());
      this.setState({
        users: this.state.users
      });
    }.bind(this));
  }

  // components in ReactJS may have a 'ref' props attribute which is used
  // to uniquely identify a component allowing it to be manipulated by ReactDOM
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
      <span>{props.data.name} ({props.data.level})</span>
    </li>
  )
}

export default App

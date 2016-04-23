import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor() {
    super()
    this.state = { users: [
      { id: 1, name: "Borges", level: 5 },
      { id: 2, name: "Ronaldo", level: 2 },
      { id: 3, name: "Bianca", level: 3 },
      { id: 4, name: "Hernando", level: 1 },
      { id: 5, name: "Diego", level: 4 },
    ]}
  }

  // components in ReactJS may have a 'ref' props attribute which is used
  // to uniquely identify a component allowing it to be manipulated by ReactDOM
  render() {
    let rows = this.state.users.map(user => {
      return <UserRow key={user.id} data={user} />
    })

    return (
      <ul>
        <UserRow data={{name: 'LOL', level: 0}} />
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

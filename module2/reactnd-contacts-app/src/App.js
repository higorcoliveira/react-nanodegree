import React, { Component } from 'react';
import ListContacts from './ListContacts';

class App extends Component {
  // definindo o estado inicial da aplicação
  // essa sintaxe só é possível graças ao processo de transpiler do babel
  state = {
    contacts: [
      {
        "id": "karen",
        "name": "Karen Isgrigg",
        "handle": "karen_isgrigg",
        "avatarURL": "http://localhost:5001/karen.jpg"
      },
      {
        "id": "richard",
        "name": "Richard Kalehoff",
        "handle": "richardkalehoff",
        "avatarURL": "http://localhost:5001/richard.jpg"
      },
      {
        "id": "tyler",
        "name": "Tyler McGinnis",
        "handle": "tylermcginnis",
        "avatarURL": "http://localhost:5001/tyler.jpg"
      }
     ]
  }

  // o estado sempre é alterado no componente que detem o dado
  // é possível alterar o estado de outra forma também, fazendo merge do objeto
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))
  }

  render() {
    return (
      <div>
        <ListContacts 
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}  // é possível passar uma função como props
        />
      </div>
    );
  }
}

export default App;

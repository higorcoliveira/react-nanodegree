import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from  './utils/ContactsAPI';

class App extends Component {
  // definindo o estado inicial da aplicação
  // essa sintaxe só é possível graças ao processo de transpiler do babel
  state = {
    contacts: []
  }

  // uma vez que o componente é montado, chama o método de recuperar os contatos
  // esse é um dos métodos de ciclo de vida dos componentes do React
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
          this.setState(() => ({
            contacts
          }))
      })
  }

  // o estado sempre é alterado no componente que detem o dado
  // é possível alterar o estado de outra forma também, fazendo merge do objeto
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))
    ContactsAPI.remove(contact)
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

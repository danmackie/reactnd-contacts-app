import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    //Contacts
    contacts : [],
  }
  
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  //Remove contact - it sets state and React manages the UI update.
  //When delete button is pressed the contact object is passed in
  //The new set of contacts is passed to the setState function
  //Prior to that the passed contact is filtered from the contacts array 
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact);
  }

  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts:currentState.contacts.concat([contact])
        }))
      })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts 
            contacts={this.state.contacts} 
            onDeleteContact={this.removeContact} 
          />
        )} />
        <Route path='/create' render={({history}) => (
          <CreateContact 
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default App

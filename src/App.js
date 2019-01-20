import React, { Component } from 'react'
import ListContacts from './ListContacts'

class App extends Component {
  state = {
    //Contacts
    contacts : [
      {
        id: 'tyler',
        name: 'Tyler McGinnis',
        handle: '@tylermcginnis',
        avatarURL: 'http://localhost:5001/tyler.jpg'
      },
      {
        id: 'karen',
        name: 'Karen Isgrigg',
        handle: '@karen_isgrigg',
        avatarURL: 'http://localhost:5001/karen.jpg'
      },
      {
        id: 'richard',
        name: 'Richard Kalehoff',
        handle: '@richardkalehoff',
        avatarURL: 'http://localhost:5001/richard.jpg'
      },
    ]
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
  }

  render() {
    return (
      <div>
        <ListContacts 
          contacts={this.state.contacts} 
          onDeleteContact={this.removeContact} 
        />
      </div>
    )
  }
}

export default App

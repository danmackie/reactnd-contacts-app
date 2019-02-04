import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ListContacts extends Component {
  
  state = {
    query: ''
  }
  
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }
  //Add proptypes setup for type/required checks
  propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  }
    
  render(){
    //Destructuring into variables
    const {query} = this.state
    const {contacts, onDeleteContact, onNavigate} = this.props

    //Create showingContacts, the filtered list of contacts to power the render
    //based on the state, which is based on input field.
    const showingContacts = query === ''
      ? contacts 
      : contacts.filter((c) => (
        c.name.toLowerCase().includes(query.toLowerCase())
      ))

    return(
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input 
            className='search-contacts'
            type="text"
            placeholder='Search contacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <a 
            className='add-contact'
            onClick={() => {onNavigate()}}
            href='#create'
          >
            Add contact
          </a>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Showing {showingContacts.length} contacts of {contacts.length}.</span>
            <button onClick={this.clearQuery}>
              Clear all
            </button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div
                className='contact-avatar'
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              ></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button 
                className='contact-remove'
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
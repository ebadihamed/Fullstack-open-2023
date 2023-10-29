import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/req'

const Persons = ({filtered, deletePerson}) => {
  return (
    <div>
      {filtered.map(value => 
        <div key={value.id}>
          <p>{value.name} {value.number}</p>
          <button onClick={() => deletePerson(value.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNote}>
        <div> name: <input value={props.name} onChange={props.noteChange}/> </div>
        <div> number: <input value={props.number} onChange={props.numberChange}/> </div>
        <div> <button type="submit">add</button> </div>
      </form>
  )
}

const Filter = ({newSearch, searchChange}) => {
  return(
    <div> 
      filter shown with: <input value={newSearch} onChange={searchChange}/> 
    </div>
  )
}

const Notification = ({message}) => {
  if (message == null) {
    return null
  }
  return(
    <div className='message'>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(returned => setPersons(returned))
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const found = persons.some(value => value.name === newName)
  
    if (found){
      if (window.confirm(`${newName} is already added to phonebook, do you want to replace the number?`)) {
        const finder = persons.find(n => n.name == newName)
        const changedPerson = { ...finder, number: newNumber}
        personService.replace(finder.id, changedPerson).then(response => {setPersons(persons.map(n => n.id !== finder.id ? n : response))})
        setErrorMessage(`${newName}'s number has been replaced`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else {
      personService.create(nameObject).then(returned => {
        setPersons(persons.concat(returned))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`${newName} phone contact has been created`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage(error.response.data)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    }
  }
  const noteChange = (event) => {
    setNewName(event.target.value)
  }
  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const searchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const filteredPersons = persons.filter((person) => person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase()))

  const deletePersonOf = (id) => {

    if (window.confirm(`delete person with id ${id}`)) {
      personService.deleted(id).then(returned => setPersons(persons.filter(n => n.id !== id)))
      setErrorMessage(`number has been deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <div>
        <Filter newSearch={newSearch} searchChange={searchChange} />
      </div>

      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} addNote={addNote} noteChange={noteChange} numberChange={numberChange} />

      <h2>Numbers</h2>
      <Persons filtered={filteredPersons} deletePerson={deletePersonOf}/>
    </div>
  )

}

export default App
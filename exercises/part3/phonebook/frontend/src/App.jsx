import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterArray, setFilterArray] = useState([])
  const [notificationMessage, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState({})


  const addPerson = (event) => {
    event.preventDefault()
    const sameElement = persons.find((person) => person.name == newName) //if the person name exists
    // console.log(sameElement)

    if (sameElement == undefined) {
      //create new person object
      const PersonObject = {
        name: newName, number: newNumber
      }

      personService
        .create(PersonObject)
        .then(returnedPerson => {
          //console.log("check", returnedNote)
          //update lists
          //Notification
          setNotificationColor({ color: 'green' })
          setNotification(
            `Added ${PersonObject.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          //

          setPersons(persons.concat(returnedPerson))
          setFilterArray(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error("Error creating person:", error);
        });


    }
    else {
      const update = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if (update) {
        const changedPerson = { ...sameElement, number: newNumber } //change only the number
        personService
          .update(sameElement.id, changedPerson)
          .then(updatedPerson => {
            //console.log("PERSON", deletedPerson)
            console.log(`Successfully updated number of person with id ${updatedPerson.id}`);
            //update the lists
            setNotificationColor({ color: 'green' })
            setNotification(
              `Successfully updated number of ${updatedPerson.name}`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)

            setPersons(persons.map(person =>
              person.id === updatedPerson.id ? updatedPerson : person
            ))
            setFilterArray(persons.map(person =>
              person.id === updatedPerson.id ? updatedPerson : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error(`Error updating person ${newName}:`, error);
            setNotificationColor({ color: "red" })
            setNotification(`Information about ${newName} has already been removed from the server`)


          })



      }
    }

  }

  // console.log(persons)
  //console.log(newName)
  useEffect(() => {
    personService
      .getAll()
      .then(InitialPersons => {
        setPersons(InitialPersons)
        setFilterArray(InitialPersons)
      })
      .catch(error => {
        console.error("Error fetching initial persons:", error);
      })
  }, [])


  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    console.log(persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    setFilterArray(persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))

  }
  // console.log("filterArray", filterArray)
  // console.log("persons", persons)


  const toggleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {

      //console.log("ID", person.id)
      personService
        .delete_(person.id)
        .then(deletedPerson => {
          console.log(`Successfully deleted person with id ${deletedPerson.id}`);
          //update lists
          setPersons(persons.filter(person => person.id !== deletedPerson.id));
          setFilterArray(filterArray.filter(person => person.id !== deletedPerson.id));
        })
        .catch(error => {
          console.error(`Error deleting person ${deletedPerson.name}:`, error);
          setNotificationColor({ color: "red" })
          setNotification(`Information about ${deletedPerson.name} has already been removed from the server`)


        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification color={notificationColor} message={notificationMessage} />
      <Filter onChange={handleFilter} />
      <h2>add new</h2>
      <PersonForm onSubmit={addPerson} onChangeName={handleNewName} onChangeNumber={handleNewNumber} valueNewName={newName} valueNewNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons personsFilterArray={filterArray} deleteHandle={toggleDelete} />
    </div>
  )
}

export default App






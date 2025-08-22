const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.5jd1l6f.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

//set mongoose to not use strict query
mongoose.set('strictQuery', false)
//connect to the database
mongoose.connect(url)

// Define a schema and model for the notes
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// Create a model from the schema
const Person = mongoose.model('Person', personSchema)

const person = new Person({
    "name": name,
    "number": number,
})





if (process.argv.length < 5) {
    // If no name and number are provided, list all persons
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else {
    // If name and number are provided, save the new person
    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

// person.save().then(result => {
//     console.log(`Adding ${name} number ${number} to phonebook`)
//     mongoose.connection.close()
// })

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })
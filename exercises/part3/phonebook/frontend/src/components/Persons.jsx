const Persons = (props) => {
    //console.log("here", props.personsFilterArray)
    return (
        <>
            {props.personsFilterArray.map((person) => (
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={() => props.deleteHandle(person)} > delete</button>
                </div >
            ))}
        </>
    )
}

export default Persons
const PersonForm = (props) => {
    return (
        <>
            <form onSubmit={props.onSubmit}>
                <div>
                    name: <input value={props.valueNewName}
                        onChange={props.onChangeName} />
                </div>
                <div>number: <input value={props.valueNewNumber}
                    onChange={props.onChangeNumber} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm
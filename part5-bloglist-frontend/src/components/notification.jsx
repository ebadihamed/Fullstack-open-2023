const Notification = (props) => {
    const errorStyle = {
        color: 'red',
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 5,
    }
    const normalStyle = {
        color: 'green',
        borderStyle: 'solid',
        borderColor: 'green',
        borderWidth: 5,
    }
    if (props.message === '') return null
    if (props.value === true){
        return (
            <div style={normalStyle}>
                <h3>{props.message}</h3>
            </div>
        )
    } else{
        return (
            <div style={errorStyle}>
                <h3>{props.message}</h3>
            </div>
        )}

    }

export default Notification
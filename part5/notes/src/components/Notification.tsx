const Notification = ({ message }: any) => {
    if (!message) {
        return null
    }

    console.log(message);
    if (message.id === 1) {
        return <div className="popup-green">{message.message}</div>
    } else if (message.id === 2) {
        return <div className="popup-red">{message.message}</div>
    }




}

export default Notification
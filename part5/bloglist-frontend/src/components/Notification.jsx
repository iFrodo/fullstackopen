


const Notification = ({ message }) => {

    if (message === 1) {
        return (
            <div className='popup--green'>
                Blog was created
            </div>
        )
    }
    if (message === 2) {
        return (
            <div className='popup--red'>
                wrond credentials
            </div>
        )
    }
}
export default Notification
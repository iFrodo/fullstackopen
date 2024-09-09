import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotify } from '.././reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(removeNotify())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
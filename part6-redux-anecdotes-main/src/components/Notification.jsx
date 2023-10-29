import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification} from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? '' : 'none'
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(showNotification(''))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
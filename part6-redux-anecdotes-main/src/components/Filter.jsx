import { useDispatch, useSelector } from "react-redux"
import {filterChange} from '../reducers/filterReducer'



const Filter = () => {
    const show = useSelector(state => state)
    const dispatch = useDispatch()
    const handleChange = (event) => {
        event.preventDefault()
        let filter = event.target.value
        dispatch(filterChange(filter))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter
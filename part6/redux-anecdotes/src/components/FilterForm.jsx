import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/store"

const FilterForm = () => {
    const dispatch = useDispatch()
    const filterHandler = (e) => {
        e.preventDefault()
        dispatch(setFilter(e.target.value))
    }

    return (<>
        <h2>Filter</h2>
        <input name="filter" type="text" onChange={(e) => { filterHandler(e) }} />

    </>)

}

export default FilterForm
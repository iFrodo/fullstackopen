import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
//при выборе одной из радио кнопок в стор диспатчитса экш с значением радиокнокпки,
//в зависимости от значения в стейте,  компонент Notes  через useSelector выгребается стейт, по умолчанию значение Filter = 'ALL'
//если filter:"ALL" вернуть весь массив notes,если filter:"IMPORTANT" ?  notes.filter(note => note.important): notes.filter(note => !note.important)

const VisibilityFilter = (props) => {
    const dispatch = useDispatch()

    return (
        <div>
            all
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('ALL'))}
            />
            important
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('IMPORTANT'))}
            />
            nonimportant
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('NONIMPORTANT'))}
            />
        </div>
    )
}

export default VisibilityFilter
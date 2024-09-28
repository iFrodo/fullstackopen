import {useState} from "react";
//хук принимает тип инпута, возвращает функцию изменения состояние и состояние
const useValue = (type) => {
    const [value, setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const reset = () => {
        setValue('')
    }
    return {
        type,
        value,
        onChange,
        reset
    }
}
export default useValue;
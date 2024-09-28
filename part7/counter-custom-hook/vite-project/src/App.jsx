import {useState} from 'react'


const useCounter = () => {
    const [counter, setCounter] = useState(0)
    const increase = () => {
        setCounter(counter + 1)
    }
    const decrease = () => {
        setCounter(counter - 1)
    }
    const zero = () => {
        setCounter(0)
    }

    return {
        counter,
        increase,
        decrease,
        zero
    }

}
const LeftRightApp = () => {
    const left = useCounter();
    const right = useCounter();
    return (
        <>
            <div>{left.counter}
                <button onClick={left.increase}>left</button>
            </div>
            <div>
                right:{right.counter}
                <button onClick={right.increase}>right</button>
            </div>
        </>

    )
}

function App() {
    const counter = useCounter()

    return (
        <>
            <div>{counter.counter}</div>
            <button onClick={counter.increase}>plus</button>
            <button onClick={counter.decrease}>minus</button>
            <button onClick={counter.zero}>zero</button>
            <LeftRightApp />
        </>
    )
}

export default App

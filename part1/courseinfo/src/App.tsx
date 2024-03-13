import { useState } from "react";

const App = () => {

  const CounterComp = () => {
    //<stateInit
    let [counter, setCounter] = useState(0);
    //stateInit>
    //<handlers
    const increaseCounter = () => setCounter(counter + 1);
    const resetCounter = () => setCounter(0);
    const minusCounter = () => setCounter(counter - 1);
    //handlers>
    //components
    const DisplayCount = ({ counter }: { counter: number }) => <div>{counter}</div>;
    const IncreaseButton = ({ increaseCounter, text }: { increaseCounter: React.MouseEventHandler<HTMLButtonElement>, text: string }) => <button onClick={increaseCounter}>{text}</button>;
    const ResetButton = ({ resetCounter, text }: { resetCounter: React.MouseEventHandler<HTMLButtonElement>, text: string }) => <button onClick={resetCounter}>{text}</button>;
    const MinusButton = ({ minusCounter, text }: { minusCounter: React.MouseEventHandler<HTMLButtonElement>, text: string }) => <button onClick={minusCounter}>{text}</button>;
    //components
    return (
      <>
        <DisplayCount counter={counter} />
        <IncreaseButton increaseCounter={increaseCounter} text={'Increase'} />
        <ResetButton resetCounter={resetCounter} text={'Reset'} />
        <MinusButton minusCounter={minusCounter} text={'Minus'} />
      </>
    )
  }
  return (
    <>
      <CounterComp />
      <CounterComp />
      <CounterComp />
      <CounterComp />
      <CounterComp />
    </>
  )
};
export default App
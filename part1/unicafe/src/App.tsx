
import { useState } from "react";


const StatisticsLine = ({ text, value }: { text: string, value: number }) => {
  if (text === 'average' && value === 0) {
    return (
      <tr>
        <td >
          No statistics given, or good === bad
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    );
  }
};

const Button = ({ handler, text }: { handler: Function, text: string }) => {
  return (
    <>
      <button onClick={handler(text)}>{text}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const average = (good: number, neutral: number, bad: number) => {
    const total = good + neutral + bad;
    if (total === 0) {
      return 0;
    }
    const score = good - bad;
    return score / total;
  }

  const handler = (who: string) => {
    const adaptiveFunc = () => {
      if (who === 'good') {
        setGood(good + 1)
        setAll(all + 1)
      } else if (who === 'neutral') {
        setNeutral(neutral + 1)
        setAll(all + 1)
      } else { setBad(bad + 1); setAll(all + 1) }

    }
    return adaptiveFunc
  }

  return (
    <>
      <div>
        <h2>give feedback</h2>
        <Button handler={handler} text={'good'} />
        <Button handler={handler} text={'neutral'} />
        <Button handler={handler} text={'bad'} />
      </div>
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticsLine text={'good'} value={good} />
            <StatisticsLine text={'neutral'} value={neutral} />
            <StatisticsLine text={'bad'} value={bad} />
            <StatisticsLine text={'average'} value={average(good, neutral, bad)} />
          </tbody>
        </table>
      </>
    </>
  )
}

export default App
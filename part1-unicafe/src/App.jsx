import { useState } from 'react'


const Button = ({handleclicks, text}) => <button onClick={handleclicks}>{text}</button>


const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = (props) => {
  if (props.all === 0){
    return(
      <div>
        <p>no feedback given</p>
        </div>
    )
  }
  return (
    <div>
      <table>
         <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all'value={props.all} />
          <StatisticLine text='average' value={(props.good * 1 + props.neutral * 0 + props.bad * -1) /props.all} />
          <StatisticLine text='positive' value={(props.good/props.all)*100}  />
        </tbody>
      </table>
    </div>
  )
} 


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleclicks={() => setGood(good + 1)} text={'good'}/>
        <Button handleclicks={() => setNeutral(neutral + 1)} text={'neutral'}/>
        <Button handleclicks={() => setBad(bad + 1)} text={'bad'}  />
      </div>
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} all={good+bad+neutral} />
    </div>
  )
}

export default App

const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return(
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  
  const Content = (props) => {
    return(
      <div>
        {props.parts.map((part) => (<Part key={part.id} name={part.name} exercises={part.exercises} />))}
      </div>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce((s, p) => s + p.exercises,0)
    return <h5>total of {total} exercises</h5>
  }
  
const Course = (props) => {  
    return(
      <div>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

  export default Course
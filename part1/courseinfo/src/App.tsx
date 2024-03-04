const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props: any) => {
    return (
      <h1>{props.courseName}</h1>
    )
  };

  const Content = (props: any) => {
    return (
      props.parts.map((e: any, index:number) => { return <p key={index}> {e.name} {e.exercises} </p> })
    )
  };
//map((e: any) => { summ += e.exercises })
  const Total = (props: any) => {
    let summ = 0;
    props.parts.forEach((e:any) => summ += e.exercises)
    return (
      summ
    )
  };

  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
};
export default App
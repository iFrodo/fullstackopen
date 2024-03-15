import { useState } from "react"
import { Course } from "./components/Course";



const App = () => {
  const course = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]

  },
  {
    id: 2,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 50,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 3,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 65,
        id: 3
      }
    ]

  },
  {
    id: 3,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 153,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 32,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 54,
        id: 3
      }
    ]

  }]
  return (
    <>
      {course.map((course) => { return <Course key={course.id} course={course} /> })}

    </>
  )
};



export default App







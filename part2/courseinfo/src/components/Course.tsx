import { Part } from "./Part";


export const Course = ({ course }) => {
    const totalOfExercises = course.parts.reduce((acc, part) => acc + part.exercises, 0);
    return (
        <>
            <h2>{course.name}</h2>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
            <div><b>Total of exercises: {totalOfExercises}</b></div>
        </>
    )
}
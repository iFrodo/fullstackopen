const calculateExercises = (array: Array<number>, target: number) => {
    interface resultObj {
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number
    }

    let sumOfDays: number = 0;

    const periodLength = array.length

    let trainingDays = 0

    array.forEach((e) => {
        if (e > 0) {
            trainingDays += 1
        }
        sumOfDays += e
    })

    let average = (sumOfDays / array.length)
    let success: boolean = false;

    if (average >= target) {
        success = true
    }

    let rating: number
    let ratingDescription: string

    if (average >= target) {
        rating = 3
        ratingDescription = "Awesome, go on!"
    } else if (average >= target * 0.75) {
        rating = 2
        ratingDescription = 'You can do it better'
    } else {
        rating = 1
        ratingDescription = 'Very bad'
    }

    const result: resultObj = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }

    console.log(result)
}

calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1)
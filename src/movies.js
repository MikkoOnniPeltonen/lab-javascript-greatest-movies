// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {

    let getAllDirectorsArray = moviesArray.map(movie =>
        movie.director)
    


    return [...new Set(getAllDirectorsArray)]
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {

    let stevenDramas = moviesArray.filter(movie => movie.director === "Steven Spielberg" && movie.genre.includes("Drama"))


    return stevenDramas.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {

    if (moviesArray.length === 0) {
        return 0
    }

    let averageScore = moviesArray.reduce((total, current) => 
    {
        if (!current.score) {
            return total
        }
        return total + current.score
        
    }, 0)

    return Number((averageScore / moviesArray.length).toFixed(2))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

    let averageDrama = moviesArray.filter(movie => movie.genre.includes("Drama"))

    return scoresAverage(averageDrama)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    let moviesOrderedByYear = [...moviesArray]

    moviesOrderedByYear.sort((a, b) => {

        if (a.year === b.year) {
            return a.title.localeCompare(b.title)
        }
        return a.year - b.year
    })

    return moviesOrderedByYear
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    let moviesOrderedByTitle = [...moviesArray]
    let onlyTitles = moviesOrderedByTitle.sort((a, b) => a.title.localeCompare(b.title)).map(movie => movie.title)
    return onlyTitles.slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {

    let newArrayForTimeFormat = [...moviesArray]

    let newArrayOfMoviesInMinutes = newArrayForTimeFormat.map(movie => {
        const duration = movie.duration
        let minutes = 0
        if (duration.includes('h')) minutes += parseInt(duration.split('h')[0]) * 60
        if (duration.includes('min')) minutes += parseInt(duration.split(' ')[duration.split(' ').length - 1])
        return { ...movie, duration: minutes }
      })

    return newArrayOfMoviesInMinutes

}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    if (moviesArray.length === 0) {
        return null
    }
    
    const yearlyScores = {}
    moviesArray.forEach(({ year, score }) => {
      if (!yearlyScores[year]) yearlyScores[year] = []
      yearlyScores[year].push(score)
    });
    let bestYear; let highestAvg = 0

    for (const year in yearlyScores) {
      const avg = yearlyScores[year].reduce((acc, score) => acc + score, 0) / yearlyScores[year].length;
      if (avg > highestAvg || (avg === highestAvg && year < bestYear)) {
        highestAvg = avg;
        bestYear = year;
      }
    }
    return `The best year was ${bestYear} with an average score of ${highestAvg}`;
}

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {

    let multipleMovies = {}

    let getAllDirectorsArray = moviesArray.map((movie) => {
        return movie.director
    })

    getAllDirectorsArray.forEach( director => {
        if (director in multipleMovies) {
            multipleMovies.director += 1
        }
        multipleMovies.director = 1

        return multipleMovies
    })

    getAllDirectorsArray.filter( director => director === 1)

    return getAllDirectorsArray
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {

    let stevenDramas = moviesArray.filter((movie) => {
        return movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    })


    return stevenDramas.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {

    if (moviesArray.length === 0) {
        return 0
    }

    let averageScore = moviesArray.reduce((total, current) => {
        if (typeof current.score === 'number') {
            current.score = current.score
        }
        else {
            current.score = 0
        }
        return total + current.score
        
    }, 0)

    return Math.round(averageScore / moviesArray.length * 100) / 100
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let averageDrama = moviesArray.filter((movie) => {
        return movie.genre.includes("Drama")
    })
    if (averageDrama.length === 0) {
        return 0
    }
    let scoreOfDramas = averageDrama.reduce((total, current) => {
        return total + current.score
    }, 0)

    return Math.round(scoreOfDramas / averageDrama.length * 100) / 100 
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
    moviesOrderedByTitle.sort((a, b) => a.title.localeCompare(b.title))
    let onlyTitles = moviesOrderedByTitle.map((movie) => movie.title)
    return onlyTitles.slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    let newArrayForTimeFormat = [...moviesArray]
    let moviesInMinutes = newArrayForTimeFormat.map((movie) => {
        const duration = movie.duration
        if (!duration.includes('h') && duration.endsWith('min')) {
            return { ...movie, duration: parseInt(duration.slice(0, -3)) }
        }
        else if (duration.includes('h') && duration.endsWith('min')) {
            const [hours, minutes] = duration.split(' ')
            return { ...movie, duration: parseInt(hours.charAt(0)) * 60 + parseInt(minutes.slice(0, -3)) }
        }
        else if (duration.length === 2 && duration.endsWith('h')) {
            return { ...movie, duration: parseInt(duration.charAt(0)) * 60 }
        }
    })
    return moviesInMinutes

}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    if (moviesArray.length === 0) {
        return null
    }
    if (moviesArray.length === 1) {
        return `The best year was ${moviesArray[0].year} with an average score of ${moviesArray[0].score}`
    }

    let highestAvg = 0
    let currentHigh = 0
    let movieCountPerYear = 0
    let bestYear = 0
    let moreThanOne = []


    let itIsOfficial = [...moviesArray]
    itIsOfficial.sort((a, b) => a.year - b.year)

    let officialBestYear = itIsOfficial.reduce((total, current, index) => {
        
        if (index === itIsOfficial.length -1) {
            if (total.year === current.year) {
                movieCountPerYear += 1
                currentHigh = total.score + current.score
                if ((currentHigh / movieCountPerYear) > highestAvg) {
                    highestAvg = currentHigh / movieCountPerYear
                    bestYear = total.year
                }
            }
            else if (total.year !== current.year && currentHigh === 0) {
                if (total.score > current.score && !highestAvg) {
                    highestAvg = total.score
                    bestYear = total.year
                    movieCountPerYear = 1
                }
                else if (total.score < current.score && !highestAvg) {
                    highestAvg = current.score
                    bestYear = current.year
                    movieCountPerYear = 1
                }
                else {
                    if (moreThanOne.length === 0) {
                        moreThanOne.push(total.year)
                        highestAvg = total.score
                    }
                    if (moreThanOne.length !== 0 && current.score > highestAvg) {
                        moreThanOne.pop()
                        moreThanOne.push(total.year)
                        highestAvg = total.score
                    }
                    movieCountPerYear = 1
                }
    
            }
            else {
                if (!highestAvg) {
                    highestAvg = currentHigh / movieCountPerYear
                    bestYear = total.year
                    currentHigh = 0
                    movieCountPerYear = 1
                }
    
                if ((currentHigh / movieCountPerYear) > highestAvg) {
                    highestAvg = currentHigh / movieCountPerYear
                    bestYear = total.year
                    currentHigh = 0
                    movieCountPerYear = 1
                }
                else if ((currentHigh / movieCountPerYear) < highestAvg) {
                    currentHigh = 0
                    movieCountPerYear = 1
                }
                else if ((currentHigh / movieCountPerYear) === highestAvg) {
                    if (moreThanOne.length === 0) {
                        moreThanOne.push(bestYear)
                    }
                    currentHigh = 0
                    movieCountPerYear = 1
                }

            
        }

        if (total.year === current.year) {
            movieCountPerYear += 1
            currentHigh = total.score + current.score
        }
        else if (total.year !== current.year && currentHigh === 0) {
            if (total.score > current.score) {
                highestAvg = total.score
                bestYear = total.year
                movieCountPerYear = 1
            }
            else if (total.score < current.score) {
                highestAvg = current.score
                bestYear = current.year
                movieCountPerYear = 1
            }
            else {
                if (moreThanOne.length === 0) {
                    moreThanOne.push(total.year)
                    highestAvg = total.score
                }
                if (moreThanOne.length !== 0 && current.score > highestAvg) {
                    moreThanOne.pop()
                    moreThanOne.push(total.year)
                    highestAvg = total.score
                }
                movieCountPerYear = 1
            }

        }
        else {
            if (!highestAvg) {
                highestAvg = currentHigh / movieCountPerYear
                bestYear = total.year
                currentHigh = 0
                movieCountPerYear = 1
            }

            if ((currentHigh / movieCountPerYear) > highestAvg) {
                highestAvg = currentHigh / movieCountPerYear
                bestYear = total.year
                currentHigh = 0
                movieCountPerYear = 1
            }
            else if ((currentHigh / movieCountPerYear) < highestAvg) {
                currentHigh = 0
                movieCountPerYear = 1
            }
            else if ((currentHigh / movieCountPerYear) === highestAvg) {
                if (moreThanOne.length === 0) {
                    moreThanOne.push(bestYear)
                }
                currentHigh = 0
                movieCountPerYear = 1
            }
                
        }
        }

        return { bestAverage: highestAvg, yearOfMovies: bestYear, currentAvg: currentHigh, moviesInAYear: movieCountPerYear, evenYears: moreThanOne }
    })

    if (officialBestYear.evenYears.length !== 0) {
        officialBestYear.yearOfMovies = officialBestYear.evenYears
    }

    let result = `The best year was ${officialBestYear.yearOfMovies} with an average score of ${officialBestYear.bestAverage}`
    return result

}

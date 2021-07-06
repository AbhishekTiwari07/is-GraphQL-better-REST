const fetch = require('node-fetch')

exports.handler = async () => {
    const url = process.env.GRAPHQL_ENDPOINT    
    const query = `
    query getMovieByGenre {
            movie_by_genre (
                value : {
                  genre : "Sci-Fi"
                },
              orderBy : [year_DESC]
            ){
                values{
                    title,
                  	year,
                		title,
                  	duration,
                  	synopsis,
                  	thumbnail
                }
            }
        }
    `

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            "x-cassandra-token" : process.env.DB_TOKEN
        },
        body: JSON.stringify({query})
    })

    try{
        const responseBody = await response.json()
        return {
            statusCode : 200,
            body: JSON.stringify(responseBody)
        }
    }
    catch(e){
        return {
            statusCode : 500,
            body: JSON.stringify(e)
        }
    }
}
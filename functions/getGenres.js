const fetch = require('node-fetch')

exports.handler = async () => {
    const url = process.env.GRAPHQL_ENDPOINT    
    const query = `
        query getAllGenre {
            reference_list (
                value : {
                    label : "genre"
                }
            ){
                values{
                    value
                }
            }
        }
    `
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "x-cassandra-token" : process.env.DB_TOKEN
            },
            body: JSON.stringify({query})
        })
    
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
# stockXcodingChallenge

The challenge:
Your goal is to create a service, preferably written in Go (https://golang.org), that will accept new
true-to-size data through the Hypertext Transfer Protocol (HTTP) and store this data in a relational
database, preferably Postgres. Additionally, this service should be able to return a shoe’s
TrueToSizeCalculation , defined below, through an HTTP request. True to size entries range between
1 and 5, inclusive, where 1: really small, 2: small, 3: true to size, 4: big and 5: really big.
TrueToSizeCalculation = average of the true to size entries for a given shoe

The result:
I used the express.js module to help build the routes.
I used body-parser to make parsing the bodies that much easier.
I used pg-promise to interact with the database.
My index.js file in the server folder is where my server lives, with there being only to routes i kept the logic here as well, though if I was working with a larger group I would want to modularize myself a bit more.
Inside of the database folder is where my helper functions live for my database. I perform some logic here but not much. The most complicated logic performed here is when i return the average when it is gnerated instead of returning all the values to be then used to make that leap.

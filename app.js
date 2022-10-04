const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotEnv = require ('dotenv')
const recipesRoute = require('./routes/recipes')
const userRoute = require('./routes/user')

dotEnv.config() 

const app = express()
const rootRouterV1 = express.Router();
const rootRouterV2 = express.Router();


//middleware
app.use(bodyParser.json())

app.use('/api/v1', rootRouterV1);
app.use('/api/v2', rootRouterV2);

rootRouterV1.use('/recipes',recipesRoute)
rootRouterV2.use('/recipes',recipesRoute)
rootRouterV1.use('/recipes/:recipeId', recipesRoute)
rootRouterV1.use('/recipes/:recipeId', recipesRoute)
rootRouterV1.use('/recipes/:recipedId', recipesRoute)
rootRouterV1.use('/users', userRoute )
rootRouterV1.use('/users/login', userRoute)

//connect to DB
console.log('Connecting to database...');
console.log(`DB_CONNECTION ${process.env.DB_CONNECTION}`)
mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if(err) {
        console.log(err.message);
        console.log(err.stack)
        return
    }

    console.log(`CONNECTED TO ${process.env.DB_CONNECTION}`)
    app.listen(process.env.PORT, () => {
        console.log(`APP is listening at port ${process.env.PORT}`)
    });
})


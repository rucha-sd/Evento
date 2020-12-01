const express = require( 'express')
const path = require( 'path')
require('./db/mongoose')
const userRouter = require( './router/User')
const eventRouter = require( './router/Event')
const categoryRouter = require( './router/Category')
const typeRouter = require( './router/Type')
const Category = require( './model/Category')
const Type = require( './model/Type')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/event', eventRouter)
app.use('/api/category', categoryRouter)
app.use('/api/type', typeRouter)

app.get('/api/typesAndCategories', async(req,res) =>{
    try{
        const Types =  await Type.find({}, {__v:0})
        const Categories =  await Category.find({}, {__v:0})
        res.status(201).send({error:false, Types, Categories})
    }
    catch(e)
    {
        res.status(400).send({error:true})
    }
})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',

    })
})
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
// make recipe router
const express = require('express');

const router = express.Router()

const Recipes = require('./recipes-model')

router.post('/', (req, res, next) => {
    const recipe = req.body
    Recipes.add(recipe)
        .then(recipe => {
            res.status(201).json(recipe)
        })
        .catch(next)
})

router.post('/:recipe_id', (req, res, next) => {
    const instruction = req.body
    const { recipe_id } = req.params

    Recipes.addInstruction(recipe_id, instruction)
        .then(allInstructions => {
            res.status(201).json(allInstructions)
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Recipes.getAll()
        .then(recipes => {
            res.json(recipes)
        })
        .catch(next)
})

router.get('/:recipe_id', (req, res, next) => {
    console.log(req)
    const { recipe_id } = req.params;

    Recipes.getById(recipe_id)
        .then(recipe => {
            res.json(recipe)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'Something went wrong inside of recipes-router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;
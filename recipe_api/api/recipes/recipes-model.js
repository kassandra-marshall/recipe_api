// make model functions for add recipe, add instructions, get recipe (left join from instructions and join recipes to it),
const db = require('../../data/db-config');

function add(recipe) {
    return db('recipes').insert(recipe)
        .then(([id]) => {
            return db('recipes').where('recipe_id', id).first()
        })
}

function addInstruction(recipe_id, instruction) {
    return db('recipe_instructions').insert({
        ...instruction,
        recipe_id
    })
        .then(() => {
            return db('recipe_instructions as ri')
                .join('recipes as r', 'ri.recipe_id', 'r.recipe_id')
                .select('recipe_name', 'instruction_number', 'instruction_value')
                .orderBy('instruction_number')
                .where('ri.recipe_id', recipe_id)
        })
}

function getAll () {
    return db('recipes as r')
        .select('recipe_name', 'ingredients', 'r.recipe_id')
        .count('ri.instruction_number as number_of_steps')
        .leftJoin('recipe_instructions as ri', 'r.recipe_id', 'ri.recipe_id')
        .groupBy('r.recipe_name')
}

async function getById(recipe_id) {
    const recipes = await db('recipes as r')
        .leftJoin('recipe_instructions as ri', 'r.recipe_id', 'ri.recipe_id')
        .where('r.recipe_id', recipe_id)
        .select('recipe_name', 'ingredients', 'instruction_number', 'instruction_value')
        .orderBy('instruction_number')
    const result = {
        recipe_name: recipes[0].recipe_name,
        ingredients: recipes[0].ingredients,
        instructions: []
    }

    recipes.forEach(recipe => {
      if (recipe.instruction_number) {
        result.instructions.push({
            instruction_number: recipe.instruction_number,
            instruction_value: recipe.instruction_value
        })
      }  
    });
    console.log(result);
    return result;
}

module.exports = {
    add,
    addInstruction,
    getAll,
    getById,
}
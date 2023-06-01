/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const recipes = [
  {recipe_name: 'foobar', ingredients: 'eggs, flour, cocoa powder'},
  {recipe_name: 'foobarbazz', ingredients: 'egg, flour, vanilla extract'}
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipes').truncate()
  await knex('recipes').insert(recipes);
};

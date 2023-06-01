/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const instructions = [
  {recipe_id: 1, instruction_number: 1, instruction_value: 'preheat oven'},
  {recipe_id: 1, instruction_number: 2, instruction_value: 'mix ingredients'},
  {recipe_id: 2, instruction_number: 1, instruction_value: 'preheat oven'},
  {recipe_id: 2, instruction_number: 2, instruction_value: 'mix ingredients'}
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipe_instructions').truncate()
  await knex('recipe_instructions').insert(instructions);
};

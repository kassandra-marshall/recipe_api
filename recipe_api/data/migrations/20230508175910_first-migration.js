/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('recipes', table => {
    table.increments('recipe_id')
    table.string('recipe_name').notNullable().unique()
    table.string('ingredients')
    table.string('instructions').references('instruction_value').inTable('recipe_instructions')
  })
  await knex.schema.createTable('recipe_instructions', table => {
    table.integer('recipe').references('recipe_id').inTable('recipes')
    table.integer('instruction_id')
    table.string('instruction_value')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('recipes')
  await knex.schema.dropTableIfExists('recipe_instructions')
};

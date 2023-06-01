/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
  .createTable('recipes', table => {
    table.increments('recipe_id')
    table.string('recipe_name').notNullable().unique()
    table.string('ingredients').notNullable()
  })
  .createTable('recipe_instructions', table => {
    table.increments('instruction_id')
    table.string('instruction_value').notNullable()
    table.integer('instruction_number')
    table.integer('recipe_id')
        .references('recipe_id')
        .inTable('recipes')
  })
};
// how do I insert into both tables at once in sqlitestudio? I want to test out adding an entry before I do the seeding and model functions

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('recipe_instructions')
  await knex.schema.dropTableIfExists('recipes')
};

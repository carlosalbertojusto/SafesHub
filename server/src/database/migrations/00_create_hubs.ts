import Knex from 'knex'

export async function up(knex: Knex) {
  // CREATE TABLE
  return knex.schema.createTable('hub', table => {
    table.increments('id').primary();
    table.string('nameHub').notNullable();
    table.string('zipcode').notNullable();
    table.string('uf',2).notNullable();
    table.string('city').notNullable();
    table.string('district').notNullable();
    table.string('street').notNullable();
    table.decimal('numberHouse').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();

  })

}


export async function down(knex: Knex) {
  // Voltar atras (DELETAR A TABELA)
  return knex.schema.dropTable('hub')
}

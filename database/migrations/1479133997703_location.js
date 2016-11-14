'use strict'

const Schema = use('Schema')

class LocationTableSchema extends Schema {

  up () {
    this.create('locations', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('address').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('locations')
  }

}

module.exports = LocationTableSchema

'use strict'

const Schema = use('Schema')

class EventTableSchema extends Schema {

  up () {
    this.create('events', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('address').notNullable()
      table.integer('creator_id').unsigned().references('id').inTable('users')
      table.integer('location_id').unsigned().references('id').inTable('locations')
      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }

}

module.exports = EventTableSchema

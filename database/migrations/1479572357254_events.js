'use strict'

const Schema = use('Schema')

class EventsTableSchema extends Schema {

  up () {
    this.create('events', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.text('description')
      table.integer('creator_id').unsigned().references('id').inTable('users')
      table.integer('location_id').unsigned().references('id').inTable('locations')
      table.date('event_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }

}

module.exports = EventsTableSchema

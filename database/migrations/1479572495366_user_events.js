'use strict'

const Schema = use('Schema')

class UserEventsTableSchema extends Schema {

  up () {
    this.create('user_events', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('event_id').unsigned().references('id').inTable('events')
    })
  }

  down () {
    this.drop('users_events')
  }

}

module.exports = UserEventsTableSchema

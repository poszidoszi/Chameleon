'use strict'

const Lucid = use('Lucid')

class Event extends Lucid {

  location () {
    return this.belongsTo('App/Model/Location')
  }

  creator () {
    return this.belongsTo('App/Model/User', 'id', 'creator_id')
  }

  comments () {
    return this.hasMany('App/Model/Comment', 'id', 'event_id')
  }

  participants () {
    return this.belongsToMany('App/Model/User', 'user_events')
  }

}

module.exports = Event

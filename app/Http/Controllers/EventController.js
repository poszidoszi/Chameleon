'use strict'

const Location = use('App/Model/Location')
const Event = use('App/Model/Event')
const Comment = use('App/Model/Comment')
const User = use('App/Model/User')
const Database = use('Database')

class EventController {

  * index (request, response) {
    yield response.sendView('events.index')
  }

  * create (request, response) {
    const options = yield this._locationOptions()

    yield response.sendView('events.create', {options})
  }

  * store (request, response) {
    const event = new Event()

    event.name = request.input('name')
    event.description = request.input('description')
    event.creator_id = request.currentUser.id
    event.location_id = request.input('location_id')
    event.event_date = request.input('event_date')

    yield event.save()

    response.redirect('/events')
  }

  * edit (request, response) {
    const event = yield Event.findBy('id', request.param('id'))
    const options = yield this._locationOptions()

    yield response.sendView('events.create', { options, event })
  }

  * update (request, response) {
    const event = yield Event.findBy('id', request.param('id'))

    event.name = request.input('name')
    event.description = request.input('description')
    event.location_id = request.input('location_id')
    event.event_date = request.input('event_date')

    yield event.save()

    response.redirect('/events')
  }

  * show (request, response) {
    const id = request.param('id')

    const events = yield Event.query()
      .where('id', id)
      .with('location', 'creator', 'comments', 'participants', 'comments.user')
      .fetch()

    const event = events.first().toJSON()
      
    yield response.sendView('events.details', { event })
  }

  * destroy (request, response) {
    const event = yield Event.findBy('id', request.param('id'))
    yield event.delete()

    response.redirect('/events')
  }

  * comment (request, response) {
    const id = request.param('id')

    const comment = new Comment()
    comment.comment = request.input('comment')
    comment.user_id = request.currentUser.id
    comment.event_id = id

    yield comment.save()
    
    response.redirect('/events/' + id)
  }

  * apply (request, response) {
    const id = request.param('id')
    const userId = request.currentUser.id

    const event = yield Event.find(id)
    const user = yield User.find(userId)

    // THIS IS BUGGY 
    // yield event.participants().save(user)

    yield Database
      .insert({ user_id: userId, event_id: id })
      .into('user_events')

    response.redirect('/events/' + id)
  }

  * _locationOptions() {
    const locations = yield Location.all()

    const options = {}

    locations.toJSON().forEach( location => options[location.id] = location.name )

    return options
  }

}

module.exports = EventController

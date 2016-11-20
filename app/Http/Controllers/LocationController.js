'use strict'

const Location = use('App/Model/Location')

class LocationController {

  * index (request, response) {
    yield response.sendView('locations.index')
  }

  * create (request, response) {
    yield response.sendView('locations.create')
  }

  * store (request, response) {
    const location = new Location()

    location.name = request.input('name')
    location.address  = request.input('address')
    location.user_id = request.currentUser.id

    yield location.save()

    response.redirect('/locations')
  }

  * destroy (request, response) {
    const location = yield Location.findBy('id', request.param('id'))
    yield location.delete()

    response.redirect('/locations')
  }

}

module.exports = LocationController

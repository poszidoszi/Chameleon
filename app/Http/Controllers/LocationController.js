'use strict'

const Location = use('App/Model/Location')

class LocationController {

	* show (request, response) {
		const locations = yield Location.all()

		yield response.sendView('locations.list', { locations : locations.toJSON() })
	}

	* create (request, response) {

		const location = new Location()
		location.name = request.param('name')
		location.address  = request.param('address')
		//TODO user

		yield location.save()


		const locations = yield Location.all()

		yield response.sendView('locations.list', { locations : locations.toJSON() })
	}

}

module.exports = LocationController

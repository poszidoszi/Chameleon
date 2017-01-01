'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')
const Event = use('App/Model/Event')

class UserController {

  * login (request, response) {
    const email = request.input('email')
    const password = request.input('password')

    var login

    try {
        login = yield request.auth.attempt(email, password)
    } catch (err) {
      yield response.sendView('users.login', { error: err })

      return
    }

    return response.redirect('/events')
  }

  * register (request, response) {
    const user = new User()

    user.username = request.input('name')
    user.email = request.input('email')
    user.password = yield Hash.make(request.input('password'))
    user.lastname = request.input('lastname')
    user.firstname = request.input('firstname')

    try {
      yield user.save()
    } catch (err) {
      yield response.sendView('users.registration', { error: err })

      return
    }
    

    yield request.auth.login(user)

    return response.redirect('/events')
  }

  * logout (request, response) {
    yield request.auth.logout()

    return response.redirect('/')
  }

  * profile (request, response) {
    const user = request.currentUser.toJSON()

    delete user.password
    yield response.sendView('users.profile', { user })
  }

  * editProfile (request, response) {
    const u = request.input('data')
    const user = request.currentUser

    user.firstname = u.firstname
    user.lastname = u.lastname
    user.username = u.username
    user.email = u.email

    yield user.save()

    response.ok({
      ok: 'ok'
    })
  }

  * setPassword (request, response) {
    const password = request.input('data')
    const user = request.currentUser

    if (password) {
      user.password = yield Hash.make(password)
    }

    yield user.save()

    response.ok({
      ok: 'ok'
    })
  }

  * myEvents (request, response) {
    const user = request.currentUser
    const id = user.id

    const events = yield Event.query().where('creator_id', id).fetch()
    response.ok({
      events
    })
  }
}

module.exports = UserController

'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

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

  * logout(request, response) {
    yield request.auth.logout()

    return response.redirect('/')
  }

}

module.exports = UserController

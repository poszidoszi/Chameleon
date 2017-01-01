'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')



// ==== Authentication

Route.get('/registration').render('users.registration')
Route.post('/registration', 'UserController.register')

Route.get('/login').render('users.login')
Route.post('/login', 'UserController.login')

Route.get('/logout', 'UserController.logout')

Route.get('/profile', 'UserController.profile')
Route.post('/profile', 'UserController.editProfile')
Route.post('/password', 'UserController.setPassword')

// ==== Events

Route.get('/').render('events.index')

Route.resource('events', 'EventController')
 .middleware({
    auth: ['create', 'store', 'edit', 'update', 'destroy']
 })

Route.post('/events/:id/comment', 'EventController.comment')
Route.get('/events/:id/apply', 'EventController.apply')
  .middleware('auth')

// ==== Locations

Route.resource('locations', 'LocationController')
  .except('show', 'edit', 'update')
  .middleware('auth')

// TODO: Show the user an error page
Route.on('*').render('errors.index')
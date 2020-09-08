// import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Play from '../views/PlayMovie.vue'
import UpdatePassword from '../views/UpdatePassword.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import SearchMovie from '../views/SearchMovie.vue'
import MovieDetails from '../views/MovieDetails.vue'


export default [
  { path: '/', component: Home },
  { path: '/register', component: Register},
  {
    path: '/reset/:id',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/play',
    name: 'play',
    component: Play
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/update_password',
    name: 'UpdatePassword',
    component: UpdatePassword
  },
  {
    path: '/search',
    name: 'SearchMovie',
    component: SearchMovie
  },
  {
    path: '/info/:id',
    name: 'MovieDetails',
    component: MovieDetails
  }

]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

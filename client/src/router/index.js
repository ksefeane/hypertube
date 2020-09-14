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
import Library from '../views/Library.vue'

export default [
    {   
        path: '/', 
        component: Home 
    },
    { 
        path: '/register', 
        component: Register
    },
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
        component: Play,
        meta: {requiresAuth: true}
    },
    {
        path: '/profile/',
        name: 'Profile',
        component: Profile,
        meta: {requiresAuth: true}
    },
    {
        path: '/update_password',
        name: 'UpdatePassword',
        component: UpdatePassword
    },
    {
        path: '/library',
        name: 'Library',
        component: Library,
        meta: {requiresAuth: true}
    },
    {
        path: '/search',
        name: 'SearchMovie',
        component: SearchMovie,
        meta: {requiresAuth: true}
    },
    {
        path: '/info/:id',
        name: 'MovieDetails',
        component: MovieDetails,
        meta: {requiresAuth: true}
    }
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

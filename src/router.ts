import Home from './pages/Home'
import Favorites from './pages/Favorites'

const route = [
  {
    path: '/home',
    component: Home,
    exact: false
  },
  {
    path: '/favorites',
    component: Favorites,
    exact: false
  }
]

export default route

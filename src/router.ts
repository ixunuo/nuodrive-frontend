import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Preview from './pages/Preview'

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
  },
  {
    path: '/preview',
    component: Preview,
    exact: false
  }
]

export default route

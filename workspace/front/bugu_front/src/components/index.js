import Logout from './Logout'

const components = [
	Logout
]
const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}
export default install

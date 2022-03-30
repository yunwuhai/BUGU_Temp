//计算属性
const getters ={
	keys: state => state.content.keys,//内容部分的key集合
	panes: state =>state.content.panes,//内容部分的选项卡
	activeKey: state=>state.content.activeKey,//当前处于展示状态的选项卡key

	collapsed: state =>state.slider.collapsed,//收起侧边栏
	expanded:	state =>state.slider.expanded,//树形菜单展开项
	selected: state =>state.slider.selected,//树形菜单选择项

	userInfo: state =>state.user.userInfo//用户信息
}
export default getters

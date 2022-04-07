//计算属性
const getters ={
	keys: state => state.content.keys,//内容部分的key集合
	panes: state => state.content.panes,//内容部分的选项卡
	activeKey: state=> state.content.activeKey,//当前处于展示状态的选项卡key

	collapsed: state => state.slider.collapsed,//收起侧边栏
	expanded:	state => state.slider.expanded,//树形菜单展开项
	selected: state => state.slider.selected,//树形菜单选择项

	userInfo: state => state.user.userInfo,//用户信息

	placement: state => state.data.placement,//抽屉展示位置
	visible: state => state.data.visible,//抽屉是否显示
	wrap: state => state.data.wrap,//抽屉外层样式
	title:state => state.data.title,//抽屉的标题
	tableData: state => state.data.tableData, //抽屉表格展示的数据
	cacheData: state => state.data.cacheData,//保存源数据

	desData: state => state.card.desData,//描述文件
	project: state => state.card.project,//项目信息 
	createVisible: state => state.card.createVisible,//新建弹窗的显示
}
export default getters

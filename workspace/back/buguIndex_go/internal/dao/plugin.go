/**
 * @Author: Anpw
 * @Description:
 * @File:  plugin
 * @Version: 1.0.0
 * @Date: 2021/9/10 14:46
 */

package dao

import (
	"bugu/internal/model"
)

func (d *Dao) GetFirstPluginList() ([]*model.Plugin, error) {
	plugin := model.Plugin{}
	return plugin.GetFirstPluginList(d.engine)
}

// GetNextPluginList 获取下级的所有插件
func (d *Dao) GetNextPluginList(pluginID uint) ([]*model.Plugin, error) {
	plugin := model.Plugin{FatherLevelID: pluginID}
	return plugin.GetNextPluginList(d.engine)
}

func (d *Dao) CountPlugin() (int, error) {
	plugin := model.Plugin{}
	return plugin.CountFirstPlugin(d.engine)
}

func (d *Dao) CountNextPlugin(pluginID uint) (int, error) {
	plugin := model.Plugin{FatherLevelID: pluginID}
	return plugin.CountNextPlugin(d.engine)
}

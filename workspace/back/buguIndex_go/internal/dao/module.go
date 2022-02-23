/**
 * @Author: Anpw
 * @Description:
 * @File:  module
 * @Version: 1.0.0
 * @Date: 2021/6/3 22:04
 */

package dao

import (
	"bugu/internal/model"
	"github.com/jinzhu/gorm"
)

func (d *Dao) GetModuleList(pluginID uint) ([]*model.Module, error) {
	module := model.Module{PluginID: pluginID}
	return module.GetModuleList(d.engine)
}

func (d *Dao) CountModuleList(pluginID uint) (int, error) {
	module := model.Module{PluginID: pluginID}
	return module.CountModule(d.engine)
}

func (d *Dao) GetModule(id uint) (model.Module, error) {
	module := model.Module{Model: &gorm.Model{ID: id}}
	return module.Get(d.engine)
}
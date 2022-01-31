/**
 * @Author: Anpw
 * @Description:
 * @File:  module
 * @Version: 1.0.0
 * @Date: 2021/5/26 16:43
 */

package model

import (
	"github.com/jinzhu/gorm"
)

// Module isFunc字段 1是函数模块 2是模板模块
type Module struct {
	*gorm.Model
	ModuleName         string `json:"module_name" gorm:"type:varchar(255)"`
	ModuleIntroduction string `json:"module_introduction" gorm:"type:varchar(255)"`
	PluginID           uint   `json:"plugin_id" gorm:"type:varchar(64)"`
	IsFunc             uint   `json:"is_func" gorm:"type:char(1)"`
}

func (m Module) TableName() string {
	return "bugu_module"
}

func (m Module) GetModuleList(db *gorm.DB) ([]*Module, error) {
	var modules []*Module
	var err error
	if m.PluginID != 0 {
		db = db.Where("plugin_id = ?", m.PluginID)
	}
	if err = db.Find(&modules).Error; err != nil {
		return nil, err
	}
	return modules, nil
}

// CountModule 获取所有模块的数量
func (m Module) CountModule(db *gorm.DB) (int, error) {
	var count int
	if m.PluginID != 0 {
		db = db.Where("plugin_id = ?", m.PluginID)
	}
	if err := db.Where("deleted_at is null").Model(&m).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}

func (m Module) Get(db *gorm.DB) (Module, error) {
	var module Module
	db = db.Where("id = ?", m.ID)
	err := db.First(&module).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return module, err
	}
	return module, nil
}
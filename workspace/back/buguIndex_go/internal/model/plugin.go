/**
 * @Author: Anpw
 * @Description:
 * @File:  plugin
 * @Version: 1.0.0
 * @Date: 2021/5/26 16:21
 */

package model

import (
	"github.com/jinzhu/gorm"
)

// Plugin level相关字段是满足多级目录要求，level表示当前级别，fatherLevel是父插件id
//针对祖宗插件，他的上级插件id是他自己
type Plugin struct {
	*gorm.Model
	PluginName         string `json:"plugin_name" gorm:"type:varchar(255)"`
	PluginIntroduction string `json:"plugin_introduction" gorm:"type:varchar(255)"`
	FileMaskCode       string `json:"file_mask_code" gorm:"type:varchar(255)"`
	ChipID             uint   `json:"chip_id" gorm:"type:varchar(64)"`
	Level              uint   `json:"level" gorm:"type:char(1)"`
	FatherLevelID      uint   `json:"father_level_id" gorm:"type:char(1)"`
}

func (p Plugin) TableName() string {
	return "bugu_plugin"
}

// GetNextPluginList 获取下一级的所有插件
func (p Plugin) GetNextPluginList(db *gorm.DB) ([]*Plugin, error) {
	var plugins []*Plugin
	var err error
	if err = db.Where("father_level_id = ?", p.FatherLevelID).Find(&plugins).Error; err != nil {
		return nil, err
	}
	return plugins, nil
}

// GetFirstPluginList 获取一级插件
func (p Plugin) GetFirstPluginList(db *gorm.DB) ([]*Plugin, error) {
	var plugins []*Plugin
	var err error
	if err = db.Where("level = ?", 1).Find(&plugins).Error; err != nil {
		return nil, err
	}
	return plugins, nil
}

// CountFirstPlugin 获取一级插件的数量
func (p Plugin) CountFirstPlugin(db *gorm.DB) (int, error) {
	var count int
	if err := db.Where("level = ? AND deleted_at is null", 1).Model(&p).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}

func (p Plugin) CountNextPlugin(db *gorm.DB) (int, error) {
	var count int
	if p.FatherLevelID != 0 {
		db = db.Where("father_level_id = ?", p.FatherLevelID)
	}
	if err := db.Model(&p).Where("deleted_at is null").Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}
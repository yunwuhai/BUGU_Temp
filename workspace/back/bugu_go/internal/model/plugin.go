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

func (p Plugin) Create(db *gorm.DB) error {
	return db.Create(&p).Error
}

func (p Plugin) Update(db *gorm.DB, values interface{}) error {
	return db.Model(&p).Updates(values).Where("id = ?", p.Model.ID).Error
}

func (p Plugin) Get(db *gorm.DB) (Plugin, error) {
	var plugin Plugin
	db = db.Where("id = ?", p.Model.ID)
	err := db.First(&plugin).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return plugin, err
	}
	return plugin, nil
}

func (p Plugin) GetPluginList(db *gorm.DB, pageOffset, pageSize int) ([]*Plugin, error) {
	var plugins []*Plugin
	var err error
	if pageOffset >= 0 && pageSize > 0 {
		db = db.Offset(pageOffset).Limit(pageSize)
	}
	if p.ChipID != 0 {
		db = db.Where("chip_id = ?", p.ChipID)
	}
	if err = db.Find(&plugins).Error; err != nil {
		return nil, err
	}
	return plugins, nil
}

func (p Plugin) GetByPluginName(db *gorm.DB) (Plugin, error) {
	var plugin Plugin
	db = db.Where("plugin_name = ?", p.PluginName)
	err := db.First(&plugin).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return plugin, err
	}
	return plugin, nil
}

func (p Plugin) Delete(db *gorm.DB) error {
	if err := db.Where("id = ?", p.Model.ID).Delete(&p).Error; err != nil {
		return err
	}
	return nil
}

func (p Plugin) Count(db *gorm.DB) (int, error) {
	var count int
	if p.ChipID != 0 {
		db = db.Where("chip_id = ?", p.ChipID)
	}
	if err := db.Model(&p).Where("deleted_at is null").Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}

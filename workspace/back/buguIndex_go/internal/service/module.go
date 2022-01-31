/**
 * @Author: Anpw
 * @Description:
 * @File:  module
 * @Version: 1.0.0
 * @Date: 2021/9/10 17:34
 */

package service

import (
	"bugu/internal/model"
	"github.com/jinzhu/gorm"
)

type ModuleRequest struct {
	PluginID uint `json:"plugin_id" form:"plugin_id" binding:"max=100"`
}

type GetModuleRequest struct {
	ID uint `json:"id" form:"id" binding:"required,gte=1"`
}

type Module struct {
	*gorm.Model
	ModuleName         string `json:"module_name"`
	ModuleIntroduction string `json:"module_introduction"`
	PluginID           uint   `json:"plugin_id"`
}

func (svc *Service) GetModuleList(param *ModuleRequest) ([]*model.Module, error) {
	return svc.dao.GetModuleList(param.PluginID)
}

func (svc *Service) CountModule(param *ModuleRequest) (int, error) {
	return svc.dao.CountModuleList(param.PluginID)
}

func (svc *Service) GetModule(param *GetModuleRequest) (*Module, error) {
	module, err := svc.dao.GetModule(param.ID)
	if err != nil {
		return nil, err
	}
	return &Module{
		Model:              &gorm.Model{ID: module.ID, CreatedAt: module.CreatedAt},
		ModuleName:         module.ModuleName,
		ModuleIntroduction: module.ModuleIntroduction,
		PluginID:           module.PluginID,
	}, nil
}

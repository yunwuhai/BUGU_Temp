/**
 * @Author: Anpw
 * @Description:
 * @File:  plugin
 * @Version: 1.0.0
 * @Date: 2021/9/10 14:49
 */

package service

import (
	"bugu/internal/model"
)

type GetNextPluginListRequest struct {
	PluginID uint `json:"plugin_id" form:"plugin_id" binding:"required"`
}

func (svc *Service) GetFirstPluginList() ([]*model.Plugin, error) {
	return svc.dao.GetFirstPluginList()
}

func (svc *Service) GetNextPluginList(param *GetNextPluginListRequest) ([]*model.Plugin, error) {
	return svc.dao.GetNextPluginList(param.PluginID)
}

func (svc *Service) CountFirstPlugin() (int, error) {
	return svc.dao.CountPlugin()
}

func (svc *Service) CountNextPlugin(param *GetNextPluginListRequest) (int, error) {
	return svc.dao.CountNextPlugin(param.PluginID)
}
/**
 * @Author: Anpw
 * @Description:
 * @File:  plugin_about_list
 * @Version: 1.0.0
 * @Date: 2021/6/3 20:02
 */

package plugin

import (
	"bugu/global"
	"bugu/internal/service"
	"bugu/pkg/app"
	"bugu/pkg/convert"
	"bugu/pkg/errcode"
	"github.com/gin-gonic/gin"
)

func (p Plugin) List(ctx *gin.Context) {
	response := app.NewResponse(ctx)
	svc := service.New(ctx.Request.Context())
	totalRows, err := svc.CountFirstPlugin()
	plugins, err := svc.GetFirstPluginList()
	if err != nil {
		global.Logger.Errorf("svc.GetPluginList err: %v", err)
		response.ToErrorResponse(errcode.ErrorGetPluginsFail.WithDetails(err.Error()))
		return
	}
	response.ToResponseList(plugins, totalRows)
	return
}

// NextLevelList 获取下一级别的所有插件
func (p Plugin) NextLevelList(ctx *gin.Context) {
	param := service.GetNextPluginListRequest{PluginID:convert.StrTo(ctx.Param("plugin_id")).MustUint()}
	response := app.NewResponse(ctx)
	valid, errs := app.BindAndValid(ctx, &param)
	if valid {
		global.Logger.Errorf("app.BindAndValid errs: %v", errs)
		response.ToErrorResponse(errcode.InvalidParams.WithDetails(errs.Errors()...))
		return
	}

	svc := service.New(ctx.Request.Context())
	totalRows, err := svc.CountNextPlugin(&service.GetNextPluginListRequest{
		PluginID: param.PluginID,
	})
	plugins, err := svc.GetNextPluginList(&param)
	if err != nil {
		global.Logger.Errorf("svc.GetPluginList err: %v", err)
		response.ToErrorResponse(errcode.ErrorGetPluginsFail.WithDetails(err.Error()))
		return
	}
	response.ToResponseList(plugins, totalRows)
	return
}
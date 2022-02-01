package routers

import (
	"bugu/internal/middleware"
	module2 "bugu/internal/routers/api/module"
	plugin2 "bugu/internal/routers/api/plugin"

	user2 "bugu/internal/routers/api/user"
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	r := gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.CrosHandler())
	r.Use(middleware.Translations())

	user := user2.NewUser()
	apiUser := r.Group("/api/v1/user")
	{
		apiUser.POST("/register", user.Register)
		apiUser.POST("/login", user.Login)
		apiUser.PUT("/update_code", user.UpdateCode)
	}

	plugin := plugin2.NewPlugin()
	apiPlugin := r.Group("/api/v1/plugins")
	apiPlugin.Use(middleware.JWT())
	{
		apiPlugin.GET("/list_first", plugin.List)
		apiPlugin.GET("/list/:plugin_id", plugin.NextLevelList)
	}

	module := module2.NewModule()
	apiModule := r.Group("/api/v1/modules")
	apiModule.Use(middleware.JWT())
	{
		apiModule.GET("/list", module.List)
		apiModule.GET("/list/:plugin_id", module.ListByPluginID)
		apiModule.GET("/:id", module.Get)
	}
	return r
}

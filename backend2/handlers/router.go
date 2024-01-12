package handlers

import (
	"github.com/gin-gonic/gin"
	"embed"

	"github.com/gin-contrib/cors"
	"time"
	"html/template"
	"path"
	"net/http"

	"PRITRAS/controller"

	socketio "github.com/googollee/go-socket.io"

	// user "PRITRAS/controller/user/company"
	user_workSpace "PRITRAS/controller/user/workSpace"
	workSpace "PRITRAS/controller/workSpace"
	workSpace_OKR "PRITRAS/controller/workSpace/okrs"
	workSpace_OKR_objective "PRITRAS/controller/workSpace/okrs/objective"
	objective "PRITRAS/controller/objective"
	okr "PRITRAS/controller/okr"
	keyResult "PRITRAS/controller/keyResult"
)


func InitRouter(router *gin.Engine, server *socketio.Server, templatesFS embed.FS, staticFS embed.FS) {
	router.Use(cors.New(cors.Config{
		AllowOrigins: 	  []string{"https://localhost:8080", "http://localhost:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 		  12 * time.Hour,
	}))
	
	// router.Use(GinMiddleware("https://localhost:8080"))
	// router.Use(GinMiddleware("http://localhost:8080"))

	router.GET("/socket.io/", gin.WrapH(server))
	router.POST("/socket.io/", func(context *gin.Context) {
		server.ServeHTTP(context.Writer, context.Request)
	})

	v1Api := router.Group("/api/user")
	{
		v1Api.GET("/company/:companyCode", controller.UserController.GetUsers)
		// v1Api.GET("/company/:companyCode/workSpaces", user_workSpaces.GetWorkSpaces)
		v1Api.GET("/:UID/workSpaces", user_workSpace.GetUserOfWorkSpaceController)
	}
	v2Api := router.Group("/api/workSpace") 
	{
		v2Api.GET("/:workSpaceId", workSpace.GetWorkSpace)
		v2Api.POST("/", workSpace.InsertWorkSpace)

		v2Api_OKRApi := v2Api.Group("/:workSpaceId/OKR")
        {
            v2Api_OKRApi.GET("/:OKRId", workSpace_OKR.GetWorkSpace_OKR_OKRId_ROUTER)
			v2Api_OKRApi.GET("/:OKRId/objectives", workSpace_OKR_objective.GetObjective_OKRId_ROUTER)
        }
	}
	v3Api := router.Group("/api/objective") 
	{
		// v3Api.GET("/:workSpaceId", objective.GetObjective)
		v3Api.POST("/", objective.InsertObjective)
	}
	v4Api := router.Group("/api/okr") 
	{
		v4Api.GET("/:workSpaceId", okr.GetOKR)
		v4Api.POST("/", okr.InsertOKR)
	}
	v5Api := router.Group("/api/keyResult") 
	{
		v5Api.PUT("/", keyResult.InsertKeyResult_ROUTER)
	}

	router.SetFuncMap(template.FuncMap{})
	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", nil)
	})
	/* vue build시 public/index.html에 박히는 코드가 /js/... 이므로 아래와 같이 router 설정 */
	router.GET("/js/*filepath", func(context *gin.Context) {
		context.FileFromFS(path.Join("/web/public", context.Request.URL.Path), http.FS(staticFS))
	})
	router.GET("/css/*filepath", func(context *gin.Context) {
		context.FileFromFS(path.Join("/web/public", context.Request.URL.Path), http.FS(staticFS))
	})
	router.GET("/fonts/*filepath", func(context *gin.Context) {
		context.FileFromFS(path.Join("/web/public", context.Request.URL.Path), http.FS(staticFS))
	})
	router.GET("/images/*filepath", func(context *gin.Context) {
		context.FileFromFS(path.Join("/web/public", context.Request.URL.Path), http.FS(staticFS))
	})
	// router.Static("/public", "../template/css")
    // router.Static("/static", "./web/templates")
	router.StaticFile("/favicon.ico", "./web/public/favicon.ico")
	LoadHTMLFromEmbedFS(router, templatesFS, "web/public/*")


	router.Run(":3000");
	// router.RunTLS(":3000", "./configs/localhost-cert.pem", "./configs/localhost-private.pem")
}

func LoadHTMLFromEmbedFS(engine *gin.Engine, em embed.FS, pattern string) {
	templ := template.Must(template.ParseFS(em, pattern))

	engine.SetHTMLTemplate(templ)
}


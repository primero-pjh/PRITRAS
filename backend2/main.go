package main

import (
	"embed"
	"html/template"
	"net/http"
	"path"
	"fmt"
	"log"
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
	// "github.com/dev-yakuza/study-golang/module/models"

	// "PRITRAS/controllers/appUsers"
	user "PRITRAS/controllers/user/company"
	workSpace "PRITRAS/controllers/workSpace"
	objective "PRITRAS/controllers/objective"
	okr "PRITRAS/controllers/okr"
	user_workSpace "PRITRAS/controllers/user/workSpace"
)

var (
	//go:embed web/public/*.html
	templatesFS embed.FS

	//go:embed web
	staticFS embed.FS
)

func GinMiddleware(allowOrigin string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Request.Header.Del("Origin")

		c.Next()
	}
}

func main() {
	router := gin.Default()
	server := socketio.NewServer(nil)
	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})
	server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
		fmt.Println("notice:", msg)
		s.Emit("reply", "have "+msg)
	})
	server.OnError("/", func(s socketio.Conn, e error) {
		// server.Remove(s.ID())
		fmt.Println("meet error:", e)
	})
	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		// Add the Remove session id. Fixed the connection & mem leak
		// server.Remove(s.ID())
		fmt.Println("closed", reason)
	})
	
	go func() {
		if err := server.Serve(); err != nil {
			log.Fatalf("socketio listen error: %s\n", err)
		}
	}()
	defer server.Close()

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
		v1Api.GET("/company/:companyCode", user.GetUsers)
		// v1Api.GET("/company/:companyCode/workSpaces", user_workSpaces.GetWorkSpaces)
		v1Api.GET("/:UID/workSpaces", user_workSpace.GetUserOfWorkSpaceController)
	}
	v2Api := router.Group("/api/workSpace") 
	{
		v2Api.GET("/:workSpaceId", workSpace.GetWorkSpace)
		v2Api.POST("/", workSpace.InsertWorkSpace)
	}
	v3Api := router.Group("/api/objective") 
	{
		v3Api.GET("/:workSpaceId", objective.GetObjective)
		v3Api.POST("/", objective.InsertObjective)
	}
	v4Api := router.Group("/api/okr") 
	{
		v4Api.GET("/:workSpaceId", okr.GetOKR)
		v4Api.POST("/", okr.InsertOKR)
	}


	router.SetFuncMap(template.FuncMap{})
	LoadHTMLFromEmbedFS(router, templatesFS, "web/public/*")
	
	
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
	router.Run(":3000");
	// router.RunTLS(":3000", "./configs/localhost-cert.pem", "./configs/localhost-private.pem")
}

func LoadHTMLFromEmbedFS(engine *gin.Engine, em embed.FS, pattern string) {
	templ := template.Must(template.ParseFS(em, pattern))

	engine.SetHTMLTemplate(templ)
}
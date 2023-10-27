package main

import (
	"embed"
	"html/template"
	"net/http"
	"path"
	// "fmt"

	"github.com/gin-gonic/gin"
)

var (
	//go:embed web/public/*.html
	templatesFS embed.FS

	//go:embed web
	staticFS embed.FS
)

func main() {
	router := gin.Default()

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
	// router.Static("/public", "../template/css")
    // router.Static("/static", "./web/templates")
	router.StaticFile("/favicon.ico", "./web/public/favicon.ico")
	router.RunTLS(":3000", "./config/localhost-cert.pem", "./config/localhost-private.pem")
}

func LoadHTMLFromEmbedFS(engine *gin.Engine, em embed.FS, pattern string) {
	templ := template.Must(template.ParseFS(em, pattern))

	engine.SetHTMLTemplate(templ)
}
package user

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func Get(c *gin.Context) {
	fmt.Println("/api/users/company/:companyCode")
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
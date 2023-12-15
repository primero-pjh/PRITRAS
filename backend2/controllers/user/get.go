package user

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func Get(c *gin.Context) {
	fmt.Println("/api/users/company/:companyCode")
	c.JSON(402, gin.H{
		"message": "pong",
	})
}
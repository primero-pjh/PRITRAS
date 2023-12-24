package user

import (
	// "fmt"
	// "log"
	"github.com/gin-gonic/gin"
	// "PRITRAS/database"

	"PRITRAS/entity"
)

func GetUsers(c *gin.Context) {
	companyCode := c.Param("companyCode")

    appUsers := entity.GetUsers(companyCode)

	c.JSON(200, gin.H {
		"success": 1,
		"appUsers": appUsers,
	})
}
package user

import (
	// "fmt"
	// "log"
	"github.com/gin-gonic/gin"
	"PRITRAS/entity"
)

func GetUserOfWorkSpaceController(c *gin.Context) {
	UID := c.Param("UID")

	workSpaces := entity.GetUserOfWorkSpace(UID)

	c.JSON(200, gin.H {
		"success": 1,
		"workSpaces": workSpaces,
	})
}
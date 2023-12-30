package okr

import (
	// "fmt"
	// "log"
	"github.com/gin-gonic/gin"
	"PRITRAS/entity"
)

func GetOKR(c *gin.Context) {
	workSpaceId := c.Param("workSpaceId")
	okrs := entity.GetOKROfWorkSpaceId(workSpaceId)

	c.JSON(200, gin.H {
		"success": 1,
		"okrs": okrs,
	})
}
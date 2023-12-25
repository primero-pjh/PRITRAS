package workSpace

import (
	// "fmt"
	// "log"
	"github.com/gin-gonic/gin"
	"PRITRAS/entity"
)

func GetWorkSpace(c *gin.Context) {
	workSpaceId := c.Param("workSpaceId")
	workSpace := entity.GetWorkSpaceOfWorkSpaceId(workSpaceId)

	c.JSON(200, gin.H {
		"success": 1,
		"workSpace": workSpace,
	})
}
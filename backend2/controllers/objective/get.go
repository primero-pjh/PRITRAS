package objective

import (
	// "fmt"
	// "log"
	"github.com/gin-gonic/gin"
	"PRITRAS/entity"
)

func GetObjective(c *gin.Context) {
	workSpaceId := c.Param("workSpaceId")
	objectives := entity.GetObjectiveOfWorkSpaceId(workSpaceId)

	c.JSON(200, gin.H {
		"success": 1,
		"objectives": objectives,
	})
}
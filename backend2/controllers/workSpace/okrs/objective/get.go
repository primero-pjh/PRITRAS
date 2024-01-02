package workSpace

import (
	// "fmt"
	// "log"
	"strconv"
	"github.com/gin-gonic/gin"
	"PRITRAS/entity"
)

// type OKRModelExt struct {
// 	entity.OKR
// 	OKRManagers 	[]entity.OKRManager
// }

func GetObjective_OKRId_ROUTER(c *gin.Context) {
	workSpaceId, _ := strconv.Atoi(c.Param("workSpaceId"))
	OKRId, _ := strconv.Atoi(c.Param("OKRId"))
	
	if OKRId == 0 || workSpaceId == 0 {
		c.JSON(403, gin.H {
			"message": "잘못된 API 요청입니다. 확인 후 다시 시도해주세요.",
		})
		return
	}

	// var returnData []OKRModelExt
	var objectives []entity.Objective
	objectives = entity.GetObjectiveOfOKRId(OKRId)

	c.JSON(200, gin.H {
		"success": 1,
		"objectives": objectives,
	})
}
package workSpace

import (
	// "fmt"
	// "log"
	"strconv"
	"github.com/gin-gonic/gin"
	"PRITRAS/entity"
)

type ObjectiveManagerExt struct {
	entity.Objective
	ObjectiveManagers 	[]entity.ObjectiveManagerExt
	KeyResults			[]entity.KeyResult
}

func GetObjective_OKRId_ROUTER(c *gin.Context) {
	workSpaceId, _ := strconv.Atoi(c.Param("workSpaceId"))
	OKRId, _ := strconv.Atoi(c.Param("OKRId"))
	
	if OKRId == 0 || workSpaceId == 0 {
		c.JSON(403, gin.H {
			"message": "잘못된 API 요청입니다. 확인 후 다시 시도해주세요.",
		})
		return
	}

	var returnData []ObjectiveManagerExt
	var objectives []entity.Objective
	objectives = entity.GetObjectiveOfOKRId(OKRId)

	for _, row := range objectives {
		returnData = append(returnData, ObjectiveManagerExt {
			Objective: entity.Objective {
				ObjectiveId: 	row.ObjectiveId,
				OKRId: 			row.OKRId,
				Title: 			row.Title,
				WriterUID: 		row.WriterUID,
				Body: 			row.Body,
				Status: 		row.Status,
				StartDate: 		row.StartDate,
				EndDate: 		row.EndDate,
				DateAdded: 		row.DateAdded,
			},
			ObjectiveManagers: entity.GetObjectiveManagerOfObjectiveId(row.ObjectiveId),
			KeyResults: entity.GetKeyResultOfObjectiveId(row.ObjectiveId),
		})
	}

	c.JSON(200, gin.H {
		"success": 1,
		"objectives": returnData,
	})
}
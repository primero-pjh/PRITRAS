package okr

import (
	// "fmt"
	// "log"
	// "strconv"
	"github.com/gin-gonic/gin"
	"PRITRAS/entity"
)

type OKRModelExt struct {
	entity.OKR
	OKRManagers 	[]entity.OKRManager
}

func GetOKR(c *gin.Context) {
	workSpaceId := c.Param("workSpaceId")
	
	if workSpaceId == "0" {
		c.JSON(403, gin.H {
			"message": "잘못된 API 요청입니다. 확인 후 다시 시도해주세요.",
		})
		return
	}

	var returnData []OKRModelExt
	var okrs []entity.OKR
	okrs = entity.GetOKROfWorkSpaceId(workSpaceId)

	for _, okr := range okrs {
		returnData = append(returnData, OKRModelExt {
			OKR: entity.OKR{
				OKRId:      okr.OKRId,
				WorkSpaceId: okr.WorkSpaceId,
				Title:      okr.Title,
				WriterUID:  okr.WriterUID,
				Body:       okr.Body,
				StartDate:  okr.StartDate,
				EndDate:    okr.EndDate,
				DateAdded:  okr.DateAdded,
			},
			OKRManagers: entity.GetOKRManagerOfOKRId(okr.OKRId),
		})
	}
	

	c.JSON(200, gin.H {
		"success": 1,
		"okrs": returnData,
	})
}
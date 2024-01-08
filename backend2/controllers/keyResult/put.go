package objective

import (
	"github.com/gin-gonic/gin"
	"fmt"
	// "time"
	"log"
	// "http"
	"strings"
	"PRITRAS/entity"
)

type RequestData struct {
	KeyResult     		entity.KeyResult 			`json:"KeyResult"`
}

func InsertKeyResult_ROUTER(c *gin.Context) {
	var requestData entity.KeyResult
	var error map[string]string			// 선언
	error = make(map[string]string)		// 초기화
	if err := c.BindJSON(&requestData); err != nil { // 바인딩할 떄 required에 빈 값이 드러온 경우.
		c.JSON(403, gin.H{
			"code":    403,
		})
		log.Print(err.Error())
		return
	}

	fmt.Println(requestData)
	if len(strings.TrimSpace(requestData.Title)) == 0 {
		error["Title"] = "필수입력 항목입니다."
	}
	if len(error) > 0 {
		c.JSON(403, gin.H{
			"error": error,
		})
		return
	}

	keyResultId := entity.InsertKeyResult(requestData)

	c.JSON(200, gin.H {
		"success": 1,
		"message": "핵심결과를 성공적으로 생성하였습니다.",
		"keyResultId": keyResultId,
	})
}
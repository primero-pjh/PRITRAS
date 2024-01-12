package okr

import (
	"github.com/gin-gonic/gin"
	"fmt"
	"time"
	"log"
	// "http"
	"strings"
	"PRITRAS/database"

	"PRITRAS/entity"
)

type UID_list struct {
	UID string
}

type RequestData struct {
	OKR     			entity.OKR 			`json:"OKR"`
	Managers 			[]entity.AppUser  			`json:"Managers"`
}

func InsertOKR(c *gin.Context) {
	var requestData RequestData
	var error map[string]string			// 선언
	error = make(map[string]string)		// 초기화
	if err := c.BindJSON(&requestData); err != nil { // 바인딩할 떄 required에 빈 값이 드러온 경우.
		c.JSON(403, gin.H{
			"code":    403,
		})
		log.Print(err.Error())
		return
	}

	if len(strings.TrimSpace(requestData.OKR.Title)) == 0 {
		error["Title"] = "필수입력 항목입니다."
	}
	if len(strings.TrimSpace(requestData.OKR.StartDate)) == 0 {
		error["StartDate"] = "필수입력 항목입니다."
	}
	if len(strings.TrimSpace(requestData.OKR.EndDate)) == 0 {
		error["EndDate"] = "필수입력 항목입니다."
	}
	if len(error) > 0 {
		c.JSON(403, gin.H{
			"error": error,
		})
		return
	}

	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Exec(`
		insert into OKR
		(
			Title, WorkSpaceId, WriterUID, Body, Status, StartDate, EndDate, DateAdded
		)
		values (?, ?, ?, ?, ?, ?, ?)
	`, 
		requestData.OKR.Title,
		requestData.OKR.WorkSpaceId,
		requestData.OKR.WriterUID,
		requestData.OKR.Body,
		requestData.OKR.Status,
		requestData.OKR.StartDate,
		requestData.OKR.EndDate,
		time.Now(),
	)
	okrId, err := rows.LastInsertId()
	
	defer db.Close()

	c.JSON(200, gin.H {
		"success": 1,
		"message": "신규 OKR를 성공적으로 생성하였습니다.",
		"okrId": okrId,
	})
}
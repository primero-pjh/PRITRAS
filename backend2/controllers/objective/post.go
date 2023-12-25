package objective

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
	Objective     		entity.Objective 			`json:"Objective"`
	Managers 			[]entity.AppUser  			`json:"Managers"`
}

func InsertObjective(c *gin.Context) {
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

	if len(strings.TrimSpace(requestData.Objective.Title)) == 0 {
		error["Title"] = "필수입력 항목입니다."
	}
	if len(strings.TrimSpace(requestData.Objective.StartDate)) == 0 {
		error["StartDate"] = "필수입력 항목입니다."
	}
	if len(strings.TrimSpace(requestData.Objective.EndDate)) == 0 {
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

	fmt.Println(requestData.Objective)
	rows, err := db.Exec(`
		insert into Objectives
		(
			Title, WorkSpaceId, WriterUID, Body, StartDate, EndDate, DateAdded
		)
		values (?, ?, ?, ?, ?, ?, ?)
	`, 
		requestData.Objective.Title,
		requestData.Objective.WorkSpaceId,		
		requestData.Objective.WriterUID,
		requestData.Objective.Body,
		requestData.Objective.StartDate,
		requestData.Objective.EndDate,
		time.Now(),
	)
	objectiveId, err := rows.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}

	for _, manager := range requestData.Managers {
		_, err := db.Exec(`
			insert into ObjectiveManagers
			(
				ObjectiveId, ManagerUID, DateAdded
			)
			values (?, ?, ?)
		`, 
			objectiveId,
			manager.UID,
			time.Now(),
		)
		if err != nil {
			log.Fatal(err)
		}
	}

	defer db.Close()

	c.JSON(200, gin.H {
		"success": 1,
		"message": "신규 OKR를 성공적으로 생성하였습니다.",
		"objectiveId": objectiveId,
	})
}
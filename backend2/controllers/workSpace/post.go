package workSpace

import (
	"github.com/gin-gonic/gin"
	"fmt"
	"time"
	"log"
	// "http"
	"PRITRAS/database"

	"PRITRAS/entity"
)

type RequestData struct {
	WorkSpace     entity.WorkSpace 			`json:"WorkSpace"`
	Members 	[]entity.WorkSpaceMember  	`json:"Members"`
}

func InsertWorkSpace(c *gin.Context) {
	// body := c.Request.Body
	// var ws entity.WorkSpace
	// var members []entity.WorkSpaceMember
	var requestData RequestData
	if err := c.BindJSON(&requestData); err != nil { // 바인딩할 떄 required에 빈 값이 드러온 경우.
		c.JSON(403, gin.H{
			"code":    403,
		})
		log.Print(err.Error())
		return
	}

	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Exec(`
		insert into WorkSpaces
		(
			WorkSpaceName, CompanyCode, Photo, Owner, OwnerUID, DateAdded
		)
		values (?, ?, ?, ?, ?, ?)
	`, 
		requestData.WorkSpace.WorkSpaceName,
		requestData.WorkSpace.CompanyCode,		
		requestData.WorkSpace.Photo,
		requestData.WorkSpace.Owner,
		requestData.WorkSpace.OwnerUID,
		time.Now(),
	)
	workSpaceId, err := rows.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(workSpaceId)

	for _, member := range requestData.Members {
		_, err := db.Exec(`
			insert into WorkSpaceMembers
			(
				WorkSpaceId, UID, DateAdded
			)
			values (?, ?, ?)
		`, 
			workSpaceId,
			member.UID,	
			time.Now(),
		)
		if err != nil {
			log.Fatal(err)
		}
	}

	defer db.Close()

	c.JSON(200, gin.H {
		"success": 1,
		"message": "워크스페이스를 성공적으로 생성하였습니다.",
		"workSpaceId": workSpaceId,
	})
}
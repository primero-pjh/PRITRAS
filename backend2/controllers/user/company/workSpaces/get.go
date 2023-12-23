package workspaces

import (
	"fmt"
	"log"
	"github.com/gin-gonic/gin"
	"PRITRAS/database"
)

type WorkSpace struct {
	WorkSpaceId			string `json:"WorkSpaceId"`
	WorkSpaceName		string `json:"WorkSpaceName"`
	CompanyCode 		string `json:"CompanyCode"`
	Owner 				string `json:"Owner"`
	OwnerUID 			string `json:"OwnerUID"`
	DateAdded 			string `json:"DateAdded"`
}

func GetWorkSpaces(c *gin.Context) {
	companyCode := c.Param("companyCode")
	fmt.Println("companyCode: " + companyCode)

	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Query(`
		select 
			ws.*
		from WorkSpaces as ws
		where ws.CompanyCode = ?
	`, companyCode)
	if err != nil {
		log.Fatal(err)
	}

	var workSpaces []WorkSpace
	var WorkSpaceId, WorkSpaceName, CompanyCode, Owner, OwnerUID, DateAdded string

	for rows.Next() {
		err := rows.Scan(&WorkSpaceId, &WorkSpaceName, &CompanyCode, &Owner, &OwnerUID, &DateAdded)
		if err != nil {
		  	log.Fatal(err)
		}
		workSpaces = append(workSpaces, WorkSpace {
			WorkSpaceId: WorkSpaceId,
			WorkSpaceName: WorkSpaceName,
			CompanyCode: CompanyCode,
			Owner: Owner,
			OwnerUID: OwnerUID,
			DateAdded: DateAdded,
		})
		fmt.Println(workSpaces);
	}

	// defer db.Close()

	c.JSON(200, gin.H {
		"success": 1,
		"workSpaces": workSpaces,
	})
}
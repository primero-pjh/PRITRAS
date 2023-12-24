package entity

import (
	"fmt"
	"log"

	"PRITRAS/database"
)

type WorkSpace struct {
	WorkSpaceId			int 	`json:"WorkSpaceId"`
	WorkSpaceName		string 	`json:"WorkSpaceName"`
	CompanyCode 		string 	`json:"CompanyCode"`
	Photo 				string 	`json:"Photo"`
	Owner 				string 	`json:"Owner"`
	OwnerUID 			string 	`json:"OwnerUID"`
	DateAdded 			string 	`json:"DateAdded"`
}

/*
	특정 유저(UID)의 워크스페이스를 들고오는 Controller

*/
func GetUserOfWorkSpace(UID string) []WorkSpace {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Query(`
		select 
            ws.WorkSpaceId, ws.WorkSpaceName, ws.Photo
		from WorkSpaces as ws
		where ws.WorkSpaceId in (
			select 
            	ws.WorkSpaceId
			from WorkSpaceMembers as wsm
			join WorkSpaces as ws on wsm.WorkSpaceId=ws.WorkSpaceId
			where wsm.UID = ?
		)
	`, UID)
	if err != nil {
		log.Fatal(err)
	}

	var ws []WorkSpace
	var WorkSpaceId int
	var WorkSpaceName, Photo string
	for rows.Next() {
		err := rows.Scan(&WorkSpaceId, &WorkSpaceName, &Photo)
		if err != nil {
		  	log.Fatal(err)
		}
		ws = append(ws, WorkSpace {
			WorkSpaceId: WorkSpaceId,
			WorkSpaceName: WorkSpaceName,
			Photo: Photo,
		})
	}

	defer db.Close()

	return ws
}
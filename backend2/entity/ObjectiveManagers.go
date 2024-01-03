package entity

import (
	"fmt"
	"log"

	"PRITRAS/database"
)

type ObjectiveManager struct {
	ObjectiveManagerId	int 	`json:"ObjectiveManagerId"`
	ObjectiveId			int 	`json:"ObjectiveId"`
	ManagerUID 			string 	`json:"ManagerUID"`
	DateAdded 			string 	`json:"DateAdded"`
}

type ObjectiveManagerExt struct {
	ObjectiveManager
	Photo 				string 	`json:"Photo"`
	UserName 			string 	`json:"UserName"`
}

func GetObjectiveManagerOfObjectiveId(ObjectiveId int) []ObjectiveManagerExt {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	
	rows, err := db.Query(`
		select 
            om.*,
			u.UserName, u.Photo
		from ObjectiveManagers as om
		join AppUsers as u on om.ManagerUID=u.UID
		where om.ObjectiveId = ?
	`, ObjectiveId)
	if err != nil {
		log.Fatal(err)
	}
	  
	var oms []ObjectiveManagerExt
	var om ObjectiveManagerExt
	for rows.Next() {
		err := rows.Scan(&om.ObjectiveManagerId, &om.ObjectiveId, &om.ManagerUID, &om.DateAdded,
			&om.UserName, &om.Photo)
		if err != nil {
		  	log.Fatal(err)
		}
		oms = append(oms, ObjectiveManagerExt {
			ObjectiveManager: ObjectiveManager {
				ObjectiveManagerId: 	om.ObjectiveManagerId,
				ObjectiveId: 			om.ObjectiveId,
				ManagerUID: 			om.ManagerUID,
				DateAdded: 				om.DateAdded,
			},
			UserName: om.UserName,
			Photo: om.Photo,
		})
	}

	defer db.Close()

	return oms
}
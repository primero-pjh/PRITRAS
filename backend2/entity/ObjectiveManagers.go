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

func GetObjectiveManagerOfOKRId(OKRId int) []ObjectiveManager {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	
	rows, err := db.Query(`
		select 
            om.*
		from ObjectiveManagers as om
		where om.OKRId = ?
	`, OKRId)
	if err != nil {
		log.Fatal(err)
	}
	  
	var oms []ObjectiveManager
	var om ObjectiveManager
	for rows.Next() {
		err := rows.Scan(&om.ObjectiveManagerId, 
			&om.ObjectiveId, &om.ManagerUID, &om.DateAdded)
		if err != nil {
		  	log.Fatal(err)
		}
		oms = append(oms, ObjectiveManager {
			ObjectiveManagerId: om.ObjectiveManagerId,
			ObjectiveId: om.ObjectiveId,
			ManagerUID: om.ManagerUID,
			DateAdded: om.DateAdded,
		})
	}

	defer db.Close()

	return oms
}
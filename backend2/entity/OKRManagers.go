package entity

import (
	"fmt"
	"log"

	"PRITRAS/database"
)

type OKRManager struct {
	OKRManagerId		int 	`json:"OKRManagerId"`
	OKRId				int 	`json:"OKRId"`
	ManagerUID 			string 	`json:"ManagerUID"`
	DateAdded 			string 	`json:"DateAdded"`
	Photo 				string 	`json:"Photo"`
	ManagerName 		string 	`json:"ManagerName"`
}

/*
	특정 OKR의 관리자를 모두 들고오는 controller

*/
func GetOKRManagerOfOKRId(okrId int) []OKRManager {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	
	rows, err := db.Query(`
		select 
            om.OKRManagerId, om.OKRId, om.ManagerUID, om.DateAdded,
			u.Photo, u.UserName as ManagerName
		from OKRManagers as om
		join AppUsers as u on om.ManagerUID=u.UID
		where om.OKRId=?
	`, okrId)
	if err != nil {
		log.Fatal(err)
	}

	var okrManages []OKRManager
	var temp OKRManager
	for rows.Next() {
		err := rows.Scan(&temp.OKRManagerId, &temp.OKRId, &temp.ManagerUID, &temp.DateAdded,
			&temp.Photo, &temp.ManagerName)
		if err != nil { log.Fatal(err) }
		okrManages = append(okrManages, OKRManager {
			OKRManagerId: temp.OKRManagerId,
			OKRId: temp.OKRId,
			ManagerUID: temp.ManagerUID,
			DateAdded: temp.DateAdded,
			Photo: temp.Photo,
			ManagerName: temp.ManagerName,
		})
	}

	defer db.Close()

	return okrManages
}
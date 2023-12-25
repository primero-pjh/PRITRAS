package entity

import (
	"fmt"
	"log"

	"PRITRAS/database"
)

type Objective struct {
	ObjectiveId			int 	`json:"ObjectiveId"`
	Title				string 	`json:"Title"`
	WorkSpaceId 		int 	`json:"WorkSpaceId"`
	WriterUID 			string 	`json:"WriterUID"`
	Body 				string 	`json:"Body"`
	StartDate 			string 	`json:"StartDate"`
	EndDate 			string 	`json:"EndDate"`
	DateAdded 			string 	`json:"DateAdded"`
}

/*
	특정 유저(UID)의 워크스페이스를 들고오는 Controller
*/
func GetObjectiveOfWorkSpaceId(workSpaceId string) []Objective {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	
	rows, err := db.Query(`
		select 
            o.ObjectiveId, o.Title, o.WorkSpaceId, o.WriterUID, o.Body, o.StartDate, o.EndDate, o.DateAdded
		from Objectives as o
		where o.WorkSpaceId = ?
	`, workSpaceId)
	if err != nil {
		log.Fatal(err)
	}

	var objectives []Objective
	var ObjectiveId, WorkSpaceId int
	var Title, WriterUID, Body, StartDate, EndDate, DateAdded string
	for rows.Next() {
		err := rows.Scan(&ObjectiveId, &Title, &WorkSpaceId, &WriterUID, &Body, &StartDate, &EndDate, &DateAdded)
		if err != nil {
		  	log.Fatal(err)
		}
		objectives = append(objectives, Objective {
			ObjectiveId: ObjectiveId,
			WorkSpaceId: WorkSpaceId,
			Title: Title,
			WriterUID: WriterUID,
			Body: Body,
			StartDate: StartDate,
			EndDate: EndDate,
			DateAdded: DateAdded,
		})
	}

	defer db.Close()

	return objectives
}
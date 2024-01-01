package entity

import (
	"fmt"
	"log"

	"PRITRAS/database"
)

type Objective struct {
	ObjectiveId			int 	`json:"ObjectiveId"`
	Title				string 	`json:"Title"`
	OKRId 				int 	`json:"OKRId"`
	WriterUID 			string 	`json:"WriterUID"`
	Body 				string 	`json:"Body"`
	Status 				int 	`json:"Status"`
	StartDate 			string 	`json:"StartDate"`
	EndDate 			string 	`json:"EndDate"`
	DateAdded 			string 	`json:"DateAdded"`
}

func GetObjectiveOfOKRId(OKRId int) []Objective {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	
	rows, err := db.Query(`
		select 
            o.ObjectiveId, o.Title, o.OKRId, o.WriterUID, o.Body, o.Status,
			o.StartDate, o.EndDate, o.DateAdded
		from Objectives as o
		where o.OKRId = ?
	`, OKRId)
	if err != nil {
		log.Fatal(err)
	}

	var objectives []Objective
	var objective Objective
	for rows.Next() {
		err := rows.Scan(&objective.ObjectiveId, &objective.Title, &objective.OKRId, &objective.WriterUID, &objective.Body, 
			&objective.Status, &objective.StartDate, &objective.EndDate, &objective.DateAdded)
		if err != nil {
		  	log.Fatal(err)
		}
		objectives = append(objectives, Objective {
			ObjectiveId: objective.ObjectiveId,
			OKRId: objective.OKRId,
			Title: objective.Title,
			WriterUID: objective.WriterUID,
			Body: objective.Body,
			Status: objective.Status,
			StartDate: objective.StartDate,
			EndDate: objective.EndDate,
			DateAdded: objective.DateAdded,
		})
	}

	defer db.Close()

	return objectives
}
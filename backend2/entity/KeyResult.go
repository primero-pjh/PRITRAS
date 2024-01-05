package entity

import (
	"fmt"
	"log"
	"time"

	"PRITRAS/database"
)

type KeyResult struct {
	KeyResultId			int 	`json:"KeyResultId"`
	ObjectiveId			int 	`json:"ObjectiveId"`
	Title 				string 	`json:"Title"`
	Body 				string 	`json:"Body"`
	WriterUID 			string 	`json:"WriterUID"`
	Units 				string 	`json:"Units"`
	Progress 			int 	`json:"Progress"`
	StartDate 			string 	`json:"StartDate"`
	EndDate 			string 	`json:"EndDate"`
	DateAdded 			string 	`json:"DateAdded"`
}

func GetKeyResultOfObjectiveId(ObjectiveId int) []KeyResult {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	
	rows, err := db.Query(`
		select 
            kr.*
		from KeyResults as kr
		where kr.ObjectiveId = ?
	`, ObjectiveId)
	if err != nil {
		log.Fatal(err)
	}

	var keyResults []KeyResult
	var kr KeyResult
	for rows.Next() {
		err := rows.Scan(&kr.KeyResultId, &kr.ObjectiveId, &kr.Title, &kr.Body,
			&kr.WriterUID, &kr.Units, &kr.Progress, &kr.DateAdded, &kr.StartDate, &kr.EndDate)
		if err != nil {
		  	log.Fatal(err)
		}
		keyResults = append(keyResults, KeyResult {
			KeyResultId: kr.KeyResultId,
			ObjectiveId: kr.ObjectiveId,
			Title: kr.Title,
			Body: kr.Body,
			WriterUID: kr.WriterUID,
			Units: kr.Units,
			Progress: kr.Progress,
			DateAdded: kr.DateAdded,
			StartDate: kr.StartDate,
			EndDate: kr.EndDate,
		})
	}

	defer db.Close()

	return keyResults
}

func InsertKeyResult(keyResult KeyResult) int64 {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Exec(`
		insert into KeyResults
		(
			ObjectiveId, Title, Body, WriterUID, Units, Progress, StartDate, EndDate, DateAdded
		)
		values (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, 
		keyResult.ObjectiveId,
		keyResult.Title,
		keyResult.Body,
		keyResult.WriterUID,
		keyResult.Units,
		keyResult.Progress,
		keyResult.StartDate,
		keyResult.EndDate,
		time.Now(),
	)
	keyResultId, err := rows.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}
	
	defer db.Close()

	return keyResultId
}
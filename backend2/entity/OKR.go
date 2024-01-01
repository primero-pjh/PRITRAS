package entity

import (
	"fmt"
	"log"

	"PRITRAS/database"
)

type OKR struct {
	OKRId				int 	`json:"OKRId"`
	Title				string 	`json:"Title"`
	WorkSpaceId 		int 	`json:"WorkSpaceId"`
	WriterUID 			string 	`json:"WriterUID"`
	Body 				string 	`json:"Body"`
	Status				int		`json:"Status"`
	StartDate 			string 	`json:"StartDate"`
	EndDate 			string 	`json:"EndDate"`
	DateAdded 			string 	`json:"DateAdded"`
}

/*
	특정 워크스페이스의 OKR를 들고오는 함수
*/
func GetOKROfWorkSpaceId(workSpaceId string) []OKR {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	
	rows, err := db.Query(`
		select 
            o.OKRId, o.Title, o.WorkSpaceId, o.WriterUID, o.Body, 
			o.Status, o.StartDate, o.EndDate, o.DateAdded
		from OKR as o
		where o.WorkSpaceId = ?
	`, workSpaceId)
	if err != nil {
		log.Fatal(err)
	}

	var okrs []OKR
	var OKRId, WorkSpaceId, Status int
	var Title, WriterUID, Body, StartDate, EndDate, DateAdded string
	for rows.Next() {
		err := rows.Scan(&OKRId, &Title, &WorkSpaceId, &WriterUID, &Body,
			&Status, &StartDate, &EndDate, &DateAdded)
		if err != nil {
		  	log.Fatal(err)
		}
		okrs = append(okrs, OKR {
			OKRId: OKRId,
			WorkSpaceId: WorkSpaceId,
			Title: Title,
			WriterUID: WriterUID,
			Body: Body,
			Status: Status,
			StartDate: StartDate,
			EndDate: EndDate,
			DateAdded: DateAdded,
		})
	}

	defer db.Close()

	return okrs
}

/*
	특정 OKRId로 OKR을 들고오는 함수
*/
func GetOKROfOKRId(OKRId int) OKR {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	var okr OKR
	err2 := db.QueryRow(`
		select 
            o.OKRId, o.Title, o.WorkSpaceId, o.WriterUID, o.Body, 
			o.Status, o.StartDate, o.EndDate, o.DateAdded
		from OKR as o
		where o.OKRId=?
	`, OKRId).Scan(&okr.OKRId, &okr.Title, &okr.WorkSpaceId, &okr.WriterUID, &okr.Body,
		&okr.Status, &okr.StartDate, &okr.EndDate, &okr.DateAdded)
	if err2 != nil {
		log.Fatal(err2)
	}
	
	defer db.Close()

	return okr
}
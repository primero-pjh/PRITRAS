package entity

import (
	// "fmt"
	// "log"

	// "PRITRAS/database"
)

type ObjectiveManager struct {
	ObjectiveManagerId	int 	`json:"ObjectiveManagerId"`
	ObjectiveId			int 	`json:"ObjectiveId"`
	ManagerUID 			string 	`json:"ManagerUID"`
	DateAdded 			string 	`json:"DateAdded"`
}
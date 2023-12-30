package entity

import (
	// "fmt"
	// "log"

	// "PRITRAS/database"
)

type OKRManager struct {
	OKRManagerId		int 	`json:"OKRManagerId"`
	OKRId				int 	`json:"OKRId"`
	ManagerUID 			string 	`json:"ManagerUID"`
	DateAdded 			string 	`json:"DateAdded"`
}
package entity

import (
	// "bytes"
	// "time"
	// "database/sql"
	// "fmt"
	// "log"
	// "net/http"
	// "strconv"

	// "github.com/gin-gonic/gin"
	// "PRITRAS/database"
)

type WorkSpaceMember struct {
	WorkSpaceMemberId	int `json:"WorkSpaceMemberId"`
	WorkSpaceId		    int `json:"WorkSpaceId"`
	UID 		    	string `json:"UID"`
	DateAdded 			string `json:"DateAdded"`
}

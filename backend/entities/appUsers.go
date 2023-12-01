package entities

import (
	// "bytes"
	"time"
	"database/sql"
	"fmt"
	"log"
	// "net/http"
	// "strconv"

	// "github.com/gin-gonic/gin"
	"pritras.com/database"
	"github.com/go-sql-driver/mysql"
)

type AppUser struct {
	UID			string `json:"UID"`
	UserId		string `json:"UserId"`
	UserName 	string `json:"UserName"`
}

func init() {
	fmt.Println("entity-model: appuser-init")
}

func GetUser(companyCode string) []AppUser {
	db := GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Query(`
		select u.UID, u.UserId, u.UserName 
		from appUsers as u
	`)
	if err != nil {
		log.Fatal(err)
	}

	var users []AppUser
	var UID, UserId, UserName string

	for rows.Next() {
		err := rows.Scan(&UID, &UserId, &UserName)
		if err != nil {
		  	log.Fatal(err)
		}
		users = append(users, AppUser {
			UID: UID,
			UserId: UserId,
			UserName: UserName,
		})
		fmt.Println(UID, UserId, UserName)
	}

	defer db.Close()

	return users
}
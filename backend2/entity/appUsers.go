package entity

import (
	// "bytes"
	// "time"
	// "database/sql"
	"fmt"
	"log"
	// "net/http"
	// "strconv"

	// "github.com/gin-gonic/gin"
	"PRITRAS/database"
)

type AppUser struct {
	UID	        		string `json:"UID"`
	UserId		        string `json:"UserId"`
	UserName 		    string `json:"UserName"`
	Email 				string `json:"Email"`
	IsAdmin 			string `json:"IsAdmin"`
	password 			string `json:"Password"`
	PhoneNumber 		string `json:"PhoneNumber"`
	Image 			    string `json:"Image"`
	Code 			    string `json:"Code"`
	DateAdded 			string `json:"DateAdded"`
	Status 			    string `json:"Status"`
	KakaoId 			string `json:"KakaoId"`
	Memo 			    string `json:"Memo"`
	CompanyCode 		string `json:"CompanyCode"`
}

func GetUsers(companyCode string) []AppUser {
	db := database.GetConnector()
	err := db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Query(`
		select 
            UID, UserId, UserName, Email, PhoneNumber, Image, DateAdded, Status, KakaoId, Memo, CompanyCode
		from AppUsers as u
        where u.CompanyCode=?
        order by u.UserName desc
	`, companyCode)
	if err != nil {
		log.Fatal(err)
	}

	var users []AppUser
	var UID, UserId, UserName, Email, PhoneNumber, Image, DateAdded, Status, KakaoId, Memo, CompanyCode string

	for rows.Next() {
		err := rows.Scan(&UID, &UserId, &UserName, &Email, &PhoneNumber, &Image, &DateAdded, &Status, &KakaoId, &Memo, &CompanyCode)
		if err != nil {
		  	log.Fatal(err)
		}
		users = append(users, AppUser {
			UID: UID,
			UserId: UserId,
			UserName: UserName,
			Email: Email,
			PhoneNumber: PhoneNumber,
			Image: Image,
			DateAdded: DateAdded,
			Status: Status,
			KakaoId: KakaoId,
			Memo: Memo,
			CompanyCode: CompanyCode,
		})
	}

	defer db.Close()

	return users
}
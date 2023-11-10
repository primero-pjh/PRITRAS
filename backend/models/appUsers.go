package models

import (
	"bytes"
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type appUser struct (
	UID			string	`from:"UID"`
	userId		string	`from:"userId"`
	userName 	string	`from:"userName"`
)

func (u appUser) get(string companyCode) (user appUser, err error) {
	row := db.QueryRow("
		select *
		from appUsers as u
		where u.companyCode=?
	", companyCode)
	err = row.Scan(&user.UID, &user.userId, &user.userName)
	if err != nil {
		return
	}
	return
}

func init() {
	var err error
	fmt.Println("model- execute appUsers!")
	db, err = sql.Open("mysql", "root:Raffine9847!@tcp(pritras.vps.phps.kr:3306)/PRITRAS?parseTime=true")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println(err.Error())
	}
}
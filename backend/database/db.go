package database

import (
	"time"
	"database/sql"
	"github.com/go-sql-driver/mysql"
)

func GetConnector() *sql.DB {
	cfg := mysql.Config{
		User:                 "root",
		Passwd:               "Raffine9847!",
		Net:                  "tcp",
		Addr:                 "pritras.vps.phps.kr:3306",
		Collation:            "utf8mb4_general_ci",
		Loc:                  time.UTC,
		MaxAllowedPacket:     4 << 20.,
		AllowNativePasswords: true,
		CheckConnLiveness:    true,
		DBName:               "PRITRAS",
	}
	connector, err := mysql.NewConnector(&cfg)
	if err != nil {
		panic(err)
	}
	db := sql.OpenDB(connector)
	return db
}
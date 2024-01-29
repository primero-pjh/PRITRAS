package main

import (
	"PRITRAS/init/cmd"
	"flag"
)

var configPathFlag = flag.String("config", "./config.toml", "file not found")

func main() {
	flag.Parse()
	cmd.NewCmd(*configPathFlag)
}
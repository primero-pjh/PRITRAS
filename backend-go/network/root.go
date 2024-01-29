package network

import (
	"PRITRAS/service"

	"github.com/gin-gonic/gin"
)

type Network struct {
	engine *gin.Engine
	service *service.Service
}

func NewNetwork(service *service.Service) *Network {
	r := &Network{
		engine: gin.New(), // Product
		// engine: gin.Default(), // Development
	}

	newUserRouter(r, service.User)

	return r
}
func (n *Network) ServerStart(port string) error {
	return n.engine.Run(port)
}


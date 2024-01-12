package controller

import (
	// "PRITRAS/entity"
	"github.com/gin-gonic/gin"

)

type UserController interface {
	// CreateUser(firstName, lastName, email, password, role string) (int, error)
	// GetUser(id int) (*model.User, error)
	// GetAllUsers() []*model.User
	// UpdateUser(requesterId int, u *model.User) error
	// DeleteUser(requesterId int, id int) error
	// RegeneratePfp(id int) error
	// CheckCredentials(email, password string) (int, error)

	GetUsers(companyCode int) ([]entity.AppUser, error)
}

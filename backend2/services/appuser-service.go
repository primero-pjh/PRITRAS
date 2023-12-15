package service

import "PRITRAS/entity"

type AppUserService interface {
	Save(entity.AppUser) entity.AppUser
	FindAll() []entitiy.AppUser
}

type appUserService {
	appUsers []entity.AppUser
}

func New() AppUserService {
	return &appUserService{}
}

func (service *appUserService) Save(appUsers entity.AppUser) entity.AppUser {
	service.appUsers = append(service.appUsers)
}
func (service *appUserService) FindAll() []entity.AppUser {
	return service.appUsers
}
package repository

import (
	"PRITRAS/types"
	errors "PRITRAS/types/errors"
)

type UserRepository struct {
 	userMap []*types.User
}

func newUserRepostiry() *UserRepository {
	return &UserRepository{
		//userMap
		userMap : []*types.User{},
	}
}

func (u *UserRepository) Create(user *types.User) error {
	u.userMap = append(u.userMap, user)
	return nil
}
func (u *UserRepository) Update(name string, newAge int64) error {
	isExisted := false

	for _, user := range u.userMap {
		if user.Name == name {
			user.Age = newAge
			isExisted = true
			continue
		}
	}

	if !isExisted {
		return errors.Errorf(errors.NotFoundUser, nil)
	} else {
		return nil
	}
}
func (u *UserRepository) Delete(userName string) error {
	isExisted := false

	for idx, user := range u.userMap {
		if user.Name == userName {
			u.userMap  = append(u.userMap[:idx], u.userMap[idx+1:]...)
			isExisted = true
			continue
		}
	}

	if !isExisted {
		return errors.Errorf(errors.NotFoundUser, nil)
	} else {
		return nil
	}
	
}
func (u *UserRepository) Get() []*types.User {
	return u.userMap
}
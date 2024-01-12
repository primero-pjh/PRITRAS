package repository

import (
	"fmt"
	"PRITRAS/entity"
)

type WorkSpaceRepository interface {
	GetWorkSpace(workSpaceId int) (entity.WorkSpace)
}
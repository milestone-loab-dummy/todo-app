package models

import "gorm.io/gorm"

// Todo represents a single todo item.
type Todo struct {
	gorm.Model
	Title     string `gorm:"not null" json:"title"`
	Completed bool   `gorm:"default:false" json:"completed"`
}

// CreateTodoRequest is the expected request body for creating a todo.
type CreateTodoRequest struct {
	Title string `json:"title" binding:"required,min=1"`
}

// UpdateTodoRequest is the expected request body for updating a todo.
type UpdateTodoRequest struct {
	Title     *string `json:"title"`
	Completed *bool   `json:"completed"`
}

// TodoResponse is the API response shape for a todo.
type TodoResponse struct {
	ID        uint   `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
	CreatedAt string `json:"createdAt"`
}

// ToResponse converts a Todo model to a TodoResponse.
func (t *Todo) ToResponse() TodoResponse {
	return TodoResponse{
		ID:        t.ID,
		Title:     t.Title,
		Completed: t.Completed,
		CreatedAt: t.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
	}
}

package services

import (
	"errors"
	"todo-app/backend/models"

	"gorm.io/gorm"
)

// ErrNotFound is returned when a todo cannot be found.
var ErrNotFound = errors.New("todo not found")

// TodoService handles business logic for todos.
type TodoService struct {
	db *gorm.DB
}

// NewTodoService creates a new TodoService.
func NewTodoService(db *gorm.DB) *TodoService {
	return &TodoService{db: db}
}

// ListAll returns all non-deleted todos ordered by creation time descending.
func (s *TodoService) ListAll() ([]models.Todo, error) {
	var todos []models.Todo
	if err := s.db.Order("created_at desc").Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}

// Create inserts a new todo with the given title.
func (s *TodoService) Create(title string) (*models.Todo, error) {
	todo := &models.Todo{Title: title}
	if err := s.db.Create(todo).Error; err != nil {
		return nil, err
	}
	return todo, nil
}

// GetByID returns a todo by its primary key.
func (s *TodoService) GetByID(id uint) (*models.Todo, error) {
	var todo models.Todo
	if err := s.db.First(&todo, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &todo, nil
}

// Update applies a partial update to a todo.
func (s *TodoService) Update(id uint, req models.UpdateTodoRequest) (*models.Todo, error) {
	todo, err := s.GetByID(id)
	if err != nil {
		return nil, err
	}

	if req.Title != nil {
		if *req.Title == "" {
			return nil, errors.New("title cannot be empty")
		}
		todo.Title = *req.Title
	}
	if req.Completed != nil {
		todo.Completed = *req.Completed
	}

	if err := s.db.Save(todo).Error; err != nil {
		return nil, err
	}
	return todo, nil
}

// Delete soft-deletes a todo by ID.
func (s *TodoService) Delete(id uint) error {
	result := s.db.Delete(&models.Todo{}, id)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return ErrNotFound
	}
	return nil
}

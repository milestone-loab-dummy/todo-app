package services_test

import (
	"testing"

	"todo-app/backend/database"
	"todo-app/backend/models"
	"todo-app/backend/services"
)

func setupService(t *testing.T) *services.TodoService {
	t.Helper()
	database.Connect(":memory:")
	return services.NewTodoService(database.DB)
}

func TestCreate(t *testing.T) {
	svc := setupService(t)

	todo, err := svc.Create("Buy milk")
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if todo.ID == 0 {
		t.Fatal("expected non-zero ID")
	}
	if todo.Title != "Buy milk" {
		t.Fatalf("expected title 'Buy milk', got %q", todo.Title)
	}
	if todo.Completed {
		t.Fatal("new todo should not be completed")
	}
}

func TestListAll(t *testing.T) {
	svc := setupService(t)

	if _, err := svc.Create("Task 1"); err != nil {
		t.Fatal(err)
	}
	if _, err := svc.Create("Task 2"); err != nil {
		t.Fatal(err)
	}

	todos, err := svc.ListAll()
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if len(todos) != 2 {
		t.Fatalf("expected 2 todos, got %d", len(todos))
	}
}

func TestUpdate_Title(t *testing.T) {
	svc := setupService(t)

	todo, _ := svc.Create("Old title")
	newTitle := "New title"
	updated, err := svc.Update(todo.ID, models.UpdateTodoRequest{Title: &newTitle})
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if updated.Title != "New title" {
		t.Fatalf("expected 'New title', got %q", updated.Title)
	}
}

func TestUpdate_Completed(t *testing.T) {
	svc := setupService(t)

	todo, _ := svc.Create("Do the thing")
	completed := true
	updated, err := svc.Update(todo.ID, models.UpdateTodoRequest{Completed: &completed})
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if !updated.Completed {
		t.Fatal("expected todo to be completed")
	}
}

func TestUpdate_NotFound(t *testing.T) {
	svc := setupService(t)

	title := "x"
	_, err := svc.Update(9999, models.UpdateTodoRequest{Title: &title})
	if err != services.ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}

func TestDelete(t *testing.T) {
	svc := setupService(t)

	todo, _ := svc.Create("To delete")
	if err := svc.Delete(todo.ID); err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	_, err := svc.GetByID(todo.ID)
	if err != services.ErrNotFound {
		t.Fatalf("expected ErrNotFound after delete, got %v", err)
	}
}

func TestDelete_NotFound(t *testing.T) {
	svc := setupService(t)

	err := svc.Delete(9999)
	if err != services.ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}

func TestUpdate_EmptyTitle(t *testing.T) {
	svc := setupService(t)

	todo, _ := svc.Create("Valid title")
	empty := ""
	_, err := svc.Update(todo.ID, models.UpdateTodoRequest{Title: &empty})
	if err == nil {
		t.Fatal("expected error when updating with empty title")
	}
}

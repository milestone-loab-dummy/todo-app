package database

import (
	"log"

	"todo-app/backend/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// DB is the global database instance.
var DB *gorm.DB

// Connect initialises the SQLite database and runs auto-migration.
func Connect(dsn string) {
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	if err := db.AutoMigrate(&models.Todo{}); err != nil {
		log.Fatalf("failed to auto-migrate: %v", err)
	}

	DB = db
	log.Println("database connected and migrated")
}

// Ping checks the database connectivity.
func Ping() error {
	sqlDB, err := DB.DB()
	if err != nil {
		return err
	}
	return sqlDB.Ping()
}

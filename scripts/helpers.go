package helpers

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

func GenerateRandomString(length int) (string, error) {
	b := make([]byte, length)
	_, err := rand.Read(b)
	if err != nil {
		return "", fmt.Errorf("failed to generate random string: %w", err)
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

func ReadFile(path string) ([]byte, error) {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}
	return data, nil
}

func WriteFile(path string, data []byte, perm os.FileMode) error {
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, perm); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}
	if err := ioutil.WriteFile(path, data, perm); err != nil {
		return fmt.Errorf("failed to write file: %w", err)
	}
	return nil
}

func FileExists(path string) bool {
	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
		return false
	}
	return true
}
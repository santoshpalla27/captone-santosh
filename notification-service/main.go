package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
)

type Notification struct {
	Message string `json:"message"`
}

var ctx = context.Background()

func getRedisCluster() *redis.ClusterClient {
	nodes := strings.Split(os.Getenv("REDIS_NODES"), ",")
	return redis.NewClusterClient(&redis.ClusterOptions{
		Addrs:    nodes,
		Password: os.Getenv("REDIS_PASSWORD"),
	})
}

func main() {
	godotenv.Load()
	port := os.Getenv("PORT")
	if port == "" {
		port = "6000"
	}
	redisCluster := getRedisCluster()
	http.HandleFunc("/notify", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		var n Notification
		err := json.NewDecoder(r.Body).Decode(&n)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		redisCluster.Publish(ctx, "notifications", n.Message)
		w.Write([]byte("Notification sent"))
	})
	fmt.Println("Notification service running on port", port)
	http.ListenAndServe(":"+port, nil)
}
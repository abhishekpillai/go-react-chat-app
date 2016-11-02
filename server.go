package main

import (
  "fmt"
  "github.com/gin-gonic/gin"
  "github.com/olahol/melody"
  "net/http"
//  "github.com/gorilla/websocket"
  "github.com/garyburd/redigo/redis"
  "github.com/soveran/redisurl"
  "os"
)

type message struct {
  Handle string `json:"handle"`
  Text   string `json:"text"`
}

func main() {
  r := gin.Default()
  m := melody.New()

  // Connect using os.Getenv("REDIS_URL").
  conn, err := redisurl.Connect()
  if err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
  defer conn.Close()

  r.GET("/", func(c *gin.Context) {
    http.ServeFile(c.Writer, c.Request, "./index.html")
  })

  r.GET("/allMessages", func(c *gin.Context) {
    allMessages, _ := redis.Strings(conn.Do("LRANGE", "messages", 0, 1000))
    c.JSON(200, gin.H{
      "messages": allMessages,
    })
  })

  r.GET("/ws", func(c *gin.Context) {
    m.HandleRequest(c.Writer, c.Request)
  })

  m.HandleMessage(func(s *melody.Session, msg []byte) {
    conn.Do("RPUSH", "messages", string(msg))
    m.Broadcast(msg)
  })

  r.Run(":5000")
}

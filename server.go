package main

import (
  "fmt"
  "github.com/gin-gonic/gin"
  "github.com/olahol/melody"
  "net/http"
  "os"
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
  "time"
  "encoding/json"
  "strconv"
)

type Msg struct {
  Username, Content string
}

type User struct {
  Id int
  Username string
}

func main() {
  router := gin.Default()
  m := melody.New()

  db_url := os.Getenv("SHAREDCHAT_DB_URL")
  db, _ := sql.Open("mysql", db_url)

  router.GET("/", func(c *gin.Context) {
    http.ServeFile(c.Writer, c.Request, "./public/index.html")
  })

  router.POST("/login", func(c *gin.Context) {
    username := c.PostForm("username")

    var id int
    err := db.QueryRow("SELECT id FROM users where username=?", username).Scan(&id)

    switch {
    case err == sql.ErrNoRows:
      insert_stmt, _ := db.Prepare("INSERT users SET username=?")
      _, err = insert_stmt.Exec(username)
      db.QueryRow("SELECT id FROM users where username=?", username).Scan(&id)
    case err != nil:
      fmt.Println(err)
    default:
      fmt.Printf("Username is %s\n", username)
    }

    c.JSON(200, gin.H{
      "user": User{ id, username },
    })
  })

  router.GET("/allMessages", func(c *gin.Context) {
    var (
      content string
      allMessages []string
    )

    rows, _ := db.Query("SELECT content FROM messages ORDER BY timestamp ASC")
    defer rows.Close()
    for rows.Next() {
      err := rows.Scan(&content)
      if err != nil {
        fmt.Println(err)
      }
      allMessages = append(allMessages, content)
    }

    c.JSON(200, gin.H{
      "messages": allMessages,
    })
  })

  router.GET("/newMessages", func(c *gin.Context) {
    var (
      content string
      newMessages []string
    )

    i, _ := strconv.ParseInt(c.Query("since"), 10, 64)
    since := time.Unix(i, 0)
    fmt.Println(since)
    rows, _ := db.Query("SELECT content FROM messages where timestamp > ? ORDER BY timestamp ASC", since)
    defer rows.Close()

    for rows.Next() {
      err := rows.Scan(&content)
      if err != nil {
        fmt.Println(err)
      }
      newMessages = append(newMessages, content)
    }

    c.JSON(200, gin.H{
      "messages": newMessages,
    })
  })

  router.GET("/ws", func(c *gin.Context) {
    m.HandleRequest(c.Writer, c.Request)
  })

  m.HandleMessage(func(s *melody.Session, message []byte) {
    var msg_data Msg
    err := json.Unmarshal(message, &msg_data)
    if err != nil {
      fmt.Println(err)
    }

    insert_stmt, _ := db.Prepare("INSERT messages SET username=?,message_type=?,content=?,timestamp=?")
    _, err = insert_stmt.Exec(msg_data.Username, "text", msg_data.Content, time.Now())
    if err != nil {
      fmt.Println(err)
    }
    m.Broadcast([]byte(msg_data.Content))
  })

  router.Static("/public", "./public")
  router.Static("/assets/js", "./bin")
  router.Run(":5000")
}

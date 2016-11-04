## Simple Chat Application with Golang + React

First time using Go! Including the following that helped setup the backend structure
* [Gin](https://github.com/gin-gonic/gin)
* [Melody](https://github.com/olahol/melody/)

![go-react-chat-app-gif](https://cloud.githubusercontent.com/assets/1326555/20007498/e37f863c-a272-11e6-89a9-63b7c31ba2b8.gif)


#### Setup
* Install Golang: https://golang.org/doc/install
* Make sure you have mysql installed and proper permissions and (npm or yarn)
* Log into mysql console and create a DB in mysql: `create database sharedchat`
* Load db from sql structure sql, replace following command with your username and password: `mysql -u username -p sharedchat < sharedchat_db_structure.sql`
* `export SHAREDCHAT_DB_URL=username:password@/sharedchat?charset=utf8`
* `go install`
* `yarn` or `npm install`
* `npm install -g webpack`
* `webpack`
* `go-react-chat-app`
* Go to localhost:5000 and use the chat!

### Resources I learned a lot from
* [A Tour of Go](https://tour.golang.org/welcome/1)
* [Gorilla Websocket Example](https://github.com/gorilla/websocket/tree/master/examples/chat)
* [Redis, Go, & How to Build a Chat Application - Compose](https://www.compose.com/articles/redis-go-and-how-to-build-a-chat-application/)
* [Using WebSockets on Heroku with Go](https://devcenter.heroku.com/articles/go-websockets)
* [Writing Real-Time Web Apps in Go: Chat](https://medium.com/@olahol/writing-real-time-web-apps-in-go-chat-4aa058644f73#.6ttdfnbcn)

### Improvements for following iterations
- [ ] separate timestamp and username from stored message
- [ ] extract reusable parts of golang server into separate funcs and files
- [ ] use redigo to register websockets and allow chat to scale above one server
- [ ] add testing for golang server
- [ ] add testing for react app
- [ ] make it prettier

create table messages (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  user_id MEDIUMINT,
  message_type VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)

create table users (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  username VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
)

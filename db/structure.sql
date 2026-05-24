DROP TABLE users IF EXISTS;
CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  name VARCHAR(50) NOT NULL,
  rol ENUM('admin','user') NOT NULL DEFAULT 'user'
);

DROP TABLE chats IF EXISTS;
CREATE TABLE chats (
  id INT PRIMARY KEY,
  user_id INT,
  CONSTRAINT fk_chat_user FOREIGN KEY (user_id) REFERENCES users (id)
);

DROP TABLE registros IF EXISTS;
CREATE TABLE registros (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  type ENUM('desayuno','mediamañana','almuerzo','merienda','cena','picoteo') NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE(),
  time TIME NOT NULL DEFAULT CURRENT_TIME(),
  CONSTRAINT fk_registros_user FOREIGN KEY (user_id) REFERENCES users (id)
);


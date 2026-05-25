DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  name VARCHAR(50) NOT NULL,
  rol ENUM('admin','user') NOT NULL DEFAULT 'user'
);

DROP TABLE IF EXISTS chats;
CREATE TABLE chats (
  id BIGINT PRIMARY KEY,
  user_id BIGINT,
  CONSTRAINT fk_chat_user FOREIGN KEY (user_id) REFERENCES users (id)
);

DROP TABLE IF EXISTS registers;
CREATE TABLE registers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  type ENUM('desayuno','mediamañana','almuerzo','merienda','cena','picoteo') NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_registros_user FOREIGN KEY (user_id) REFERENCES users (id)
);


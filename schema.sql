-- Configuracion de la base de datos

CREATE TABLE IF NOT EXISTS post (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	title VARCHAR(255) NOT NULL,
	content TEXT NOT NULL,
	banner TEXT not NULL,
	locationU TEXT not NULL
);



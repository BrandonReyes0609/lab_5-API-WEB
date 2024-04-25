CREATE TABLE IF NOT EXISTS blog_posts ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    banner TEXT not NULL,
    locationU TEXT not NULL,
    cost TEXT not NULL
);

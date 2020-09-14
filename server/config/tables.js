'use strict';

var tables = {
	users : (
		"CREATE TABLE `users` (" +
		" `id` int(11) NOT NULL AUTO_INCREMENT," +
		" `username` varchar(20) NOT NULL," +
		" `first_name` varchar(25) NOT NULL," +
		" `last_name` varchar(25) NOT NULL," + 
		" `email` varchar(60) NOT NULL," +
		" `password` varchar(100) NOT NULL," +
		" `pro_pic` varchar(250)," +
		" `verified` int(2) NOT NULL DEFAULT 0," +
		" `admin` int (1) NOT NULL DEFAULT 0," +
		" PRIMARY KEY (`id`)" +
		") ENGINE=InnoDB"
	),
	tokens : (
		"CREATE TABLE `tokens` (" +
		" `id` int(11) NOT NULL AUTO_INCREMENT," +
		" `username` varchar(20) NOT NULL," +
		" `token` varchar(300) NOT NULL," +
		" `type` varchar(100)," +
		" PRIMARY KEY (`id`)" +
		") ENGINE=InnoDB"
    ),
    videos : (
		"CREATE TABLE `videos` (" +
		" `id` int(11) NOT NULL AUTO_INCREMENT," +
		" `title` varchar(100) NOT NULL," +
		" `name` varchar(100) NOT NULL," +
        " `ext` varchar(20)," +
        " `hash` varchar(100)," +
        " `status` varchar(100)," +
        " `created` varchar(20)," +
		" PRIMARY KEY (`id`)" +
		") ENGINE=InnoDB"
	),
	comments : (
		"CREATE TABLE `comments` (" +
		" `id` int(11) NOT NULL AUTO_INCREMENT,"+
		" `username` varchar(20) NOT NULL,"+
		" `movie_id` int(11) NOT NULL,"+
		" `content` longtext NOT NULL,"+
		" `created_at` datetime NOT NULL,"+
		" PRIMARY KEY (`id`)" +
	  ") ENGINE=InnoDB"
	)
}	
module.exports = tables;

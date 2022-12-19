CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	user_url_visit_count INTEGER NOT NULL
);



CREATE TABLE urls (
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES "users"("id"),
	url TEXT NOT NULL,
	short_url TEXT NOT NULL,
	url_visit_count INTEGER NOT NULL
);


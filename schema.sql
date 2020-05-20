Create database myPet;

create table users (
  id serial primary key,
  username text,
  email text,
  password_digest text
);

create table pets (
  id serial primary key,
  user_id integer,
  species text,
  dob date,
  name text,
  image_url text
);

create table appointments (
  id serial primary key,
  pet_id integer,
  appt_type text,
  location text,
  appt_date date,
  comments text,
  user_id integer
);

create table meds (
  id serial primary key,
  pet_id integer,
  comments text
);
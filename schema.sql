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
  comments text,
  user_id integer
);

INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (1,'dog', '2020-01-01', 'Otis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwLjC8rq9mXXuwDUCL0O83HBAM_v9ycySeCbTxg9i6Q8-E8V8p&usqp=CAU');
INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (1,'cat', '2020-02-02', 'Milo', 'https://d2ph5fj80uercy.cloudfront.net/06/cat1996.jpg');
INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (1,'rabbit', '2020-03-03', 'Bun', 'https://pbs.twimg.com/profile_images/705356604200390662/YgguEBK9_400x400.jpg');
INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (1,'possum', '2020-04-04', 'Possy', 'https://i.dlpng.com/static/png/411974_preview.png');
INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (1,'fish', '2020-05-05', 'Nemo', 'https://www.kindpng.com/picc/m/39-390983_dory-nemo-finding-clipart-transparent-png-nemo-clipart.png');
INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (1,'ferret', '2020-05-05', 'Ferrel', 'https://i.pinimg.com/474x/3c/c9/71/3cc971a4190db5f3a73dd0585f2bdcaf.jpg');




INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (2,'possum', '2020-04-04', 'Possy', 'https://i.dlpng.com/static/png/411974_preview.png');
INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (2,'fish', '2020-05-05', 'Nemo', 'https://www.kindpng.com/picc/m/39-390983_dory-nemo-finding-clipart-transparent-png-nemo-clipart.png');
INSERT INTO pets (user_id, species, dob, name, image_url) VALUES (2,'ferret', '2020-05-05', 'Ferrel', 'https://i.pinimg.com/474x/3c/c9/71/3cc971a4190db5f3a73dd0585f2bdcaf.jpg');


INSERT INTO meds (pet_id, comments, user_id) VALUES (1, 'Valium', 1);
INSERT INTO meds (pet_id, comments, user_id) VALUES (1, 'Arthri Aid', 1);
INSERT INTO meds (pet_id, comments, user_id) VALUES (1, 'Combantrim', 1);
INSERT INTO meds (pet_id, comments, user_id) VALUES (1, 'Chilli', 1);


INSERT INTO meds (pet_id, comments, user_id) VALUES (2, 'Viagra', 1);
INSERT INTO meds (pet_id, comments, user_id) VALUES (2, 'Amoxicillin', 1);
INSERT INTO meds (pet_id, comments, user_id) VALUES (2, 'Xanax', 1);
INSERT INTO meds (pet_id, comments, user_id) VALUES (2, 'Fire', 1);


INSERT INTO appointments (pet_id, appt_type, location, appt_date, comments, user_id) VALUES (1, 'Oral examination', 'Mordialloc', '2020-01-01', 'Treat with care this prick bites', 1);
INSERT INTO appointments (pet_id, appt_type, location, appt_date, comments, user_id) VALUES (1, 'Internal examination', 'Kew', '2020-02-02', 'Has flatulence, wear a mask', 1);
INSERT INTO appointments (pet_id, appt_type, location, appt_date, comments, user_id) VALUES (1, 'Fur check', 'Hawthorn', '2020-03-03', 'Has matted hair. Needs a trim', 1);


INSERT INTO appointments (pet_id, appt_type, location, appt_date, comments, user_id) VALUES (2, 'Genitalia check', 'St Kilda', '2020-01-01', 'Is a ragdoll, will flop.', 1);
INSERT INTO appointments (pet_id, appt_type, location, appt_date, comments, user_id) VALUES (2, 'Throat check', 'Kew', '2020-02-02', 'Swollen glands, treat with care.', 1);
INSERT INTO appointments (pet_id, appt_type, location, appt_date, comments, user_id) VALUES (2, 'Mental analysis', 'Richmond', '2020-03-03', 'Split personality, thinks he is a possum', 1);
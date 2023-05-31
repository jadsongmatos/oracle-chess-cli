CREATE TABLE user (
  id INT NOT NULL,
  username VARCHAR(16) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(32) NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP NULL,
  PRIMARY KEY (id));

CREATE TABLE location (
  id INT NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  city VARCHAR(45) NOT NULL,
  state CHAR(2) NOT NULL,
  nation VARCHAR(45) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_location_user1_idx (user_id ASC) VISIBLE,
  CONSTRAINT fk_location_user1
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE friend (
  user_id INT NOT NULL,
  friend_id INT NOT NULL,
  INDEX fk_friends_user1_idx (user_id ASC) VISIBLE,
  INDEX fk_friends_user2_idx (friend_id ASC) VISIBLE,
  PRIMARY KEY (user_id, friend_id),
  CONSTRAINT fk_friends_user1
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_friends_user2
    FOREIGN KEY (friend_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE achievement (
  id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE,
  UNIQUE INDEX description_UNIQUE (description ASC) VISIBLE)

CREATE TABLE achievement_user (
  achievement_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (achievement_id, user_id),
  INDEX fk_achievement_has_user_user1_idx (user_id ASC) VISIBLE,
  INDEX fk_achievement_has_user_achievement1_idx (achievement_id ASC) VISIBLE,
  CONSTRAINT fk_achievement_has_user_achievement1
    FOREIGN KEY (achievement_id)
    REFERENCES achievement (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_achievement_has_user_user1
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE tree (
  id INT UNSIGNED NOT NULL,
  value INT UNSIGNED NOT NULL,
  depth INT UNSIGNED NOT NULL,
  gameover TINYINT NOT NULL DEFAULT 0,
  checkmate TINYINT NOT NULL DEFAULT 0,
  update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  parent_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_table1_table11_idx (parent_id ASC) VISIBLE,
  INDEX fk_table1_user1_idx (user_id ASC) VISIBLE,
  CONSTRAINT fk_table1_table11
    FOREIGN KEY (parent_id)
    REFERENCES tree (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_table1_user1
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE link (
  id INT NOT NULL,
  url VARCHAR(45) NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_link_user1_idx (user_id ASC) VISIBLE,
  CONSTRAINT fk_link_user1
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE click (
  idclick VARCHAR(255) NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  others VARCHAR(255) NOT NULL,
  link_id INT NOT NULL,
  PRIMARY KEY (idclick),
  INDEX fk_click_link1_idx (link_id ASC) VISIBLE,
  CONSTRAINT fk_click_link1
    FOREIGN KEY (link_id)
    REFERENCES link (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE coin (
  id INT NOT NULL,
  currency_origin INT NOT NULL,
  state TINYINT NOT NULL DEFAULT 1,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_coin_user1_idx (user_id ASC) VISIBLE,
  CONSTRAINT fk_coin_user1
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE item (
  id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(45) NOT NULL,
  cost INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE,
  UNIQUE INDEX description_UNIQUE (description ASC) VISIBLE)

CREATE TABLE buy (
  id INT NOT NULL,
  price_at_time INT NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  item_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_buy_item1_idx (item_id ASC) VISIBLE,
  INDEX fk_buy_user1_idx (user_id ASC) VISIBLE,
  CONSTRAINT fk_buy_item1
    FOREIGN KEY (item_id)
    REFERENCES item (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_buy_user1
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE buy_coin (
  buy_id INT NOT NULL,
  coin_id INT NOT NULL,
  PRIMARY KEY (buy_id, coin_id),
  INDEX fk_buy_has_coin_coin1_idx (coin_id ASC) VISIBLE,
  INDEX fk_buy_has_coin_buy1_idx (buy_id ASC) VISIBLE,
  CONSTRAINT fk_buy_has_coin_buy1
    FOREIGN KEY (buy_id)
    REFERENCES buy (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_buy_has_coin_coin1
    FOREIGN KEY (coin_id)
    REFERENCES coin (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE session (
  id INT NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_time_new_session_time INT NULL,
  total_active_time TIME NOT NULL DEFAULT 0,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_session_session1_idx (end_time_new_session_time ASC) VISIBLE,
  INDEX fk_session_user1_idx (user_id ASC) VISIBLE,
  CONSTRAINT fk_session_session1
    FOREIGN KEY (end_time_new_session_time)
    REFERENCES session (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_session_user1
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE activity (
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE interaction (
  id INT NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  activity_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_interaction_activity1_idx (activity_id ASC) VISIBLE,
  CONSTRAINT fk_interaction_activity1
    FOREIGN KEY (activity_id)
    REFERENCES activity (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE interaction_session (
  interaction_id INT NOT NULL,
  session_id INT NOT NULL,
  PRIMARY KEY (interaction_id, session_id),
  INDEX fk_interaction_has_session_session1_idx (session_id ASC) VISIBLE,
  INDEX fk_interaction_has_session_interaction1_idx (interaction_id ASC) VISIBLE,
  CONSTRAINT fk_interaction_has_session_interaction1
    FOREIGN KEY (interaction_id)
    REFERENCES interaction (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_interaction_has_session_session1
    FOREIGN KEY (session_id)
    REFERENCES session (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)


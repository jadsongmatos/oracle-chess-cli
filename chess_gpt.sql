CREATE TABLE jogadores (
  idjogadores INT NOT NULL,
  nome VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  PRIMARY KEY (idjogadores),
  UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE,
  UNIQUE INDEX nome_UNIQUE (nome ASC) VISIBLE)

CREATE TABLE tree (
  idtree INT NOT NULL,
  depth INT NOT NULL,
  checkmate TINYINT NOT NULL,
  gameover TINYINT NOT NULL,
  update_at TIMESTAMP NOT NULL,
  jogadores_idjogadores INT NULL,
  tree_idtree INT NOT NULL,
  PRIMARY KEY (idtree),
  INDEX fk_tree_jogadores_idx (jogadores_idjogadores ASC) VISIBLE,
  INDEX fk_tree_tree1_idx (tree_idtree ASC) VISIBLE,
  CONSTRAINT fk_tree_jogadores
    FOREIGN KEY (jogadores_idjogadores)
    REFERENCES mydb.jogadores (idjogadores)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_tree_tree1
    FOREIGN KEY (tree_idtree)
    REFERENCES mydb.tree (idtree)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE Sessions (
  idSessions INT NOT NULL,
  PRIMARY KEY (idSessions))

CREATE TABLE Transactions (
  idTransactions INT NOT NULL,
  PRIMARY KEY (idTransactions))

CREATE TABLE Interactions (
  idInteractions INT NOT NULL,
  PRIMARY KEY (idInteractions))

CREATE TABLE pontos (
  idpontos INT NOT NULL,
  valor INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (idpontos))


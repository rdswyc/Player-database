CREATE DATABASE PlayerDb;

CREATE TABLE Nation
(
    ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

CREATE TABLE League
(
    ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    NationId INT NOT NULL,
    FOREIGN KEY (NationId) REFERENCES Nation(ID)
);

CREATE TABLE Player
(
    ID INT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    BirthDate DATE NOT NULL,
    Gender VARCHAR(1) NOT NULL,
    Height DECIMAL(4, 2) NULL,
    Weight DECIMAL(5, 2) NULL,
    Nationality INT NOT NULL,
    FOREIGN KEY (Nationality) REFERENCES Nation(ID)
);

CREATE TABLE PlayerAttributes
(
    PlayerID INT PRIMARY KEY,
    JerseyName VARCHAR(50) NOT NULL,
    Rating INT NOT NULL,
    SkillMoves INT NOT NULL,
    PreferredFoot VARCHAR(1) NOT NULL,
    FOREIGN KEY (PlayerID) REFERENCES Player(ID)
);

CREATE TABLE Position
(
    Label VARCHAR(3) PRIMARY KEY,
    Description VARCHAR(50) NOT NULL
);

CREATE TABLE PlayerPositions
(
    PlayerID INT,
    PositionLabel VARCHAR(3),
    PRIMARY KEY (PlayerID, PositionLabel),
    FOREIGN KEY (PlayerID) REFERENCES Player(ID),
    FOREIGN KEY (PositionLabel) REFERENCES Position (Label)
);

CREATE TABLE Stat
(
    Type VARCHAR(3) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);

CREATE TABLE PlayerStats
(
    PlayerID INT,
    StatType VARCHAR(3),
    Value INT NOT NULL,
    PRIMARY KEY (PlayerID, StatType),
    FOREIGN KEY (PlayerID) REFERENCES Player(ID),
    FOREIGN KEY (StatType) REFERENCES Stat(Type)
);

CREATE TABLE Team
(
    ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    LeagueId INT NOT NULL,
    FOREIGN KEY (LeagueId) REFERENCES League(ID)
);

CREATE TABLE PlayerContract
(
    PlayerID INT,
    TeamId INT,
    Validity YEAR NOT NULL,
    PRIMARY KEY (PlayerID, TeamId),
    FOREIGN KEY (PlayerID) REFERENCES Player(ID),
    FOREIGN KEY (TeamId) REFERENCES Team(ID)
);

CREATE USER webUser IDENTIFIED BY 'node.js-web4';

GRANT SELECT ON * TO webUser;

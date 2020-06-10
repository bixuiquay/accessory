--======================================================
--======================================================

-- NOTICE!!!
-- PLEASE READ BEFORE RUNNING THIS SCRIPT!!!!
-- You must create new database `xxx` before running any migrations

--======================================================
--======================================================

-- Database: lifestyle

-- DROP DATABASE lifestyle;

CREATE DATABASE accessory
  WITH 
  OWNER = useradmin
ENCODING = 'UTF8'
  -- LC_COLLATE = 'en_US.UTF-8'
  -- LC_CTYPE = 'en_US.UTF-8'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;
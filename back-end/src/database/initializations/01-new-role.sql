--======================================================
--======================================================

-- NOTICE!!!
-- PLEASE READ BEFORE RUNNING THIS SCRIPT!!!!
-- You must create new user in postgresql

--======================================================
--======================================================
-- User: lsadmin
-- DROP USER lsadmin;

CREATE USER useradmin WITH
  LOGIN
  SUPERUSER
  CREATEDB
  CREATEROLE
  INHERIT
  NOREPLICATION
  CONNECTION LIMIT -1
  PASSWORD 'Admin@12345';

/* eslint-disable no-undef */
console.log('process.env.DB_HOST: ', process.env.DB_HOST);
module.exports = {
  'name': 'default',
  'type': 'postgres',
  'host': process.env.DB_HOST || 'localhost',
  'port': Number(process.env.DB_PORT) || 5432,
  'username': process.env.DB_USER || 'useradmin',
  'password': process.env.DB_PASSWORD || 'Admin@12345',
  'database': process.env.DB_NAME || 'accessory',
  'synchronize': process.env.ORM_SYNCHRONIZE === 'true' || false,
  'schema': process.env.DB_SCHEMA || 'public',
  'entities': [
    'src/**/*.entity.ts'
  ],
  'migrations': [
    'src/database/migrations/**/*.ts'
  ],
  'cli': {
    'entitiesDir': 'src/database/entities',
    'migrationsDir': 'src/database/migrations'
  }
};

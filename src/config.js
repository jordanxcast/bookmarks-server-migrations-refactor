module.exports = {
  PORT: 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 12345,
  DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/bookmarks',
};
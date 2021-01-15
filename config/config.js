require('dotenv').config();

process.env.DATABASE_TEST_URL = `${process.env.DATABASE_URL}_test`;

module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL"
  },
  "test": {
    "use_env_variable": "DATABASE_TEST_URL"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
};

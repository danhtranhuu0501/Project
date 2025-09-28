const MyConstants = {
    DB_SERVER: process.env.DB_SERVER || 'demo.fteuxmw.mongodb.net',
    DB_USER: process.env.DB_USER || 'danhtranhuu0501',
    DB_PASS: process.env.DB_PASS || '123',
    DB_DATABASE: process.env.DB_DATABASE || 'demo',
    JWT_SECRET: process.env.JWT_SECRET || 'TranDanh',
    JWT_EXPIRES: process.env.JWT_EXPIRES || '3600000', // in milliseconds
    EMAIL_USER: process.env.EMAIL_USER || 'danhtranhuu0501@gmail.com', // gmail service
    EMAIL_PASS: process.env.EMAIL_PASS || 'fura zijf nilg foqb'
  };
  module.exports = MyConstants;
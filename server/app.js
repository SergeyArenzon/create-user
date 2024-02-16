
import createError from "http-errors"
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import User  from './models/user.model.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';
import cors from 'cors'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

var app = express();
app.use(cors());
// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongodb
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/test_db";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  // Create an instance of model SomeModel
// const awesome_instance = new User({ user_name: "awesome", phone: "05445344", password: "2rsdfrsdfsdf" });
// // Save the new model instance asynchronously
// const stave = await awesome_instance.save();

// console.log({stave});

}

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 5001;

app.listen(PORT, (err) => {
  console.log("server running on:", PORT);
});
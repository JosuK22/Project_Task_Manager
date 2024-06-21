const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const authRouter = require('./routes/authRoute.js');
const taskRouter = require('./routes/taskRoute.js');
const userRouter = require('./routes/userRoute.js');
const AppError = require('./utils/AppError.js');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('Welcome to my server');
});

app.get('/api/v1/', (req, res) => {
  return res.status(200).send('Explore version 1 of my server.');
});

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/tasks', taskRouter);

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  throw new AppError('Route does not exists', 404);
});

app.use(globalErrorHandler);

module.exports = app;

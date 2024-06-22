const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const authRouter = require('./routes/authRoute.js');
const taskRouter = require('./routes/taskRoute.js');
const userRouter = require('./routes/userRoute.js');
const AppError = require('./utils/AppError.js');
const morgan = require('morgan');

const app = express();

// Define the allowed methods
const corsOptions = {
  origin: 'http://localhost:5173', // Allow your client URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Add all methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any headers you need to allow
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions)); // Allow OPTIONS on all routes

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
  throw new AppError('Route does not exist', 404);
});

app.use(globalErrorHandler);

module.exports = app;


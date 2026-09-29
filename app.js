const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const submissionRoutes = require('./routes/submit.routes');
const outputRoutes = require('./routes/output.routes');
const adminRoutes = require('./routes/admin.routes');
const errorMiddleware = require('./middlewares/error.middleware');


const app = express();

app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
}));

app.use(cookieParser());
app.use(express.json());


app.get('/' , (req, res) => {
     res.send('server is ready')
});

app.use('/api/auth', authRoutes);

app.use('/api', submissionRoutes);

app.use('/api', outputRoutes);

app.use('/api', adminRoutes);

app.use(errorMiddleware);

module.exports = app 
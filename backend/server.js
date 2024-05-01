const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const LoginRoutes = require('./Routes/login.routes')
const EventRoutes = require('./Routes/event.routes')
const Dashboard = require('./Routes/dashboard.routes')
const Order = require('./Routes/order.routes')
const resetPasswordRouter = require('./Routes/resetPassword.routes')
const cron=require('node-cron');
const EventModel = require('./modals/event.modal');
const {DatabaseConnection} = require('./db/db.connection')

dotenv.config()
console.log(process.env.MONGO_URI)
DatabaseConnection();

const app = express()

app.use(cors())
app.use('/api/auth', LoginRoutes)
app.use('/api/event/', EventRoutes)
app.use('/api/update/', resetPasswordRouter)
app.use('/api/dashboard/', Dashboard)
app.use('/api/payment/' ,Order)

// cron.schedule('0 0 * * *', async () => {
//     try {
//       const currentDate = new Date();
//       await EventModel.updateMany(
//         { endDate: { $lt: currentDate }, eventStatus: { $ne: 'completed' } },
//         { $set: { eventStatus: 'completed' } }
//       );
//       console.log('Updated event statuses.');
//     } catch (error) {
//       console.error('Error updating event statuses:', error);
//     }
//   })

const port = process.env.PORT || 8000
app.listen(port, (req,res) => {
    console.log('Server Chalu Ho gya hai ',port)
})
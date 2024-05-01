const EventModel=require('../modals/event.modal')
const UserModel = require('../modals/user.modal');
const sendNotification = require('../utli/SendNotification');
const CreateEvent = async (req, res) => {
    console.log(req.body);
    let mailSend = false;
    const eventExists = await EventModel.exists({ eventName: req.body.eventName })
    if(eventExists!=null){
        return res.json({
            'message': 'Event Already Exists',
            'statusCode': 400,
        })
    }
    else if (eventExists===null) {
        const currentDate = new Date(Date.now());
        const currentDay = currentDate.getDate(); // Get the day of the month (1-31)
        const currentMonth = currentDate.getMonth() + 1; // Get the month (0-11), adding 1 to make it (1-12)
        const currentYear = currentDate.getFullYear(); // Get the full year (e.g., 2024)

// Pad the day with a leading zero if it's less than 10
        const dayString = currentDay < 10 ? '0' + currentDay : currentDay.toString();

// Pad the month with a leading zero if it's less than 10
        const monthString = currentMonth < 10 ? '0' + currentMonth : currentMonth.toString();

// Form the string representation of the date
        const dateString = currentYear + '-' + monthString + '-' + dayString;
        if((dateString === req.body.startDate && dateString===req.body.endDate) || (dateString === req.body.startDate && new Date(req.body.startDate).getTime() < new Date(req.body.endDate).getTime() )){
          
            mailSend = true
            EventModel.create(
                {
                    eventName:req.body.eventName,
                    eventType:req.body.eventType,
                    startDate:req.body.startDate,
                    endDate:req.body.endDate,
                    eventDetail:req.body.eventdetails,
                    eventStatus:req.body.eventStatus,
                    participatedStudents:req.body.participatedStudents,
                    eventCoordinators: req.body.eventCoordinators,
                    eventImage:req.body.eventImage,
                    eventFee: req.body.eventFee
                }
                
            )
            console.log(req.body.startDate)
           
        }
        else if((new Date(req.body.startDate).getTime() < new Date(Date.now()).getTime()) || (new Date(req.body.startDate).getTime() > new Date(req.body.endDate).getTime()) || (req.body.eventFee < 0)) {
            res.json({
                'message': "Invalid Event dates or invalid Amount",
                'statusCode': 400,
            });
            console.log('Hi')
            return;
        }
        else
        {mailSend = true;
        EventModel.create(
            {
                eventName:req.body.eventName,
                eventType:req.body.eventType,
                startDate:req.body.startDate,
                endDate:req.body.endDate,
                eventDetail:req.body.eventdetails,
                eventStatus:req.body.eventStatus,
                participatedStudents:req.body.participatedStudents,
                eventCoordinators: req.body.eventCoordinators,
                eventImage:req.body.eventImage,
                eventFee: req.body.eventFee
            }
            
        )
        }
    } 
    if(mailSend){
        const users = await UserModel.find({}) ; // gives array of all users
        const emails = users.map((user)=>{
            return user.email
        })
        console.log(users)
        
            sendNotification(emails)
            return res.json({
                'message': 'Event Created Successfully',
                'statusCode': 200,
            })
    }
}
module.exports=CreateEvent
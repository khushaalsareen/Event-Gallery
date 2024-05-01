const EventModel = require("../modals/event.modal")

const GetCompletedEvent = async (req,res) => {
    const events = await EventModel.find({})
    if (events === null) {
        res.json({
            'message': 'No event found',
            'statusCode': 400,
        })
    } else {
        // console.log()
        res.json({
            'eventData': events.filter((event) =>{
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
                return dateString!== event.endDate && new Date(event.endDate).getTime() < Date.now() 
         }   ),
            'message': 'Events Send Successfully',
            'statusCode': 400,
        }) 
    }
}
module.exports=GetCompletedEvent
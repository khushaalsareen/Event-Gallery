const EventModel = require("../modals/event.modal");


const updateEvent = async (req,res)=>{
    const {eventName, eventType, startDate, endDate,eventdetails, eventCoordinators, eventFee} = req.body;
    const {en} = req.params;
    try{
        const eventExists = await EventModel.findOne({eventName:en})

       
        if(!eventExists){
            return res.json({
                'statusCode':400,
                'message': "No such event exists", 
            })
        }
        console.log(eventExists)
        const id = eventExists._id
        if(eventType)
           { await EventModel.findByIdAndUpdate(id,{eventType})
        }
        if(eventName)
            await EventModel.findByIdAndUpdate(id, {eventName})
        if(startDate)
            await EventModel.findByIdAndUpdate(id,{startDate})
        if(endDate)
            await EventModel.findByIdAndUpdate(id,{endDate})
        if(eventdetails)
            await EventModel.findByIdAndUpdate(id,{eventDetail:eventdetails})
        if(eventCoordinators)
            await EventModel.findByIdAndUpdate(id,{eventCoordinators})
        if(eventFee)
            await EventModel.findByIdAndUpdate(id,{eventFee});


            return res.json({
                'statusCode': 200,
                'message': 'Updated successfully',
            })


    } catch(error){
        console.log('error ', error);
    }
}

module.exports = updateEvent
const EventModel = require("../modals/event.modal")
const deleteEvent = async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteEvent = await EventModel.findOneAndDelete({eventName: id});
        if(!deleteEvent){
            return res.status(400).json({
                success: false,
                message: 'Invalid Event ID',
            })
        }
        
        res.status(200).json({
            success: true,
            message: 'Deleted Successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error in deleting event'
        })
    }
}

module.exports = {deleteEvent}
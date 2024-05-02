const EventModel = require("../modals/event.modal");
const userModal = require("../modals/user.modal");

const getParticipateeListController = async (req, res) => {
    const fetchEvent = await EventModel.findById(req.body.eventId)
    if(!fetchEvent){
        return res.status(500).send({
            success:false,
            message: "No such event exists",
        })
    }
    const list = fetchEvent.participateeList;
    const userList = await userModal.find({ _id: { $in: list } });
    const response = await Promise.all(list.map(async (id) =>
        await userModal.findOne(_id = id)
    ));    
    
    console.log(response);
    res.status(200).json({
        userList : userList,
        // response: list, 
    });
}
module.exports = getParticipateeListController;
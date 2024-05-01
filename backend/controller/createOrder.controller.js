const EventModel = require("../modals/event.modal");
const userModal = require("../modals/user.modal");
const Razorpay = require('razorpay');

const createOrderController = async(req, res) =>{
    const userId = req.params.userId
    const fetchUser = await userModal.exists({ collegeId: userId })
    if (fetchUser) {
        const userInfo = await userModal.findById(fetchUser._id)
        const fetchEvent = await EventModel.findById(req.body.eventId)

        const EventExists =  userInfo.participatedEvents.some(
            (event) => {
                return event?._id?.toString() === req.body.eventId
            }
        )
        console.log("Event" + EventExists)
        if (EventExists) {
            console.log("Event Exists");
            res.json({
                'message': "Already registered",
                'statusCode': 200
            })
            return;
        }
        var instance = new Razorpay({ key_id: 'rzp_test_M4qo1qaKhUs2y3', key_secret: 'dFEDHQNMU2LfTSs4B4WgSkmo' })
        var options = {
        amount: fetchEvent.eventFee*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
        };

        instance.orders.create(options, function(err, order) {
            console.log(order.id);
            res.json({
                'orderId' : order.id
            })
        });
    } else {
        res.json({
            'message': "Account doesn't Exist",
            'statusCode': 403
        })
    }
} 


module.exports = createOrderController
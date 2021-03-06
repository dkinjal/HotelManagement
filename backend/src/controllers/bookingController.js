const ReservationsModel = require("../models/Reservations");
const mongoose = require('mongoose');
const HotelsModel = require("../models/Hotels");
const Customer_Details = require("../models/Customer_Details");


exports.createBooking = async function (req, res) {
    const data = req.body;
    console.log(data);
    try{
        let newBooking = new ReservationsModel({
            Hotel_id : data.Hotel_id,
            Customer_id: data.Customer_id,
            Hotel_name: data.Hotel_name,
            Customer_name: data.Customer_name,
            Rate_per_day: data.Rate_per_day,
            Booking_period_days: data.Booking_period_days,
            Booking_start_date: data.Booking_start_date,
            Booking_end_date: data.Booking_end_date,
            Total_cost: data.Total_cost,
            Created_at: data.Created_at,
            image: data.Hotel_image,
            Guests: data.Guests,
            Rooms: data.Rooms,
            RoomType: data.RoomType,
            Amenities: data.Amenities,
            // _id : mongoose.Schema.ObjectId
            });
        const book = await newBooking.save();

            if (!book) {
                console.error("Error in creating booking : " + err);
                // res(null,{ response_code: 500, response_data: "Something went wrong!", err: err});
                res
                    .status(500)
                    .send(JSON.stringify({message: 'Something went wrong!'}));
            } else {
                console.log("here!")
                var value = await Customer_Details.find({_id:data.Customer_id},{});
                console.log("details: ",value, value[0].Customer_Loyalty);
                var updateScore = await Customer_Details.findOneAndUpdate(
                    {
                        _id: data.Customer_id,
                    },
                    {
                        Customer_Loyalty:Number(value[0].Customer_Loyalty)+1,
                        Rewards:Number(value[0].Rewards)+Number(data.Total_cost)
                    }
                );
                res.status(200).setHeader("Content-Type", "text/plain").end(JSON.stringify(data));

            }

    }catch(err){
    console.error("Error in createJobPostings : " + err);
    res.send(null,{ response_code: 500, response_data: "Something went wrong!", err: err});
}
};

exports.deleteBooking = async function (req, res) {
    // const data= req.body;
    // console.log(data)
    // const id= data.id;
    // console.log(id);
    console.log(req.query)
    let id=req.query.id;
    try{
        ReservationsModel.findByIdAndDelete(id, async function (err, docs) {
            if (err) {
                console.error("Error in delete booking : " + err);
                res
                    .status(500)
                    .send(JSON.stringify({message: 'Something went wrong!'}));
            } else {
                var value = await Customer_Details.find({_id:req.query.customer_id},{});
                console.log("delete details: ",value, value[0].Customer_Loyalty);
                var updateScore = await Customer_Details.findOneAndUpdate(
                    {
                        _id: req.query.customer_id,
                    },
                    {
                        Customer_Loyalty:Number(value[0].Customer_Loyalty)-1,
                        Rewards: Number(value[0].Rewards)-Number(req.query.Total_cost)
                    }
                );

                res.status(200).setHeader("Content-Type", "text/plain").end(JSON.stringify(id));
            }
        });
    }catch(err){
        console.error("Error in createJobPostings : " + err);
        res
            .status(500)
            .send(JSON.stringify({ message: 'Something went wrong!'}));
    }
}
exports.getBookingsByID = async function (req, res){
    await console.log("Called Get Bookings API! ", req.query);
    var data = await ReservationsModel.find({"Customer_id":req.query.id});
    if (data){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(data));
    }
    else{
        res
            .status(500)
            .send(JSON.stringify({ message: 'Something went wrong!'}));
    }
}
exports.getBookingsByHotelID = async function (req, res){
    await console.log("Called Get Bookings API! ", req.query);
    var data = await ReservationsModel.find({"Hotel_id":req.query.id});
    if (data){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(data));
    }
    else{
        res
            .status(500)
            .send(JSON.stringify({ message: 'Something went wrong!'}));
    }
}
exports.getBookingsByName = async function (req, res){
    await console.log("Called Get Bookings API! ", req.query);
    var data = await ReservationsModel.find({"Customer_name":req.query.name});
    if (data){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(data));
    }
    else{
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!'}));
    }
}



exports.updateBooking = async function (req, res) {
    //req.params.id to access variables passed in path  for eg. /updateHotelById/1      req.params.id = 1
    console.log("Update hotel Function");
    console.log("req body: ", req.body);
    // var data = await HotelsModel.find({ _id: req.query._id });
    var data = req.body;
    try {
        await ReservationsModel.findOneAndUpdate(
            {
                _id: req.body._id,
            },
            {
                Hotel_id : data.Hotel_id,
                Customer_id: data.Customer_id,
                Hotel_name: data.Hotel_name,
                Customer_name: data.Customer_name,
                Rate_per_day: data.Rate_per_day,
                Booking_period_days: data.Booking_period_days,
                Booking_start_date: data.Booking_start_date,
                Booking_end_date: data.Booking_end_date,
                Total_cost: data.Total_cost,
                Created_at: data.Created_at,
                image: data.Hotel_image,
                Guests: data.Guests,
                Rooms: data.Rooms,
                RoomType: data.RoomType,
                Amenities: data.Amenities,
                }
        );
        res.send("Updated successfully")
    }catch (e) {
        console.log(e);
    }

}

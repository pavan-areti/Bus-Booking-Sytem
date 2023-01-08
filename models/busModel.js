const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
    },
    busName:{
        type: String,
        required: true,
    },
    busCapacity:{
        type: Number,
        required: true,
    },
    from:{
        type: String,
        required: true,
    },
    to:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    arrival:{
        type: String,
        required: true,
    },
    departure:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    seatsBooked:{
        type: Array,
        default: [],
    },
    status:{
        type: String,
        default: 'Yet to Depart',
    },
},
    {
        timestamps: true,
    }
);

const Bus = mongoose.model('Buses', busSchema);

module.exports = Bus;
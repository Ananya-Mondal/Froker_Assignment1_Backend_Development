const mongoose=require('mongoose')

const ApplicationSchema=new mongoose.Schema({
    name: {
        required: true,
        type: String,
      },
    phone: {
        required: true,
        type: String,
      },
    email: {
        required: true,
        type: String,
        unique: true,
      },
    password: {
        required: true,
        type: String,
      },
    salary: {
        required: true,
        type: Number,
      },
    dob: {
        required: true,
        type: Date,
      },
    dor: {
        required: false,
        type: Date,
        default:new Date(),
      },
    application_is_approve: {
        required:false,
        type: Boolean,
        default: false,
    },
    Purchase_Power_amount : {
        required: false,
        type:Number,
        default:0,
    }
    

})

const ApplicationModel=mongoose.model("applications",ApplicationSchema)

module.exports=ApplicationModel
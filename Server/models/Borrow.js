const mongoose=require('mongoose')

const BorrowSchema=new mongoose.Schema({
    userId: {
        required: true,
        type: String,
      },
    tenure: {
        required: true,
        type: Number,
      },
    borrowAmount: {
        required: true,
        type: Number,
      },
      monthly_repayment_amount: {
        required: true,
        type: Number,
      },
    borrowDate: {
        required: false,
        type: Date,
        default:new Date(),
      },
    
    

})

const BorrowModel=mongoose.model("borrow",BorrowSchema)

module.exports=BorrowModel
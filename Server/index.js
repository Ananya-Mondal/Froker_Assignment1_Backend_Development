require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ApplicationModel = require('./models/Application')
const BorrowModel = require('./models/Borrow')
const requireAuth = require("./auth");
const jwt = require('jsonwebtoken');

const app = express()

app.use(cors())
app.use(express.json())


const conn = process.env.MONGODB_URI
mongoose.connect(conn)
    .then(() => {
        console.log("connected")
    })
    .catch((err) => {
        console.log(err)
    })


//Create Post Request for Sign Up
app.post("/signup", async (req, res) => {
    try {
        const { name, phone, email, password, salary, dob } = req.body
        if (!name || !phone || !email || !password || !salary || !dob) {
            return res.status(400).json({ message: "Please enter all the fields" })
        }

        const current_date = new Date().getTime()
        const dob_date = new Date(dob).getTime()
        const age = Math.round((current_date - dob_date) / (1000 * 60 * 60 * 24 * 365))
        var application_is_approve = false
        var Purchase_Power_amount = 0

        if (salary >= 25000 && age > 20) {
            const retireMentAge = process.env.Retirement_Age
            const p_power = process.env.Purchase_Power
            application_is_approve = true

            //50%(this can be chage from config) of Total salary in his service till retirement. 
            //Retirement age can be change from config.
            Purchase_Power_amount = ((salary * 12) * p_power) * (retireMentAge - age)

        }


        const existingUser = await ApplicationModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with the same email already exists" })
        }
        else {
            const newApplication = new ApplicationModel({ name, phone, email, password, salary, dob, application_is_approve, Purchase_Power_amount })

            await newApplication.save()
                .then(Application => {
                    res.json(Application)
                })
                .catch(err => res.json(err))
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

})

//Create Post Request for Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all the fields" })
        }

        const existingUser = await ApplicationModel.findOne({ email, password });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid user credentials" })
        }
        else {
            const secret_key = process.env.JWT_Token_Key
            const token = jwt.sign({ userId: existingUser._id }, secret_key, { expiresIn: 60 * 3 })

            res.status(200).json({
                token: token,
                expiresIn: 180,
            })


        }
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

})

//Create Get Request Show User Data
app.get("/user", requireAuth, async (req, res) => {
    try {
        const id = req.userId;
        await ApplicationModel.findById({ _id: id })
            .then(users => res.json({ Purchase_Power_amount: users.Purchase_Power_amount, phone: users.phone, email: users.email, dor: users.dor, dob: users.dob, salary: users.salary }))
            .catch(err => res.json(err))

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

})


//Create Post Request for Login
app.post("/borrow", requireAuth, async(req, res) => {
    try {
        const id = req.userId;
        const { tenure, borrowAmount} = req.body
        if (!tenure || !borrowAmount ) {
            return res.status(400).json({ message: "Need to provided tenure and borrow amount" })
        }
        else if(tenure<=0 || borrowAmount<=0){
            return res.status(400).json({ message: "tenure and borrow amount should be graterthan zero." })
        }
        await ApplicationModel.findById({ _id: id })
            .then(users => {
                if(users.application_is_approve)
                {
                    const p_power=users.Purchase_Power_amount
                    var monthly_repayment_amount
                    var updated_power_amount
                    if((p_power-borrowAmount)>=0)
                    {
                        const interestRate = parseFloat(process.env.Interest_rate)
                        updated_power_amount=p_power-borrowAmount
                        //Calculating EMI 
                        const roi=(interestRate/1200).toFixed(2)
                        var roi1=parseFloat(roi)+1
                        var roi2= Math.pow(roi1, tenure)
                        var roi3=parseFloat(roi2)*parseFloat(roi)
                        var roi4=parseFloat(roi2)-1
                        var roi5=parseFloat(roi3)/parseFloat(roi4)
                        monthly_repayment_amount= Math.round(borrowAmount*parseFloat(roi5))
                        //End of Calculation

                        ApplicationModel.findByIdAndUpdate({_id:id},{Purchase_Power_amount:updated_power_amount})
                        .then(resp=>{
                            
                        })
                        .catch(err => res.json(err))
                        
                        const newBorrow = new BorrowModel({ userId:users._id,tenure,borrowAmount,monthly_repayment_amount})

                         newBorrow.save()
                            .then(Borrow => {
                                res.json({ "Purchase_Power_amount": updated_power_amount,"monthly_repayment_amount":monthly_repayment_amount })
                            })
                            .catch(err => res.json(err))
                    }
                    else{
                        return res.status(400).json({ message: "Your Purchase Power Amount is less than Borrow Amount" })
                    }
                    
                }
                else{
                    return res.status(400).json({ message: "Your application is not yet approved." })
                }
                


            })
            .catch(err => res.json(err))

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

})


//process.env.PORT in hosting
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})
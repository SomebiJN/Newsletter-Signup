const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const { options, post } = require("request")
const dotenv = require('dotenv')

const app = express()
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;

//serve up our static(local) css file and images located in public folder
app.use(express.static("public"));
//tell app to use body parser
app.use(bodyParser.urlencoded({extended: true}))

//user visits our home page route
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

//post request made by user to home route for when submit clicked on form
app.post("/",function(req,res){
    const firstName = req.body.fName
    const lastName = req.body.lastName
    const email = req.body.email

    //subscriber data sent to mailchimp
    const data = {
        members:    [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    //data is sent to mailchimp in JSON format
    const jsonData = JSON.stringify(data)

    const list_id = "ee6e696ef4"
    const url = "https://us13.api.mailchimp.com/3.0/lists/" + list_id
    const options = {
        method: "post",
        auth: "somebi:" + SECRET_KEY
    }

    //make POST request to mailchimp
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){ //OK
            //send response back to website
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            //log response to post request our server sent to mailchimp
            console.log(JSON.parse(data))
        })
    })

    //send user json data to mailchimp server
    request.write(jsonData)
    request.end()
    
})

//post request made by failure route when Try again button clicked
app.post("/failure",function(req,res){
    //redirect to home route to try again
    res.redirect("/")
})

//listens on heroku's set port or on local port 3000
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000")
})


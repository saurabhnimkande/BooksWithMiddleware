const express = require('express');
const app = express();
const data=require('./data')

var ans=[];

app.use(express.json());

const addName = (req,res,next) => {
    console.log("running");
    ans=[];
    next();
    if(ans.length==1) {
        res.send({api_requested_by:"Saurabh Nimkande",books:ans[0]})
    } else {
        res.send({api_requested_by:"Saurabh Nimkande",books:ans})
    }
    console.log("done")
  };
  

app.use(addName);


app.get("/", (req, res) => {
    new_arr=[...data]
    ans=[...new_arr];
});

app.post("/books", (req, res) => {
   const new_arr=[req.body,...data];
   ans=[...new_arr];
});

app.get("/books/:year", (req, res) => {
    const new_arr=data.filter( (user)=> user.year == req.params.year);
    ans=[...new_arr];
});

app.patch("/books/:year", (req, res) => {
    const new_arr=data.filter( (user)=> {
        if(user.year == req.params.year) {
            user.year=2022;
            user.author="Saurabh";
            return user;
        }
    });
    ans=[...new_arr];
})

app.delete("/books/:year", (req, res)=>{
    const new_arr=data.filter( (user)=> user.year!=req.params.year);
    ans=[...new_arr];
})

app.listen(2525, ()=>{
    console.log("listening on port 2525")
});

// const authorise = (permission) => {
//     return (req, res, next) => {
//       const originalSendFunc = res.send.bind(res);
//       res.send = function (body) {
//         body.name = "Nrupul Dev";
//         console.log(body); // do whatever here
//         return originalSendFunc(body);
//       };
//       next();
//     };
//   };
  
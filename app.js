const express = require('express');
const app = express();
const data=require('./data')

app.use(express.json());

app.get("/", (req, res) => {
    res.send(data);
});

app.post("/books", (req, res) => {
   const new_arr=[req.body,...data];
   res.send(new_arr);
});

app.get("/books/:year", (req, res) => {
    const newData=data.filter( (user)=> user.year == req.params.year);
    res.send(newData);
});

app.patch("/books/:year", (req, res) => {
    const newData=data.filter( (user)=> {
        if(user.year == req.params.year) {
            user.year=2022;
            user.author="Saurabh";
            return user;
        }
    });
    res.send(newData);
})

app.delete("/books/:year", (req, res)=>{
    const newarr=data.filter( (user)=> user.year!=req.params.year);
    res.send(newarr);
})

app.listen(2525, ()=>{
    console.log("listening on port 2525")
});
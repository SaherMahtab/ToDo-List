const bodyParser = require("body-parser");
const express=require("express");
const date=require(__dirname+"/date.js");

const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items=["buy","cook","read"];
const workItems=[];

app.get("/",function(req,res){

    const day=date.getDate();
    
    res.render("list",{ListTitle :day,newListItems:items});
});

app.post("/",function(req,res){
        
    let item=req.body.newItem;

        if(req.body.list==="Work"){
            workItems.push(item);
            res.redirect("/work");
        }
        else{
            items.push(item);
            res.redirect("/");
        }
        
});

app.get("/work",function(req,res){
    res.render("list",{ListTitle:"Work List", newListItems:workItems})
});

app.get("/about",function(req,res){
    res.render("about");
});

app.post("/work",function(req,res){
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});
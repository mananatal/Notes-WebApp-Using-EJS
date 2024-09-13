const express=require("express");
const app=express();
const path=require("path");
const fs=require("fs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    const files=fs.readdirSync("./files");
    res.render("index",{files:files});
})

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.description,(err)=>{
        if(err)
            throw new Error(err);
            res.redirect("/");
    });
    
})

app.get("/delete/:file",(req,res)=>{
    fs.unlink(`./files/${req.params.file}`,(err)=>{
        if(err)
            throw new Error(err);
            res.redirect("/");
    });
    
})

app.get("/info/:file",(req,res)=>{
    const file=fs.readFile(`./files/${req.params.file}`,(err,content)=>{
        if(err)
            throw new Error(err);
        res.render("info",{title:req.params.file,description:content.toString()});
        console.log(content.toString())
    });
    // res.render("index",{files:files});
})

app.listen(3000,()=>{
    console.log("Server is up and running");
})
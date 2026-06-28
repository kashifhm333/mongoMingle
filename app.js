const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const userModel = require("./models/user");
const { create } = require('domain');


const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req, res)=>{
    res.render("index");
})
app.get("/read", async (req, res)=>{
    let allUsers = await userModel.find();
    res.render("read", { users: allUsers });
})
app.post("/create", async (req, res)=>{
    let {name, email, image} = req.body;
   let createdUser =  await userModel.create({
        name,
        email,
        image,
    });

    // res.send(createdUser);
    res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
    let userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
    let userId = req.params.id;


    let user = await userModel.findById(userId);
    res.render("edit", { userId: req.params.id, name: user.name, email: user.email, image: user.image });
});

app.post("/update/:id", async (req, res) => {
    let userId = req.params.id;
    let { previousName, newName, previousEmail, newEmail, previousImage, newImage } = req.body;

    await userModel.findByIdAndUpdate(userId, {
        name: newName,
        email: newEmail,
        image: newImage
        
    });

    res.redirect("/read");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


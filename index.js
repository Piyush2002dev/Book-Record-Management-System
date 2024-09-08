const express = require("express");
const {users} = require("./data/users.json")

const app = express();

const PORT = 8081; 

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running."
    });
});

app.get("/users", (req, res)=>{
    res.status(200).json({
        success: true,
        data: users,
    })
})

app.get("/users/:id", (req, res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id ===id );
    if(!user)
        return res.status(404).json({
    success: false,
    message: "User Not Found"
    })
    return res.status(200).json({
        success: true,
        data: user
    })
})

app.all("*", (req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

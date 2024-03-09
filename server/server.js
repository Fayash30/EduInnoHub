const express = require("express");
const app = express();
const register = require("./routes/register")
const signin = require("./routes/login");
const DBConnect = require("./Database/Connection")
const userProfile = require("./routes/UserProfile");

app.use(express.json());

DBConnect();


const cors = require('cors');

app.use(cors());

const mongoGrid = require('./routes/upload');

const master = require('./routes/Master');

const upload = mongoGrid.upload;

app.post("/api/upload",userProfile.verifyToken ,  upload.single('file'), mongoGrid.projectupload);

app.get("/metadata" , mongoGrid.getFiles);

app.get("/metadata/:filename" , mongoGrid.getFile);

app.get("/file/:filename" , mongoGrid.download);

app.delete("/deleteProject/:id",mongoGrid.deleteProjects);

app.post('/api/create',register.AddUser);

app.put('/api/updateUser/', userProfile.verifyToken, register.updateUser);

app.get('/api/getUsers/',register.getUsers);

app.delete('/api/deleteUser/:id',register.deleteUser);

app.get('/getprojects',mongoGrid.getprojects);

app.get('/getproject/:id' , mongoGrid.getproject);

app.post("/api/login" , signin.login);

app.get("/getUser", userProfile.verifyToken , mongoGrid.getUsers);

app.get("/getUserProjects", userProfile.verifyToken , mongoGrid.getUserProjects);

app.get('/getDomains',master.getdomains);

app.post('/postDomains',master.postdomains);

app.put('/domains/:id',master.updatedomain);

app.delete('/domains/:id',master.deletedomain);

app.put('/college/:id',master.updatecollege);

app.delete('/college/:id',master.deletecollege);

app.put('/course/:id',master.updatecourse);

app.delete('/course/:id',master.deletecourse);

app.get('/getcolleges',master.getcolleges);

app.post('/postcolleges',master.postcolleges);

app.get('/getcourses',master.getcourses);

app.post('/postcourses',master.postcourses);


app.listen(5000 , ()=> {
    console.log("Server is Started...");
})

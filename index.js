const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { reset } = require('nodemon');
app.use(express.json());

const users = [];

app.get('/users',(req,res)=>{
    res.json(users); 
})
app.post('/users',async(req,res)=>{

    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = {name:req.body.name, password:hashedPassword};
        users.push(user);
        res.status(201).send()
    }
    catch{
        res.status(500).send()
    }     
})
app.post('/users/login',async(req,res)=>{
    const user = users.find(user => user.name = req.body.name);
    if(user == null){
        return res.status(400).send('Can not find user');
    }
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send('success')
        }else{
            res.send('Password Did not matched')
        }
    }
    catch{
        res.status(500).send();
    }
})


app.listen(3000,()=>console.log('listening to port 3000'));
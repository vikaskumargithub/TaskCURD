import express from 'express'
import { data } from "./data.js";


let app=express()

app.use(express.json())


app.post('/getPersons', (req, res) => {
    let newPerson = req.body;
    if (!newPerson || !newPerson.name) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid request body, name is required"
        });
    }

    const id = data.length + 1;
    data.push({
        id,
        name: newPerson.name
    });

    res.status(201).json({
        status: "success",
        data: {
            id,
            name: newPerson.name
        }
    });
});

app.get("/getPersons",(req,res)=>{
    if (data.length<=0) {
        return res.status(404).json({
            status:"fail",
            message:"wasn't able to get data",
            data:data
        })
    }
    res.status(200).json({
        status:"success",
        message:"successfully fetched data",
        data:data
    })
})



app.put("/getPersons/:id",(req,res)=>{
    let singlePerson = data.find(doc=>doc.id===+req.params.id)
    let newBody = req.body
    if (!singlePerson) {
        return res.status(404).json({
            status:"fail",
            message:"there is no document with this id"
        })
    }
    res.status(201).json({...singlePerson,newBody   })
})

app.delete("/getPersons/:id", (req, res) => {
    const id = +req.params.id;
    const index = data.findIndex(doc => doc.id === id);
    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: "There is no document with this id"
        });
    }

    
    const deletedDocument = data.splice(index, 1);

    res.status(200).json({
        status: "success",
        message: "Document deleted successfully",
        deletedDocument: deletedDocument[0]
    });
});

app.get("/createData/:id", (req, res) => {
    let person = data.find(doc => doc.name === req.params.name);
    if (!person) {
        return res.status(404).json({
            status: "fail",
            message: "There is no person with this name"
        });
    }

   
    let newDataEntry = { id: data.length + 1, personId: person.id, ...req.body };
    data.push(newDataEntry);

    res.status(201).json({
        status: "success",
        data: {
            newDataEntry
        }
    });
});



export default app;



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



   




export default app;



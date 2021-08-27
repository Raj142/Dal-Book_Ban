const adminModel = require("../model/adminModel");


exports.create =  (req,res)=>{
    console.log("Hey i got you");
    console.log(req.body);

  if(!req.body){
    res.status(400).send({ message : "Content can not be emtpy!"});
    return;
}

const book = new adminModel({
    ref : req.body.ref,
    name : req.body.name,
    price : req.body.price,
    catagory: req.body.catagory,
    stock : req.body.stock
})

// save book in the database
book
    .save(book)
    .then(data => {
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });


}


exports.update = async (req, res)=>{
    const bookFromDb = await  adminModel.find({ref : req.body.ref});
        
        const {name , price, catagory, stock} = req.body;
        console.log(name)
        console.log(bookFromDb[0].name)
        bookFromDb[0].name = name;
        bookFromDb[0].price = price;
        bookFromDb[0].catagory = catagory;
        bookFromDb[0].stock = stock;
        
         bookFromDb[0].save();
                res.status(200).json({
                    status: "success",
                     message: "Profile Updated",
                   });
                   
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
}


exports.delete = async (req, res)=>{
    console.log("Hello Detective")
  
    const bookFromDb = await  adminModel.find({ref : req.body.ref});
    console.log(bookFromDb[0]);
    try{
        bookFromDb[0].delete();
    }
    catch {
        console.log("eroor")
    }
    
    console.log("deleted successfully");
 
}


exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        adminModel.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found book with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving book with id " + id})
            })

    }else{
        adminModel.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}


let express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let Book = require('../model/business');
module.exports.displayBookList = (req,res,next)=>{
    Book.find((err,bookList)=>{
        if(err)
        {
        return console.error(err);
        }
        else
        {
         //console.log(BookList);
         res.render('business/list', 
         {title:'Business Contact List', BookList:bookList,
        displayName:req.user ? req.user.displayName:''});
        }
    });
}

module.exports.displayAddPage = (req,res,next)=>{
    res.render('business/add',{title:'Add Business List',
    displayName:req.user ? req.user.displayName:''})

}

module.exports.processAddPage = (req,res,next)=>{
    let newBook = Book({
        "name": req.body.name,
        "number":req.body.number,
        "email":req.body.email,
        
    });
    Book.create(newBook,(err,Book)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
        res.redirect('/businessList');
        }
    });
    }
    
        module.exports.displayEditPage = (req,res,next)=>{
            let id = req.params.id;
            Book.findById(id,(err,bookToEdit)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.render('business/edit',{title:'Edit Business List', book: bookToEdit,
                    displayName:req.user ? req.user.displayName:''});
                }
            
            });
        }

        module.exports.processEditPage = (req,res,next)=>{
            let id = req.params.id
            console.log(req.body);
            let updatedBook = Book({
                "_id":id,
                "name":req.body.name,
                "number":req.body.number,
                "email":req.body.email,
               
            });
            Book.updateOne({_id:id}, updatedBook,(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/businessList');
                }
            });
        }

        module.exports.performDelete= (req,res,next)=>{
            let id = req.params.id;
            Book.remove({_id:id},(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/businessList');
                }
                
            });
            }
        
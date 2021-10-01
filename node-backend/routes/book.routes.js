const express = require('express');
const app = express();

const bookRoute = express.Router();
let Book = require('../model/Book');

//Add a book. In Book.Post method need to pass three parameters. req, res and
//a method as parameter Book.create. In create method pass two parameters req.body and (error, data)
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

//Get all Books
bookRoute.route('/').get((req, res) => {
    Book.find((error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//Get a Boook
bookRoute.route('/read-book/:id').get((req, res,) => {
    Book.findById(req.params.id, (error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//Update Books
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => {
        if(error){
            return next(error);
            console.log(error)
        }else{
            res.json(data);
            console.log('Book updated successfully')
        }
    })
});

//Delete Book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            return next(error)
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = bookRoute;





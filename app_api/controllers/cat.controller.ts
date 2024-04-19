import { NextFunction, Request, Response } from "express";
import Cat, { ICat } from "../models/cat.model";

export default class ApiCtrl {

    /**
     * Returns all of the cats in the database
     */
    getAll = (req: Request, res: Response, next: NextFunction) => {
        Cat.find()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((error) => {
                res.status(400).json(error)
            })
        
    }

    /**
     * params: id - the id of the cat you want to retrieve
     * Returns {
     *     cat : Cat | undefined
     *     message : string
     *   }
     */
    getCat = (req: Request, res: Response, next: NextFunction) => {
        Cat.findById(req.params["id"])
            .then((cat: ICat | null) => {
                if (!cat) {
                    res.status(400).json({
                        cat: undefined,
                        message: `could not find cat with id: ${req.params["id"]}`
                    })
                } else {
                    res.status(200).json({
                        cat,
                        message: 'retrieved cat'
                    })
                }
            })
            .catch((error) => {
                res.status(400).json({
                    cat : undefined,
                    message : "error retrieving cat: " + error
                })
            })
    }

    /**
     * body:
     *      name - the name of the cat to add
     *      age - the age of the cat to add
     *      favoriteToy - the favorite toy of the cat to add
     * Adds a cat to the database with the given information.
     * Returns the cat that was added.
     */
    addCat = (req: Request, res: Response, next: NextFunction) => {
        const cat = new Cat({
            name: req.body.name,
            age: req.body.age,
            favoriteToy: req.body.favoriteToy
        });
        cat.save()
            .then(() => {
                res.status(201).json(cat)
            })
            .catch((error) => {
                res.status(500).json({
                    message : "Failed to create cat due to error: " + error
                })
            })
    }

    /**
     * Updates the information about a specific cat in the database.
     * params: id - the id of the cat to update
     * body:
     *      name - the name for the cat
     *      age - the age of the cat
     *      favoriteToy - the favorite toy of the cat
     */
    updateCat = (req: Request, res: Response, next: NextFunction) => {
        Cat.findByIdAndUpdate(req.params["id"], {
            name : req.body["name"],
            age : req.body["age"],
            favoriteToy: req.body["favoriteToy"]
        })
        .then(() => {
            res.status(200).json({
                message: "success"
            })
        })
        .catch((error) => {
            res.status(400).json({
                message : "failure: " + error
            })
        })
    }

    /**
     * params: id - the id of the cat you want to delete.
     * Deletes the cat with the specified id.
     * Returns a message stating whether the delete was succesfull.
     */
    deleteCat = (req: Request, res: Response, next: NextFunction) => {
        Cat.findByIdAndDelete(req.params["id"])
            .then(() => {
                res.status(200).json({
                    message: "cat deleted successfully"
                })
            })
            .catch((error) => {
                res.status(400).json({
                    message : "error retrieving cat: " + error
                })
            })
    }
}
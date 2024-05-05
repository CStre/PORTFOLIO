import { NextFunction, Request, Response } from "express";
import Visitor, { IVisitor } from "../models/visitor.model";

export default class ApiCtrl {

    /**
     * Returns all of the cats in the database
     */
    getAll = (req: Request, res: Response, next: NextFunction) => {
        Visitor.find()
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
    getVisitor = (req: Request, res: Response, next: NextFunction) => {
        Visitor.findById(req.params["id"])
            .then((visit: IVisitor | null) => {
                if (!visit) {
                    res.status(400).json({
                        visit: undefined,
                        message: `could not find cat with id: ${req.params["id"]}`
                    })
                } else {
                    res.status(200).json({
                        visit,
                        message: 'retrieved cat'
                    })
                }
            })
            .catch((error) => {
                res.status(400).json({
                    visit : undefined,
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
    addVisitor = (req: Request, res: Response, next: NextFunction) => {
        const visit = new Visitor({
            name: req.body.name,
            company: req.body.company,
            email: req.body.email
        });
        visit.save()
            .then(() => {
                res.status(201).json(visit)
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
    updateVisitor = (req: Request, res: Response, next: NextFunction) => {
        Visitor.findByIdAndUpdate(req.params["id"], {
            name : req.body["name"],
            company : req.body["company"],
            email: req.body["email"]
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
    deleteVisitor = (req: Request, res: Response, next: NextFunction) => {
        Visitor.findByIdAndDelete(req.params["id"])
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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_model_1 = __importDefault(require("../models/visitor.model"));
class ApiCtrl {
    constructor() {
        /**
         * Returns all of the cats in the database
         */
        this.getAll = (req, res, next) => {
            visitor_model_1.default.find()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        };
        /**
         * params: id - the id of the cat you want to retrieve
         * Returns {
         *     cat : Cat | undefined
         *     message : string
         *   }
         */
        this.getVisitor = (req, res, next) => {
            visitor_model_1.default.findById(req.params["id"])
                .then((visit) => {
                if (!visit) {
                    res.status(400).json({
                        visit: undefined,
                        message: `could not find cat with id: ${req.params["id"]}`
                    });
                }
                else {
                    res.status(200).json({
                        visit,
                        message: 'retrieved cat'
                    });
                }
            })
                .catch((error) => {
                res.status(400).json({
                    visit: undefined,
                    message: "error retrieving cat: " + error
                });
            });
        };
        /**
         * body:
         *      name - the name of the cat to add
         *      age - the age of the cat to add
         *      favoriteToy - the favorite toy of the cat to add
         * Adds a cat to the database with the given information.
         * Returns the cat that was added.
         */
        this.addVisitor = (req, res, next) => {
            const visit = new visitor_model_1.default({
                name: req.body.name,
                company: req.body.company,
                email: req.body.email
            });
            visit.save()
                .then(() => {
                res.status(201).json(visit);
            })
                .catch((error) => {
                res.status(500).json({
                    message: "Failed to create cat due to error: " + error
                });
            });
        };
        /**
         * Updates the information about a specific cat in the database.
         * params: id - the id of the cat to update
         * body:
         *      name - the name for the cat
         *      age - the age of the cat
         *      favoriteToy - the favorite toy of the cat
         */
        this.updateVisitor = (req, res, next) => {
            visitor_model_1.default.findByIdAndUpdate(req.params["id"], {
                name: req.body["name"],
                company: req.body["company"],
                email: req.body["email"]
            })
                .then(() => {
                res.status(200).json({
                    message: "success"
                });
            })
                .catch((error) => {
                res.status(400).json({
                    message: "failure: " + error
                });
            });
        };
        /**
         * params: id - the id of the cat you want to delete.
         * Deletes the cat with the specified id.
         * Returns a message stating whether the delete was succesfull.
         */
        this.deleteVisitor = (req, res, next) => {
            visitor_model_1.default.findByIdAndDelete(req.params["id"])
                .then(() => {
                res.status(200).json({
                    message: "cat deleted successfully"
                });
            })
                .catch((error) => {
                res.status(400).json({
                    message: "error retrieving cat: " + error
                });
            });
        };
    }
}
exports.default = ApiCtrl;
//# sourceMappingURL=visitor.controller.js.map
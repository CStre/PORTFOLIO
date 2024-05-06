"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("../models/user.model"));
class AuthenticationController {
    constructor() {
        this.register = (req, res, next) => {
            // Initial log with detailed request body information
            console.log("Received request body:", req.body);
            // Check if all necessary fields are provided
            if (!req.body.name || !req.body.email || req.body.isAdmin === undefined || !req.body.password) {
                console.error("Error: Missing required fields during registration.");
                return res
                    .status(400)
                    .json({ "error": "All fields required" });
            }
            const user = new user_model_1.default();
            user.name = req.body.name;
            user.email = req.body.email;
            user.isAdmin = req.body.isAdmin;
            user.setPassword(req.body.password);
            // Save the user and handle the promise
            user.save()
                .then((user) => {
                const token = user.generateJwt();
                console.log(`User registered successfully: ${user.email}`);
                res.status(200).json({ token, user });
            })
                .catch((error) => {
                console.error(`Failed to register user: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            });
        };
        this.login = (req, res, next) => {
            // Log attempt to login
            console.log("Attempting login for:", req.body.email);
            if (!req.body.email || !req.body.password) {
                console.error("Error: Missing email or password for login.");
                return res
                    .status(400)
                    .json({ "message": "All fields required" });
            }
            // Authentication process with Passport
            passport_1.default.authenticate('local', (error, user, info) => {
                if (error) {
                    console.error("Authentication error:", error);
                    return res.status(401).json({ error });
                }
                if (user) {
                    const token = user.generateJwt();
                    console.log(`User logged in successfully: ${user.email}`);
                    res.status(200).json({ token, user });
                }
                else {
                    console.error("Authentication failed, no user found.");
                    res.status(401).json({ error: "User not found" });
                }
            })(req, res);
        };
        this.getUser = (req, res, next) => {
            console.log("Retrieving user data for email:", req.params.email);
            user_model_1.default.findOne({ email: req.params.email })
                .then((user) => {
                if (user) {
                    console.log(`User found: ${user.email}`);
                    res.status(200).json({ user });
                }
                else {
                    console.error("No user found for email:", req.params.email);
                    res.status(404).json({ message: "no user found" });
                }
            })
                .catch((error) => {
                console.error("Error retrieving user:", error);
                res.status(404).json({ message: "error retrieving user", error });
            });
        };
        this.getAllUsers = (req, res, next) => {
            console.log("Fetching all users...");
            user_model_1.default.find()
                .then(users => {
                if (!users.length) {
                    return res.status(404).json({ message: 'No users found' });
                }
                res.status(200).json(users);
            })
                .catch(error => {
                console.error("Failed to retrieve users:", error);
                res.status(500).json({ message: 'Internal server error', error });
            });
        };
        this.deleteUser = (req, res, next) => {
            console.log(`Attempting to delete user with ID: ${req.params.id}`);
            user_model_1.default.findByIdAndDelete(req.params.id)
                .then((result) => {
                if (!result) {
                    console.error(`No user found with ID: ${req.params.id}`);
                    return res.status(404).json({ message: "User not found" });
                }
                console.log(`User with ID: ${req.params.id} deleted successfully`);
                res.status(200).json({ message: "User deleted" });
            })
                .catch((error) => {
                console.error(`Error deleting user with ID: ${req.params.id}:`, error);
                res.status(500).json({ message: "Internal server error", error });
            });
        };
        this.updateAdminStatus = (req, res, next) => {
            console.log(`Updating admin status for ID: ${req.params.id} to ${req.body.isAdmin}`);
            user_model_1.default.findByIdAndUpdate(req.params.id, { isAdmin: req.body.isAdmin }, { new: true })
                .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(user);
            })
                .catch(error => {
                res.status(500).json({ message: 'Failed to update user', error });
            });
        };
        this.updateUser = (req, res, next) => {
            console.log(`Updating user with ID: ${req.params.id}`);
            const updateData = req.body; // This should include any field that can be updated
            user_model_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true })
                .then(user => {
                if (!user) {
                    console.error(`No user found with ID: ${req.params.id}`);
                    return res.status(404).json({ message: 'User not found' });
                }
                console.log(`User with ID: ${req.params.id} updated successfully`);
                res.status(200).json(user);
            })
                .catch(error => {
                console.error(`Error updating user with ID: ${req.params.id}:`, error);
                res.status(500).json({ message: "Internal server error", error });
            });
        };
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=auth.controller.js.map
import { NextFunction, Request, Response } from "express";

export default class IndexController {
    home = (req: Request, res: Response, next: NextFunction) => {
        res.render('index', { title: 'Express' });
    }
}
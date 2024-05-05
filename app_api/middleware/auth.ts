import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
};
import passport from 'passport';
import User, { IUser } from '../models/user.model';
import { NextFunction, Request, Response } from 'express';

export default class AuthenticationController {
  register = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({"error": "All fields required"});
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save()
      .then((user: IUser) => {
        const token = user.generateJwt();
        res
          .status(200)
          .json({token, user});
      })
      .catch((error) => {
          res.status(300).json({error});
      })
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({"message": "All fields required"});
    }
    console.log("pre authenticate")
    passport.authenticate('local', (error: any, user: any, info: any) => {
      console.log("in authenticate")
      if (user) {
        const token = user.generateJwt();
        res
          .status(200)
          .json({token, user});
      } else {
        res
          .status(401)
          .json({error});
      }
    })(req, res);
  };

  getUser(req: Request, res: Response, next: NextFunction) {
    User.findOne({ email: req.params.email })
      .then((user) => {
        if (user) {
          res
            .status(200)
            .json({user});
        } else {
          res
            .status(404)
            .json({message: "no user found"})
        }
      })
      .catch((error) => {
          res
          .status(404)
          .json({message: "error retrieving user", error})
      })
  }
}

import { NextFunction, Request, Response } from 'express'
import bcryptjs, { hash } from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/user'
import signJWT from '../functions/signJWT'
import logging from '../logging'

const NAMESPACE = "User";

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    console.log("oi3");

    bcryptjs.hash(password, 16, (hashError, hash) => {
        if (hashError)
        {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        // Insert user into DB
        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash
        });

        return _user
            .save()
            .then((user) => {
                return res.status(201).json({
                    user
                })
            })
            .catch ((error) => {
              return res.status(500).json({
                   message: error.message,
                    error
                });
            });
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username })
    .exec()
    .then((users) => {
        if (users.length !== 1)
        {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        bcryptjs.compare(password, users[0].password, (error, result) => {
            if (error)
            {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            else if (result)
            {
                signJWT(users[0], (_error, token) => {
                    if (_error)
                    {
                        return res.status(401).json({
                            message: 'Unauthorized',
                            error: _error
                        })
                    }
                    else if (token)
                    {
                        return res.status(200).json({
                            message: 'Auth Successful',
                            token,
                            user: users[0]
                        });
                    }   
                });
            }
        });
    })
    .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

const teste = (req: Request, res: Response, next: NextFunction) => {
    console.log("hi");
    return res.status(200).json({
        message: "hi"
    })
}

export default { register, login, teste };
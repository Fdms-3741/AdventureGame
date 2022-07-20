import jwt from 'jsonwebtoken'
import config from '../config';
import IUser from '../interface/user';

const NAMESPACE = 'Auth';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    
    jwt.sign(
        {
            username: user.username
        },
        config.token.secret,
        {
            expiresIn: expirationTimeInSeconds
        },
        (error, token) => {
            if (error)
            {
                callback(error, null);
            }
            else if (token)
            {
                callback(null, token);
            }
        }
    );
};

export default signJWT;

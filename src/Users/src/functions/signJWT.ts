import jwt from 'jsonwebtoken'
import config from '../config';
import IUser from '../interface/user';
import logging from '../logging';

const NAMESPACE = 'Auth';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    logging.info(NAMESPACE, `Attempting to sign token for ${user._id}`);

    try
    {
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
        )
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};

export default signJWT;
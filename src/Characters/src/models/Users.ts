/** Defines an interface for interaction with the users microservice */
import { application } from 'express';
import {USERS_HOST} from '../defaults'
import fetch from 'node-fetch';

interface UsersInterface {

	/** Validate user */
	ValidateUser(token:string, user_id:string): Promise<boolean>;
}


/** Dummy user class for testing purposes. */
class DummyUsers implements UsersInterface {

	ValidateUser(token: string, user_id: string): Promise<boolean> {
		return Promise<Boolean>.resolve(true)
	};
}

class Users implements UsersInterface{
	async ValidateUser(token: string, user_id: string): Promise<boolean> {
		return new Promise<boolean>(async (resolve, reject) => {
			let response = await fetch("http://"+USERS_HOST+"/users/",{
					method:"GET",
					headers:{
						'content-type':"application/json"
					},
					body:JSON.stringify({
						user_id:user_id
					})
				}
			)
			if (!response){
				reject("Invalid response from users MS")
			}
			let userData :any = await response?.json()
			resolve(userData.user.session.token === token)
		})
	}
}
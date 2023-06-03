import {User} from "../enitity/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from "../middleware/auth";




class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);

    }
    addUser = async (user) => {
        user.password = await bcrypt.hash(user.password,10);
        user.role = 'user';
        return this.userRepository.save(user);
    }
    checkRegister = async (user) => {
        return await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })
    }

    checkUser = async (user) => {
        let userFind = await this.userRepository.findOneBy({username: user.username});
        if (!userFind) {
            return 'User is not exist'
        } else {

            let passWordCompare = await bcrypt.compare(user.password, userFind.password);
            if (passWordCompare) {
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    role: userFind.role
                }
                let token = await (jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                }))
                payload['token'] = token
                return payload;
            } else {
                return 'Password is wrong'
            }
        }
    }


    addUserGmail = async (user) => {
        user.password = null;
        user.role = 'user';
        return (await this.userRepository.save(user));
    }
    loginAhead = async (user) => {
        let payload = {
            idUser: user.id,
            username: user.username,
            role: user.role
        }
        let token = await (jwt.sign(payload, SECRET, {
            expiresIn: 36000 * 10 * 100
        }))
        payload['token'] = token;
        return payload;
    }

    findUser = async (user) => {
        let userFound = await this.userRepository.findOneBy({username: user.username});
        if (!userFound) {
            return undefined
        } else {
            if(user.password){
                let passWordCompare = await bcrypt.compare(user.password, userFound.password);
                if (passWordCompare) {
                    return userFound
                }
                return {message:"sai pw"}
            }

        }
    }


}

export default new UserService();
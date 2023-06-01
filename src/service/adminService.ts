import {User} from "../enitity/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from "../middleware/auth";
import {Order} from "../enitity/order";
import {Request, Response} from "express";
import productService from "./productService";
import {Product} from "../enitity/product";

class AdminService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }
    getAllAccount = async () => {
        let allUser = await this.userRepository.find();
        return allUser;
    }

    editRole = async (username) => {
        return await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                role: "admin"
            })
            .where("username = :username", {username: username})
            .execute()
    }
    reRole = async (username) => {
        let resultReRole = await this.editRole(username);
        if (resultReRole) return resultReRole
        else return "Khong the doi quyen"
    }

}

export default new AdminService();
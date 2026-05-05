import { UsersRepository } from "./users.repository.js";
import bcrypt from "bcrypt"



export class UsersService {
    constructor(private repo: UsersRepository){}


    async create(data: any) {
        const hashed = await bcrypt.hash(data.password, 10)


        return this.repo.create({
            ...data,
            password: hashed
        })
    }
}
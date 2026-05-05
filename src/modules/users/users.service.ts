import { UsersRepository } from "./users.repository.js";
import { hashPassword } from "../../utils/hash.js";
import type { CreateUserDTO } from "./users.schema.js";


export class UsersService {
    constructor(private repo: UsersRepository){}


    async create(data: CreateUserDTO) {
        const hashed = await hashPassword(data.password);

        return this.repo.create({
            ...data,
            password: hashed,
        });
    }
}
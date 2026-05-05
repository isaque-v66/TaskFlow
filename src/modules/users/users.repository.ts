import { prisma } from "../../shared/plugins/prisma.js"



export class UsersRepository {
    create(data: any) {
        return prisma.user.create({data})
    }

    findByEmail(email: string) {
        return prisma.user.findUnique({where: {email}})
    }
}
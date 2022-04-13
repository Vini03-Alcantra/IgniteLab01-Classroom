import { Injectable } from "@nestjs/common";
import {PrismaService} from "../database/prisma/prisma.service"

interface ICreateStudentParams {
    authUserId: string;
}

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService){}

    listAllStudents(){
        return this.prisma.student.findMany()
    }

    getStudentByAuthUserId(authUserId: string){
        return this.prisma.student.findUnique({
            where: {
                authUserID: authUserId
            }
        })
    }

    getStudentByID(id: string) {
        return this.prisma.student.findUnique({
            where: {
                id
            }
        })
    }

    createStudent({authUserId}: ICreateStudentParams){
        return this.prisma.student.create({
            data: {
                authUserID: authUserId
            }
        })
    }
}
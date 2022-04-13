import { Injectable } from "@nestjs/common";
import {PrismaService} from "../database/prisma/prisma.service"

interface CreateEnrollmentParams {
    courseId: string;
    studentId: string;
}


interface GetByCourseStudentIdParams {
    courseId: string;
    studentId: string;
}

@Injectable()
export class EnrollementService {
    constructor(
        private prisma: PrismaService        
    ){}

    getByCourseAndStudentId({
        courseId,
        studentId
    }: GetByCourseStudentIdParams){
        return this.prisma.enrollment.findFirst({
            where: {
                courseId,
                studentId,
                canceledAt: null
            }
        })
    }

    listAllEnrollments() {
        return this.prisma.enrollment.findMany({
            where: {
                canceledAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    listEnrollmentsByStudent(studentId: string) {
        return this.prisma.enrollment.findMany({
            where: {
                studentId,
                canceledAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    createEnrollment({courseId, studentId}: CreateEnrollmentParams){
        return this.prisma.enrollment.create({
            data: {
                courseId,
                studentId
            }
        })
    }
}
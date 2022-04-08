import { Injectable } from "@nestjs/common";
import {PrismaService} from "../database/prisma/prisma.service"
import slugify from "slugify"
interface CreateCourseParams {
    title: string
}

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService){}

    listAllCourses() {
        return this.prisma.course.findMany();
    }s

    getCourseByID(id: string){
        return this.prisma.course.findUnique({
            where: {
                id,
            }
        })
    }

    async createCourse({title}: CreateCourseParams) {
        const slug = slugify(title, {lower: true})

        const courseAlreeadyExists = await this.prisma.course.findUnique({
            where: {
                slug
            }
        })

        if(courseAlreeadyExists){
            throw new Error('Course already exists')
        }

        return this.prisma.course.create({
            data: {
                title,
                slug
            }
        })
    }
}
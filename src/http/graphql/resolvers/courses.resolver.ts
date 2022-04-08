import { UnauthorizedException, UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver} from "@nestjs/graphql"
import { AuthorizationGuard } from "src/http/auth/authorization.guard"
import { AuthUser, CurrentUser } from "src/http/auth/current-user"
import { CoursesService } from "src/services/courses.service"
import { EnrollementService } from "src/services/enrollements.service"
import { StudentsService } from "src/services/students.service"
import { CreateCourseInput } from "../inputs/create-course-input"
import {Course} from "../models/course"

@Resolver(() => Course)
export class CourseResolver {
    constructor(
        private coursesService: CoursesService,
        private studentsService: StudentsService,
        private enrollmentService: EnrollementService
    ){}

    @Query(() => [Course])
    @UseGuards(AuthorizationGuard)
    courses(){
        return this.coursesService.listAllCourses();
    }

    @Query(() => Course)
    @UseGuards(AuthorizationGuard)
    async course(
        @Args('id') id: string,
        @CurrentUser() user: AuthUser
    ){
        const student = await this.studentsService.getStudentByAuthUserId(user.sub)

        if(!student){
            throw new Error('Student not found')
        }

        const enrollment = await this.enrollmentService.getByCourseAndStudentId({
            courseId: id,
            studentId: student.id
        })

        if(!enrollment){
            throw new UnauthorizedException()
        }

        return this.coursesService.getCourseByID(id)
    }

    @Mutation(() => Course)
    @UseGuards(AuthorizationGuard)
    createCourse(@Args('data') data: CreateCourseInput){
        return this.coursesService.createCourse(data)
    }
}
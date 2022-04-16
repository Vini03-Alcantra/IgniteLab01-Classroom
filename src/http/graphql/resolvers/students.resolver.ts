import { UseGuards } from "@nestjs/common"
import { Parent, Query,ResolveField,Resolver} from "@nestjs/graphql"
import { AuthorizationGuard } from "src/http/auth/authorization.guard"
import { EnrollementService } from "src/services/enrollements.service"
import { StudentsService } from "src/services/students.service"
import {Student} from "../models/student"

@Resolver(() => Student)
export class StudentResolver {
    constructor(
        private studentsService: StudentsService,
        private enrollmentsService: EnrollementService
    ){}

    @Query(() => [Student])
    @UseGuards(AuthorizationGuard)  
    students(){
        return this.studentsService.listAllStudents()
    }

    @ResolveField()
    enrollments(@Parent() student: Student){
        return this.enrollmentsService.listEnrollmentsByStudent(student.id)
    }
}
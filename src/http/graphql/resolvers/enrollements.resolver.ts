import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CoursesService } from "src/services/courses.service";
import { EnrollementService } from "src/services/enrollements.service";
import { StudentsService } from "src/services/students.service";
import {Enrollment} from "../models/enrollment";

@Resolver(() => Enrollment)
export class EnrollmentResolver {
    constructor(
        private enrollementsService: EnrollementService,        
        private coursesService: CoursesService,
        private studentsService: StudentsService    
    ) {}

    @Query(() => [Enrollment])
    @UseGuards(AuthorizationGuard)
    enrollements() {
        return this.enrollementsService.listAllEnrollments()
    }   

    @ResolveField()
    student(@Parent() enrollement: Enrollment){
        return this.studentsService.getStudentByID(enrollement.studentId)
    }
    
    @ResolveField()
    course(@Parent() enrollement: Enrollment) {
        return this.coursesService.getCourseByID(enrollement.courseId)
    }
    
}
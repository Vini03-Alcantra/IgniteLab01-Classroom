import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CoursesService } from "src/services/courses.service";
import { EnrollementService } from "src/services/enrollements.service";
import { StudentsService } from "src/services/students.service";

export interface Customer {
    authUserId: string;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
}

export interface PurchaseCreatedPayload {
    customer: Customer;
    product: Product;
}

@Controller()
export class PurchaseController {
    constructor(
        private studentsService: StudentsService,
        private coursesServices: CoursesService,
        private enrollmentsService: EnrollementService
    ) {}

    @EventPattern('purchases.new-purchase')
    async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload){
        let student = await this.studentsService.getStudentByAuthUserId(
            payload.customer.authUserId
        )

        if(!student){
            student = await this.studentsService.createStudent({
                authUserId: payload.customer.authUserId
            })
        }

        let course = await this.coursesServices.getCourseBySlug(
            payload.product.slug
        );

        if(!course){
            course = await this.coursesServices.createCourse({
                title: payload.product.title
            })
        }

        await this.enrollmentsService.createEnrollment({
            courseId: course.id,
            studentId: student.id
        })
    }
}
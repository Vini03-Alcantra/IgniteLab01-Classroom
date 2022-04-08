import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql"
import path from "node:path"
import { DatabaseModule } from 'src/database/database.module';
import { CoursesService } from 'src/services/courses.service';
import { EnrollementService } from 'src/services/enrollements.service';
import { StudentsService } from 'src/services/students.service';
import { CourseResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollements.resolver';
import { StudentResolver } from './graphql/resolvers/students.resolver';
import {TestResolver} from "./test.resolver"

@Module({
    imports: [
        ConfigModule.forRoot(), 
        DatabaseModule,
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
        })
    ],
    providers: [
        //Resolver
        CourseResolver,
        EnrollmentResolver,
        StudentResolver,

        //Services
        CoursesService,
        EnrollementService,
        StudentsService
    ]
})
export class HttpModule {}

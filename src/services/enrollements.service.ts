import { Injectable } from "@nestjs/common";
import {PrismaService} from "../database/prisma/prisma.service"

@Injectable()
export class EnrollementService {
    constructor(private prisma: PrismaService){}
}
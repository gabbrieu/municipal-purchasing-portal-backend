import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor() {}

    @Post()
    async create() {}
}

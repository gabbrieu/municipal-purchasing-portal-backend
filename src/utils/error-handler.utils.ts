import { HttpException, InternalServerErrorException } from '@nestjs/common';

export class ErrorHandler {
    static handle(error: any): never {
        if (error instanceof HttpException) {
            throw error;
        } else {
            const errorMessage =
                error?.message ||
                error?.data?.message ||
                'An unexpected error occurred: ' + error;

            throw new InternalServerErrorException(errorMessage);
        }
    }
}

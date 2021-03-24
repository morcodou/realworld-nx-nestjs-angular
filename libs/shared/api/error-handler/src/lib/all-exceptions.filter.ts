import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '@realworld/shared/client-server';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    // TODO: implement logging
    catch(exception: any, host: ArgumentsHost) {
        console.error(exception)
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
    
        let errorRes: ErrorResponse

        if (exception instanceof HttpException) {
            errorRes = new ErrorResponse({
                statusCode: exception.getStatus(), 
                message: exception.message
            })
        } else {
            errorRes = new ErrorResponse({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR, 
                message: exception.message || 'Internal server error'
            })
        }
    
        response.status(errorRes.statusCode).json(errorRes);
    }
}
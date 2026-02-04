//? This is no more needed as the response-format interceptor is handling the error responses in a consistent format.
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Request, Response } from 'express';
// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;
//     const errorResponse = {
//       statusCode: status,
//       message: exception.message || 'Internal Server Error',
//     };
//     console.error('Error Log:', {
//       method: request.method,
//       url: request.url,
//       statusCode: status,
//       message: exception.message,
//       stack: exception.stack,
//     });
//     response.status(status).json(errorResponse);
//   }
// }

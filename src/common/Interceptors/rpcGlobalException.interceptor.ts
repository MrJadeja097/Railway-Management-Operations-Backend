import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { RpcBaseException } from "src/common/exceptions";
import { isObject } from "lodash";

@Injectable()
export class RpcGlobalExceptionInterceptor implements NestInterceptor {
    
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (isObject(error) && error.isRpc && !(error instanceof HttpException)) {
          throw new HttpException(error.payload, error.status);
        }
        if (isObject(error) && error.isPublic && !(error instanceof HttpException)) {
          throw new HttpException(error.payload, error.status);
        }
        if (error instanceof RpcBaseException) {
          throw new HttpException(error.getPayload(), error.getStatus());
        }
        throw error;
      }),
    );
  }
}
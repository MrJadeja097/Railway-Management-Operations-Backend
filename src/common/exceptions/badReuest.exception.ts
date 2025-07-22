import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./base";

export class RPCBadRequestException extends RpcBaseException{
    constructor(objectOrError?: string | object, description = "Bad Request.") {
        super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);
      }
}
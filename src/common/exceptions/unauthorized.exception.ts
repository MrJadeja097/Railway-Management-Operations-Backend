import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./base";

export class RPCUnauthorizedException extends RpcBaseException{
    constructor(objectOrError?: string | object, description = "Not allowed.") {
        super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
      }
}
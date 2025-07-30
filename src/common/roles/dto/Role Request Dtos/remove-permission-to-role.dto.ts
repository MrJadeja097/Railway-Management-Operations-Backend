import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class RemovePermissionDto{
    @AutoMap()
    @ApiProperty({example:'create_staff'})
    @IsString()
    public permissionName: string;

    @AutoMap()
    @IsNumber()
    @ApiProperty({example:5})
    public roleId: number;
}
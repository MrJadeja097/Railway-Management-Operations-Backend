import { AutoMap } from "@automapper/classes";
import { BaseCommonEntity } from "src/utils/base.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Role_PermissionsEntity } from "./role-permissions.entity";
import { StaffEntity } from "src/modules/staff/entities/staff.entity";

@Entity('roles')
export class RolesEntity  extends BaseCommonEntity {
    @AutoMap()
    @Column({type: 'varchar', unique: true})
    public name: string;

    @AutoMap()
    @Column({type: 'varchar', nullable: true})
    public description: string;

    @AutoMap()
    @OneToMany(() => Role_PermissionsEntity, (role_permission) => role_permission.roles)
    public role_permissions: Role_PermissionsEntity[];

    @AutoMap()
    @OneToMany(() => StaffEntity, (staff) => staff.role)
    public staff : StaffEntity[];
}
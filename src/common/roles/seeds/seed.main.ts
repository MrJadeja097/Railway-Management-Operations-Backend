import { NestFactory } from "@nestjs/core";
import { SeedModule } from "./seeder.module";
import { PermissionSeedService } from "./permissions.seeder.service";
import { RolesSeedService } from "./role.seeder.service";
import { Role_PermissionsSeedService } from "./role_permissions.seed.service";

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);
  const permissionSeedService = app.get(PermissionSeedService);
  const rolesSeedServic = app.get(RolesSeedService);
  const role_PermissionsSeedService = app.get(Role_PermissionsSeedService);


  console.log('Seeding Permission...');
  await permissionSeedService.seedPermissions()

  console.log('Seeding Roles...');
  await rolesSeedServic.seedRoles()

  console.log('Seeding Role Permissions...');
  await role_PermissionsSeedService.seedRole_Permissions()
  
  await app.close();
  console.log('Seeding is complete.');
}

bootstrap()
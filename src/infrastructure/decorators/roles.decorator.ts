import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/entiies/user/type/user.entity.type';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

// permissions.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma/prisma.service';
// import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
    ) { }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const requiredPermission = this.reflector.get<string>(
    //         'permission',
    //         context.getHandler(),
    //     );

    //     if (!requiredPermission) return true;

    //     const request = context.switchToHttp().getRequest();
    //     const user = request.user;

    //     // SuperAdmin bypass
    //     if (user.role.name === 'SUPERADMIN') return true;

    //     // Load permissions of user
    //     const role = await this.prisma.role.findUnique({
    //         where: { id: user.roleId },
    //         include: {
    //             permissions: {
    //                 include: {
    //                     permission: true,
    //                 },
    //             },
    //         },
    //     });

    //     if (!role) {
    //         throw new Error('Role not found');
    //     }

    //     const userPermissions = role.permissions.map(
    //         (rp) => rp.permission.name,
    //     );

    //     if (!userPermissions.includes(requiredPermission)) {
    //         throw new ForbiddenException('Permission denied');
    //     }

    //     // Manager scope check
    //     if (user.role.name === 'MANAGER') {
    //         const subsidiaryId = request.params.subsidiaryId;

    //         const allowed =
    //             await this.prisma.personnelSubsidiary.findFirst({
    //                 where: {
    //                     personnelId: user.id,
    //                     subsidiaryId,
    //                 },
    //             });

    //         if (!allowed) {
    //             throw new ForbiddenException(
    //                 'You are not assigned to this subsidiary',
    //             );
    //         }
    //     }

    //     return true;
    // }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const request = context.switchToHttp().getRequest()
    //     const user = request.user

    //     if (!user) {
    //         throw new UnauthorizedException()
    //     }

    //     const role = await this.prisma.role.findUnique({
    //         where: { id: user.roleId },
    //         include: {
    //             permissions: {
    //                 include: {
    //                     permission: true
    //                 }
    //             }
    //         }
    //     })

    //     if (!role) {
    //         throw new ForbiddenException("Role not found")
    //     }

    //     // Superadmin bypass
    //     if (role.name === "SUPERADMIN") return true

    //     const permissions = role.permissions.map(p => p.permission.name)

    //     const requiredPermissions =
    //         this.reflector.get<string[]>("permissions", context.getHandler()) || []

    //     return requiredPermissions.every(p => permissions.includes(p))
    // }

    async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest()
  const user = request.user

  if (!user) throw new UnauthorizedException()

  if (user.role === "SUPERADMIN") return true

  const requiredPermissions =
    this.reflector.get<string[]>("permissions", context.getHandler()) || []

  return requiredPermissions.every((p) =>
    user.permissions.includes(p),
  )
}
}


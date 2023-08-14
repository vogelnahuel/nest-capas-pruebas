import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService, // eslint-disable-next-line no-empty-function
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true; // No se definió ningún permiso, permitir acceso
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]; // Obtener el token del header

        if (!token) {
            return false; // No se proporcionó un token en el header
        }

        try {
            const decodedToken: any = this.jwtService.verify(token);
            const userPermissions = decodedToken.permissions || []; // Suponiendo que los permisos están en el payload del JWT

            const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission));
            return hasPermission;
        } catch (error) {
            return false; // El token no es válido o expiró
        }
    }
}

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new ForbiddenException('No se proporcionó un token en el encabezado de autorización');
        }

        try {
            const decodedToken: any = this.jwtService.verify(token);
            const userPermissions = decodedToken.permissions || [];

            const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission));
            if (!hasPermission) {
                throw new ForbiddenException('No tienes permiso para acceder a este recurso');
            }
            return true;
        } catch (error) {
            console.log('error', error.response.message);
            throw new ForbiddenException(error.response.message || 'El token no es válido o ha expirado');
        }
    }
}

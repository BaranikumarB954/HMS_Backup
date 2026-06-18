import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PermissionService {

  getPermissions(): string[] {
    return JSON.parse(localStorage.getItem('permissions') || '[]');
  }

  hasPermission(permission: string): boolean {
    const perms = this.getPermissions();

    if (perms.includes('*')) return true;

    return perms.includes(permission);
  }

  can(module: string, action: string): boolean {
    return this.hasPermission(`${module}:${action}`);
  }
}
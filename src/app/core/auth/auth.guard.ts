import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = window.sessionStorage.getItem('token');

    console.log('entrou1');
    if (token) {
      console.log('entrou2');
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

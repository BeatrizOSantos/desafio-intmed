import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getToken() {
    const token = JSON.parse(window.sessionStorage.getItem('token') || '{}');
    return token;
  }
}

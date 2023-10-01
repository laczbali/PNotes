import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public async isLoggedIn(): Promise<boolean> {
    return false;
  }

  public async login(credential: string): Promise<boolean> {
    return true;
  }

}

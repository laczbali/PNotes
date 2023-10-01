import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public async isLoggedIn(): Promise<boolean> {
    return true;
  }

}

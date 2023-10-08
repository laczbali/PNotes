import { Injectable } from '@angular/core';
import { BackendClientService } from './backend-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private backendClient: BackendClientService) { }

  public async isLoggedIn(): Promise<boolean> {
    return false;
  }

  public async login(googleResponse: any): Promise<boolean> {

    try {
      var result = await this.backendClient.MakePostRequest('auth', { credential: googleResponse.credential });
      console.log('ok', result);
    } catch (error) {
      console.log('error', error);
    }

    return true;
  }

  public async logout(): Promise<boolean> {
    return true;
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendClientService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param url URL relative to backend\api (eg: 'auth' will be mapped to backend\api\auth)
   * @param body Will be sent as JSON
   * @returns String response from the backend (error will be thrown in case of error response code)
   */
  public async MakePostRequest(url: string, body: object): Promise<object> {

    url = this.GetAbsoluteUrl(url);

    var httpObservable = this.http.post(url, JSON.stringify(body), { responseType: 'json' });
    var result = await lastValueFrom(httpObservable)
      .catch((error) => { return error; });

    if (result instanceof HttpErrorResponse) {
      throw result;
    }

    return result;
  }

  private GetAbsoluteUrl(relativeUrl: string): string {
    if (relativeUrl.startsWith('/')) {
      relativeUrl = relativeUrl.substring(1);
    }

    return `http://localhost:8788/api/${relativeUrl}`;
  }

}

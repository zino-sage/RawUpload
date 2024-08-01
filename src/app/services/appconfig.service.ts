import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';



@Injectable({
  providedIn: 'root'
})
export class AppconfigService {
  private baseApiUrl!: string;

  private hostUrl!: string;
  private appTimeOut!: string;

  constructor(private appConfig: ConfigService
  ) { }

  public get API_BASE(): string {

      this.baseApiUrl = this.appConfig.get('baseApiUrl');

      return this.baseApiUrl;
  }

  public set API_BASE(val: string) {
      this.baseApiUrl = val;
  }


  public get APP_HOST(): string {

      this.hostUrl = this.appConfig.get('hostUrl');

      return this.hostUrl;
  }

  public get APP_TIMEOUT(): string {
     // this.getProfileSetting();
              this.appTimeOut = this.appConfig.get('appTimeOut');
             //this.appTimeOut = this.sessionTimeOut;
              return this.appTimeOut;
          }
}

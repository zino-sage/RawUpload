import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
   constructor() { }

   get(arg0: string): string {
    return "https://localhost:7207/"
  }
}

import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';

let AppConstant: any = {};
@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor( private http: HttpClient, private appConfigServ: AppconfigService) {
    AppConstant = appConfigServ;
}


  uploadFile(file: File) {
    debugger
    return new Promise((resolve, reject) => {

        let url = `${AppConstant.API_BASE}FileUpload/raw-upload`;
        let xhr: XMLHttpRequest = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            let formData = new FormData();
            formData.append("file", file, file.name);

            // for (var key in body) {
            //     formData.append(key, body[key]);
            // }


        xhr.send(file);
    });
}



upload(file: File): Observable<object> {
  //const formData: FormData = new FormData();

  //formData.append('file', file);

  const formData = new FormData();

    formData.append('file', file, file.name);

  return this.http.post(`${AppConstant.API_BASE}FileUpload/raw-upload`, formData);

  // const req = new HttpRequest('POST', `${AppConstant.API_BASE}FileUpload/raw-upload`, formData, {
  //   reportProgress: true,
  //   responseType: 'json'
  // });


  //return this.http.request(req);
}

}

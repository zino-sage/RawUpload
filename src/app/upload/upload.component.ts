import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})


export class UploadComponent implements OnInit {
  title = 'Upload';
  uploadForm: any;
  files: any;
  file: any;
  uploadedData: any;
  public loading = false;
  customLoadingTemplate: any;
  ngxLoadingAnimationTypes: any;
  uploadedFailedError: any[] = [];
  resultForm!: FormGroup;


  constructor(private fb: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.laodForm();
    this.initializeControls();
  }

  onFileChange(event: any) {

    this.files = event.target.files;
    this.file = this.files[0];
  }

  laodForm() {
    this.uploadForm = this.fb.group({
      fileInput: [''],
    });
  }

  fileExtention(name: string) {
    var regex = /(?:\.([^.]+))?$/;
    if (regex != null) {
      return regex.exec(name)![1];
    }
    return null;
  }

  initializeControls() {
    this.resultForm = this.fb.group({
      divisibleBy2: [''],
      divisibleBy7: [''],
      divisibleBy3: [''],
      mode: [''],
      median: [''],
      sumTo65: [''],
      sumTo35: [''],
      oddNumberSum: [''],
      evenNumberSum: [''],
      singleDigitSum: [''],
      doubleDigitSum: [''],


    });
  }

  populateForm() {
      this.resultForm.controls['divisibleBy2'].patchValue(this.uploadedData.divisibleBy2);
       this.resultForm.controls['divisibleBy7'].patchValue(this.uploadedData.divisibleBy7);
       this.resultForm.controls['divisibleBy3'].patchValue(this.uploadedData.divisibleBy3);
      this.resultForm.controls['mode'].patchValue(this.uploadedData.mode);
       this.resultForm.controls['median'].patchValue(this.uploadedData.median);
       this.resultForm.controls['sumTo65'].patchValue(this.uploadedData.sumTo65);
       this.resultForm.controls['sumTo35'].patchValue(this.uploadedData.sumTo35);
       this.resultForm.controls['oddNumberSum'].patchValue(this.uploadedData.oddNumberSum);
       this.resultForm.controls['evenNumberSum'].patchValue(this.uploadedData.evenNumberSum);
       this.resultForm.controls['singleDigitSum'].patchValue(this.uploadedData.singleDigitSum);
       this.resultForm.controls['doubleDigitSum'].patchValue(this.uploadedData.doubleDigitSum);



  }

  downloadFormat() {
    // Implement download logic
  }

  resetForm() {
    this.uploadForm.reset();
  }

  uploadFile() {

    this.loading = true;
    if (this.file != undefined || this.file != null) {

      let body = {
        fileName: this.file.name,
        fileExtension: this.fileExtention(this.file.name),
      };

      this.uploadService.uploadFile(this.file).then(
        (res: any) => {
          if (res.success == true) {

            this.loading = false;
            Swal.fire("Raw Upload", res.message, "success");
            this.uploadedData = res.result;

            this.populateForm();
            this.uploadedFailedError = res.result.filter((x: { passed: boolean; }) => x.passed == false);
          } else {
            Swal.fire("Raw Upload", res.message, "error");

            this.loading = false;
            Swal.fire("Raw Upload", res.message, "error");
          }
        },
        (error: any) => {
          this.loading = false;
          Swal.fire(
            "File Upload",
            JSON.stringify(error)
              ? JSON.stringify(error)
              : "uploading multiple data",
            "error"
          );
        }
      );
    } else {
      Swal.fire("Raw Upload", "Please upload file", "error");
    }

  }

  uploadFile2() {
    this.loading = true;
    if (this.file != undefined || this.file != null) {

      let body = {
        fileName: this.file.name,
        fileExtension: this.fileExtention(this.file.name),
      };

      this.uploadService.upload(this.file).subscribe(
        (res: any) => {
          if (res.success == true) {

            this.loading = false;
            Swal.fire("Raw Upload", res.message, "success");
            this.uploadedData = res.result;

            this.populateForm();
            this.uploadedFailedError = res.result.filter((x: { passed: boolean; }) => x.passed == false);
          } else {
            Swal.fire("Raw Upload", res.message, "error");

            this.loading = false;
            Swal.fire("Raw Upload", res.message, "error");
          }
        },
        (error: any) => {
          this.loading = false;
          Swal.fire(
            "File Upload",
            JSON.stringify(error)
              ? JSON.stringify(error)
              : "uploading multiple data",
            "error"
          );
        }
      );
    } else {
      Swal.fire("Raw Upload", "Please upload file", "error");
    }

  }

}



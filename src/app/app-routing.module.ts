import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: UploadComponent},
  { path: 'upload', component: UploadComponent,  data: { title: 'Upload' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [AppComponent,UploadComponent]

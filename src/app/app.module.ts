import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ScanComponent } from './scan/scan.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { ArticleService } from './article.service';
import { ListArticleComponent } from './list-article/list-article.component';
import {BarcodeScannerModule} from './barcode-scanner/barcode-scanner.module';
import { BarcodeGeneratorModule } from './barcode-generator/barcode-generator.module';
import { PageAccueuilComponent } from './page-accueuil/page-accueuil.component';
import { from } from 'rxjs';

const appRoutes: Routes = [
  { path: 'list-article', component: ListArticleComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'scan', component: ScanComponent },
  { path: '', component: PageAccueuilComponent },
  { path: 'articles/:id', component: ArticleComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    ArticleComponent,
    ListArticleComponent,
    PageAccueuilComponent,
  ],
  imports: [
    BrowserModule,
    BarcodeScannerModule,
    BarcodeGeneratorModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

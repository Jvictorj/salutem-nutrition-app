import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// Services
import { FirebaseService } from './services/firebase.service';

// Components
import { ReceitaDetailComponent } from './component/components/receita-detail/receita-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ReceitaDetailComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

// imports Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

// imports firestore modules
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

// imports Angular components, modules, services ngx
import { AppComponent } from './app.component';
import { FirestationComponent } from './firestation/firestation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogPrintComponent } from './dialog-print/dialog-print.component';
import { DialogAlertBeingeditedComponent } from './dialog-edit-operation/dialog-alert-beingedited/dialog-alert-beingedited.component';
import { OperationsComponent } from './operations/operations.component';
import { ContentDrawerComponent } from './content-drawer/content-drawer.component';
import { DamagingEventsComponent } from './damaging-events/damaging-events.component';
import { DialogAddDamagingEventComponent } from './damaging-events/dialog-add-damaging-event/dialog-add-damaging-event.component';
import { CurrentDamagingEventComponent } from './current-damaging-event/current-damaging-event.component';
import { DialogEditOperationComponent } from './dialog-edit-operation/dialog-edit-operation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavService } from './shared/sidenav.service';

// imports ngx
import { NgxPrintModule } from 'ngx-print';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ApplicationComponent } from './application/application.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { GaugeStationComponent } from './gauge-station/gauge-station.component';

@NgModule({
  declarations: [
    AppComponent,
    FirestationComponent,
    HeaderComponent,
    FooterComponent,
    DialogEditOperationComponent,
    OperationsComponent,
    ContentDrawerComponent,
    DamagingEventsComponent,
    DialogAddDamagingEventComponent,
    CurrentDamagingEventComponent,
    DialogPrintComponent,
    DialogAlertBeingeditedComponent,
    LoginScreenComponent,
    ApplicationComponent,
    GaugeStationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    DragDropModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    NgxPrintModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatBadgeModule,
    MatMenuModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatCheckboxModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase,
      () => 'your_app_name_factory', // explaination from Anthony Nahas: I've just implemented thins that are required in angular fire module. More infos: https://developers.google.com/android/reference/com/google/firebase/FirebaseApp
      {
        authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/damaging-events', // url for authenticated users - to use in combination with canActivate feature on a route
        toastMessageOnAuthSuccess: false
      }),
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }

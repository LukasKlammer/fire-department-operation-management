import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirestationComponent } from './firestation/firestation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DialogEditOperationComponent } from './dialog-edit-operation/dialog-edit-operation.component';
import { OperationsComponent } from './operations/operations.component';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from './shared/sidenav.service';
import { ContentDrawerComponent } from './content-drawer/content-drawer.component';
import { MatSelectModule } from '@angular/material/select';
import { DamagingEventsComponent } from './damaging-events/damaging-events.component';
import { DialogAddDamagingEventComponent } from './dialog-add-damaging-event/dialog-add-damaging-event.component';
import { CurrentDamagingEventComponent } from './current-damaging-event/current-damaging-event.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPrintModule } from 'ngx-print';
import { DialogPrintComponent } from './dialog-print/dialog-print.component';


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
    DialogPrintComponent
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatCheckboxModule
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginScreenComponent } from './login-screen.component';
import { RouterModule } from '@angular/router'
import { MatDialogModule } from '@angular/material/dialog';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), MatDialogModule],
      declarations: [ LoginScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

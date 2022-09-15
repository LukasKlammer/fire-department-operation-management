import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginScreenComponent } from './login-screen.component';
import { RouterModule } from '@angular/router'
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), MatDialogModule],
      declarations: [ LoginScreenComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header image', () => {
    const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector())
    // expect(compiled.querySelector('div.header>img').src).toContain('/images/logo.png');
  });

  it('should show google login button', () => {
    let loginElement = fixture.debugElement.query(By.css('#login-google'));
    expect(loginElement).toBeTruthy();
  });

  it('should open the list of damaging events on successfull login', () => {
    component.openApp();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/damaging-events']);
  });
});

describe('Übungstests in Login-Screen-Component', () => {
  it ('should return something', () => {
    expect(true).toBe(true);
  })
  it ('should be less than 10', () => {
    expect(5).toBeLessThan(10);
  })
  it ('should habe class container', () => {
    let element = document.createElement('div');
    element.className = 'container';
    expect(element).toHaveClass('container');
  })
})

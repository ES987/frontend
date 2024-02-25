import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsContolComponent } from './apps-contol.component';

describe('AppsContolComponent', () => {
  let component: AppsContolComponent;
  let fixture: ComponentFixture<AppsContolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppsContolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppsContolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

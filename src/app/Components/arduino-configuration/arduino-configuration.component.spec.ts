import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArduinoConfigurationComponent } from './arduino-configuration.component';

describe('ArduinoConfigurationComponent', () => {
  let component: ArduinoConfigurationComponent;
  let fixture: ComponentFixture<ArduinoConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArduinoConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArduinoConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

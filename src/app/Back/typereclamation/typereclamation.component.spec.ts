import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypereclamationComponent } from './typereclamation.component';

describe('TypereclamationComponent', () => {
  let component: TypereclamationComponent;
  let fixture: ComponentFixture<TypereclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypereclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypereclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

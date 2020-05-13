import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueuilComponent } from './page-accueuil.component';

describe('PageAccueuilComponent', () => {
  let component: PageAccueuilComponent;
  let fixture: ComponentFixture<PageAccueuilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAccueuilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAccueuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

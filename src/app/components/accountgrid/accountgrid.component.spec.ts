import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountgridComponent } from './accountgrid.component';

describe('AccountgridComponent', () => {
  let component: AccountgridComponent;
  let fixture: ComponentFixture<AccountgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

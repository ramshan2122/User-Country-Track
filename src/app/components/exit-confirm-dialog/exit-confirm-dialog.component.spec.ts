import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitConfirmDialogComponent } from './exit-confirm-dialog.component';

describe('ExitConfirmDialogComponent', () => {
  let component: ExitConfirmDialogComponent;
  let fixture: ComponentFixture<ExitConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExitConfirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

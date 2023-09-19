import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOverviewExampleSheetComponent } from './bottom-sheet-overview-example-sheet.component';

describe('BottomSheetOverviewExampleSheetComponent', () => {
  let component: BottomSheetOverviewExampleSheetComponent;
  let fixture: ComponentFixture<BottomSheetOverviewExampleSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottomSheetOverviewExampleSheetComponent]
    });
    fixture = TestBed.createComponent(BottomSheetOverviewExampleSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

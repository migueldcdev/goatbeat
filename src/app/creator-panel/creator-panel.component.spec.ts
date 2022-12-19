import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorPanelComponent } from './creator-panel.component';

describe('CreatorPanelComponent', () => {
  let component: CreatorPanelComponent;
  let fixture: ComponentFixture<CreatorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalkeeperChangeComponent } from './goalkeeper-change.component';

describe('GoalkeeperChangeComponent', () => {
  let component: GoalkeeperChangeComponent;
  let fixture: ComponentFixture<GoalkeeperChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalkeeperChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalkeeperChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

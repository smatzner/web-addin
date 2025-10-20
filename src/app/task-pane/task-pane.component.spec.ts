import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPaneComponent } from './task-pane.component';

describe('TaskPaneComponent', () => {
  let component: TaskPaneComponent;
  let fixture: ComponentFixture<TaskPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyCoinsPage } from './my-coins.page';

describe('MyCoinsPage', () => {
  let component: MyCoinsPage;
  let fixture: ComponentFixture<MyCoinsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCoinsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCoinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

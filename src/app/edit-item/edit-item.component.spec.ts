import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { from, of, Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Task } from '../task';

import { RouterTestingModule } from '@angular/router/testing';

import { EditItemComponent } from './edit-item.component';

import { HttpClient, HttpClientModule} from '@angular/common/http';

import { ItemListComponent } from '../item-list/item-list.component';

import { Location} from '@angular/common';
import { AuthService } from '../auth.service';



describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;  
  let service : DataService;
  let authService: AuthService;

  let router : Router;
  let location : Location;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule,  RouterTestingModule.withRoutes(
        [{ path: "list-items" , component: ItemListComponent}]
      )],
        
      declarations: [ EditItemComponent ],
      providers : [         
        DataService, AuthService
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(DataService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location); 
    authService = TestBed.inject(AuthService);

   //router.initialNavigation();

  });

  
it('should create', () => {
  expect(component).toBeTruthy();
});


/*it('navigate to edited item save redirects you to item-list', fakeAsync(() => { 
  router.navigate(['list-items']); 
  tick(); 
  expect(location.pathname).toBe('list-items'); 
}));
*/

it('should edit form', () => {

    //var titleInput: HTMLInputElement = <HTMLInputElement>document.getElementById("username-id");
    //var idInput: HTMLInputElement = <HTMLInputElement>document.getElementById("password-id");
    var submitButton: HTMLInputElement = <HTMLInputElement>document.getElementById("button-id");

     let task : Task = new Task();
     
    // simulate user entering a new name into the input box
    //titleInput.value = 'edited title';
    //idInput.value= 'T300000';

    spyOn(service, 'updateTask').and.returnValue(of(task));

    //const onClickMock = spyOn(component, 'login' );

    submitButton.click();

    expect(service.updateTask).toHaveBeenCalled();




});



it('should route to list page', fakeAsync(() => {
  spyOn(authService, 'canActivate').and.returnValue(true);
  
  let taskArray  : Task [] =  [     
    {
      "id": 20000,
      "title": "my test task",
      "done": false,
      "isProject": true,
      "when": "8:00",
      "deadline": new Date("2021-09-27T16:46:50.990Z"),
      "details": "test details",
      "parent": -1
    } ];

     
    let taskArrayObservable = from (taskArray);
   // dataServiceSpy.getItems.and.returnValue(itemArrayObservable);
    spyOn(service,'getTasks').and.returnValue(of(taskArray));


  router.navigate(["list-items"]);
  tick();
  //console.log("************** location path" + location.path());
  expect(location.path()).toBe('/list-items'); 

  
}));


it("should test component update item using spy" ,
() => { 

   
    let taskArray : Task [] =      
    [  {
      "id" : 20000,
      "title": "my test task",
      "done": false,
      "isProject": true,
      "when": "8:00",
      "deadline": new Date("2021-09-27T16:46:50.990Z"),
      "details": "test details",
      "parent": -1
      }
    ];

    let task : Task =   {
      "id" : 20001,
      "title": "my test task",
      "done": false,
      "isProject": true,
      "when": "8:00",
      "deadline": new Date("2021-09-27T16:46:50.990Z"),
      "details": "test details",
      "parent": -1
      };

    let  observableTask = from (JSON.stringify(task));

    
    

    //dataServiceSpy.saveItem.and.returnValue(observableItem);
    // spyOn(service, 'saveItem').and.returnValue(observableItem);
    //spyOn(component, 'addItemInList').and.;
    spyOn(service, 'updateTask').and.returnValue(observableTask);
    
    component.task = task;
    component.updateTask();
    //fixture.detectChanges();
    expect(service.updateTask).toHaveBeenCalledTimes(1);

    expect(service.updateTask(task)).toBeInstanceOf(Observable);

    //service.updateItem(item)._subscribe() ;


    // expect(dataServiceSpy.getItems.calls.count())
    //.toBe(1, 'spy method was called once');



});


it("should get projects from service for dropdown" ,
() => { 

   
 let taskArray : Task [] =      
 [  {
   "id" : 20000,
   "title": "my test task",
   "done": false,
   "isProject": true,
   "when": "8:00",
   "deadline": new Date("2021-09-27T16:46:50.990Z"),
   "details": "test details",
   "parent": -1
  }
 ];

 let task : Task =   {
   "id" : 20001,
   "title": "my test task",
   "done": false,
   "isProject": true,
   "when": "8:00",
   "deadline": new Date("2021-09-27T16:46:50.990Z"),
   "details": "test details",
   "parent": -1
  };

 let  observableItem = from (JSON.stringify(task));


// let observableArray : Observable<Item []> = from ( itemArray);
 

 //dataServiceSpy.saveItem.and.returnValue(observableItem);
// spyOn(service, 'saveItem').and.returnValue(observableItem);
 //spyOn(component, 'addItemInList').and.;
spyOn(service, 'getAllProjects').and.returnValue(of(taskArray));
 
 
 component.ngOnInit();
 expect(component.projects[0].title).toEqual("my test task");
 
 //fixture.detectChanges();
expect(service.getAllProjects).toHaveBeenCalledTimes(1);

//expect(service.getAllProjects).toBeInstanceOf();

//service.updateItem(item)._subscribe() ;


// expect(dataServiceSpy.getItems.calls.count())
 //.toBe(1, 'spy method was called once');



});




});

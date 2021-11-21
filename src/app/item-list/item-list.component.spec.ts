import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataService } from '../data.service';

import { ItemListComponent } from './item-list.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DonePipe } from '../done.pipe';
import { TitlePipe } from '../title.pipe';
import { HttpTestingController } from '@angular/common/http/testing';

import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { Location} from '@angular/common';
import { EditItemComponent } from '../edit-item/edit-item.component';


 

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let service : DataService;
  let router : Router;
  let httpMock : HttpTestingController;
  let done : DonePipe;
  let title : TitlePipe;
  let dataServiceSpy = jasmine.createSpyObj('DataService', ['getTasks', 'saveTask']);
  let location : Location;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListComponent , DonePipe, TitlePipe],
      imports : [HttpClientModule, RouterTestingModule.withRoutes([
        {path: 'edit-item', component: EditItemComponent},

      ])],
      providers : [         
          DataService
        , HttpTestingController]

    })
    .compileComponents();

   //dataServiceSpy = jasmine.createSpyObj('DataService', ['getItems']);

  });

  beforeEach(() => {


    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(DataService);
    router = TestBed.get(Router);
    location = TestBed.inject(Location);
    httpMock = TestBed.get(HttpTestingController);
    
  });

  it('should create', () => {
    //const dataServiceSpy =
     // jasmine.createSpyObj('DataService', ['getItems']);
      let taskArray =  [     
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
        dataServiceSpy.getTasks.and.returnValue(taskArrayObservable);
       
    expect(component).toBeTruthy();
  });


  it('should navigate to edit component', fakeAsync (() => {
    router.navigate(['edit-item'])

    tick();
    spyOn(component, 'startEditing').and.callThrough();

    console.log("location " + location.path);
    expect(location.path()).toContain("edit-item");
  
  }));


  it('should get all tasks for a project', () => {
    //const dataServiceSpy =
     // jasmine.createSpyObj('DataService', ['getItems']);
      let taskArray =  [     
        {
          "id": 20000,
          "title": "my test task",
          "done": false,
          "isProject": true,
          "when": "8:00",
          "deadline": new Date("2021-09-27T16:46:50.990Z"),
          "details": "test details",
          "parent": -1
        },{
          "id": 20002,
          "title": "my second test task",
          "done": false,
          "isProject": false,
          "when": "8:00",
          "deadline": new Date("2021-09-27T16:46:50.990Z"),
          "details": "test details",
          "parent": 20000
        } ];
  
        let taskList : Task [] =[ {
          "id": 20002,
          "title": "my second test task",
          "done": false,
          "isProject": false,
          "when": "8:00",
          "deadline": new Date("2021-09-27T16:46:50.990Z"),
          "details": "test details",
          "parent": 20000
        } ];
         
        //dataServiceSpy.getItems.and.returnValue(of(itemArray));
        component.tasks= taskArray;
        let resultList : Task [] = component.getAllTasksForAProject(20000)
        expect(resultList).toEqual(taskList);
        //fixture.detectChanges();
  });



  it("should test component addItemInList" ,
     () => { 
    
        
      let taskArray =      
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
        "id" : 0,
        "title": "my test task",
        "done": false,
        isProject: true,
        "when": "8:00",
        "deadline": new Date("2021-09-27T16:46:50.990Z"),
        "details": "test details",
        "parent": -1
       };

      let  observableTask = from (JSON.stringify(task));

      
      
      

      //dataServiceSpy.saveItem.and.returnValue(observableItem);
     // spyOn(service, 'saveItem').and.returnValue(observableItem);
      //spyOn(component, 'addItemInList').and.;
     spyOn(component, 'addTaskInList').and.callThrough();
      
      
    // expect(service).toHaveBeenCalledTimes(1);
     
    expect(service.saveTask(task)).toBeInstanceOf(Observable);
    

  
     // expect(dataServiceSpy.getItems.calls.count())
      //.toBe(1, 'spy method was called once');
    

  
});

it("should test component delete item " ,
() => { 

   
 let taskArray =      
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


spyOn(service, 'deleteTask').and.returnValue(observableTask);


spyOn(window, "confirm").and.returnValue(true);
 component.deleteTask();

expect(service.deleteTask(200001)).toBeInstanceOf(Observable);


//service.updateItem(item)._subscribe() ;


// expect(dataServiceSpy.getItems.calls.count())
 //.toBe(1, 'spy method was called once');



});



   




});

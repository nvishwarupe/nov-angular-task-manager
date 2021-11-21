import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

import { Task} from './task';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { of } from 'rxjs';



describe('DataService', () => {
 
  let service: DataService;
  let httpMock : HttpTestingController;
  let httpClient : HttpClient;

  
  let projectItem1 : Task = 
  {
    "id": 20000,
    "title": "my test task",
    "done": false,
    "isProject": true,
    "when": "8:00",
    "deadline": new Date("2021-09-27T16:46:50.990Z"),
    "details": "test details",
    "parent": -1
  } ;
  
  let taskItem1 : Task = 
  {
    "id": 200001,
    "title": "my test task",
    "done": false,
    "isProject": false,
    "when": "8:00",
    "deadline": new Date("2021-09-27T16:46:50.990Z"),
    "details": "test details",
    "parent": 20000
  } ;
  

  let dummyTaskArray : Task[] = 
  [
  {
    "id": 200001,
    "title": "my test task",
    "done": false,
    "isProject": false,
    "when": "8:00",
    "deadline": new Date("2021-09-27T16:46:50.990Z"),
    "details": "test details",
    "parent": 20000
  } 
];
  



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule ],
      providers : [DataService]
    });
    
    
    service = TestBed.inject(DataService);
    httpMock = TestBed.get(HttpTestingController);

    //httpClient = TestBed.inject(HttpClient);
    
    //service.saveItem(taskItem1).subscribe(() => {
      
    //})
    

  

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


    

  
  

  it("should test getitems" , () => {
    /*service.saveItem(projectItem1).subscribe(() => {
      (_err: any) => { console.log(_err)}
      done();
    });
   */

   
   let spyDataService = spyOn(service, 'getTasks').and.callThrough();
 
   

   service.getTasks().subscribe(() => {
    // let task = items.find((item) => item.id === taskItem1.id)
     //expect(task).toBeDefined();
  });

   
    const  req = httpMock.expectOne(`/tasks`);
    console.log("request url **************" + req.request.url);

    expect(req.request.method).toBe("GET");

    req.flush(dummyTaskArray);
    
    httpMock.verify();
    

  });



  it("should test getitem with id" , () => {
    /*service.saveItem(projectItem1).subscribe(() => {
      (_err: any) => { console.log(_err)}
      done();
    });
   */

   
   let spyDataService = spyOn(service, 'getTask').and.callThrough();
 
   

   service.getTask(2).subscribe(() => {
    // let task = items.find((item) => item.id === taskItem1.id)
     //expect(task).toBeDefined();
  });

   
    const  req = httpMock.expectOne(`/tasks/2`);
    console.log("request url **************" + req.request.url);

    expect(req.request.method).toBe("GET");

    req.flush(projectItem1);
    
    httpMock.verify();
    

  });
  


  
/*

  it('should fetch all tasks', () => {
     service.getItems().subscribe((items) => {
        let task = items.find((item) => item.id === taskItem1.id)
        expect(task).toBeDefined();
     });
  });




  afterEach((done) => {
    service.deleteItem(projectItem1.id).subscribe(() => {
      done();
    });
    service.deleteItem(taskItem1.id).subscribe(() => {
      done();
    });
   

  });

*/

});

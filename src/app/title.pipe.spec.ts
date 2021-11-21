import { Task } from './task';
import { TitlePipe } from './title.pipe';

describe('TitlePipe', () => {
  it('create an instance', () => {
    const pipe = new TitlePipe();
    expect(pipe).toBeTruthy();
  });


  it('test title pipe', () => {
    
    let dummyTaskArray : Task[] = 
    [
      {
        "id": 200001 ,
        "title": "my test task",
        "done": true,
        "isProject": false,
        "when": "8:00",
        "deadline": new Date("2021-09-27T16:46:50.990Z"),
        "details": "test details",
        "parent": -1
      } ,
      {
        "id": 200002,
        "title": "my angular task",
        "done": false,
        "isProject": false,
        "when": "8:00",
        "deadline": new Date("2021-09-27T16:46:50.990Z"),
        "details": "test details",
        "parent": -1
      }
    ];
  
    let filteredArrayResult = [
      {
        "id": 200002,
        "title": "my angular task",
        "done": false,
        "isProject": false,
        "when": "8:00",
        "deadline": new Date("2021-09-27T16:46:50.990Z"),
        "details": "test details",
        "parent": -1
      }
    ];
  
  
    const pipe = new TitlePipe();
    let resultArray = pipe.transform(dummyTaskArray , "angular", true) 
    expect(resultArray).toEqual(filteredArrayResult);
  
    });
  
  

});

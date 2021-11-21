import { DonePipe } from './done.pipe';
import  {Task } from './task';

describe('DonePipe', () => {
  it('create an instance', () => {
    const pipe = new DonePipe();
    expect(pipe).toBeTruthy();
  });


  it('test done pipe', () => {
    
  let dummyTaskArray : Task[] = 
  [
    {
      "id": 200001,
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
      "title": "my test task",
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
      "id": 200001,
      "title": "my test task",
      "done": true,
      "isProject": false,
      "when": "8:00",
      "deadline": new Date("2021-09-27T16:46:50.990Z"),
      "details": "test details",
      "parent": -1
    }
  ];


  const pipe = new DonePipe();
  let resultArray = pipe.transform(dummyTaskArray , true) 
  expect(resultArray).toEqual(filteredArrayResult);

  });



});

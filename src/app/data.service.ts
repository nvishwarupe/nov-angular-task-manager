import { NodeWithI18n } from '@angular/compiler';
import { Injectable } from '@angular/core';

import {Task }  from './task' ;
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  now : Date = new Date();

 /* itemsOld : Item [] = [
    { id : "P100",
      title: "my first task" ,
      done: false ,
      project : true,
      when :  "now",
      deadline : this.now,
      details : "",
      parent : 0,
      itemlist : [
        { id : "TS400",
          title: "my first task" ,
          done: false ,
          project : false,
          when :  "now",
          deadline : this.now,
          details : "",
          parent : 0,
          itemlist : []
        },
        { id : "TS400",
          title: "my first task" ,
          done: false ,
          project : false,
          when :  "now",
          deadline : this.now,
          details : "",
          parent : 0,
          itemlist : []
        }
      ]
     },
     { id : "P200",
      title: "my second task" ,
      done: false,
      project : false,
      when :  "tomorrow",
      deadline : this.now ,
      details : "",
      parent : 0,
      itemlist : []
     }
    

];
*/
/*
items : Item [] = [
  { id : "P5000",
    title: "my first project" ,
    done: false ,
    project : true,
    when :  "12:40",
    deadline : this.now,
    details : "",
    parent : "",
    
   },
   { id : "T2000",
    title: "my second task" ,
    done: false,
    project : false,
    when :  "7:00",
    deadline : this.now ,
    details : "",
    parent : "P100"
   },
   { id : "T3000",
   title: "my third task" ,
   done: true,
   project : false,
   when : "7:00",
   deadline : this.now ,
   details : "",
   parent : "P5000"
   
  },
  { id : "P2000",
  title: "my second project" ,
  done: false,
  project : true,
  when :  "7:00",
  deadline : this.now ,
  details : "",
  parent : "-1"
 },
 { id : "T5000",
 title: "no parent task" ,
 done: false,
 project : false,
 when :  "7:00",
 deadline : this.now ,
 details : "",
 parent : "-1"
},
 
{ id:"P9000",
  title: "title",
   done:false,
   project: true,
   when:"7:00" , 
   details:"project 9000 details",
   parent :"-1",
   deadline: this.now
  }  



];

*/

tasks : Task [] = [];



  constructor(private http: HttpClient) { }

  getTasks() : Observable<Task[]> {
    return this.http.get<Task[]>("/tasks")
  }


  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`/tasks/${id}`)
  }



  /* without backend methods */
  /*
  getItems() : Item[] {
   return this.items;
  }

  



  getItem(title: string): Item {
    
    const itemIndex = this.items.findIndex(item => item.title.includes(title));
    console.log(itemIndex);
    return this.items[itemIndex] ;

  }

  
  getItemById(id: string): Item {
    
    const itemIndex = this.items.findIndex(item => item.id == id);
    console.log(itemIndex);
    return this.items[itemIndex] ;

  }

  */

 

  deleteTask(id: number): any {
     
     /* alert("deleteItem: index is " + index );
      this.items.splice(index, 1);
      
     alert("deleteItem: new array = " + JSON.stringify(this.items));
*/

    return this.http.delete(`/tasks/${id}`)

  }
/*
  saveItem(itemToSave: Item): any {
    alert("save Item called");
    const itemIndex = this.items.findIndex(item => itemToSave.title.includes(item.title));
    console.log(itemIndex);
    if(itemIndex != -1)
     Object.assign( this.items[itemIndex],  itemToSave );
    else {
      console.log("Item is pushed into array");
      this.items.push(itemToSave);
    }
  }

*/

updateTask(task: Task): Observable<any> {
  return this.http.put(`/tasks/${task.id}`, task);
}

saveTask(task: Task): Observable<any> {
  return this.http.post(`/tasks`, task);
}


// utility method for drop down
  getAllProjects() : Observable<Task[]>{
    //return this.items.filter((item) => item.project === true);
      
    return this.http.get<Task[]>("/tasks?isProject=true")


    
  }

}
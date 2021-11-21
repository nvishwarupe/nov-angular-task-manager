import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import {DataService} from '../data.service'
import { Router } from '@angular/router';
import { TitlePipe} from '../title.pipe';



@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  tasks : Task [] = [];

  titleText = "";

  count = 0;

  doneFlag = false;

  flag = false;

  searchedValue : string  = "";

  projectListSelected: boolean = false; // property for displaying either tasks or projects
  
  
  searchTitleText : string = "";
  filterModel : boolean = false;

  // not used remove
  //idCounter = 100;

  

  constructor(private dataService : DataService, private router: Router) { }

  ngOnInit(): void {
    
    // initial load - done checkbox is not checked
    // flag means data is loaded by filter
    //this.items = this.dataService.getItems();
   
    this.dataService.getTasks().subscribe(taskList => {
      this.tasks = taskList;
    })
    console.log(" ListComponent :ngOnInit() "+ JSON.stringify(this.tasks));
    //alert("projectListSelected " + this.projectListSelected);
  }


  

  
 /* addItem(title : string ){
    console.log("adding item with title " + title );
    const itemIndex = this.items.findIndex(item => item.title.includes(title));
    console.log("itemidex " + itemIndex);

    console.log("routing to list component page");

  }


  editItem(title : string ){
    console.log("editing item with title " + title );
    const itemIndex = this.items.findIndex(item => item.title.includes(title));
    console.log("itemidex " + itemIndex);

    console.log("routing to edit component page");

  }
  */

  deleteTask(){
    if (window.getSelection() != null && !window.confirm('Are you sure you want to delete selected item?')) {
      
      return
    } 
    /*console.log("deleting item with title from data service " + title );
    const itemIndex : number = this.items.findIndex(item => item.title.includes(title));
    
    this.dataService.deleteItem (itemIndex);
    */
    if (window.getSelection) 
    {
      let selectedText  = window.getSelection();
      //alert("selected text is" + selectedText);
      
      if(selectedText){
        let selectedTextString = selectedText.toString();
        if(selectedText.toString().trim() =="")
        {
          alert("Select task to delete");
          return;
        }
        selectedTextString = selectedTextString.trim();
        let id = selectedTextString.substr(selectedTextString.toString().indexOf(':')+1 , selectedTextString.length-1); 
        this.dataService.deleteTask(parseInt(id)).subscribe( (_: any) => {
          //Delete local copy of the task
          this.tasks = this.tasks.filter(task => task.id  !== parseInt(id))
        })
      }

    }
   

   // console.log(" deleted item with title " + title);
    //load items into component after deletion from dataservice
    //this.items = this.dataService.getItems();
    
   // alert("deleteItem item list component: new array = " + JSON.stringify(this.items));
    // test delete if following is needed
    //this.items = this.dataService.getItems();
    
    this.router.navigate(['/list-items']);
  

  }

  onCheckBoxDoneChange ( event : Event){
   let isChecked = (<HTMLInputElement>event.target).checked
    //alert("checkbox value is " + isChecked);
    this.doneFlag = isChecked;
    /*
    if (isChecked == true) {  
      let  filteredList : Item [] = this.items.filter(item => item.done != isChecked);
      this.items = filteredList;
      this.flag = true;
      this.ngOnInit();
    } else {
      this.items = this.dataService.getItems();
      this.flag = true;
      this.ngOnInit();
    }
    */
     
     
  }


  onCheckBoxProjectSelectionChange ( event : Event){
    let isChecked = (<HTMLInputElement>event.target).checked
    // alert("checkbox value is " + isChecked);
     this.projectListSelected = isChecked;
     /*if (isChecked == true) {  
       let  filteredList : Item [] = this.items.filter(item => item.project == isChecked);
       this.items = filteredList;
       this.flag = true;
       this.ngOnInit();
       
     } else {
       this.items = this.dataService.getItems();
       this.flag = true;
       this.ngOnInit();
     }*/
  }
   
  // new method

  
  addTaskInList(title: string)
  {
    //console.log(" 1 addItemInList called ");
    let task = new Task();
    task.title = title;

    /*let id  = "T" + (this.idCounter + 1)  ;
    item.id = id;
    */
    task.parent = -1;

   /* let taskIdModel : TaskId = new TaskId();

    /*this.dataService.getCounter().subscribe((taskId) => {
      //alert("here");
      taskIdModel = taskId;
      console.log( " 2 addItemInList () taskIdModel from database" + JSON.stringify(taskIdModel))

    });

    this.dataService.getCounter().subscribe((taskId: TaskId) => {
      taskIdModel = taskId;
    });

    alert("2 task id from database " + taskIdModel.counter);

  
    item.id = "T" + (taskIdModel.counter + 1) ; 

    taskIdModel.counter = taskIdModel.counter + 1;
    console.log(" 3 addItemInList () taskId Model goint to save" + JSON.stringify(taskIdModel))
    */ 
   
    // logic to generate random number id
   /* var id = Math.floor(Math.random() * (1000 - 50) + 50);

    item.id = "T" + id;
 end logic to generate random number id*/ 
    
    console.log("item-list.compeont- addTaskInList() saving task");
    this.dataService.saveTask(task).subscribe(_ => {
    })
    

  //  item saved now set the counter in db
  /*this.dataService.updateCounter(taskIdModel).subscribe(_ => {
    
  });*/


  // refresh task list with newly added task
  console.log("refreshing tasklist");
  this.ngOnInit(); 
  /*this.dataService.getTasks().subscribe(taskList => {
    this.tasks = taskList;
  })
  */
  


  }

// not used yet 
  getDisplayList(){
    //alert(JSON.stringify(this.dataService.getItems()));
    return this.dataService.getTasks();
  }
    

  getAllTasksForAProject(parentId : number){
  // let itemlist : Item [] = 
   // this.items.filter(item => item.parent === parentId);
    //alert(parentId);
    

    let tasklist : Task [] = 
     
    this.tasks.filter(function (task) { return (task.parent == parentId) });

    //aert("ItemListComponet: getAllTasksForAProject tasks for parent id "+ parentId + ": " + JSON.stringify(itemlist) )

    //alert(JSON.stringify(itemlist));
    return tasklist;
    
  }


  startEditing(){
    if (window.getSelection) {
      let selectedText  = window.getSelection();
      //alert("selected text is" + selectedText);
      
      if(selectedText){        let selectedTextString = selectedText.toString();
        if(selectedText.toString().trim() =="")
        {
          alert("Select task to edit");
          return;
        }
        
        let idString = selectedText.toString().trim();
        console.log("idString is " + idString);

        let id = idString.substr(idString.toString().indexOf(':') + 1, idString.length-1 ); 
       
        console.log("edit item id is = " + id);
        this.router.navigate(['edit-item', parseInt(id)])

      } else {
        // do nothing route to list 
        alert("Select task to edit");
        this.router.navigate(['list-items'])

      }
    }
 
  }


  




}

import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'done'
})
export class DonePipe implements PipeTransform {

  transform(value: Task [] ,  doneFlag: boolean): Task [] {
    
      if(doneFlag){
      let taskList : Task [] = value.filter((task) => task.done == true );
      return taskList;
     } else {
       return value;
     }
  }
}

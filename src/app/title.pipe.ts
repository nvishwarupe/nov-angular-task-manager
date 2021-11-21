import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: Task [] , title: string, searchFlag: boolean): Task [] {
    
    if(searchFlag)
    {
      let taskList : Task [] = value.filter((task) => task.title.includes(title) );
      return taskList;
    } else {
      // no filter applied
      return value;
    }
  }

}

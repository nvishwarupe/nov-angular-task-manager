import { Time } from "@angular/common";
import { templateJitUrl } from "@angular/compiler";

export class Task {
  id : number = 0;
  title: string = "";
  done: boolean = false ;
  isProject : boolean = false;
  when : string = "12:40:pm";
  deadline : Date | undefined ;
  details : string = "";
  parent : number = -1 ;
  //itemlist : Item [] = [];
}

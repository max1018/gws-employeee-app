import { Injectable } from '@angular/core';
import {Wakanda} from './wakanda.service';

let ds:any;

@Injectable()
export class DsService {

  constructor(private  wak: Wakanda) {}
  makeDS(){
    return this.wak.catalog.then((ds2:any)=>{
      ds = ds2;
      return true;
    })
  }

}

export {ds}
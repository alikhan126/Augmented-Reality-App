import { Component, OnInit } from '@angular/core';
import { PedoMeterResult } from 'src/app/PedoMeterResult';
import { NgZone,Injector } from '@angular/core';
import { MiBandService2Service } from 'src/app/mi-band-service-2.service';

@Component({
  selector: 'app-ar-display-mi-band',
  templateUrl: './ar-display-mi-band.component.html',
  styleUrls: ['./ar-display-mi-band.component.css']
})
export class ArDisplayMiBandComponent implements OnInit {
  deviceInitialized:boolean=false;
showAR:boolean;
pedoMeterStat: PedoMeterResult;
device: any = {};
miBandService:MiBandService2Service;
bleNotSupported:boolean;
constructor(private _zone: NgZone,private injector: Injector) {
  if (!navigator.bluetooth) {
    this.bleNotSupported=true;
  }
  else {
    this.miBandService = <MiBandService2Service>this.injector.get(MiBandService2Service);
   
  }
 }

ngOnInit() {
  if(!this.bleNotSupported){
  this.getDeviceStatus();
  this.streamValues();
  }
}

streamValues() {
  this.miBandService.streamValues().subscribe((data)=>{
   // console.log('got the data in stream.'+JSON.stringify(data));
            //let data1 = Buffer.from(data.buffer);
           // console.log('got the data in stream:'+data.getUint16(1,true));
           // console.log('got the data in stream:'+data.getUint32(5,true));
           // console.log('got the data in stream:'+data.getUint32(9,true));
            console.log('from streaming');
            this.showPedometerStats( new PedoMeterResult(data.getUint16(1,true),data.getUint32(5,true),data.getUint32(9,true)));
         
  });
}

getDeviceStatus() {
  this.miBandService.getDevice().subscribe(device => {
    if (device) {
      this.device = device;
    } else {
      // device not connected or disconnected
      this.device = null;
      this.pedoMeterStat = null;
    }
  });
}

getPedometerStats() {
  return this.miBandService.getBatteryLevel().subscribe(this.showPedometerStats.bind(this));
}

showPedometerStats(value: PedoMeterResult) {
  // force change detection
  this._zone.run(() => {
    console.log('Reading pedo results level:'+JSON.stringify(value));
    this.pedoMeterStat =  value;
    this.deviceInitialized=true;
  });
}

ngDoCheck(): void {

         let el1: any = document.getElementById('left-plane'),
         el2: any = document.getElementById('right-plane'),
         el3: any = document.getElementById('back-plane'),
         el4: any = document.getElementById('front-plane');
      if(el1 && el2 && el3 && el4){
        console.log('***********calling ngdocheck***********');
        el1.setAttribute("value", `Step Count :
        ${this.pedoMeterStat.steps}`);
      el2.setAttribute("value", `Calories :\n${this.pedoMeterStat.calories}`);
      el3.setAttribute("value", `Distance :\n${this.pedoMeterStat.distance}`);
      el4.setAttribute("value", `Step Count :${this.pedoMeterStat.steps}`);

     // console.log('setting value of left plane as :'+this.pedoMeterStat.steps);
      }
      
  
}
}
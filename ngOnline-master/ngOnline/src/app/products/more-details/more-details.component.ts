import { Component, OnInit } from '@angular/core';
import { ComServic } from './../../services/com-servic.service';
import { MobParts } from 'src/app/models/mob-parts';
import { isArray } from 'util';

@Component({
  selector: 'app-more-details',
  template: `<p>more-details works!</p>

    <mat-checkbox>Check me!</mat-checkbox>

    <mat-form-field>
      <mat-label>Choose a date</mat-label>
      <input matInput [matDatepicker]="picker" />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    <ul>
      <li *ngFor="let mobPart of mobParts">
        <div class="col s12 m4 cardHeight">
          <div class="card" [class.clsName]="mobPart.clsVar">
            <div class="card-image">
              <!-- <img src="{{ mobPart.prodImg }}" /> -->
              <!-- <img [src]="mobPart.prodImg" /> -->
              <img src="../../../assets/img/{{ mobPart.prodImg }}" />
              <span class="card-title">{{ mobPart.name | uppercase }}</span>
              <a class="btn-floating halfway-fab waves-effect waves-light red"
                ><i class="material-icons">add</i></a
              >
            </div>
            <div class="card-content">
              <p id="appSimpleStyle">
                Mobile Part ID : <b>{{ mobPart.id }}</b>
              </p>
              <div [style.color]="mobPart.prodColor">
                Mobile Part Name :
                <b
                  ><i>{{ mobPart.name | uppercase }}</i></b
                >
              </div>
              <div>
                Description : <q>{{ mobPart.description }}</q>
              </div>

              <ng-container
                *ngIf="mobPart.inStock != 0; then stockVal; else outOfStock"
              >
              </ng-container>

              <ng-template #stockVal>
                Last <mark>{{ mobPart.inStock }}</mark> Parts Available in stock
                now...
              </ng-template>

              <ng-template #outOfStock>
                Out Of Stock
              </ng-template>
              <p align="center">
                <!-- <button>-</button> -->
              </p>
              <p>Price : {{ mobPart.price | currency: 'INR' }}</p>
              <p>144 : {{ 144 | sqrt }}</p>

              <!-- sqrt(144) -->

              <div
                [ngStyle]="{
                  display: mobPart.canPurch === true ? 'inline-block' : 'none'
                }"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Green_sphere.svg/2000px-Green_sphere.svg.png"
                  width="16"
                />
              </div>

              <p [ngSwitch]="mobPart.country">
                Country :
                <img
                  *ngSwitchCase="'Australia'"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/23px-Flag_of_Australia.svg.png"
                  width="24"
                />
                <img
                  *ngSwitchCase="'Germany'"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/23px-Flag_of_Germany.svg.png"
                  width="24"
                />
                <img
                  *ngSwitchCase="'India'"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/23px-Flag_of_India.svg.png"
                  width="24"
                />
                <img
                  *ngSwitchDefault
                  src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Japan.png"
                  width="24"
                />
              </p>

              <!-- ng-container  vs  ng-template -->

              <!-- <div *ngIf="mobPart.inStock > 0; else outOfStock">
      Last <mark>{{ mobPart.inStock }}</mark> Parts Available in stock now...
    </div>

    <!-- #id : templatevarible -->
              <ng-template #outOfStock>
                Out of stock..!
              </ng-template>
              <li><a routerLink="more-details">More Details</a></li>

              <!-- <div *ngIf="mobPart.inStock === 0">
      Out Of Stock Now...
    </div> -->
            </div>
          </div>
        </div>
      </li>
    </ul> `,
  styles: [],
})
export class MoreDetailsComponent implements OnInit {
  constructor(private comServic: ComServic) {
    // D.inj to create OBJ
    console.log('2 Constructor Block...!');
  }
  ngOnInit(): void {
    this.comServic.getMobParts().subscribe((res) => (this.mobParts = res));
  }
  mobParts: MobParts[];
}

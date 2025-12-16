import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  endSubscription: Subject<void>;
  serverData: any;
  currentRole: number;
  displayedColumns: string[];
  constructor(private _activatedRoute: ActivatedRoute)
  {
    this.endSubscription = new Subject<void>();
    this.serverData = {};
    this.currentRole = Number(localStorage.getItem('role'));
    this.displayedColumns = ['fullName', 'email', 'age']
  }

  ngOnInit(): void {
    this._activatedRoute.data
    .pipe(
      takeUntil(this.endSubscription)
    )
    .subscribe((res)=>{
      this.serverData = res['data'];
    })
  }

  ngOnDestroy(): void {
    this.endSubscription.next();
    this.endSubscription.complete();
  }

}

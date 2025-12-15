import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  endSubscription: Subject<void>;
  serverData: any;
  currentRole: 'majdoor' | 'maalik';
  constructor(private _activatedRoute: ActivatedRoute)
  {
    this.endSubscription = new Subject<void>();
    this.serverData = {};
    this.currentRole = localStorage.getItem('role') as 'majdoor' | 'maalik';
  }

  ngOnInit(): void {
    this._activatedRoute.data
    .pipe(
      takeUntil(this.endSubscription)
    )
    .subscribe((res)=>{
      console.log(res)
      this.serverData = res['data'];
    })
  }

  ngOnDestroy(): void {
    this.endSubscription.next();
    this.endSubscription.complete();
  }

}

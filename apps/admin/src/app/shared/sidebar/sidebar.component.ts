import { AuthService } from '@b-henrie-dev/users';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.auth.logout();
  }
}

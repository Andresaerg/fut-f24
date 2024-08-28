import { Component, inject } from '@angular/core';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Team } from '../../models/team.model';
import { NgFor } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [NgFor, NzFlexModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  nzData: { team: Team } = inject(NZ_DRAWER_DATA);

  constructor(private drawerRef: NzDrawerRef<string>) {}

  close(): void {
    this.drawerRef.close(this.nzData);
  }
}

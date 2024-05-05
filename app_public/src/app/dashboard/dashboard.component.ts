import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import VisitorService from '../services/visitor.service';
import Visitor from '../models/visitor.model';
import moment from 'moment-timezone';

@Pipe({
  name: 'timeZone'
})
export class TimeZonePipe implements PipeTransform {
  transform(value: any, format: string = 'MM-DD-YYYY', tz: string = 'America/New_York'): any {
    if (!value) return '';
    return moment(value).tz(tz).format(format);
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  visitors = new MatTableDataSource<Visitor>([]);
  selection = new SelectionModel<Visitor>(true, []);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private visitorService: VisitorService) { }

  ngOnInit() {
    this.visitorService.getVisits();
    this.visitorService.getVisitListener().subscribe((visitors: Visitor[]) => {
      this.visitors.data = visitors.map(visitor => ({
        ...visitor,
        rawCreatedAt: visitor.createdAt // Keep the original datetime for sorting
      }));
      this.visitors.sort = this.sort;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.visitors.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.visitors.data.forEach(row => this.selection.select(row));
  }

  deleteSelected() {
    const selectedIds = this.selection.selected.map(s => s.id);
    if (selectedIds.length > 0) {
      this.visitorService.deleteVisits(selectedIds).subscribe({
        next: (responses) => {
          console.log('Deletion responses:', responses);
          this.visitors.data = this.visitors.data.filter(visitor => !selectedIds.includes(visitor.id));
          this.selection.clear();
          // Optionally, refresh the list from the server
          this.visitorService.getVisits();
        },
        error: (error) => {
          console.error('Error during deletion:', error);
        }
      });
    }
  }
}

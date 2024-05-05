import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import AuthService from '../services/auth.service';
import User from '../models/user.model';
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
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  users = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("Initializing component and fetching users...");
    this.fetchUsers();  // Fetch users immediately on component initialization
    this.authService.getUserListener2().subscribe({
      next: (users: User[]) => {
        console.log("Received users from getUserListener2:", users);
        this.users.data = users;
        this.users.sort = this.sort;
      },
      error: (error: any) => {
        console.error('Error fetching users from listener:', error);
      }
    });
  }

  fetchUsers(): void {
    console.log("Fetching users from API...");
    this.authService.getUsers().subscribe({
      next: (users: User[]) => {
        console.log("Users fetched successfully:", users);
        this.users.data = users;
        this.users.sort = this.sort;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    console.log("Toggling selection of all rows...");
    this.isAllSelected() ?
      this.selection.clear() :
      this.users.data.forEach(row => this.selection.select(row));
  }

  deleteSelected() {
    console.log("Starting the deletion process...");

    // Extracting and filtering IDs from selected users
    const selectedIds: string[] = this.selection.selected
      .map(user => user._id) // Extract IDs, which may be undefined
      .filter((id): id is string => id !== undefined); // Filter out undefined, assuring TypeScript these are strings

    console.log("Filtered selected IDs:", selectedIds);

    if (selectedIds.length > 0) {
      console.log("Sending delete request for IDs:", selectedIds);
      this.authService.deleteUsers(selectedIds).subscribe({
        next: () => {
          console.log("Deletion successful, updating data source...");
          // Successfully deleted, now remove from dataSource
          this.users.data = this.users.data.filter(user => !selectedIds.includes(user._id!)); // Assert non-null here safely
          this.selection.clear();
          console.log("Data source updated, re-fetching users...");
          this.fetchUsers(); // Refresh the list
        },
        error: (error: any) => {
          console.error('Error during deletion:', error);
        }
      });
    } else {
      console.log("No IDs to delete, skipping delete request.");
    }
  }

  makeAdmin() {
    // Ensure all IDs are defined before attempting to make admin
    const selectedIds: string[] = this.selection.selected
      .map(user => user._id) // This may produce (string | undefined)[]
      .filter((id): id is string => id !== undefined); // Filter out undefined, assuring TypeScript these are strings

    console.log("Making admin for IDs:", selectedIds);
    this.authService.makeAdmin(selectedIds).subscribe({
      next: () => {
        console.log("Admin status granted successfully");
        this.fetchUsers(); // Refresh the list
      },
      error: (error) => {
        console.error('Error during updating admin status:', error);
      }
    });
  }

  revokeAdmin() {
    // Ensure all IDs are defined before attempting to revoke admin
    const selectedIds: string[] = this.selection.selected
      .map(user => user._id) // This may produce (string | undefined)[]
      .filter((id): id is string => id !== undefined); // Filter out undefined, assuring TypeScript these are strings

    console.log("Revoking admin for IDs:", selectedIds);
    this.authService.revokeAdmin(selectedIds).subscribe({
      next: () => {
        console.log("Admin status revoked successfully");
        this.fetchUsers(); // Refresh the list
      },
      error: (error) => {
        console.error('Error during updating admin status:', error);
      }
    });
  }

}

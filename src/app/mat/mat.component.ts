import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBottomSheetModule, MatBottomSheet} from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheet } from './bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ThemePalette} from '@angular/material/core';
import {MatChipsModule, MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks? : Task[];
}

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-mat',
  templateUrl: './mat.component.html',
  styleUrls: ['./mat.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatGridListModule, MatBadgeModule, FormsModule,
    MatChipsModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe]
})

export class MatComponent {

  hidden = true;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  fruits : Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  announcer = inject(LiveAnnouncer);
  
  longText = ` Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam voluptate perferendis magni, quam aliquid tenetur suscipit vero quia quidem, enim quas tempora, voluptas repellat reprehenderit? Hic vitae eum doloribus voluptatum!`;

  allComplete: boolean = false;

  task : Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  someComp2(){
    let mr = Math.random();
    console.log('trgred - Math.random -', mr)
    return mr > 0.5;
  }

  someComplete(): boolean {
    // console.log('somecomplt triggrd',this.allComplete);
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks!.forEach(t => (t.completed = completed));
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }



  constructor( private _bottomSheet: MatBottomSheet ){

  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  toggleBadgeVisibility(){
    if(this.hidden){
      this.hidden = false;
    }
    else{
      this.hidden = true;
    }
  }

  options: string[] = ['Pune', 'Mumbai', 'Bangalore', 'Chennai', 'Gurgaon'];

  filteredOptions: Observable<string[]> | any;

  myControl = new FormControl('');


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}

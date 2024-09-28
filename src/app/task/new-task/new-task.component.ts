import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { TaskService } from '../../services/task.service';
import { IPerson } from '../../interfaces/person.interface';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  
  public lastIdAdded: number = -1; // to know the last row added
  public lastIdAbilityGroupAdded: number = -1; // to know the last row added

  // SUBMIT BUTTON
  public isFormSubmitting: boolean = false;
  
  // FORM
  public incompleteForm: string = '';
  public newTaskForm: FormGroup = this.fb.group({
    'name': ['', [ Validators.required, Validators.minLength(3) ]],
    'date': ['', [ Validators.required, Validators.min(18) ]],
    'persons': this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {}

  validField( field: string ): boolean {
    return this.newTaskForm.controls[field].touched &&
      this.newTaskForm.controls[field].invalid;
  }

  // ==== PERSONS =====
  get persons(): FormArray {
    return this.newTaskForm.get('persons') as FormArray;
  }

  addPerson(): void {
    this.lastIdAdded += 1;
    const newPersonGroup = this.createPersonGroup();
    this.persons.push(newPersonGroup);
  }

  createPersonGroup(): FormGroup {
    return this.fb.group({
      'fullname': ['', [Validators.required, Validators.minLength(5)] ],
      'age': [18, [Validators.required, Validators.min(18)] ],
      'abilities': this.fb.array([], [Validators.required]),
    });
  }

  removePerson(index: number): void {
    this.persons.removeAt(index);
  }
  // ==== END PERSONS =====

  // ==== ABILITIES =====
  getAbilities(personIndex: number): FormArray {
    return this.persons.at(personIndex).get('abilities') as FormArray;
  }

  addAbility(personIndex: number): void {
    const abilities = this.getAbilities(personIndex);
    abilities.push(this.createAbilityGroup());
  }

  createAbilityGroup(): FormGroup {
    return this.fb.group({
      'ability': ['', [Validators.required]],
    });
  }

  removeAbility(personIndex: number, abilityIndex: number): void {
    const abilities = this.getAbilities(personIndex);
    abilities.removeAt(abilityIndex);
  }
  // ==== END ABILITIES =====

  // Redirect to list, but if filters applies then keep them
  comeBackToList(): void {
    this.checkBackUrl()
      ? window.history.go(-1)
      : this.router.navigateByUrl('/task/list-tasks');
  }

  async saveTask(): Promise<void> {

    this.isFormSubmitting = true;

    if (!this.newTaskForm.value['persons'].length) {
      this.displayFormError('Debe agregar al menos una persona.');

      return;
    }

    const validPersonsArray = this.validatePersonsArray(this.newTaskForm.value['persons']);
    if (!validPersonsArray) return;

    if (this.newTaskForm.invalid) {
      this.displayFormError('Formulario incompleto. Campos con * en rojo son obligatorios');

      return;
    }

    this.taskService.saveNewTask( this.newTaskForm.value )
      .subscribe( resp => {
        if ( resp && resp.msg ) {
          this.isFormSubmitting = false;
          Swal.fire( 'Guardada', resp.msg, 'success' );
          this.router.navigateByUrl('/task/list-tasks');
        } else {
          this.isFormSubmitting = false;
          Swal.fire( 'Error', resp.message, 'error' );
        }
      });
  }

  // --------- HELPERS ----------
  private checkBackUrl(): boolean {
    const backUrl: any = this.location.getState();

    return backUrl && (backUrl.navigationId > 1)
  }

  private validatePersonsArray(persons: IPerson[]): boolean {
    const listNames:string[] = [];

    for (const person of persons) {
      if (listNames.includes(person.fullname)) {
        this.displayFormError(`Nombre: ${person.fullname} duplicado`);

        return false;
      }

      listNames.push(person.fullname);

      if (person.age < 18) {
        this.displayFormError('Edad de cada persona debe ser mayor o igual a 18');

        return false;
      }

      if (!person.abilities.length) {
        this.displayFormError('Cada persona debe tener al menos una habilidad');

        return false;
      }
    }

    return true;
  }

  private displayFormError(msg: string): void {
    this.incompleteForm = msg;
    setTimeout(() => {
      this.incompleteForm = '';
    }, 4000);

    this.isFormSubmitting = false;
  }
}

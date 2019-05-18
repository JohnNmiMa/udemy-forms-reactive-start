import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {p} from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
      this.signupForm = new FormGroup({
          'userData': new FormGroup({
              'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
              'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
          }),
          'gender': new FormControl('male'),
          'hobbies': new FormArray([])
      });

      // Two nice hooks you can use to dynamically check for value changes or form status changes as
      // the controls are typed in by the user.
/*      this.signupForm.valueChanges.subscribe(
          (value) => console.log(value)
      );*/
      this.signupForm.statusChanges.subscribe(
          (status) => console.log(status)
      );

      // Update all of the form with preset values
/*      this.signupForm.setValue({
          'userData': {
              'username': 'Max',
              'email': 'max@test.com'
          },
          'gender': 'male',
          'hobbies': []
      });*/

      // Update a part of the form with preset values
      this.signupForm.patchValue({
          'userData': {
              'username': 'Anna'
          }
      });
  }

  onSubmit() {
      console.log(this.signupForm);
      // this.signupForm.reset();
  }

  onAddHobby() {
      const control = new FormControl(null, Validators.required);
      (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
      if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
          return {'nameIsForbidden': true};
      }
      return null; // or omit the return statment for valid state
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise<any>((resolve, reject) => {
          setTimeout(() => {
              if (control.value === 'test@test.com') {
                  resolve({'emailIsForbidden': true});
              } else {
                  resolve(null);
              }
          }, 1500);
      });
      return promise;
  }
}

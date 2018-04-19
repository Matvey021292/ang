import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'ps-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  form: FormGroup;
  constructor(
    private usersService: UserService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6) ]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue]),
    });
  }


  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.usersService.createNewUser(user)
        .subscribe((user: User) => {

        )}
      }
  }


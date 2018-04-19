import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from './../../shared/models/user.model';
import { UserService } from './../../shared/services/user.service';
import { Message } from '../../shared/models/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ps-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router

  ) {}

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

private showMessage(text: string, type: string = 'danger') {
  this.message = new Message(type, text);
  window.setTimeout(() => {
    this.message.text = '';

  }, 5000 );
}

  onSubmit() {
     const formdata = this.form.value;
     this.userService.getUserByEmail(formdata.email )
     .subscribe((user: User) => {
        if (user) {
            if (user.password === formdata.password) {
              this.message.text = '';
              window.localStorage.setItem('user', JSON.stringify(user));
              this.authService.login();
              // this.router.navigate(['']);
            } else {
              this.showMessage('Пароль не верный');
            }
        } else {
          this.showMessage('Такого Пользователя не сушествует');
        }
     });
  }

}

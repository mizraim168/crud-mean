import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

declare let M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor(public userService: UserService) {

   }

  ngOnInit(): void {
    this.getUsers();
  }

  addUser(form: NgForm){
    if (form.value._id) {
      this.userService.putUser(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Updated Successfuly'})
        this.getUsers();
      });
    }else{
      this.userService.postUser(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Saved Successfuly'})
        this.getUsers();
      });
    }
   
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe(res =>{
      this.userService.users = res as User[];
      console.log(res);
      
    })
  }
  editUser(user : User){
    this.userService.selectedUser = user;
    // this.userService.putUser()
  }
  deleteUser(_id:string){
    if (confirm('Are you sure you want to delete it?')) {
      this.userService.deleteUser(_id)
      .subscribe(res => {
        console.log(res);
        this.getUsers();
        M.toast({html: 'Deleted successfuly'})
      });
     

    }

  }

  //clean form after submit
  resetForm(form?: NgForm){
    if (form) {
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

}

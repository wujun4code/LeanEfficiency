import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DefaultSignUpService } from './signup.service';
import { FormBuilder, FormGroup, FormControl, FormControlName, FormArray, FormArrayName, Validators, ValidatorFn } from '@angular/forms';
import { DefaultTeamService } from '../../team';
import { PBPaymentType, PBUser, PBTeam } from '../../objects';
import { Observable } from 'rxjs';

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  selectedIndex: number = 0;
  userForm: FormGroup;
  teamForm: FormGroup;

  pbUser: PBUser;

  canGoNextStep(forms: FormGroup[]) {
    let result = true;
    forms.forEach(f => {
      result = result && f.valid;
    });
    return result;
  }

  get canGoToTeamSelect() {
    return this.isUserFromValid;
  }

  get isUserFromValid() {
    return this.userForm.valid && this.isPasswordConfirm;
  }

  get isPasswordConfirm() {
    let pwd = this.userForm.value.password;
    let cpwd = this.userForm.value.passwordConfirm;
    return pwd == cpwd;
  }

  get canGoToComplete() {
    return this.teamForm.valid;
  }

  constructor(public sinupService: DefaultSignUpService,
    private router: Router,
    public teamService: DefaultTeamService,
    public formBuilder: FormBuilder, ) {
    this.userForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    });

    this.teamForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      domain: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
    });

    this.userForm.valueChanges.subscribe(value => {
    });

    this.teamForm.valueChanges.subscribe(value => {
    });

  }

  ngOnInit() {
    this.sinupService.currentUser().subscribe(pbUser => {
      if (pbUser != undefined) {
        this.pbUser = pbUser;
        this.selectedIndex = 1;
      }
    });

    this.teamService.fetchPaymentType().subscribe(list => {
      this.paymentTypes = list;
      this.teamForm.value.paymentType = this.paymentTypes[0].id;
    });
  }

  paymentTypes: Array<PBPaymentType> = [];
  btnNextToTeamSelect() {
    let username = this.userForm.value.username;
    let password = this.userForm.value.password;
    this.sinupService.signUpUser({
      username: username,
      password: password
    }).subscribe(pbUser => {
      this.pbUser = pbUser;
      this.nextStep();
    });
  }

  btnNextToComplete() {
    let name = this.teamForm.value.name;
    let domain = this.teamForm.value.domain;
    let paymentType = this.teamForm.value.paymentType;
    let team: PBTeam = null;
    this.teamService.createTeam(name, domain, paymentType).flatMap(pbTeam => {
      team = pbTeam;
      let bossRoleOble = this.teamService.createBossRole(this.pbUser, team);
      return Observable.merge(bossRoleOble);
    }).flatMap(pbRole => {
      return team.assign(this.pbUser, pbRole);
      //return Observable.from([0]);
    }).flatMap(bossRoleAssigned => {
      let roleOble = this.teamService.createRole(team);
      return roleOble;
    }).subscribe(completed => {
      console.log('team,role,user completed.');
      this.nextStep();
    });
  }

  nextStep() {
    this.selectedIndex += 1;
  }

  previousStep() {
    this.selectedIndex -= 1;
  }

  goHome() {
    this.router.navigate(['/pandorabox/dashboard']);
  }

}

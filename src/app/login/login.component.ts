import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    authenticationFlag: boolean = true;
    errors = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.empid, this.model.password)
            .subscribe(
            data => {
                if (data.status == "201") {
                    console.log("false");
                    this.authenticationFlag = false;
                    this.alertService.error(data.message);
                    this.loading = false;
                    this.errors = data.message;
                }
                this.router.navigate([this.returnUrl]);
            },
            error => {

            });
    }
}

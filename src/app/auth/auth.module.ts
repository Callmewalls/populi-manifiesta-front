import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { AuthRoutingModule } from "./auth-routing.module";
import { RouterLink } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        CardModule,
        RouterLink,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        AngularFireAuthModule
    ]
})
export class AuthModule { }
import { Component, Input } from '@angular/core';
import { HelperService } from '../../helper/helper.service';
import { Router } from '@angular/router';
import { OAuthService,NullValidationHandler,AuthConfig } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends HelperService {
  username!:string;

  isLoggedIn!:boolean;

  isAdmin!:boolean;

  @Input() isLogged!:boolean;

  @Input() isAdminn!:boolean;

  constructor(private oauthService:OAuthService,private router:Router) {

    super();
this.configure();

  }




  authFlowConfig:AuthConfig
= { issuer:'http://localhost:8080/realms/CareerHub',

    requireHttps: false,

    redirectUri: window.location.origin,

    clientId: 'angular-client',

    responseType: 'code',

    scope: 'openid profile email offline_access',
    showDebugInformation: true,

  };

  configure():void{

    this.oauthService.configure(this.authFlowConfig);

    this.oauthService.tokenValidationHandler=new NullValidationHandler;

    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.loadDiscoveryDocument().then(()=>this.oauthService.tryLogin())

    .then (()=>{

      if(this.oauthService.getIdentityClaims()){

        this.isLoggedIn=this.getIsLoggedIn();

        this.isAdmin=this.getIsAdmin();

        this.username=this.getUsername();


      }

    });




  }

  login():void{

    this.oauthService.initImplicitFlowInternal();

  }

  public getIsLoggedIn():boolean{

    return (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidAccessToken());

  }

  logout():void{

    this.oauthService.logOut();




  }

 
  public getIsAdmin():boolean{

    const token=this.oauthService.getAccessToken();

    const payload=token.split('.')[1];

    const payloadDecodedJson=atob(payload);

    const payloadDecoded= JSON.parse(payloadDecodedJson);

    const preferredUsername = payloadDecoded.preferred_username

    console.log(payloadDecoded);

    console.log(preferredUsername)

    return payloadDecoded.realm_access.roles.indexOf('Admin') !==-1;




  }

  public getUsername():string{

    const token=this.oauthService.getAccessToken();

    const payload=token.split('.')[1];

    const payloadDecodedJson=atob(payload);

    const payloadDecoded= JSON.parse(payloadDecodedJson);

    const preferredUsername = payloadDecoded.preferred_username

   return preferredUsername;

  }



}

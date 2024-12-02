import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../sign/account.service";
import {map} from "rxjs";

export const authguardGuard: CanActivateFn = (route, state) => {

  let accountService = inject(AccountService);
  let router = inject(Router);
  return accountService.user$.pipe(
    map(user => {
      if(user){
        return true;
      }else {
        router.navigateByUrl("/");
        return false;
      }
    })
  );
};

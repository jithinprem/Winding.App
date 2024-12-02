import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {RegisterDto} from "../../interfaces/registerDto";
import {Injectable} from "@angular/core";
import {map, Observable, of, ReplaySubject} from "rxjs";
import {User} from "../../interfaces/user";
import {ConfirmEmail} from "../../interfaces/confirmEmail";
import {Login} from "../../interfaces/login";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSource = new ReplaySubject<User | null>(1);
  public user$: Observable<User | null> = this.userSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public register(registerDto: RegisterDto) {
    return this.http.post(`${environment.appUrl}account/register`, registerDto);
  }

  public verifyEmail(confirmEmail: ConfirmEmail) {
    return this.http.post(`${environment.appUrl}account/verify-token`, confirmEmail)
  }

  public login(model: Login) {
    return this.http.post<User>(`${environment.appUrl}account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }

  public logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }


  public refreshUser(jwt: string | null): any{
    if(jwt === null) {
      this.userSource.next(null);
      return of(undefined);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);
    return this.http.get<User>(`${environment.appUrl}account/refresh-token`, {headers}).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }

  public getJWT(): string | null{
    const key = localStorage.getItem(environment.userKey)
    if(key) {
      const user: User = JSON.parse(key);
      return user.jwt;
    }
    return null;
  }

  private setUser(user: User | null) {
    // set the userSource
    // add to localStorage
    if (user == null){
      localStorage.removeItem(environment.userKey);
      this.userSource.next(null);
      return;
    }
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }

}

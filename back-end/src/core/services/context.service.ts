// import { Injectable, Scope, Inject } from '@nestjs/common';
// import { REQUEST } from '@nestjs/core';

// import { Role, AuthProvider } from '@lifestyle/database';

// export interface UserClaims {
//   name: string;
//   username: string;
//   role: Role;
//   iat: number;
//   exp: number;
//   iss: string;
//   sub: string;
//   provider: AuthProvider;
// }

// @Injectable({ scope: Scope.REQUEST })
// export class ContextService {
//   static KEY_USER = '__user';

//   /**
//    * Constructor
//    */
//   constructor(@Inject(REQUEST) public readonly request: any) { }

//   /**
//    * Return current user in context
//    *
//    * @return {UserClaims}
//    */
//   get user(): UserClaims {
//     return this.request[ContextService.KEY_USER];
//   }

//   /**
//    * Set current user in context
//    *
//    * @param  {UserClaims} user    The user info
//    * @return {void}
//    */
//   setUser(user: UserClaims): void {
//     this.request[ContextService.KEY_USER] = user;
//   }
// }

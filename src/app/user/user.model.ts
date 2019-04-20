import { UserPlan } from "./user.plan.model";

export class User {
    public email: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public enabled: boolean;
    public plan: UserPlan;
    // public userRoles: Set<String>;
  
    constructor(
      email: string,
      firstName: string,
      lastName: string,
      username: string,
      enabled: boolean,
      plan: UserPlan
    ) {
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.enabled = enabled;
      this.plan = plan;
    }
  }
  
export class LoginDto{
    phoneNumber: string;
    password:String;
    roleId:number;
    constructor(){
        this.phoneNumber='';
        this.password='';
        this.roleId=0;
    }
}
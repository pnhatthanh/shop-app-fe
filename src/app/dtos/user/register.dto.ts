export class RegisterDto{
    phoneNumber:String;
    password:String;
    retypePassword:String;
    fullName:String;
    address:String;
    dateOfBirth:Date;
    roleId:number;
    facebookAccountId:number;
    googleAccountId:number;

  constructor(data:any){
    this.phoneNumber=data.phoneNumber;
    this.password=data.password;
    this.retypePassword=data.retypePassword;
    this.fullName=data.fullName;
    this.address=data.address;
    this.dateOfBirth=data.dateOfBirth;
    this.facebookAccountId = data.facebook_account_id || 0;
    this.googleAccountId = data.google_account_id || 0;
    this.roleId=data.roleId||1;
  }
}
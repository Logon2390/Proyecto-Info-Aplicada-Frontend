//import  { User }  from './model/interfaces';

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate : Date;
    password: string;
}

export interface FileData {
    owner: string;
    type: string;
    size: number;
    createdAt: string;
    base64: string;
  }
  
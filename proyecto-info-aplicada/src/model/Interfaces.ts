//import  { User }  from './model/interfaces';

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate : string;
    password: string;
}

export interface FileData {
    id: number;
    owner: string;
    type: string;
    size: number;
    createdAt: string;
    base64: string;
  }
  
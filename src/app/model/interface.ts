//to login
export interface login {
  email: string;
  password: string;
  role:string;
}
//to get all student
export interface getStudent {
  id: number | null;
  name: string;
  fees: number | null;
  course: string;
}

//to post/create student
export interface student {
  name: string;
  fees: number | null;
  course: string;
}

//signup form
export interface signup{
  name: string;
  email:string;
  password:null;
  phone:number | null;
  role:string;
  
}

//api response
export interface ApiResponseOneStud {
  data: getStudent;
  success: boolean;
  message: string;
}

import axios from "axios";
const url = "https://localhost:7163";

export interface RegisterReq {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  address?: string;
  registerType: string;
  cardId?: string;
  taxId?: string;
  birthDate?: Date;
  contactPerson?:string;
}

export function Register(data: RegisterReq) {
  return axios({
    method: "post",
    url: `${url}/api/Register`,
    data: data,
    headers: {
      "Content-type": "application/json",
    },
  });
}

export function GetRegisterAll() {
    return axios({
      method: "get",
      url: `${url}/api/Register`,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type User = {
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  address?: Address;
};

export type Student = {
  user: User;
  studentnumber: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

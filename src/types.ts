export interface IPerson {
  id: number;
  shortname: string;
  firstname: string;
  lastname: string;
  created_at: string;
  personal_email: string;
  work_email: string;
  user: string;
}

export interface IProject {
  id: number;
  shortname: string;
  description: string;
  created_at: string;
  from_co: string;
  to_co: string;
}

export interface IAllocation {
  id: number;
  person: string;
  project: string;
  created_at: string;
  from: Date;
  to: Date;
}

export interface Employee {
  id?: string;
  name: string;
  email: string;
  departament: string;
  status: string;
  createdAt?: Date;
}

export interface FormStepProps {
  values: Employee;
  onChange: (field: keyof Employee, value: string) => void;
  errors: Record<string, string>;
}

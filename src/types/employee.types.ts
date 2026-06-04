export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
export type EmployeeStatus = "ACTIVE" | "INACTIVE";

export interface EmployeeNode {
  id: string;
  parentId: string | null;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
  officeLocation: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  profileImageUrl: string;
}

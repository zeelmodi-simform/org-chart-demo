import { useState } from "react";
import styled, { keyframes } from "styled-components";
import type { EmployeeNode, EmploymentType } from "../../types/employee.types";

interface AddEmployeeFormProps {
  existingEmployees: EmployeeNode[];
  onAdd: (employee: EmployeeNode) => void;
  onClose: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 440px;
  max-width: 95vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.18s ease-out;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  &:hover { color: #111827; }
`;

const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid #e5e7eb;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.15s;
  &:focus { border-color: #4f46e5; }
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  color: #111827;
  background: #ffffff;
  outline: none;
  transition: border-color 0.15s;
  cursor: pointer;
  &:focus { border-color: #4f46e5; }
`;

const Btn = styled.button`
  padding: 8px 18px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover { background: #f9fafb; }
`;

const PrimaryBtn = styled(Btn)`
  background: #4f46e5;
  color: #ffffff;
  border-color: #4f46e5;
  &:hover { background: #4338ca; border-color: #4338ca; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

function avatar(name: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4f46e5`;
}

export function AddEmployeeForm({ existingEmployees, onAdd, onClose }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [officeLocation, setOfficeLocation] = useState("");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("FULL_TIME");
  const [parentId, setParentId] = useState(existingEmployees[0]?.id ?? "");

  const departments = ["Engineering", "Sales", "HR", "Operations", "Executive"];
  const isValid = firstName.trim() && lastName.trim() && jobTitle.trim() && parentId;

  function handleSubmit() {
    if (!isValid) return;

    const displayName = `${firstName.trim()} ${lastName.trim()}`;
    const newEmployee: EmployeeNode = {
      id: `new-${Date.now()}`,
      parentId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      displayName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      jobTitle: jobTitle.trim(),
      department,
      officeLocation: officeLocation.trim() || "Remote",
      employmentType,
      status: "ACTIVE",
      profileImageUrl: avatar(displayName),
    };

    onAdd(newEmployee);
    onClose();
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Add Employee</ModalTitle>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </ModalHeader>

        <ModalBody>
          <Row>
            <FormGroup>
              <Label>First Name *</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" />
            </FormGroup>
            <FormGroup>
              <Label>Last Name *</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" />
            </FormGroup>
          </Row>

          <FormGroup>
            <Label>Job Title *</Label>
            <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Software Engineer" />
          </FormGroup>

          <Row>
            <FormGroup>
              <Label>Department</Label>
              <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Employment Type</Label>
              <Select value={employmentType} onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACTOR">Contractor</option>
              </Select>
            </FormGroup>
          </Row>

          <FormGroup>
            <Label>Office Location</Label>
            <Input value={officeLocation} onChange={(e) => setOfficeLocation(e.target.value)} placeholder="Remote" />
          </FormGroup>

          <FormGroup>
            <Label>Reports To *</Label>
            <Select value={parentId} onChange={(e) => setParentId(e.target.value)}>
              {existingEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.displayName} — {emp.jobTitle}
                </option>
              ))}
            </Select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Btn onClick={onClose}>Cancel</Btn>
          <PrimaryBtn onClick={handleSubmit} disabled={!isValid}>Add Employee</PrimaryBtn>
        </ModalFooter>
      </Modal>
    </Overlay>
  );
}

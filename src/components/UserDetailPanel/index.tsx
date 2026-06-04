import styled, { keyframes } from "styled-components";
import type { EmployeeNode } from "../../types/employee.types";

interface UserDetailPanelProps {
  employee: EmployeeNode | null;
  onClose: () => void;
}

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 360px;
  background: #ffffff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
  z-index: 101;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.2s ease-out;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  line-height: 1;
  padding: 4px;

  &:hover { color: #111827; }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
`;

const Avatar = styled.div<{ $color: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
`;

const FullName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  text-align: center;
`;

const JobTitle = styled.div`
  font-size: 13px;
  color: #6b7280;
  text-align: center;
`;

const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $active }) => ($active ? "#dcfce7" : "#f3f4f6")};
  color: ${({ $active }) => ($active ? "#166534" : "#6b7280")};
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 10px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 12px;
`;

const FieldLabel = styled.span`
  font-size: 11px;
  color: #9ca3af;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FieldValue = styled.span`
  font-size: 14px;
  color: #111827;
`;

const Divider = styled.div`
  height: 1px;
  background: #f3f4f6;
  margin: 16px 0;
`;

const AVATAR_COLORS = ["#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626", "#7c3aed"];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("");
}

const EMPLOYMENT_LABEL: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACTOR: "Contractor",
};

export function UserDetailPanel({ employee, onClose }: UserDetailPanelProps) {
  if (!employee) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <Drawer>
        <Header>
          <HeaderTitle>Employee Details</HeaderTitle>
          <CloseBtn onClick={onClose} aria-label="Close">×</CloseBtn>
        </Header>
        <Body>
          <AvatarSection>
            <Avatar $color={getAvatarColor(employee.displayName)}>
              {getInitials(employee.displayName)}
            </Avatar>
            <FullName>{employee.displayName}</FullName>
            <JobTitle>{employee.jobTitle}</JobTitle>
            <StatusBadge $active={employee.status === "ACTIVE"}>{employee.status}</StatusBadge>
          </AvatarSection>

          <Divider />

          <Section>
            <SectionLabel>Contact</SectionLabel>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldValue>{employee.email}</FieldValue>
            </Field>
          </Section>

          <Section>
            <SectionLabel>Organization</SectionLabel>
            <Field>
              <FieldLabel>Department</FieldLabel>
              <FieldValue>{employee.department}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Office Location</FieldLabel>
              <FieldValue>{employee.officeLocation}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Employment Type</FieldLabel>
              <FieldValue>{EMPLOYMENT_LABEL[employee.employmentType] ?? employee.employmentType}</FieldValue>
            </Field>
          </Section>
        </Body>
      </Drawer>
    </>
  );
}

import { useState } from "react";
import styled from "styled-components";
import type { OrgChart } from "d3-org-chart";
import type { EmployeeNode } from "../../types/employee.types";

interface ToolbarProps {
  chartRef: React.MutableRefObject<OrgChart<EmployeeNode> | null>;
  employees: EmployeeNode[];
  onAddClick: () => void;
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

const PrimaryBtn = styled(Btn)`
  background: #4f46e5;
  color: #ffffff;
  border-color: #4f46e5;

  &:hover {
    background: #4338ca;
    border-color: #4338ca;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: #e5e7eb;
  margin: 0 4px;
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  color: #111827;
  outline: none;
  width: 200px;
  transition: border-color 0.15s;

  &:focus {
    border-color: #4f46e5;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-right: 8px;
`;

export function Toolbar({ chartRef, employees, onAddClick }: ToolbarProps) {
  const [query, setQuery] = useState("");

  function handleSearch(value: string) {
    setQuery(value);
    const chart = chartRef.current;
    if (!chart) return;

    chart.clearHighlighting();
    if (!value.trim()) return;

    const lower = value.toLowerCase();
    const match = employees.find(
      (e) =>
        e.displayName.toLowerCase().includes(lower) ||
        e.jobTitle.toLowerCase().includes(lower) ||
        e.department.toLowerCase().includes(lower),
    );
    if (match) {
      chart.setHighlighted(match.id).setCentered(match.id).render();
    }
  }

  return (
    <Bar>
      <Title>Org Chart</Title>
      <Divider />
      <Btn onClick={() => chartRef.current?.zoomIn()}>+ Zoom In</Btn>
      <Btn onClick={() => chartRef.current?.zoomOut()}>− Zoom Out</Btn>
      <Btn onClick={() => chartRef.current?.fit()}>Fit</Btn>
      <Btn onClick={() => chartRef.current?.expandAll().fit()}>Expand All</Btn>
      <Btn onClick={() => chartRef.current?.collapseAll().render().fit()}>Collapse All</Btn>
      <Divider />
      <SearchInput
        placeholder="Search by name, title, dept…"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Divider />
      <PrimaryBtn onClick={onAddClick}>+ Add Employee</PrimaryBtn>
    </Bar>
  );
}

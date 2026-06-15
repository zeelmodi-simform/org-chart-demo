import { useState } from "react";
import styled from "styled-components";
import type { OrgChart, Layout } from "d3-org-chart";
import type { EmployeeNode } from "../../types/employee.types";

interface ToolbarProps {
  chartRef: React.MutableRefObject<OrgChart<EmployeeNode> | null>;
  employees: EmployeeNode[];
  layout: Layout;
  isCompact: boolean;
  onAddClick: () => void;
  onLayoutChange: (layout: Layout) => void;
  onCompactToggle: () => void;
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

const ToggleBtn = styled(Btn)<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "#4f46e5" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#374151")};
  border-color: ${({ $active }) => ($active ? "#4f46e5" : "#e5e7eb")};

  &:hover {
    background: ${({ $active }) => ($active ? "#4338ca" : "#f9fafb")};
    border-color: ${({ $active }) => ($active ? "#4338ca" : "#d1d5db")};
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

const DangerBtn = styled(Btn)`
  color: #dc2626;
  border-color: #fecaca;

  &:hover {
    background: #fef2f2;
    border-color: #dc2626;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 22px;
  background: #e5e7eb;
  margin: 0 2px;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 12px;
  color: #111827;
  outline: none;
  width: 180px;
  transition: border-color 0.15s;

  &:focus { border-color: #4f46e5; }
  &::placeholder { color: #9ca3af; }
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-right: 4px;
  white-space: nowrap;
`;

const LAYOUTS: { value: Layout; label: string }[] = [
  { value: "top", label: "↓ Top" },
  { value: "left", label: "→ Left" },
  { value: "right", label: "← Right" },
  { value: "bottom", label: "↑ Bottom" },
];

export function Toolbar({
  chartRef,
  employees,
  layout,
  isCompact,
  onAddClick,
  onLayoutChange,
  onCompactToggle,
}: ToolbarProps) {
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

  function handleExport() {
    chartRef.current?.exportImg({ full: true, scale: 3 });
  }

  function handleFullscreen() {
    chartRef.current?.fullscreen();
  }

  return (
    <Bar>
      <Title>Org Chart</Title>
      <Divider />

      {/* Zoom / fit / expand */}
      <Btn onClick={() => chartRef.current?.zoomIn()}>+ Zoom</Btn>
      <Btn onClick={() => chartRef.current?.zoomOut()}>− Zoom</Btn>
      <Btn onClick={() => chartRef.current?.fit()}>Fit</Btn>
      <Btn onClick={() => chartRef.current?.expandAll().fit()}>Expand All</Btn>
      <Btn onClick={() => chartRef.current?.collapseAll().render().fit()}>Collapse All</Btn>
      <Divider />

      {/* Layout direction */}
      {LAYOUTS.map(({ value, label }) => (
        <ToggleBtn
          key={value}
          $active={layout === value}
          onClick={() => onLayoutChange(value)}
        >
          {label}
        </ToggleBtn>
      ))}
      <Divider />

      {/* Compact mode */}
      <ToggleBtn $active={isCompact} onClick={onCompactToggle}>
        {isCompact ? "✓ Compact" : "Compact"}
      </ToggleBtn>
      <Divider />

      {/* Search */}
      <SearchInput
        placeholder="Search by name, title, dept…"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Divider />

      {/* Actions */}
      <PrimaryBtn onClick={onAddClick}>+ Add</PrimaryBtn>
      <DangerBtn onClick={handleExport}>↓ Export PNG</DangerBtn>
      <Btn onClick={handleFullscreen}>⛶ Fullscreen</Btn>
    </Bar>
  );
}

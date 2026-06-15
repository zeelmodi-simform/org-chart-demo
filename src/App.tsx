import { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { OrgChart } from "d3-org-chart";
import type { Layout } from "d3-org-chart";
import { OrgChartComponent } from "./components/OrgChart";
import { Toolbar } from "./components/Toolbar";
import { UserDetailPanel } from "./components/UserDetailPanel";
import { AddEmployeeForm } from "./components/AddEmployeeForm";
import { employees as initialData } from "./data/employees";
import type { EmployeeNode } from "./types/employee.types";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f9fafb;
    color: #111827;
  }
`;

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ChartArea = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export default function App() {
  const chartRef = useRef<OrgChart<EmployeeNode> | null>(null);
  const [data, setData] = useState<EmployeeNode[]>(initialData);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeNode | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [layout, setLayout] = useState<Layout>("top");
  const [isCompact, setIsCompact] = useState(false);

  function handleAddEmployee(newEmployee: EmployeeNode) {
    setData((prev) => [...prev, newEmployee]);
    chartRef.current?.addNode(newEmployee as never);
  }

  function handleRemoveEmployee(id: string) {
    chartRef.current?.removeNode(id);
    setData((prev) => prev.filter((e) => e.id !== id));
    setSelectedEmployee(null);
  }

  function handleLayoutChange(newLayout: Layout) {
    setLayout(newLayout);
    const chart = chartRef.current;
    if (!chart) return;
    (chart.layout as (v: Layout) => OrgChart<EmployeeNode>)(newLayout);
    chart.render();
    chart.fit();
  }

  function handleCompactToggle() {
    const next = !isCompact;
    setIsCompact(next);
    const chart = chartRef.current;
    if (!chart) return;
    (chart.compact as (v: boolean) => OrgChart<EmployeeNode>)(next);
    chart.render();
    chart.fit();
  }

  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <Toolbar
          chartRef={chartRef}
          employees={data}
          layout={layout}
          isCompact={isCompact}
          onAddClick={() => setShowAddForm(true)}
          onLayoutChange={handleLayoutChange}
          onCompactToggle={handleCompactToggle}
        />
        <ChartArea>
          <OrgChartComponent
            initialData={initialData}
            onNodeClick={setSelectedEmployee}
            chartRef={chartRef}
          />
        </ChartArea>
      </AppLayout>

      <UserDetailPanel
        employee={selectedEmployee}
        chartRef={chartRef}
        onClose={() => setSelectedEmployee(null)}
        onRemove={handleRemoveEmployee}
      />

      {showAddForm && (
        <AddEmployeeForm
          existingEmployees={data}
          onAdd={handleAddEmployee}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}

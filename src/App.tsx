import { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { OrgChart } from "d3-org-chart";
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

const Layout = styled.div`
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

  function handleAddEmployee(newEmployee: EmployeeNode) {
    setData((prev) => [...prev, newEmployee]);
    chartRef.current?.addNode(newEmployee as never);
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Toolbar chartRef={chartRef} employees={data} onAddClick={() => setShowAddForm(true)} />
        <ChartArea>
          <OrgChartComponent
            data={data}
            onNodeClick={setSelectedEmployee}
            chartRef={chartRef}
          />
        </ChartArea>
      </Layout>

      <UserDetailPanel
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
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

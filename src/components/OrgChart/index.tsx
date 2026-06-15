import { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import type { HierarchyNode } from "d3-hierarchy";
import type { EmployeeNode } from "../../types/employee.types";
import { nodeTemplate } from "./nodeTemplate";

interface OrgChartProps {
  initialData: EmployeeNode[];
  onNodeClick: (employee: EmployeeNode) => void;
  chartRef: React.MutableRefObject<OrgChart<EmployeeNode> | null>;
}

export function OrgChartComponent({ initialData, onNodeClick, chartRef }: OrgChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !initialData.length) return;

    chartRef.current = new OrgChart<EmployeeNode>()
      .container(containerRef.current as unknown as string)
      .data(initialData)
      .nodeWidth(() => 240)
      .nodeHeight(() => 82)
      .childrenMargin(() => 50)
      .compactMarginBetween(() => 25)
      .compactMarginPair(() => 30)
      .nodeContent((d: HierarchyNode<EmployeeNode>) => nodeTemplate(d.data))
      .onNodeClick((d: HierarchyNode<EmployeeNode>) => onNodeClick(d.data))
      .render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
    />
  );
}

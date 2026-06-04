import type { EmployeeNode } from "../../types/employee.types";

const DEPT_COLORS: Record<string, { bg: string; text: string }> = {
  Engineering: { bg: "#ede9fe", text: "#5b21b6" },
  Sales: { bg: "#dcfce7", text: "#166534" },
  HR: { bg: "#fef3c7", text: "#92400e" },
  Operations: { bg: "#dbeafe", text: "#1e40af" },
  Executive: { bg: "#fce7f3", text: "#9d174d" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

function getAvatarColor(name: string): string {
  const colors = ["#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626", "#7c3aed"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function nodeTemplate(employee: EmployeeNode): string {
  const initials = getInitials(employee.displayName);
  const avatarColor = getAvatarColor(employee.displayName);
  const dept = DEPT_COLORS[employee.department] ?? { bg: "#f3f4f6", text: "#374151" };
  const isActive = employee.status === "ACTIVE";

  return `
    <div style="
      width: 220px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 14px 14px 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      cursor: pointer;
      transition: box-shadow 0.15s;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      box-sizing: border-box;
    ">
      <div style="position: relative; flex-shrink: 0;">
        <div style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: ${avatarColor};
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.5px;
        ">${initials}</div>
        <div style="
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${isActive ? "#22c55e" : "#9ca3af"};
          border: 2px solid #ffffff;
        "></div>
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="
          font-weight: 600;
          font-size: 13px;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 2px;
        ">${employee.displayName}</div>
        <div style="
          font-size: 11px;
          color: #6b7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 6px;
        ">${employee.jobTitle}</div>
        <span style="
          display: inline-block;
          background: ${dept.bg};
          color: ${dept.text};
          border-radius: 999px;
          padding: 2px 8px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3px;
        ">${employee.department}</span>
      </div>
    </div>
  `;
}

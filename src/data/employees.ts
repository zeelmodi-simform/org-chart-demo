import type { EmployeeNode } from "../types/employee.types";

function avatar(name: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4f46e5&fontFamily=Arial&fontSize=40`;
}

export const employees: EmployeeNode[] = [
  // ── CEO ──────────────────────────────────────────────────────────────────
  { id: "1", parentId: null, firstName: "Sarah", lastName: "Chen", displayName: "Sarah Chen", email: "sarah.chen@company.com", jobTitle: "Chief Executive Officer", department: "Executive", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Sarah Chen") },

  // ── VPs ──────────────────────────────────────────────────────────────────
  { id: "2", parentId: "1", firstName: "James", lastName: "Patel", displayName: "James Patel", email: "james.patel@company.com", jobTitle: "VP Engineering", department: "Engineering", officeLocation: "San Francisco", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("James Patel") },
  { id: "3", parentId: "1", firstName: "Priya", lastName: "Nair", displayName: "Priya Nair", email: "priya.nair@company.com", jobTitle: "VP Sales", department: "Sales", officeLocation: "Chicago", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Priya Nair") },
  { id: "4", parentId: "1", firstName: "Marcus", lastName: "Williams", displayName: "Marcus Williams", email: "marcus.williams@company.com", jobTitle: "VP Human Resources", department: "HR", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Marcus Williams") },
  { id: "5", parentId: "1", firstName: "Elena", lastName: "Russo", displayName: "Elena Russo", email: "elena.russo@company.com", jobTitle: "VP Operations", department: "Operations", officeLocation: "Austin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Elena Russo") },

  // ── Engineering Managers ─────────────────────────────────────────────────
  { id: "10", parentId: "2", firstName: "Kevin", lastName: "Zhang", displayName: "Kevin Zhang", email: "kevin.zhang@company.com", jobTitle: "Engineering Manager — Frontend", department: "Engineering", officeLocation: "San Francisco", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Kevin Zhang") },
  { id: "11", parentId: "2", firstName: "Ananya", lastName: "Sharma", displayName: "Ananya Sharma", email: "ananya.sharma@company.com", jobTitle: "Engineering Manager — Backend", department: "Engineering", officeLocation: "Remote", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Ananya Sharma") },
  { id: "12", parentId: "2", firstName: "Liam", lastName: "O'Brien", displayName: "Liam O'Brien", email: "liam.obrien@company.com", jobTitle: "Engineering Manager — DevOps", department: "Engineering", officeLocation: "Dublin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Liam OBrien") },

  // ── Frontend ICs ─────────────────────────────────────────────────────────
  { id: "20", parentId: "10", firstName: "Zara", lastName: "Ali", displayName: "Zara Ali", email: "zara.ali@company.com", jobTitle: "Senior Frontend Engineer", department: "Engineering", officeLocation: "San Francisco", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Zara Ali") },
  { id: "21", parentId: "10", firstName: "Tyler", lastName: "Brooks", displayName: "Tyler Brooks", email: "tyler.brooks@company.com", jobTitle: "Frontend Engineer", department: "Engineering", officeLocation: "Remote", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Tyler Brooks") },
  { id: "22", parentId: "10", firstName: "Mei", lastName: "Lin", displayName: "Mei Lin", email: "mei.lin@company.com", jobTitle: "Frontend Engineer", department: "Engineering", officeLocation: "San Francisco", employmentType: "CONTRACTOR", status: "ACTIVE", profileImageUrl: avatar("Mei Lin") },
  { id: "23", parentId: "10", firstName: "Omar", lastName: "Hassan", displayName: "Omar Hassan", email: "omar.hassan@company.com", jobTitle: "Junior Frontend Engineer", department: "Engineering", officeLocation: "Remote", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Omar Hassan") },

  // ── Backend ICs ──────────────────────────────────────────────────────────
  { id: "24", parentId: "11", firstName: "Sofia", lastName: "Mendez", displayName: "Sofia Mendez", email: "sofia.mendez@company.com", jobTitle: "Senior Backend Engineer", department: "Engineering", officeLocation: "Austin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Sofia Mendez") },
  { id: "25", parentId: "11", firstName: "Rahul", lastName: "Kapoor", displayName: "Rahul Kapoor", email: "rahul.kapoor@company.com", jobTitle: "Backend Engineer", department: "Engineering", officeLocation: "Remote", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Rahul Kapoor") },
  { id: "26", parentId: "11", firstName: "Aisha", lastName: "Thompson", displayName: "Aisha Thompson", email: "aisha.thompson@company.com", jobTitle: "Backend Engineer", department: "Engineering", officeLocation: "New York", employmentType: "FULL_TIME", status: "INACTIVE", profileImageUrl: avatar("Aisha Thompson") },
  { id: "27", parentId: "11", firstName: "Ben", lastName: "Carter", displayName: "Ben Carter", email: "ben.carter@company.com", jobTitle: "Database Engineer", department: "Engineering", officeLocation: "Chicago", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Ben Carter") },

  // ── DevOps ICs ───────────────────────────────────────────────────────────
  { id: "28", parentId: "12", firstName: "Nadia", lastName: "Ivanova", displayName: "Nadia Ivanova", email: "nadia.ivanova@company.com", jobTitle: "Senior DevOps Engineer", department: "Engineering", officeLocation: "Dublin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Nadia Ivanova") },
  { id: "29", parentId: "12", firstName: "Carlos", lastName: "Reyes", displayName: "Carlos Reyes", email: "carlos.reyes@company.com", jobTitle: "DevOps Engineer", department: "Engineering", officeLocation: "Remote", employmentType: "CONTRACTOR", status: "ACTIVE", profileImageUrl: avatar("Carlos Reyes") },
  { id: "30", parentId: "12", firstName: "Hannah", lastName: "Park", displayName: "Hannah Park", email: "hannah.park@company.com", jobTitle: "Site Reliability Engineer", department: "Engineering", officeLocation: "San Francisco", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Hannah Park") },

  // ── Sales Managers ───────────────────────────────────────────────────────
  { id: "13", parentId: "3", firstName: "David", lastName: "Kim", displayName: "David Kim", email: "david.kim@company.com", jobTitle: "Sales Manager — Enterprise", department: "Sales", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("David Kim") },
  { id: "14", parentId: "3", firstName: "Fatima", lastName: "Al-Rashid", displayName: "Fatima Al-Rashid", email: "fatima.alrashid@company.com", jobTitle: "Sales Manager — SMB", department: "Sales", officeLocation: "Chicago", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Fatima AlRashid") },

  // ── Enterprise Sales ICs ─────────────────────────────────────────────────
  { id: "31", parentId: "13", firstName: "Jake", lastName: "Morrison", displayName: "Jake Morrison", email: "jake.morrison@company.com", jobTitle: "Enterprise Account Executive", department: "Sales", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Jake Morrison") },
  { id: "32", parentId: "13", firstName: "Leila", lastName: "Hosseini", displayName: "Leila Hosseini", email: "leila.hosseini@company.com", jobTitle: "Enterprise Account Executive", department: "Sales", officeLocation: "Boston", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Leila Hosseini") },
  { id: "33", parentId: "13", firstName: "Tom", lastName: "Sullivan", displayName: "Tom Sullivan", email: "tom.sullivan@company.com", jobTitle: "Sales Engineer", department: "Sales", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Tom Sullivan") },
  { id: "34", parentId: "13", firstName: "Grace", lastName: "Liu", displayName: "Grace Liu", email: "grace.liu@company.com", jobTitle: "Sales Development Rep", department: "Sales", officeLocation: "Remote", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Grace Liu") },

  // ── SMB Sales ICs ────────────────────────────────────────────────────────
  { id: "35", parentId: "14", firstName: "Ethan", lastName: "Ward", displayName: "Ethan Ward", email: "ethan.ward@company.com", jobTitle: "Account Executive", department: "Sales", officeLocation: "Chicago", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Ethan Ward") },
  { id: "36", parentId: "14", firstName: "Yuki", lastName: "Tanaka", displayName: "Yuki Tanaka", email: "yuki.tanaka@company.com", jobTitle: "Account Executive", department: "Sales", officeLocation: "Remote", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Yuki Tanaka") },
  { id: "37", parentId: "14", firstName: "Nina", lastName: "Petrov", displayName: "Nina Petrov", email: "nina.petrov@company.com", jobTitle: "Sales Development Rep", department: "Sales", officeLocation: "Chicago", employmentType: "PART_TIME", status: "ACTIVE", profileImageUrl: avatar("Nina Petrov") },

  // ── HR Managers ──────────────────────────────────────────────────────────
  { id: "15", parentId: "4", firstName: "Rachel", lastName: "Green", displayName: "Rachel Green", email: "rachel.green@company.com", jobTitle: "HR Manager — Talent Acquisition", department: "HR", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Rachel Green") },
  { id: "16", parentId: "4", firstName: "Samuel", lastName: "Okafor", displayName: "Samuel Okafor", email: "samuel.okafor@company.com", jobTitle: "HR Manager — People Ops", department: "HR", officeLocation: "Austin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Samuel Okafor") },

  // ── Talent Acquisition ICs ───────────────────────────────────────────────
  { id: "38", parentId: "15", firstName: "Claire", lastName: "Dubois", displayName: "Claire Dubois", email: "claire.dubois@company.com", jobTitle: "Technical Recruiter", department: "HR", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Claire Dubois") },
  { id: "39", parentId: "15", firstName: "Alex", lastName: "Jordan", displayName: "Alex Jordan", email: "alex.jordan@company.com", jobTitle: "Talent Sourcer", department: "HR", officeLocation: "Remote", employmentType: "PART_TIME", status: "ACTIVE", profileImageUrl: avatar("Alex Jordan") },
  { id: "40", parentId: "15", firstName: "Isabelle", lastName: "Martin", displayName: "Isabelle Martin", email: "isabelle.martin@company.com", jobTitle: "Recruiter", department: "HR", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Isabelle Martin") },

  // ── People Ops ICs ───────────────────────────────────────────────────────
  { id: "41", parentId: "16", firstName: "Marcus", lastName: "Lee", displayName: "Marcus Lee", email: "marcus.lee@company.com", jobTitle: "HR Business Partner", department: "HR", officeLocation: "Austin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Marcus Lee") },
  { id: "42", parentId: "16", firstName: "Preet", lastName: "Sandhu", displayName: "Preet Sandhu", email: "preet.sandhu@company.com", jobTitle: "Learning & Development Specialist", department: "HR", officeLocation: "Remote", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Preet Sandhu") },

  // ── Operations Managers ──────────────────────────────────────────────────
  { id: "17", parentId: "5", firstName: "Victor", lastName: "Santos", displayName: "Victor Santos", email: "victor.santos@company.com", jobTitle: "Operations Manager — Logistics", department: "Operations", officeLocation: "Austin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Victor Santos") },
  { id: "18", parentId: "5", firstName: "Diana", lastName: "Krause", displayName: "Diana Krause", email: "diana.krause@company.com", jobTitle: "Operations Manager — Finance", department: "Operations", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Diana Krause") },
  { id: "19", parentId: "5", firstName: "Ryo", lastName: "Nakamura", displayName: "Ryo Nakamura", email: "ryo.nakamura@company.com", jobTitle: "IT Manager", department: "Operations", officeLocation: "San Francisco", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Ryo Nakamura") },

  // ── Logistics ICs ────────────────────────────────────────────────────────
  { id: "43", parentId: "17", firstName: "Chloe", lastName: "Evans", displayName: "Chloe Evans", email: "chloe.evans@company.com", jobTitle: "Supply Chain Analyst", department: "Operations", officeLocation: "Austin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Chloe Evans") },
  { id: "44", parentId: "17", firstName: "Derek", lastName: "Stone", displayName: "Derek Stone", email: "derek.stone@company.com", jobTitle: "Logistics Coordinator", department: "Operations", officeLocation: "Austin", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Derek Stone") },
  { id: "45", parentId: "17", firstName: "Amara", lastName: "Diallo", displayName: "Amara Diallo", email: "amara.diallo@company.com", jobTitle: "Procurement Specialist", department: "Operations", officeLocation: "Remote", employmentType: "CONTRACTOR", status: "ACTIVE", profileImageUrl: avatar("Amara Diallo") },

  // ── Finance ICs ──────────────────────────────────────────────────────────
  { id: "46", parentId: "18", firstName: "Lucas", lastName: "Müller", displayName: "Lucas Müller", email: "lucas.muller@company.com", jobTitle: "Financial Analyst", department: "Operations", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Lucas Muller") },
  { id: "47", parentId: "18", firstName: "Tanya", lastName: "Ross", displayName: "Tanya Ross", email: "tanya.ross@company.com", jobTitle: "Accountant", department: "Operations", officeLocation: "New York", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Tanya Ross") },
  { id: "48", parentId: "18", firstName: "George", lastName: "Papadopoulos", displayName: "George Papadopoulos", email: "george.p@company.com", jobTitle: "Budget Analyst", department: "Operations", officeLocation: "Chicago", employmentType: "PART_TIME", status: "INACTIVE", profileImageUrl: avatar("George Papadopoulos") },

  // ── IT ICs ───────────────────────────────────────────────────────────────
  { id: "49", parentId: "19", firstName: "Kenji", lastName: "Watanabe", displayName: "Kenji Watanabe", email: "kenji.watanabe@company.com", jobTitle: "Systems Administrator", department: "Operations", officeLocation: "San Francisco", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Kenji Watanabe") },
  { id: "50", parentId: "19", firstName: "Olga", lastName: "Novak", displayName: "Olga Novak", email: "olga.novak@company.com", jobTitle: "IT Support Specialist", department: "Operations", officeLocation: "Remote", employmentType: "FULL_TIME", status: "ACTIVE", profileImageUrl: avatar("Olga Novak") },
];

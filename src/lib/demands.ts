// UI-ONLY MOCK DATA
// Shape mirrors the Prisma schema (Demand + DemandPosition + DemandAttachment + Agency)
// so it can be swapped for a real API response with no component changes.

export type DemandPosition = {
  id: string;
  title: string;
  openings_male: number;
  openings_female: number;
  salary_amount: number;
  salary_currency: string;
};

export type DemandAttachment = {
  id: string;
  file_name: string;
  file_type: string;
  file_path: string;
};

export type Agency = {
  id: string;
  name: string;
  business_address: string;
  phone: string;
  dofe_license_number: string;
  logo_image?: string | null;
};

export type Demand = {
  id: string;
  country: string;
  employer_name: string;
  lt_number: string;
  notes?: string | null;
  status: "open" | "closed";
  date_received: string;
  expiry_date: string;
  application_deadline?: string | null;
  interview_date?: string | null;
  interview_venue?: string | null;
  contract_duration_years?: number | null;
  free_accommodation: boolean;
  free_food: boolean;
  free_medical: boolean;
  free_ticket: boolean;
  insurance_provided: boolean;
  overtime_provided: boolean;
  positions: DemandPosition[];
  attachments: DemandAttachment[];
  agency: Agency;
  // Derived / aggregate values the API should compute server-side
  applicants_count: number;
  josh_count: number;
  created_at: string;
};

const agencies: Agency[] = [
  {
    id: "a1",
    name: "Himalayan Overseas Pvt. Ltd.",
    business_address: "Gaushala, Kathmandu",
    phone: "+977 01-4567890",
    dofe_license_number: "1102/078/079",
  },
  {
    id: "a2",
    name: "Everest Manpower Services",
    business_address: "Chabahil, Kathmandu",
    phone: "+977 01-4412233",
    dofe_license_number: "0987/077/078",
  },
  {
    id: "a3",
    name: "Sagarmatha Employment Hub",
    business_address: "Butwal, Rupandehi",
    phone: "+977 071-540221",
    dofe_license_number: "1345/079/080",
  },
  {
    id: "a4",
    name: "Nepal Gulf Recruiters",
    business_address: "New Baneshwor, Kathmandu",
    phone: "+977 01-4789654",
    dofe_license_number: "1420/079/080",
  },
];

const raw: Array<
  Pick<
    Demand,
    | "country"
    | "employer_name"
    | "lt_number"
    | "notes"
    | "expiry_date"
    | "application_deadline"
    | "interview_date"
    | "interview_venue"
    | "contract_duration_years"
    | "free_accommodation"
    | "free_food"
    | "free_medical"
    | "free_ticket"
    | "insurance_provided"
    | "overtime_provided"
  > & {
    positions: Omit<DemandPosition, "id">[];
    agencyIndex: number;
    applicants_count: number;
    josh_count: number;
    daysAgo: number;
  }
> = [
  {
    country: "Qatar",
    employer_name: "Al Rayyan Facility Management W.L.L.",
    lt_number: "LT-2081-4471",
    notes: "Duty 8 hrs + OT. Company provides uniform and transport.",
    expiry_date: "2026-11-20",
    application_deadline: "2026-10-05",
    interview_date: "2026-10-12",
    interview_venue: "Company Office, Gaushala",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Cleaner", openings_male: 40, openings_female: 10, salary_amount: 1200, salary_currency: "QAR" },
      { title: "Supervisor", openings_male: 4, openings_female: 0, salary_amount: 2200, salary_currency: "QAR" },
    ],
    agencyIndex: 0,
    applicants_count: 284,
    josh_count: 132,
    daysAgo: 1,
  },
  {
    country: "UAE",
    employer_name: "Emirates Star Hospitality LLC",
    lt_number: "LT-2081-3390",
    notes: "Hotel chain in Dubai. Basic English preferred.",
    expiry_date: "2026-12-01",
    application_deadline: "2026-10-18",
    interview_date: "2026-10-22",
    interview_venue: "Hotel Yak & Yeti, Durbar Marg",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: false,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Waiter", openings_male: 25, openings_female: 15, salary_amount: 1400, salary_currency: "AED" },
      { title: "Kitchen Helper", openings_male: 20, openings_female: 5, salary_amount: 1250, salary_currency: "AED" },
      { title: "Housekeeping", openings_male: 10, openings_female: 20, salary_amount: 1300, salary_currency: "AED" },
    ],
    agencyIndex: 1,
    applicants_count: 512,
    josh_count: 341,
    daysAgo: 2,
  },
  {
    country: "Saudi Arabia",
    employer_name: "Riyadh Steel Construction Co.",
    lt_number: "LT-2081-2210",
    notes: "Site work in Riyadh. Experience certificate required.",
    expiry_date: "2026-10-30",
    application_deadline: "2026-09-25",
    interview_date: "2026-09-29",
    interview_venue: "Agency Office, Butwal",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: false,
    overtime_provided: true,
    positions: [
      { title: "Steel Fixer", openings_male: 60, openings_female: 0, salary_amount: 1500, salary_currency: "SAR" },
      { title: "Mason", openings_male: 35, openings_female: 0, salary_amount: 1400, salary_currency: "SAR" },
    ],
    agencyIndex: 2,
    applicants_count: 176,
    josh_count: 88,
    daysAgo: 3,
  },
  {
    country: "Kuwait",
    employer_name: "Gulf Care Medical Services",
    lt_number: "LT-2081-5514",
    notes: "Nursing background preferred, training provided.",
    expiry_date: "2026-11-11",
    application_deadline: "2026-10-01",
    interview_date: null,
    interview_venue: null,
    contract_duration_years: 3,
    free_accommodation: true,
    free_food: false,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: false,
    positions: [
      { title: "Caregiver", openings_male: 5, openings_female: 45, salary_amount: 180, salary_currency: "KWD" },
    ],
    agencyIndex: 3,
    applicants_count: 97,
    josh_count: 61,
    daysAgo: 4,
  },
  {
    country: "Malaysia",
    employer_name: "Penang Electronics Sdn. Bhd.",
    lt_number: "LT-2081-1180",
    notes: "Factory production line. Free hostel with wifi.",
    expiry_date: "2026-12-15",
    application_deadline: "2026-10-28",
    interview_date: "2026-11-02",
    interview_venue: "Agency Office, New Baneshwor",
    contract_duration_years: 3,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Production Operator", openings_male: 80, openings_female: 40, salary_amount: 1700, salary_currency: "MYR" },
    ],
    agencyIndex: 1,
    applicants_count: 631,
    josh_count: 402,
    daysAgo: 5,
  },
  {
    country: "Qatar",
    employer_name: "Doha Logistics & Transport",
    lt_number: "LT-2081-7702",
    notes: "Valid heavy licence mandatory (Nepal or Gulf).",
    expiry_date: "2026-10-05",
    application_deadline: "2026-09-15",
    interview_date: "2026-09-18",
    interview_venue: "Agency Office, Gaushala",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: false,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Heavy Driver", openings_male: 30, openings_female: 0, salary_amount: 2000, salary_currency: "QAR" },
      { title: "Light Driver", openings_male: 15, openings_female: 0, salary_amount: 1600, salary_currency: "QAR" },
    ],
    agencyIndex: 0,
    applicants_count: 210,
    josh_count: 145,
    daysAgo: 6,
  },
  {
    country: "UAE",
    employer_name: "Abu Dhabi Security Group",
    lt_number: "LT-2081-6621",
    notes: "Height 5'6\"+ required. Ex-army preferred.",
    expiry_date: "2026-11-28",
    application_deadline: "2026-10-14",
    interview_date: "2026-10-20",
    interview_venue: "Agency Office, Chabahil",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Security Guard", openings_male: 100, openings_female: 0, salary_amount: 1500, salary_currency: "AED" },
    ],
    agencyIndex: 1,
    applicants_count: 389,
    josh_count: 233,
    daysAgo: 7,
  },
  {
    country: "Saudi Arabia",
    employer_name: "Jeddah Fresh Foods Company",
    lt_number: "LT-2081-8830",
    notes: "Bakery and packing department.",
    expiry_date: "2026-12-20",
    application_deadline: "2026-11-05",
    interview_date: null,
    interview_venue: null,
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: false,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Baker", openings_male: 12, openings_female: 0, salary_amount: 1600, salary_currency: "SAR" },
      { title: "Packing Helper", openings_male: 30, openings_female: 20, salary_amount: 1200, salary_currency: "SAR" },
    ],
    agencyIndex: 2,
    applicants_count: 143,
    josh_count: 74,
    daysAgo: 8,
  },
  {
    country: "Bahrain",
    employer_name: "Manama Retail Group",
    lt_number: "LT-2081-9911",
    notes: "Shopping mall outlets, 6 days duty.",
    expiry_date: "2026-11-02",
    application_deadline: "2026-09-30",
    interview_date: "2026-10-04",
    interview_venue: "Agency Office, New Baneshwor",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: false,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: false,
    positions: [
      { title: "Sales Assistant", openings_male: 10, openings_female: 18, salary_amount: 180, salary_currency: "BHD" },
    ],
    agencyIndex: 3,
    applicants_count: 88,
    josh_count: 39,
    daysAgo: 9,
  },
  {
    country: "Oman",
    employer_name: "Muscat Marine Works LLC",
    lt_number: "LT-2081-4402",
    notes: "Welding test will be taken at interview.",
    expiry_date: "2026-12-08",
    application_deadline: "2026-10-25",
    interview_date: "2026-10-30",
    interview_venue: "Agency Office, Butwal",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Welder (6G)", openings_male: 25, openings_female: 0, salary_amount: 220, salary_currency: "OMR" },
      { title: "Helper", openings_male: 40, openings_female: 0, salary_amount: 120, salary_currency: "OMR" },
    ],
    agencyIndex: 2,
    applicants_count: 121,
    josh_count: 66,
    daysAgo: 10,
  },
  {
    country: "Qatar",
    employer_name: "Lusail Hospitality Services",
    lt_number: "LT-2081-3311",
    notes: "Stadium and event catering support staff.",
    expiry_date: "2026-11-18",
    application_deadline: "2026-10-08",
    interview_date: "2026-10-15",
    interview_venue: "Agency Office, Gaushala",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Steward", openings_male: 45, openings_female: 15, salary_amount: 1300, salary_currency: "QAR" },
    ],
    agencyIndex: 0,
    applicants_count: 265,
    josh_count: 158,
    daysAgo: 11,
  },
  {
    country: "Malaysia",
    employer_name: "Johor Palm Industries Bhd.",
    lt_number: "LT-2081-2244",
    notes: "Plantation and processing unit.",
    expiry_date: "2026-12-25",
    application_deadline: "2026-11-12",
    interview_date: null,
    interview_venue: null,
    contract_duration_years: 3,
    free_accommodation: true,
    free_food: false,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "General Worker", openings_male: 120, openings_female: 0, salary_amount: 1600, salary_currency: "MYR" },
    ],
    agencyIndex: 3,
    applicants_count: 402,
    josh_count: 219,
    daysAgo: 12,
  },
  {
    country: "UAE",
    employer_name: "Sharjah Auto Care Center",
    lt_number: "LT-2081-5090",
    notes: "Vehicle servicing workshop, tools provided.",
    expiry_date: "2026-11-09",
    application_deadline: "2026-10-02",
    interview_date: "2026-10-06",
    interview_venue: "Agency Office, Chabahil",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Auto Mechanic", openings_male: 18, openings_female: 0, salary_amount: 1800, salary_currency: "AED" },
      { title: "Car Washer", openings_male: 22, openings_female: 0, salary_amount: 1100, salary_currency: "AED" },
    ],
    agencyIndex: 1,
    applicants_count: 154,
    josh_count: 71,
    daysAgo: 13,
  },
  {
    country: "Kuwait",
    employer_name: "Al Salam Cleaning Contracting",
    lt_number: "LT-2081-6003",
    notes: "Duty in government buildings.",
    expiry_date: "2026-10-28",
    application_deadline: "2026-09-20",
    interview_date: "2026-09-24",
    interview_venue: "Agency Office, New Baneshwor",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: false,
    overtime_provided: true,
    positions: [
      { title: "Cleaner", openings_male: 55, openings_female: 25, salary_amount: 100, salary_currency: "KWD" },
    ],
    agencyIndex: 3,
    applicants_count: 318,
    josh_count: 129,
    daysAgo: 14,
  },
  {
    country: "Saudi Arabia",
    employer_name: "Dammam Cold Storage Co.",
    lt_number: "LT-2081-7345",
    notes: "Forklift licence holders get priority.",
    expiry_date: "2026-12-12",
    application_deadline: "2026-11-01",
    interview_date: "2026-11-06",
    interview_venue: "Agency Office, Butwal",
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: true,
    positions: [
      { title: "Warehouse Helper", openings_male: 40, openings_female: 0, salary_amount: 1300, salary_currency: "SAR" },
      { title: "Forklift Operator", openings_male: 10, openings_female: 0, salary_amount: 1700, salary_currency: "SAR" },
    ],
    agencyIndex: 2,
    applicants_count: 199,
    josh_count: 103,
    daysAgo: 15,
  },
  {
    country: "Oman",
    employer_name: "Salalah Green Landscaping",
    lt_number: "LT-2081-8112",
    notes: "Garden and municipality maintenance work.",
    expiry_date: "2026-11-25",
    application_deadline: "2026-10-16",
    interview_date: null,
    interview_venue: null,
    contract_duration_years: 2,
    free_accommodation: true,
    free_food: true,
    free_medical: true,
    free_ticket: true,
    insurance_provided: true,
    overtime_provided: false,
    positions: [
      { title: "Gardener", openings_male: 35, openings_female: 0, salary_amount: 130, salary_currency: "OMR" },
    ],
    agencyIndex: 0,
    applicants_count: 76,
    josh_count: 42,
    daysAgo: 16,
  },
];

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export const demands: Demand[] = raw.map((r, i) => ({
  id: `d${i + 1}`,
  country: r.country,
  employer_name: r.employer_name,
  lt_number: r.lt_number,
  notes: r.notes,
  status: "open",
  date_received: isoDaysAgo(r.daysAgo + 2),
  expiry_date: r.expiry_date,
  application_deadline: r.application_deadline,
  interview_date: r.interview_date,
  interview_venue: r.interview_venue,
  contract_duration_years: r.contract_duration_years,
  free_accommodation: r.free_accommodation,
  free_food: r.free_food,
  free_medical: r.free_medical,
  free_ticket: r.free_ticket,
  insurance_provided: r.insurance_provided,
  overtime_provided: r.overtime_provided,
  positions: r.positions.map((p, j) => ({ ...p, id: `d${i + 1}p${j + 1}` })),
  attachments: [
    {
      id: `d${i + 1}a1`,
      file_name: `demand-letter-${r.lt_number}.jpg`,
      file_type: "image/jpeg",
      file_path: "demand-letter",
    },
  ],
  agency: agencies[r.agencyIndex],
  applicants_count: r.applicants_count,
  josh_count: r.josh_count,
  created_at: isoDaysAgo(r.daysAgo),
}));

export const countries = ["All", ...Array.from(new Set(demands.map((d) => d.country)))];

/* ---------- display helpers ---------- */

export function totalOpenings(d: Demand) {
  return d.positions.reduce((s, p) => s + p.openings_male + p.openings_female, 0);
}

export function salaryRange(d: Demand) {
  const currency = d.positions[0]?.salary_currency ?? "";
  const amounts = d.positions.map((p) => Number(p.salary_amount));
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  const fmt = (n: number) => n.toLocaleString("en-US");
  return min === max ? `${currency} ${fmt(min)}` : `${currency} ${fmt(min)} – ${fmt(max)}`;
}

export function benefits(d: Demand) {
  return [
    d.free_food && "Free food",
    d.free_accommodation && "Free accommodation",
    d.free_ticket && "Free ticket",
    d.free_medical && "Free medical",
    d.insurance_provided && "Insurance",
    d.overtime_provided && "Overtime",
  ].filter(Boolean) as string[];
}

export function daysLeft(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / 86_400_000);
}

export function formatDate(dateStr?: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(dateStr: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(dateStr).getTime()) / 86_400_000));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}

export function getDemand(id: string) {
  return demands.find((d) => d.id === id);
}

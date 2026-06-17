import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CategoryKey =
  | "parent_birthday"
  | "family_gathering"
  | "anniversary"
  | "health_checkup"
  | "gift_preparation"
  | "custom";

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  parent_birthday: "부모님 생신",
  family_gathering: "가족 모임",
  anniversary: "기념일",
  health_checkup: "건강검진",
  gift_preparation: "선물 준비",
  custom: "기타",
};

export type TaskStatus =
  | "preparing"
  | "waiting_family_confirmation"
  | "choosing_date"
  | "assigning_roles"
  | "completed"
  | "paused";

export const STATUS_LABEL: Record<TaskStatus, string> = {
  preparing: "준비 중",
  waiting_family_confirmation: "가족 확인 대기",
  choosing_date: "날짜 선택 중",
  assigning_roles: "맡을 사람 정하는 중",
  completed: "완료",
  paused: "잠시 멈춤",
};

export interface FamilyMember {
  id: string;
  name: string;
  relation: "self" | "mother" | "father" | "sibling" | "spouse" | "other";
  role: "admin" | "parent" | "co_manage";
  simpleMode: boolean;
}

export interface DateOption {
  id: string;
  label: string; // e.g. "6월 22일 일요일 점심"
}

export interface DateResponse {
  optionId: string;
  memberId: string;
  response: "yes" | "no" | "later";
}

export interface ChecklistItem {
  id: string;
  text: string;
  assigneeId?: string;
  done: boolean;
}

export interface Confirmation {
  memberId: string;
  status: "pending" | "confirmed" | "later";
  comment?: string;
}

export interface Comment {
  id: string;
  memberId: string;
  text: string;
  createdAt: number;
}

export interface FamilyTask {
  id: string;
  title: string;
  category: CategoryKey;
  targetMemberIds: string[];
  ownerMemberIds: string[];
  dueDate?: string; // ISO
  confirmedDate?: string;
  status: TaskStatus;
  dateOptions: DateOption[];
  dateResponses: DateResponse[];
  checklist: ChecklistItem[];
  confirmations: Confirmation[];
  comments: Comment[];
  createdAt: number;
  completedAt?: number;
  shareToken: string;
}

interface FamilitState {
  familyName: string;
  members: FamilyMember[];
  tasks: FamilyTask[];
  onboardingPick?: CategoryKey;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;

  setFamilyName: (n: string) => void;
  setMembers: (m: FamilyMember[]) => void;
  setOnboardingPick: (k?: CategoryKey) => void;

  addTask: (t: Omit<FamilyTask, "id" | "createdAt" | "shareToken">) => string;
  updateTask: (id: string, patch: Partial<FamilyTask>) => void;
  removeTask: (id: string) => void;

  addDateOption: (taskId: string, label: string) => void;
  setDateResponse: (taskId: string, optionId: string, memberId: string, response: DateResponse["response"]) => void;
  confirmDate: (taskId: string, label: string) => void;

  toggleChecklist: (taskId: string, itemId: string) => void;
  setChecklistAssignee: (taskId: string, itemId: string, memberId?: string) => void;
  addChecklistItem: (taskId: string, text: string) => void;
  setChecklist: (taskId: string, items: ChecklistItem[]) => void;

  setConfirmation: (taskId: string, memberId: string, status: Confirmation["status"], comment?: string) => void;
  requestConfirmations: (taskId: string) => void;

  addComment: (taskId: string, memberId: string, text: string) => void;

  completeTask: (taskId: string) => void;
  reset: () => void;
  seedIfEmpty: () => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);
const token = () => Math.random().toString(36).slice(2, 12);

export const AI_TEMPLATES: Record<CategoryKey, string[]> = {
  parent_birthday: [
    "선물 후보 정하기",
    "가족 의견 받기",
    "식사 장소 정하기",
    "케이크 준비하기",
    "부모님께 일정 확인하기",
  ],
  family_gathering: [
    "가능한 날짜 모으기",
    "장소 후보 정하기",
    "식당 후보 정하기",
    "예약할 사람 정하기",
    "확정 일정 공유하기",
  ],
  anniversary: [
    "기념일 날짜 확인하기",
    "선물 또는 식사 준비하기",
    "가족 메시지 정하기",
    "방문 일정 확인하기",
    "완료 여부 남기기",
  ],
  health_checkup: [
    "검진 날짜 확인하기",
    "예약 여부 확인하기",
    "준비사항 확인하기",
    "부모님께 일정 공유하기",
    "결과 확인 날짜 남기기",
  ],
  gift_preparation: [
    "선물 후보 정하기",
    "예산 정하기",
    "가족 의견 받기",
    "주문 또는 구매하기",
    "전달 방법 정하기",
  ],
  custom: [
    "필요한 일 정리하기",
    "맡을 사람 정하기",
    "가족 확인 받기",
    "완료 여부 남기기",
  ],
};

const defaultMembers = (): FamilyMember[] => [
  { id: "m_self", name: "나", relation: "self", role: "admin", simpleMode: false },
  { id: "m_mom", name: "엄마", relation: "mother", role: "parent", simpleMode: true },
  { id: "m_dad", name: "아빠", relation: "father", role: "parent", simpleMode: true },
  { id: "m_sib", name: "동생", relation: "sibling", role: "co_manage", simpleMode: false },
];

const seedTasks = (): FamilyTask[] => {
  const now = Date.now();
  const day = 86400000;
  const makeChecklist = (cat: CategoryKey): ChecklistItem[] =>
    AI_TEMPLATES[cat].map((text, i) => ({
      id: uid(),
      text,
      assigneeId: i === 0 ? "m_self" : undefined,
      done: false,
    }));
  return [
    {
      id: uid(),
      title: "엄마 생신 준비하기",
      category: "parent_birthday",
      targetMemberIds: ["m_mom"],
      ownerMemberIds: ["m_self", "m_sib"],
      dueDate: new Date(now + day * 21).toISOString(),
      status: "waiting_family_confirmation",
      dateOptions: [
        { id: uid(), label: "7월 12일 토요일 점심" },
        { id: uid(), label: "7월 13일 일요일 저녁" },
      ],
      dateResponses: [],
      checklist: makeChecklist("parent_birthday"),
      confirmations: [
        { memberId: "m_self", status: "confirmed" },
        { memberId: "m_mom", status: "confirmed" },
        { memberId: "m_dad", status: "pending" },
        { memberId: "m_sib", status: "confirmed" },
      ],
      comments: [
        { id: uid(), memberId: "m_sib", text: "식사는 집 근처가 좋을 것 같아.", createdAt: now },
      ],
      createdAt: now,
      shareToken: token(),
    },
    {
      id: uid(),
      title: "가족 식사 날짜 정하기",
      category: "family_gathering",
      targetMemberIds: ["m_mom", "m_dad"],
      ownerMemberIds: ["m_self"],
      dueDate: new Date(now + day * 5).toISOString(),
      status: "choosing_date",
      dateOptions: [
        { id: uid(), label: "6월 22일 일요일 점심" },
        { id: uid(), label: "6월 28일 토요일 점심" },
        { id: uid(), label: "6월 29일 일요일 저녁" },
      ],
      dateResponses: [],
      checklist: makeChecklist("family_gathering"),
      confirmations: [
        { memberId: "m_self", status: "confirmed" },
        { memberId: "m_mom", status: "confirmed" },
        { memberId: "m_dad", status: "confirmed" },
        { memberId: "m_sib", status: "pending" },
      ],
      comments: [],
      createdAt: now,
      shareToken: token(),
    },
    {
      id: uid(),
      title: "부모님 건강검진 예약 확인하기",
      category: "health_checkup",
      targetMemberIds: ["m_mom", "m_dad"],
      ownerMemberIds: ["m_self"],
      dueDate: new Date(now + day * 7).toISOString(),
      status: "preparing",
      dateOptions: [],
      dateResponses: [],
      checklist: makeChecklist("health_checkup"),
      confirmations: [],
      comments: [],
      createdAt: now,
      shareToken: token(),
    },
    {
      id: uid(),
      title: "어버이날 선물 준비하기",
      category: "gift_preparation",
      targetMemberIds: ["m_mom", "m_dad"],
      ownerMemberIds: [],
      dueDate: new Date(now + day * 14).toISOString(),
      status: "assigning_roles",
      dateOptions: [],
      dateResponses: [],
      checklist: makeChecklist("gift_preparation"),
      confirmations: [],
      comments: [],
      createdAt: now,
      shareToken: token(),
    },
  ];
};

export const useFamilit = create<FamilitState>()(
  persist(
    (set, get) => ({
      familyName: "우리 가족",
      members: defaultMembers(),
      tasks: [],
      onboardingPick: undefined,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),

      setFamilyName: (familyName) => set({ familyName }),
      setMembers: (members) => set({ members }),
      setOnboardingPick: (onboardingPick) => set({ onboardingPick }),

      addTask: (t) => {
        const id = uid();
        const task: FamilyTask = { ...t, id, createdAt: Date.now(), shareToken: token() };
        set({ tasks: [task, ...get().tasks] });
        return id;
      },
      updateTask: (id, patch) =>
        set({ tasks: get().tasks.map((x) => (x.id === id ? { ...x, ...patch } : x)) }),
      removeTask: (id) => set({ tasks: get().tasks.filter((x) => x.id !== id) }),

      addDateOption: (taskId, label) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === taskId
              ? { ...t, dateOptions: [...t.dateOptions, { id: uid(), label }] }
              : t,
          ),
        }),
      setDateResponse: (taskId, optionId, memberId, response) =>
        set({
          tasks: get().tasks.map((t) => {
            if (t.id !== taskId) return t;
            const others = t.dateResponses.filter(
              (r) => !(r.optionId === optionId && r.memberId === memberId),
            );
            return { ...t, dateResponses: [...others, { optionId, memberId, response }] };
          }),
        }),
      confirmDate: (taskId, label) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === taskId ? { ...t, confirmedDate: label, status: "preparing" } : t,
          ),
        }),

      toggleChecklist: (taskId, itemId) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  checklist: t.checklist.map((c) =>
                    c.id === itemId ? { ...c, done: !c.done } : c,
                  ),
                }
              : t,
          ),
        }),
      setChecklistAssignee: (taskId, itemId, memberId) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  checklist: t.checklist.map((c) =>
                    c.id === itemId ? { ...c, assigneeId: memberId } : c,
                  ),
                }
              : t,
          ),
        }),
      addChecklistItem: (taskId, text) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === taskId
              ? { ...t, checklist: [...t.checklist, { id: uid(), text, done: false }] }
              : t,
          ),
        }),
      setChecklist: (taskId, items) =>
        set({
          tasks: get().tasks.map((t) => (t.id === taskId ? { ...t, checklist: items } : t)),
        }),

      setConfirmation: (taskId, memberId, status, comment) =>
        set({
          tasks: get().tasks.map((t) => {
            if (t.id !== taskId) return t;
            const others = t.confirmations.filter((c) => c.memberId !== memberId);
            return { ...t, confirmations: [...others, { memberId, status, comment }] };
          }),
        }),
      requestConfirmations: (taskId) =>
        set({
          tasks: get().tasks.map((t) => {
            if (t.id !== taskId) return t;
            const conf = get().members.map<Confirmation>((m) => {
              const existing = t.confirmations.find((c) => c.memberId === m.id);
              return existing ?? { memberId: m.id, status: "pending" };
            });
            return { ...t, confirmations: conf, status: "waiting_family_confirmation" };
          }),
        }),

      addComment: (taskId, memberId, text) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  comments: [
                    ...t.comments,
                    { id: uid(), memberId, text, createdAt: Date.now() },
                  ],
                }
              : t,
          ),
        }),

      completeTask: (taskId) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: "completed", completedAt: Date.now() }
              : t,
          ),
        }),

      reset: () =>
        set({
          familyName: "우리 가족",
          members: defaultMembers(),
          tasks: [],
          onboardingPick: undefined,
        }),
      seedIfEmpty: () => {
        if (get().tasks.length === 0) {
          set({ tasks: seedTasks() });
        }
      },
    }),
    {
      name: "familit-v2",
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);

export function dDay(dueIso?: string): string {
  if (!dueIso) return "";
  const due = new Date(dueIso);
  due.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((due.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return "오늘";
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

export function shareTokenToTask(token: string) {
  return useFamilit.getState().tasks.find((t) => t.shareToken === token);
}

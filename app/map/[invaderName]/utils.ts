import { Invader } from "@/db";

export const InvaderEditableKeys: Array<{
  value: keyof Invader;
  label: string;
}> = [
  { value: "state", label: "current state" },
  { value: "create_date", label: "creation date" },
  { value: "points", label: "points earned" },
];

export const InvaderEditResponseState = {
  errors: [],
  success: false,
};

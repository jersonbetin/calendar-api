import { UserWithoutPassword } from "./users.interface";

export interface Event {
  id?: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  user?: UserWithoutPassword;
}

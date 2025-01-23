export type Ship = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  portOfOrigin: string;
  status: "Available" | "Maintenance" | "Docked" | "In Transit";
};

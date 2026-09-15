export type Role = 'groomer' | 'owner';

export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed: string;
  age: number;
  weight: number;
  ownerName: string;
  ownerPhone: string;
  medicalHistory: string;
  condition: string;
  avatarUrl: string;
}

export interface Appointment {
  id: string;
  petId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  service: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  price?: number;
}

export interface GroomingRecord {
  id: string;
  petId: string;
  date: string;
  services: string[];
  conditionNotes: string;
  groomerId: string;
  photos?: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'shampoo' | 'conditioner' | 'tool' | 'treat' | 'other';
  stock: number;
  threshold: number;
  unit: string;
  expiryDate?: string;
  imageUrl?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'reminder' | 'alert' | 'info';
}

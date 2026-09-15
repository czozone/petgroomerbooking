import { Pet, Appointment, GroomingRecord, InventoryItem, Notification } from './types';
import { addDays, format, subDays } from 'date-fns';

const today = new Date();

export const mockPets: Pet[] = [
  {
    id: 'p1',
    name: '毛毛 (MaoMao)',
    species: 'dog',
    breed: '貴賓犬 (Poodle)',
    age: 3,
    weight: 4.5,
    ownerName: '王大明',
    ownerPhone: '0912-345-678',
    medicalHistory: '對某些除蚤藥劑過敏、輕微關節炎',
    condition: '皮膚偏乾燥，建議使用保濕洗毛精。',
    avatarUrl: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'p2',
    name: '橘子 (Orange)',
    species: 'cat',
    breed: '米克斯 (Mixed)',
    age: 2,
    weight: 5.2,
    ownerName: '林小美',
    ownerPhone: '0922-111-222',
    medicalHistory: '無特殊病史',
    condition: '容易緊張，需要安靜的環境。',
    avatarUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'p3',
    name: '布丁 (Pudding)',
    species: 'dog',
    breed: '黃金獵犬 (Golden Retriever)',
    age: 5,
    weight: 28,
    ownerName: '陳建國',
    ownerPhone: '0933-444-555',
    medicalHistory: '曾經有過耳朵發炎',
    condition: '換毛季掉毛嚴重，需要深層除廢毛。',
    avatarUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    petId: 'p1',
    date: format(today, 'yyyy-MM-dd'),
    time: '10:00',
    service: '洗澡 + 小修',
    status: 'scheduled',
    notes: '主人希望留頭型',
    price: 800
  },
  {
    id: 'a2',
    petId: 'p2',
    date: format(today, 'yyyy-MM-dd'),
    time: '13:30',
    service: '純洗澡 + 剪指甲',
    status: 'scheduled',
    notes: '貓咪易怒，請小心操作',
    price: 600
  },
  {
    id: 'a3',
    petId: 'p3',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: '15:00',
    service: '大美容 (全身造型)',
    status: 'scheduled',
    notes: '',
    price: 1500
  },
  {
    id: 'a4',
    petId: 'p1',
    date: format(subDays(today, 30), 'yyyy-MM-dd'),
    time: '10:00',
    service: '洗澡',
    status: 'completed',
    price: 600
  }
];

export const mockRecords: GroomingRecord[] = [
  {
    id: 'r1',
    petId: 'p1',
    date: format(subDays(today, 30), 'yyyy-MM-dd'),
    services: ['洗澡', '剪指甲', '清耳朵'],
    conditionNotes: '耳朵裡面有點紅，已請主人帶去看醫生。皮膚狀況尚可。',
    groomerId: 'g1'
  },
  {
    id: 'r2',
    petId: 'p2',
    date: format(subDays(today, 45), 'yyyy-MM-dd'),
    services: ['洗澡', '除蚤'],
    conditionNotes: '表現良好，只是吹水機會稍微掙扎。',
    groomerId: 'g1'
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'i1',
    name: '低敏保濕洗毛精 (4L)',
    category: 'shampoo',
    stock: 2,
    threshold: 3,
    unit: '桶',
    expiryDate: '2027-01-01',
    imageUrl: 'https://images.unsplash.com/photo-1583947581924-860bda6a5c13?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'i2',
    name: '除蚤洗劑 (1L)',
    category: 'shampoo',
    stock: 5,
    threshold: 2,
    unit: '瓶',
    expiryDate: '2026-11-15',
    imageUrl: 'https://images.unsplash.com/photo-1626808642875-0aa54525ce6e?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'i3',
    name: '清耳液',
    category: 'tool',
    stock: 1,
    threshold: 5,
    unit: '瓶',
    expiryDate: format(addDays(today, 10), 'yyyy-MM-dd'),
    imageUrl: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const mockOwnerNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'owner1',
    title: '預約提醒 📅',
    message: '您好，毛毛的美容預約在明天早上 10:00，請記得準時報到喔！',
    date: format(today, 'yyyy-MM-dd HH:mm'),
    read: false,
    type: 'reminder'
  },
  {
    id: 'n2',
    userId: 'owner1',
    title: '美容完成 🛁',
    message: '毛毛已經洗好澡囉！非常香噴噴，您可以準備過來接他了。',
    date: format(subDays(today, 30), 'yyyy-MM-dd 11:30'),
    read: true,
    type: 'info'
  }
]

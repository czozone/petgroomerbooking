import React, { useState } from 'react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { OverviewTab } from '@/src/components/groomer/OverviewTab';
import { CalendarTab } from '@/src/components/groomer/CalendarTab';
import { PetsTab } from '@/src/components/groomer/PetsTab';
import { StoreTab } from '@/src/components/groomer/StoreTab';
import { LiffSimulator } from '@/src/components/owner/LiffSimulator';
import { mockInventory } from '@/src/data';
import { InventoryItem } from '@/src/types';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isOwnerView, setIsOwnerView] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);

  if (isOwnerView) {
    return <LiffSimulator onBack={() => setIsOwnerView(false)} />;
  }

  return (
    <AppLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      onRoleChange={() => setIsOwnerView(true)}
    >
      {activeTab === 'overview' && <OverviewTab inventory={inventory} />}
      {activeTab === 'calendar' && <CalendarTab />}
      {activeTab === 'pets' && <PetsTab />}
      {activeTab === 'store' && <StoreTab inventory={inventory} setInventory={setInventory} />}
    </AppLayout>
  );
}

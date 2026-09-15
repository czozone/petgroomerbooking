import React, { useState } from 'react';
import { mockPets, mockRecords } from '@/src/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Search, History, HeartPulse, User } from 'lucide-react';

export function PetsTab() {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  
  const selectedPet = selectedPetId ? mockPets.find(p => p.id === selectedPetId) : null;
  const petRecords = selectedPetId ? mockRecords.filter(r => r.petId === selectedPetId).sort((a,b) => b.date.localeCompare(a.date)) : [];

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">寵物與病史紀錄</h2>
          <p className="text-stone-500 mt-1">查看客戶資料與過往美容健康紀錄。</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input 
            type="text" 
            placeholder="搜尋寵物或飼主名稱..." 
            className="pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 w-64"
          />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
        {/* List */}
        <Card className="col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="py-4 border-b border-stone-100 bg-stone-50/50">
            <CardTitle className="text-lg">客戶列表</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="divide-y divide-stone-100">
              {mockPets.map(pet => (
                <button 
                  key={pet.id} 
                  onClick={() => setSelectedPetId(pet.id)}
                  className={`w-full text-left p-4 flex items-center gap-4 hover:bg-stone-50 transition-colors ${selectedPetId === pet.id ? 'bg-amber-50/50' : ''}`}
                >
                  <img src={pet.avatarUrl} alt={pet.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-stone-900">{pet.name}</div>
                    <div className="text-sm text-stone-500">{pet.breed} • {pet.ownerName}</div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detail */}
        <div className="col-span-1 md:col-span-2 flex flex-col overflow-y-auto space-y-6">
          {selectedPet ? (
            <>
              {/* Pet Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img src={selectedPet.avatarUrl} alt={selectedPet.name} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold text-stone-900">{selectedPet.name}</h3>
                          <p className="text-stone-500">{selectedPet.breed} • {selectedPet.age} 歲 • {selectedPet.weight} kg</p>
                        </div>
                        <Button variant="outline" size="sm">編輯資料</Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-2">
                          <User className="w-5 h-5 text-stone-400 shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-stone-900">{selectedPet.ownerName}</div>
                            <div className="text-sm text-stone-500">{selectedPet.ownerPhone}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <HeartPulse className="w-5 h-5 text-red-400 shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-stone-900">病史與狀況</div>
                            <div className="text-sm text-stone-500">{selectedPet.medicalHistory}</div>
                            <div className="text-sm text-stone-500 mt-1">{selectedPet.condition}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* History */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-stone-400" />
                    歷史清洗紀錄
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {petRecords.length === 0 ? (
                    <div className="text-center py-8 text-stone-500">尚無紀錄</div>
                  ) : (
                    <div className="space-y-4">
                      {petRecords.map(record => (
                        <div key={record.id} className="border border-stone-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold text-stone-900">{record.date}</div>
                            <Badge variant="secondary">美容師: {record.groomerId}</Badge>
                          </div>
                          <div className="flex gap-2 flex-wrap mb-3">
                            {record.services.map(s => (
                              <Badge key={s} variant="outline">{s}</Badge>
                            ))}
                          </div>
                          <div className="text-sm text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-100">
                            <strong>身體狀況筆記：</strong><br/>
                            {record.conditionNotes}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-stone-400 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50">
              請從左側列表選擇一隻寵物以查看詳情
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { mockAppointments, mockPets } from '@/src/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { format, addDays, startOfWeek, parseISO, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export function CalendarTab() {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const days = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

  const getPetName = (petId: string) => mockPets.find(p => p.id === petId)?.name || '未知';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">預約行事曆</h2>
          <p className="text-stone-500 mt-1">管理並查看近期的美容排程。</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          新增預約
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-stone-100">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="font-medium text-lg w-48 text-center">
              {format(currentWeekStart, 'yyyy/MM/dd')} - {format(days[6], 'MM/dd')}
            </div>
            <Button variant="outline" size="icon" onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline">今天</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 divide-x divide-stone-100 min-h-[600px]">
            {days.map((day, i) => {
              const dayAppointments = mockAppointments.filter(a => isSameDay(parseISO(a.date), day));
              const isToday = isSameDay(day, new Date());
              
              return (
                <div key={i} className="flex flex-col">
                  <div className={`p-3 text-center border-b border-stone-100 ${isToday ? 'bg-amber-50' : 'bg-stone-50/50'}`}>
                    <div className="text-xs text-stone-500 font-medium">{format(day, 'EEEE')}</div>
                    <div className={`text-lg font-bold mt-1 ${isToday ? 'text-amber-700' : 'text-stone-900'}`}>
                      {format(day, 'd')}
                    </div>
                  </div>
                  <div className="flex-1 p-2 space-y-2">
                    {dayAppointments.sort((a,b) => a.time.localeCompare(b.time)).map(apt => (
                      <div key={apt.id} className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-sm">
                        <div className="font-semibold text-amber-900">{apt.time}</div>
                        <div className="text-amber-800 truncate">{getPetName(apt.petId)}</div>
                        <div className="text-xs text-amber-700/80 mt-1 truncate">{apt.service}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

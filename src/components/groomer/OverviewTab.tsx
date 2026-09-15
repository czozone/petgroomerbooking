import React from 'react';
import { mockAppointments } from '@/src/data';
import { InventoryItem } from '@/src/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { CalendarClock, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { format, isBefore, addDays, parseISO } from 'date-fns';

export function OverviewTab({ inventory }: { inventory: InventoryItem[] }) {
  const todayAppointments = mockAppointments.filter(
    a => a.date === format(new Date(), 'yyyy-MM-dd')
  );

  const lowStockItems = inventory.filter(
    item => item.stock <= item.threshold
  );

  const expiringItems = inventory.filter(
    item => item.expiryDate && isBefore(parseISO(item.expiryDate), addDays(new Date(), 30))
  );

  const alertItems = [...new Set([...lowStockItems, ...expiringItems])];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-stone-900">早安，美容師！</h2>
        <p className="text-stone-500 mt-1">這裡是您今天的預約與待辦事項總覽。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-amber-50 border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-900 flex items-center gap-2">
              <CalendarClock className="w-5 h-5" />
              今日預約
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-700">{todayAppointments.length}</div>
            <p className="text-amber-600/80 text-sm mt-1">隻毛孩等著洗香香</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              庫存與效期警告
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-700">{alertItems.length}</div>
            <p className="text-red-600/80 text-sm mt-1">項商品需要盡快補貨或汰換</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              本月完成
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-700">42</div>
            <p className="text-emerald-600/80 text-sm mt-1">次完美服務</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>今日行程排班</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <p className="text-stone-500 text-sm">今日目前無預約</p>
              ) : (
                todayAppointments.sort((a,b) => a.time.localeCompare(b.time)).map(apt => (
                  <div key={apt.id} className="flex items-center gap-4 p-3 rounded-xl border border-stone-100 bg-stone-50/50">
                    <div className="w-16 text-center font-semibold text-stone-900">{apt.time}</div>
                    <div className="flex-1 border-l border-stone-200 pl-4">
                      <div className="font-medium">{apt.service}</div>
                      <div className="text-sm text-stone-500">Pet ID: {apt.petId}</div>
                    </div>
                    <Badge variant={apt.status === 'completed' ? 'success' : 'default'}>
                      {apt.status === 'completed' ? '已完成' : '即將到來'}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>庫存與效期警告清單</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertItems.length === 0 ? (
                <p className="text-stone-500 text-sm">庫存充足且無即將過期商品</p>
              ) : (
                alertItems.map(item => {
                  const isLowStock = item.stock <= item.threshold;
                  const isExpiring = item.expiryDate && isBefore(parseISO(item.expiryDate), addDays(new Date(), 30));
                  
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-red-100 bg-red-50/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden shrink-0">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                              <AlertTriangle className="w-5 h-5 text-stone-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-stone-900 line-clamp-1">{item.name}</div>
                          <div className="flex gap-2 mt-1">
                            {isLowStock && (
                              <span className="text-xs text-red-600 bg-red-100/50 px-1.5 py-0.5 rounded font-medium">
                                剩餘 {item.stock} {item.unit}
                              </span>
                            )}
                            {isExpiring && (
                              <span className="text-xs text-amber-700 bg-amber-100/50 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                效期: {item.expiryDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="shrink-0 text-sm font-medium text-amber-600 hover:text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg">
                        一鍵訂購
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

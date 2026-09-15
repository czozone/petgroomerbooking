import React, { useState } from 'react';
import { InventoryItem } from '@/src/types';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { ShoppingCart, Package, Plus, Clock, AlertTriangle, X } from 'lucide-react';
import { isBefore, addDays, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

export function StoreTab({ inventory, setInventory }: { inventory: InventoryItem[], setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>> }) {
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    category: 'shampoo',
    stock: 1,
    threshold: 1,
    unit: '瓶',
    expiryDate: ''
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newItem: InventoryItem = {
      id: `i${Date.now()}`,
      name: formData.name!,
      category: formData.category as InventoryItem['category'],
      stock: Number(formData.stock),
      threshold: Number(formData.threshold),
      unit: formData.unit!,
      expiryDate: formData.expiryDate || undefined,
    };

    setInventory([newItem, ...inventory]);
    setIsAdding(false);
    setFormData({ name: '', category: 'shampoo', stock: 1, threshold: 1, unit: '瓶', expiryDate: '' });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">耗材商城與庫存</h2>
          <p className="text-stone-500 mt-1">管理耗材庫存並直接向供應商下單。</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2" onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4" />
            新增庫存紀錄
          </Button>
          <Button className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            查看購物車
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40"
              onClick={() => setIsAdding(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h3 className="text-xl font-bold text-stone-900">新增耗材紀錄</h3>
                <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">耗材名稱 *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" placeholder="例如: 保濕洗毛精" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">分類</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                      <option value="shampoo">洗毛精 (Shampoo)</option>
                      <option value="conditioner">護髮素 (Conditioner)</option>
                      <option value="tool">工具 (Tool)</option>
                      <option value="treat">零食 (Treat)</option>
                      <option value="other">其他 (Other)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">單位</label>
                    <input type="text" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" placeholder="例如: 桶, 瓶" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">現有庫存</label>
                    <input type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">安全庫存警戒值</label>
                    <input type="number" min="0" value={formData.threshold} onChange={e => setFormData({...formData, threshold: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">有效期限 (選填)</label>
                  <input type="date" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>取消</Button>
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">儲存紀錄</Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map(item => {
          const isLowStock = item.stock <= item.threshold;
          const isExpiring = item.expiryDate && isBefore(parseISO(item.expiryDate), addDays(new Date(), 30));
          const hasWarning = isLowStock || isExpiring;

          return (
            <Card key={item.id} className={hasWarning ? 'border-red-200 shadow-sm' : ''}>
              <div className="h-48 overflow-hidden rounded-t-2xl relative bg-stone-100">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-stone-300" />
                  </div>
                )}
                
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                  {isLowStock && (
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      庫存不足
                    </div>
                  )}
                  {isExpiring && (
                    <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      即將過期
                    </div>
                  )}
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-stone-900 line-clamp-1 pr-2">{item.name}</h3>
                  <Badge variant="outline" className="shrink-0">{item.category}</Badge>
                </div>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between text-stone-500">
                    <span>目前庫存</span>
                    <span className={`font-semibold ${isLowStock ? 'text-red-600 bg-red-50 px-2 py-0.5 rounded' : 'text-stone-900'}`}>
                      {item.stock} {item.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>安全庫存</span>
                    <span>{item.threshold} {item.unit}</span>
                  </div>
                  {item.expiryDate ? (
                    <div className="flex justify-between text-stone-500">
                      <span>有效期限</span>
                      <span className={`font-medium ${isExpiring ? 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded' : 'text-stone-900'}`}>
                        {item.expiryDate}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-stone-500">
                      <span>有效期限</span>
                      <span className="text-stone-400">無紀錄</span>
                    </div>
                  )}
                </div>
                <Button variant={hasWarning ? 'default' : 'secondary'} className={`w-full ${hasWarning ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}`}>
                  {hasWarning ? '立即一鍵補貨' : '加入購物車預定'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

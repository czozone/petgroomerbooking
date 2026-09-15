import React, { useState } from 'react';
import { mockAppointments, mockOwnerNotifications, mockPets } from '@/src/data';
import { format, parseISO, isAfter, isSameDay } from 'date-fns';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Bell, Calendar, Home, User, LogOut, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function LiffSimulator({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('home');
  const myPet = mockPets[0]; // Assume logged in as owner of p1
  
  const myAppointments = mockAppointments
    .filter(a => a.petId === myPet.id)
    .sort((a,b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  const upcomingApt = myAppointments.find(a => 
    isAfter(parseISO(a.date), new Date()) || isSameDay(parseISO(a.date), new Date())
  );

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
      {/* Mobile Device Frame */}
      <div className="w-full max-w-[400px] h-[800px] bg-stone-50 rounded-[3rem] shadow-2xl relative overflow-hidden border-[8px] border-stone-800 flex flex-col">
        
        {/* Dynamic Island / Status Bar Area */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-32 h-6 bg-stone-800 rounded-b-3xl"></div>
        </div>

        {/* Header */}
        <header className="pt-12 pb-4 px-6 bg-white border-b border-stone-100 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <img src={myPet.avatarUrl} alt={myPet.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="text-xs text-stone-500">哈囉,</div>
              <div className="font-bold text-stone-900 leading-tight">{myPet.ownerName}</div>
            </div>
          </div>
          <button className="relative p-2 text-stone-600">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-24 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 space-y-6"
              >
                {/* Upcoming Appointment */}
                <section>
                  <h2 className="text-lg font-bold text-stone-900 mb-4">即將到來的預約</h2>
                  {upcomingApt ? (
                    <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-white px-3 py-1.5 rounded-xl text-amber-700 font-bold text-sm shadow-sm">
                          {format(parseISO(upcomingApt.date), 'MM/dd')} (週{format(parseISO(upcomingApt.date), 'E')})
                        </div>
                        <Badge variant="outline" className="bg-white border-amber-200 text-amber-800">已確認</Badge>
                      </div>
                      <div className="text-3xl font-black text-amber-900 mb-1">{upcomingApt.time}</div>
                      <div className="text-amber-800 font-medium mb-4">{upcomingApt.service}</div>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl">
                        查看詳情 / 變更
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-stone-100 rounded-3xl p-6 text-center text-stone-500 border border-stone-200">
                      目前沒有即將到來的預約
                      <Button variant="outline" className="mt-4 w-full rounded-xl">
                        立即預約
                      </Button>
                    </div>
                  )}
                </section>

                {/* Notifications */}
                <section>
                  <h2 className="text-lg font-bold text-stone-900 mb-4">貼心提醒</h2>
                  <div className="space-y-3">
                    {mockOwnerNotifications.map(notif => (
                      <div key={notif.id} className={`p-4 rounded-2xl flex gap-4 ${notif.read ? 'bg-white border border-stone-100' : 'bg-blue-50 border border-blue-100'}`}>
                        <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${notif.read ? 'bg-stone-300' : 'bg-blue-500'}`} />
                        <div>
                          <div className={`font-bold mb-1 ${notif.read ? 'text-stone-700' : 'text-blue-900'}`}>{notif.title}</div>
                          <div className={`text-sm leading-relaxed ${notif.read ? 'text-stone-500' : 'text-blue-800'}`}>{notif.message}</div>
                          <div className="text-xs text-stone-400 mt-2">{notif.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 space-y-6"
              >
                 <h2 className="text-lg font-bold text-stone-900 mb-4">歷史紀錄</h2>
                 <div className="space-y-4">
                  {myAppointments.filter(a => a.status === 'completed').map(apt => (
                    <div key={apt.id} className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm flex items-center justify-between">
                      <div>
                        <div className="font-bold text-stone-900 mb-1">{apt.date}</div>
                        <div className="text-sm text-stone-500">{apt.service}</div>
                      </div>
                      <ChevronRight className="text-stone-300" />
                    </div>
                  ))}
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 inset-x-0 bg-white border-t border-stone-100 px-6 py-4 pb-8 flex justify-between items-center z-50">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-amber-600' : 'text-stone-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">首頁</span>
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'calendar' ? 'text-amber-600' : 'text-stone-400'}`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-[10px] font-medium">預約/紀錄</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-stone-400"
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">我的毛孩</span>
          </button>
        </nav>

        {/* Exit Simulator Button (Floating outside) */}
        <button 
          onClick={onBack}
          className="absolute -right-20 top-10 bg-white text-stone-900 p-4 rounded-full shadow-lg hover:bg-stone-100 transition-colors hidden md:flex items-center gap-2 font-bold"
        >
          <LogOut className="w-5 h-5" />
          離開模擬器
        </button>
      </div>

      {/* Mobile back button for smaller screens */}
      <button 
        onClick={onBack}
        className="fixed top-4 right-4 bg-white text-stone-900 px-4 py-2 rounded-full shadow-lg md:hidden flex items-center gap-2 font-bold z-50"
      >
        <LogOut className="w-4 h-4" />
        退出
      </button>
    </div>
  );
}

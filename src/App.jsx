import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ShoppingCart,
  Plus,
  Minus,
  BedDouble,
  Droplets,
  Lightbulb,
  Archive,
  Umbrella,
  CheckCircle2,
  MessageCircle,
  Check,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Config — swap these out for real catalog / API data when ready
// ---------------------------------------------------------------------------

/** Business WhatsApp that receives all orders. Set via Vercel env var. */
const WISOR_WA_NUMBER = import.meta.env.VITE_WISOR_WA_NUMBER || '917400390244';

const COLLEGES = [
  { id: 'iiit', code: 'IIIT', name: 'IIIT Allahabad', sub: 'Jhalwa campus' },
  { id: 'mnnit', code: 'MNNIT', name: 'MNNIT Allahabad', sub: 'Naini campus' },
];

const CATEGORIES = [
  { id: 'sleep', label: 'Sleep', fullLabel: 'Sleep Essentials', icon: BedDouble },
  { id: 'bathroom', label: 'Bathroom', fullLabel: 'Bathroom Essentials', icon: Droplets },
  { id: 'study', label: 'Study', fullLabel: 'Study Essentials', icon: Lightbulb },
  { id: 'storage', label: 'Storage', fullLabel: 'Storage Essentials', icon: Archive },
  { id: 'weather', label: 'Weather', fullLabel: 'Weather Essentials', icon: Umbrella },
];

const PRODUCTS = [
  // Mattresses (Added 5 new types)
  { id: 's1', category: 'sleep', name: 'Sleepwell Ortho Pro Spring Mattress', price: 7000, note: 'Premium Support', image: '/sleepwell_7k.png', tag: 'Top Tier' },
  { id: 's2', category: 'sleep', name: 'Sleepwell Dual Pro Profiled Foam', price: 5000, note: 'Medium Firm', image: '/sleepwell_5k.png', tag: 'Bestseller' },
  { id: 's3', category: 'sleep', name: 'Sleepwell Starlite PU Foam', price: 4000, note: 'Standard Comfort', image: '/sleepwell_4k.png' },
  { id: 's4', category: 'sleep', name: 'Basic Coir Mattress', price: 1800, note: 'Firm & Basic', image: '/mattress_basic.png' },
  { id: 's5', category: 'sleep', name: 'EPE Economy Foam Mattress', price: 1200, note: 'Budget Pick', image: '/mattress_epe.png' },
  
  // Sleep Essentials
  { id: 's6', category: 'sleep', name: 'Pillow + bedsheet set', price: 600, note: 'Sky blue' },
  { id: 's7', category: 'sleep', name: 'Quilt / blanket, single', price: 950, note: 'Grey melange' },

  // Bathroom Essentials
  { id: 'b1', category: 'bathroom', name: 'Bucket, mug & soap holder set', price: 180, note: 'Red' },
  { id: 'b2', category: 'bathroom', name: 'Bathroom slippers', price: 199, note: 'Size 9' },
  { id: 'b3', category: 'bathroom', name: 'Drying rope + clips pack', price: 149, note: '3 metre' },

  // Study Essentials
  { id: 'st1', category: 'study', name: 'LED study lamp, flexible neck', price: 349, note: 'White', tag: 'Top pick' },
  { id: 'st2', category: 'study', name: '4-socket surge-protected extension board', price: 429, note: '2m cable' },
  { id: 'st3', category: 'study', name: 'Waterproof table cover, study desk size', price: 149, note: 'Clear' },
  { id: 'st4', category: 'study', name: 'Desk organiser tray, 3-section', price: 199, note: 'Wood finish' },

  // Storage Essentials
  { id: 'sto1', category: 'storage', name: 'Foldable wardrobe organiser, 6-shelf', price: 899, note: 'Grey' },
  { id: 'sto2', category: 'storage', name: 'Under-bed storage bags, set of 2', price: 349, note: 'Large' },
  { id: 'sto3', category: 'storage', name: 'Study table drawer organiser', price: 249, note: 'Black' },

  // Weather Essentials
  { id: 'w1', category: 'weather', name: 'Compact umbrella, wind-resistant', price: 399, note: 'Navy' },
  { id: 'w2', category: 'weather', name: 'Raincoat, hooded', price: 549, note: 'Olive' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function money(n) {
  return n.toLocaleString('en-IN');
}

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------

function ScreenHeader({ title, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 flex-shrink-0 safe-top">
      <button
        onClick={onBack}
        className="w-9 h-9 flex items-center justify-center rounded-full active:bg-zinc-100 transition"
        aria-label="Back"
      >
        <ChevronLeft className="w-5 h-5 text-zinc-700" />
      </button>
      <h1 className="text-base font-semibold text-zinc-900">{title}</h1>
      <div className="w-9 h-9" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 1: College Gate
// ---------------------------------------------------------------------------

function GateScreen({ collegeId, setCollegeId, setScreen }) {
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white">
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4 safe-top">
        <div className="text-xl font-bold tracking-tight mb-10">
          wisor<span className="text-orange-500">.</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3">
          Which campus are
          <br />
          you joining?
        </h1>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
          We&apos;ll show only the essentials your hostel actually needs - nothing else.
        </p>
        <div className="space-y-3">
          {COLLEGES.map((c) => {
            const active = collegeId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCollegeId(c.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition ${
                  active ? 'border-orange-500 bg-zinc-900' : 'border-zinc-800 bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                      active ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {c.code}
                  </div>
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-zinc-400">{c.sub}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${active ? 'text-orange-500' : 'text-zinc-600'}`} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-6 pb-6 pt-3 flex-shrink-0 safe-bottom">
        <button
          onClick={() => collegeId && setScreen('category')}
          disabled={!collegeId}
          className={`w-full py-3.5 rounded-2xl font-semibold transition ${
            collegeId ? 'bg-orange-500 text-white active:bg-orange-600' : 'bg-zinc-800 text-zinc-500'
          }`}
        >
          Customize your room
        </button>
        <button
          onClick={() => setScreen('category')}
          className="w-full text-center text-xs text-zinc-500 mt-3 py-1"
        >
          Not sure yet? Browse without selecting
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 2: Category browse (Customization Dashboard)
// ---------------------------------------------------------------------------

function CategoryScreen({ college, activeCategory, setActiveCategory, setScreen, cart, addOne, removeOne, cartCount, total, subtotalForPillow }) {
  const cat = CATEGORIES.find((c) => c.id === activeCategory);
  const items = PRODUCTS.filter((p) => p.category === activeCategory);
  const CatIcon = cat.icon;

  const progressToPillow = Math.min(100, (subtotalForPillow / 7000) * 100);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-zinc-100 flex-shrink-0 safe-top">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScreen('gate')}
            className="w-8 h-8 flex items-center justify-center rounded-full active:bg-zinc-100"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-700" />
          </button>
          <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-full pl-1 pr-3 py-1 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center">
              {college ? college.code[0] : '?'}
            </div>
            <span className="text-xs font-medium text-zinc-800">{college ? college.name : 'All Campuses'}</span>
          </div>
        </div>
        <button
          onClick={() => setScreen('cart')}
          className="relative w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm"
          aria-label="Cart"
        >
          <ShoppingCart className="w-4 h-4 text-zinc-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Free Pillow Promo Bar */}
      <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-indigo-900">
            {subtotalForPillow >= 7000 ? '🎉 Free Premium Pillow Unlocked!' : 'Get a Free Premium Pillow!'}
          </span>
          <span className="text-[10px] font-medium text-indigo-700">
            {subtotalForPillow >= 7000 ? 'Achieved' : `Add ₹${money(7000 - subtotalForPillow)} more`}
          </span>
        </div>
        <div className="w-full bg-indigo-200/50 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${subtotalForPillow >= 7000 ? 'bg-green-500' : 'bg-indigo-500'}`} 
            style={{ width: `${progressToPillow}%` }}
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Category Sidebar */}
        <div className="w-16 bg-zinc-50 border-r border-zinc-100 flex flex-col items-center py-2 gap-1 overflow-y-auto flex-shrink-0">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const active = c.id === activeCategory;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`w-full flex flex-col items-center gap-1 py-3 border-l-2 ${
                  active ? 'border-orange-500 bg-white' : 'border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-orange-500' : 'text-zinc-400'}`} />
                <span className={`text-[10px] ${active ? 'text-orange-600 font-semibold' : 'text-zinc-400'}`}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 bg-zinc-50/50">
          <h2 className="text-lg font-bold text-zinc-900">{cat.fullLabel}</h2>
          <p className="text-xs text-zinc-500 mb-4">{items.length} options carefully selected</p>
          <div className="flex flex-col gap-3">
            {items.map((p) => {
              const qty = cart[p.id] || 0;
              return (
                <div key={p.id} className="border border-zinc-200 rounded-2xl p-3 relative bg-white flex flex-col">
                  {p.tag && (
                    <span className="absolute top-2 left-2 z-10 text-[10px] font-bold text-green-700 bg-green-100/90 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      {p.tag}
                    </span>
                  )}
                  {p.image ? (
                    <div className="h-32 rounded-xl bg-zinc-50 mb-3 overflow-hidden relative border border-zinc-100/50">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-20 rounded-xl bg-zinc-50 flex items-center justify-center mb-3">
                      <CatIcon className="w-8 h-8 text-zinc-300" />
                    </div>
                  )}
                  <div
                    className="text-sm font-semibold text-zinc-900 leading-snug mb-1"
                  >
                    {p.name}
                  </div>
                  <div className="text-xs text-zinc-500 mb-3 flex-1">{p.note}</div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-zinc-900 text-sm">Rs.{money(p.price)}</span>
                    {qty === 0 ? (
                      <button
                        onClick={() => addOne(p.id)}
                        className="bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full active:bg-orange-600 shadow-sm"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 bg-orange-500 rounded-full px-1.5 py-1 shadow-sm">
                        <button
                          onClick={() => removeOne(p.id)}
                          className="w-5 h-5 flex items-center justify-center text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-white text-xs font-bold w-3 text-center">{qty}</span>
                        <button
                          onClick={() => addOne(p.id)}
                          className="w-5 h-5 flex items-center justify-center text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {cartCount > 0 && (
        <div className="border-t border-zinc-100 bg-white px-4 py-3 flex items-center justify-between flex-shrink-0 safe-bottom">
          <div>
            <div className="text-xs text-zinc-500">
              {cartCount} item{cartCount > 1 ? 's' : ''}
            </div>
            <div className="font-bold text-zinc-900">Rs.{money(total)}</div>
          </div>
          <button
            onClick={() => setScreen('cart')}
            className="bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-1 active:bg-orange-600 shadow-md shadow-orange-500/20"
          >
            View cart <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 3: Cart review
// ---------------------------------------------------------------------------

function CartScreen({ cartItems, categoriesCovered, subtotal, total, addOne, removeOne, setScreen }) {
  const isFreePillowUnlocked = subtotal >= 7000;
  
  // Separate real items from the free promotional item for the UI
  const realItems = cartItems.filter(i => i.id !== 'free-pillow');
  
  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: realItems.filter((i) => i.category === cat.id),
  })).filter((g) => g.items.length > 0);

  const missingCategory = CATEGORIES.find((c) => !realItems.some((i) => i.category === c.id));

  return (
    <div className="flex flex-col h-full bg-zinc-50">
      <ScreenHeader title="Your room setup" onBack={() => setScreen('category')} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {realItems.length === 0 ? (
          <div className="text-center text-zinc-400 text-sm mt-20">
            Your setup is empty. Go add some essentials!
          </div>
        ) : (
          <div className="space-y-5">
            {grouped.map(({ cat, items }) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
                  <h3 className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" /> {cat.fullLabel}
                  </h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        {item.image ? (
                           <div className="w-12 h-12 rounded-lg bg-zinc-50 border border-zinc-100 flex-shrink-0 overflow-hidden">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                           </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-zinc-300" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="text-sm font-semibold text-zinc-900 leading-snug">{item.name}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">
                            Rs.{money(item.price)}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 pt-0.5">
                          <div className="text-sm font-bold text-zinc-900 mb-2">
                            Rs.{money(item.price * item.qty)}
                          </div>
                          <div className="flex items-center gap-2 bg-zinc-100 rounded-full px-1.5 py-1">
                            <button
                              onClick={() => removeOne(item.id)}
                              className="w-5 h-5 flex items-center justify-center text-zinc-600 bg-white rounded-full shadow-sm"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold w-3 text-center">{item.qty}</span>
                            <button
                              onClick={() => addOne(item.id)}
                              className="w-5 h-5 flex items-center justify-center text-zinc-600 bg-white rounded-full shadow-sm"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {isFreePillowUnlocked && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-200/50 rounded-full blur-xl" />
                <h3 className="text-[10px] font-bold text-indigo-500 tracking-wider uppercase mb-3 flex items-center gap-2 relative z-10">
                  🎁 Special Offer Unlocked
                </h3>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center flex-shrink-0 text-2xl">
                    ☁️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-indigo-900">Premium Pillow</div>
                    <div className="text-xs text-indigo-700">Free gift on orders above ₹7K</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-green-600">Free</div>
                  </div>
                </div>
              </div>
            )}

            {missingCategory ? (
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 flex gap-2 items-start shadow-sm">
                <Lightbulb className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-800 leading-snug">
                  You haven't added any {missingCategory.label} essentials. Want to go back and check?
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex gap-2 items-start shadow-sm">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-800 leading-snug">
                  Awesome! You've got essentials from all categories.
                </p>
              </div>
            )}

            <div className="bg-white rounded-2xl p-4 space-y-3 border border-zinc-100 shadow-sm">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Cart subtotal</span>
                <span className="font-medium text-zinc-900">Rs.{money(subtotal)}</span>
              </div>
              {isFreePillowUnlocked && (
                <div className="flex justify-between text-sm">
                  <span className="text-indigo-600">Free Premium Pillow</span>
                  <span className="font-medium text-indigo-600">-</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Delivery to hostel room</span>
                <span className="font-medium text-green-600 font-bold">Free</span>
              </div>
              <div className="border-t border-dashed border-zinc-200 pt-3 flex justify-between">
                <span className="font-bold text-zinc-900">Total to pay</span>
                <span className="text-lg font-black text-orange-500">Rs.{money(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white border-t border-zinc-100 px-4 py-3 flex-shrink-0 safe-bottom">
        <button
          disabled={realItems.length === 0}
          onClick={() => setScreen('delivery')}
          className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-1 transition shadow-lg ${
            realItems.length ? 'bg-orange-500 text-white active:bg-orange-600 shadow-orange-500/20' : 'bg-zinc-100 text-zinc-400 shadow-none'
          }`}
        >
          Proceed to delivery <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 4: Delivery details
// ---------------------------------------------------------------------------

function DeliveryScreen({ delivery, setDelivery, setScreen }) {
  const update = (field) => (e) => setDelivery((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="flex flex-col h-full bg-white">
      <ScreenHeader title="Delivery details" onBack={() => setScreen('cart')} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Full name</label>
          <input
            value={delivery.fullName}
            onChange={update('fullName')}
            placeholder="As per hostel allotment letter"
            className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Hostel block</label>
          <div className="grid grid-cols-2 gap-3">
            {['Boys hostel', 'Girls hostel'].map((opt) => (
              <button
                key={opt}
                onClick={() => setDelivery((prev) => ({ ...prev, hostelBlock: opt }))}
                className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  delivery.hostelBlock === opt
                    ? 'bg-orange-50 border-orange-500 text-orange-600'
                    : 'bg-white border-zinc-100 text-zinc-500'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Hostel name &amp; room no.</label>
          <input
            value={delivery.hostelRoom}
            onChange={update('hostelRoom')}
            placeholder="e.g. BH-3, Room 214"
            className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Preferred delivery date</label>
          <input
            value={delivery.deliveryDate}
            onChange={update('deliveryDate')}
            placeholder="e.g. 14 July 2026"
            className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Your WhatsApp number</label>
          <input
            value={delivery.whatsapp}
            onChange={update('whatsapp')}
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
          />
        </div>
      </div>
      <div className="border-t border-zinc-100 px-4 py-3 flex-shrink-0 safe-bottom bg-white shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setScreen('success')}
          className="w-full py-3.5 rounded-2xl font-bold bg-orange-500 text-white active:bg-orange-600 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
        >
          Review &amp; send order <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 5: WhatsApp handoff
// ---------------------------------------------------------------------------

function SuccessScreen({ college, delivery, cartItems, total, handleSendWhatsApp, setScreen }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center px-4 pt-3 pb-1 flex-shrink-0 safe-top">
        <button
          onClick={() => setScreen('delivery')}
          className="w-8 h-8 flex items-center justify-center rounded-full active:bg-zinc-100"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-700" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5 border border-green-100">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-zinc-900 mb-2">Almost done!</h1>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed max-w-[280px]">
          Send this directly to Wisor on WhatsApp. We&apos;ll confirm your order and delivery schedule instantly.
        </p>

        <div className="w-full bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 text-left mb-6 shadow-sm">
          <div className="text-[10px] font-black text-zinc-400 mb-3 tracking-widest uppercase">
            Order Summary {college ? `• ${college.name}` : ''}
          </div>
          <div className="text-sm font-bold text-zinc-900 mb-1">
            {delivery.fullName || 'Your name'}
          </div>
          <div className="text-xs font-medium text-zinc-500 mb-4">
            {delivery.hostelBlock}, {delivery.hostelRoom || 'Room TBD'} <br/>
            By {delivery.deliveryDate || 'TBD'}
          </div>
          
          <div className="space-y-2 mb-4">
            {cartItems.map((item, idx) => (
              <div key={item.id || idx} className="flex justify-between text-xs font-medium gap-2">
                <span className={`truncate ${item.price === 0 ? 'text-indigo-600' : 'text-zinc-600'}`}>
                  {item.qty}x {item.name} {item.price === 0 && '(Free)'}
                </span>
                <span className={`flex-shrink-0 ${item.price === 0 ? 'text-indigo-600' : 'text-zinc-800'}`}>
                  Rs.{money(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-dashed border-zinc-200 pt-3 flex justify-between items-center">
            <span className="text-sm font-bold text-zinc-900">Total</span>
            <span className="text-lg font-black text-orange-500">Rs.{money(total)}</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 pt-2 flex-shrink-0 safe-bottom">
        <button
          onClick={handleSendWhatsApp}
          className="w-full py-4 rounded-2xl font-bold bg-[#25D366] text-white active:bg-[#1DA851] flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5"
        >
          <MessageCircle className="w-5 h-5" /> Send order on WhatsApp
        </button>
        <p className="text-center text-[10px] font-medium text-zinc-400 mt-4 tracking-wide">OPENS WHATSAPP WITH PRE-FILLED DETAILS</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main app — state only, screens rendered via props
// ---------------------------------------------------------------------------

export default function App() {
  const [screen, setScreen] = useState('gate');
  const [collegeId, setCollegeId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('sleep');
  const [cart, setCart] = useState({});
  const [delivery, setDelivery] = useState({
    fullName: '',
    hostelBlock: 'Boys hostel',
    hostelRoom: '',
    deliveryDate: '',
    whatsapp: '',
  });
  const [toast, setToast] = useState('');

  const college = COLLEGES.find((c) => c.id === collegeId) || null;

  // Build real cart items
  const baseCartItems = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }));

  const cartCount = baseCartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = baseCartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  
  // Free Pillow Logic
  let finalCartItems = [...baseCartItems];
  if (subtotal >= 7000) {
    finalCartItems.push({
      id: 'free-pillow',
      category: 'sleep',
      name: 'Premium Pillow (Offer)',
      price: 0,
      qty: 1,
      image: null
    });
  }

  const total = subtotal; // Free items don't add to total
  const categoriesCovered = new Set(baseCartItems.map((i) => i.category)).size;

  function addOne(id) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function removeOne(id) {
    setCart((prev) => {
      const next = { ...prev };
      const q = (next[id] || 0) - 1;
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });
  }

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(''), 1700);
  }

  function buildWhatsAppMessage() {
    const lines = [];
    lines.push(`*New Wisor order* - ${college ? college.name : 'Hostel'}`);
    lines.push(`---`);
    lines.push(`*Name:* ${delivery.fullName || 'Not provided'}`);
    lines.push(`*Room:* ${delivery.hostelBlock}, ${delivery.hostelRoom || 'TBD'}`);
    lines.push(`*Delivery:* ${delivery.deliveryDate || 'TBD'}`);
    lines.push(`*Phone:* ${delivery.whatsapp || 'Not provided'}`);
    lines.push(`---`);
    finalCartItems.forEach((i) => {
      if (i.price === 0) {
         lines.push(`${i.qty}x ${i.name} - *FREE*`);
      } else {
         lines.push(`${i.qty}x ${i.name} - Rs.${money(i.price * i.qty)}`);
      }
    });
    lines.push(`---`);
    lines.push(`*Total: Rs.${money(total)}*`);
    return lines.join('\n');
  }

  function handleSendWhatsApp() {
    const message = buildWhatsAppMessage();
    // Opens a WhatsApp chat to the Wisor business number with the order pre-filled
    const url = `https://wa.me/${WISOR_WA_NUMBER}?text=${encodeURIComponent(message)}`;
    try {
      window.open(url, '_blank');
    } catch (_e) {
      // window.open can be blocked in some embedded/sandboxed contexts - safe to ignore
    }
    showToast('Opening WhatsApp…');
  }

  function renderScreen() {
    const sp = { setScreen };
    switch (screen) {
      case 'gate':
        return <GateScreen {...sp} collegeId={collegeId} setCollegeId={setCollegeId} />;
      case 'category':
        return (
          <CategoryScreen
            {...sp}
            college={college}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            cart={cart}
            addOne={addOne}
            removeOne={removeOne}
            cartCount={cartCount + (subtotal >= 7000 ? 1 : 0)}
            total={total}
            subtotalForPillow={subtotal}
          />
        );
      case 'cart':
        return (
          <CartScreen
            {...sp}
            cartItems={finalCartItems}
            categoriesCovered={categoriesCovered}
            subtotal={subtotal}
            total={total}
            addOne={addOne}
            removeOne={removeOne}
          />
        );
      case 'delivery':
        return <DeliveryScreen {...sp} delivery={delivery} setDelivery={setDelivery} />;
      case 'success':
        return (
          <SuccessScreen
            {...sp}
            college={college}
            delivery={delivery}
            cartItems={finalCartItems}
            total={total}
            handleSendWhatsApp={handleSendWhatsApp}
          />
        );
      default:
        return <GateScreen {...sp} collegeId={collegeId} setCollegeId={setCollegeId} />;
    }
  }

  // On real phones the app fills the entire viewport edge-to-edge (h-screen, no frame).
  // On tablet/desktop (sm: breakpoint and up) it renders as a centered phone-style
  // preview card, which is purely a desktop affordance and has no effect on mobile.
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center sm:py-8 sm:px-4">
      <div
        className="bg-white sm:rounded-3xl shadow-none sm:shadow-2xl border-0 sm:border sm:border-zinc-200 overflow-hidden relative w-full h-screen sm:h-auto"
        style={{ maxWidth: '430px' }}
      >
        <div className="h-screen sm:h-[844px]">{renderScreen()}</div>
        {toast && (
          <div className="absolute left-1/2 bottom-24 transform -translate-x-1/2 bg-zinc-900 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg z-50 whitespace-nowrap">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

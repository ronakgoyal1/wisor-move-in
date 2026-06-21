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
  Package,
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
  { id: 's1', category: 'sleep', name: 'Foam mattress, single (72x36x4")', price: 1800, note: 'Firm' },
  { id: 's2', category: 'sleep', name: 'Pillow + bedsheet set', price: 600, note: 'Sky blue' },
  { id: 's3', category: 'sleep', name: 'Quilt / blanket, single', price: 950, note: 'Grey melange' },

  { id: 'b1', category: 'bathroom', name: 'Bucket, mug & soap holder set', price: 180, note: 'Red' },
  { id: 'b2', category: 'bathroom', name: 'Bathroom slippers', price: 199, note: 'Size 9' },
  { id: 'b3', category: 'bathroom', name: 'Drying rope + clips pack', price: 149, note: '3 metre' },

  { id: 'st1', category: 'study', name: 'LED study lamp, flexible neck', price: 349, note: 'White', tag: 'Top pick' },
  { id: 'st2', category: 'study', name: '4-socket surge-protected extension board', price: 429, note: '2m cable' },
  { id: 'st3', category: 'study', name: 'Waterproof table cover, study desk size', price: 149, note: 'Clear' },
  { id: 'st4', category: 'study', name: 'Desk organiser tray, 3-section', price: 199, note: 'Wood finish' },

  { id: 'sto1', category: 'storage', name: 'Foldable wardrobe organiser, 6-shelf', price: 899, note: 'Grey' },
  { id: 'sto2', category: 'storage', name: 'Under-bed storage bags, set of 2', price: 349, note: 'Large' },
  { id: 'sto3', category: 'storage', name: 'Study table drawer organiser', price: 249, note: 'Black' },

  { id: 'w1', category: 'weather', name: 'Compact umbrella, wind-resistant', price: 399, note: 'Navy' },
  { id: 'w2', category: 'weather', name: 'Raincoat, hooded', price: 549, note: 'Olive' },
];

const KITS = [
  {
    id: 'k1',
    name: 'Complete move-in kit',
    desc: 'Mattress, bedding, bathroom & study set - everything in one box',
    price: 3060,
    original: 3850,
    badge: 'Save 20%',
    items: ['s1', 's2', 'b1', 'st1'],
  },
  {
    id: 'k2',
    name: 'Sleep essentials only',
    desc: 'Mattress, pillow, bedsheet sized for your hostel bed',
    price: 1450,
    badge: 'Most picked',
    items: ['s1', 's2'],
  },
  {
    id: 'k3',
    name: 'Study desk set',
    desc: 'Lamp, extension board, organiser & desk cover',
    price: 1126,
    badge: null,
    items: ['st1', 'st2', 'st3', 'st4'],
  },
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
          onClick={() => collegeId && setScreen('home')}
          disabled={!collegeId}
          className={`w-full py-3.5 rounded-2xl font-semibold transition ${
            collegeId ? 'bg-orange-500 text-white active:bg-orange-600' : 'bg-zinc-800 text-zinc-500'
          }`}
        >
          Continue
        </button>
        <button
          onClick={() => setScreen('home')}
          className="w-full text-center text-xs text-zinc-500 mt-3 py-1"
        >
          Not sure yet? Browse without selecting
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 2: Home dashboard
// ---------------------------------------------------------------------------

function HomeScreen({ college, cartCount, setScreen, setActiveCategory, addKit }) {
  return (
    <div className="flex flex-col h-full bg-zinc-50">
      <div className="flex-1 overflow-y-auto pb-6 safe-top">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <button className="flex items-center gap-2 bg-white border border-zinc-200 rounded-full pl-1 pr-3 py-1 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
              {college ? college.code[0] : '?'}
            </div>
            <span className="text-sm font-medium text-zinc-800">{college ? college.name : 'Select campus'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>
          <button
            onClick={() => setScreen('cart')}
            className="relative w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-zinc-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="mx-5 mt-2 rounded-2xl bg-zinc-900 text-white p-5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-orange-600 opacity-30 blur-2xl" />
          <div className="relative">
            <div className="text-orange-400 text-xs font-bold tracking-wide mb-2">MOVE-IN DAY READY</div>
            <h2 className="text-lg font-bold leading-snug mb-4">
              Everything for your {college ? college.code : 'hostel'} hostel, in one delivery
            </h2>
            <button
              onClick={() => {
                setActiveCategory('sleep');
                setScreen('category');
              }}
              className="bg-white text-zinc-900 text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1 active:bg-zinc-100"
            >
              Build my kit <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-5 mt-6">
          <h3 className="text-sm font-semibold text-zinc-900 mb-3">Shop by category</h3>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setScreen('category');
                  }}
                  className="flex-shrink-0 w-20 flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-zinc-700" />
                  </div>
                  <span className="text-xs text-zinc-600 font-medium text-center">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-900">Recommended kits</h3>
            <span className="text-xs font-medium text-orange-600">See all</span>
          </div>
          <div className="space-y-3">
            {KITS.map((kit) => (
              <div key={kit.id} className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-sm text-zinc-900">{kit.name}</div>
                      {kit.badge && (
                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {kit.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1 leading-snug">{kit.desc}</div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-zinc-900">Rs.{money(kit.price)}</span>
                        {kit.original && (
                          <span className="text-xs text-zinc-400 line-through">Rs.{money(kit.original)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => addKit(kit)}
                        className="text-xs font-semibold text-orange-600 border border-orange-200 bg-orange-50 px-3 py-1.5 rounded-full active:bg-orange-100"
                      >
                        Add kit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 3: Category browse
// ---------------------------------------------------------------------------

function CategoryScreen({ activeCategory, setActiveCategory, setScreen, cart, addOne, removeOne, cartCount, total }) {
  const cat = CATEGORIES.find((c) => c.id === activeCategory);
  const items = PRODUCTS.filter((p) => p.category === activeCategory);
  const CatIcon = cat.icon;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center px-4 pt-3 pb-1 flex-shrink-0 safe-top">
        <button
          onClick={() => setScreen('home')}
          className="w-8 h-8 flex items-center justify-center rounded-full active:bg-zinc-100"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-700" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
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
                <span className={`text-xs ${active ? 'text-orange-600 font-semibold' : 'text-zinc-400'}`}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
          <h2 className="text-lg font-bold text-zinc-900">{cat.fullLabel}</h2>
          <p className="text-xs text-zinc-500 mb-4">{items.length} items - senior-recommended</p>
          <div className="grid grid-cols-2 gap-3">
            {items.map((p) => {
              const qty = cart[p.id] || 0;
              return (
                <div key={p.id} className="border border-zinc-200 rounded-2xl p-3 relative bg-white">
                  {p.tag && (
                    <span className="absolute top-2 left-2 text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      {p.tag}
                    </span>
                  )}
                  <div className="h-16 rounded-xl bg-zinc-50 flex items-center justify-center mt-5 mb-2">
                    <CatIcon className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div
                    className="text-sm font-medium text-zinc-900 leading-snug mb-1"
                    style={{ minHeight: '2.5rem' }}
                  >
                    {p.name}
                  </div>
                  <div className="text-xs text-zinc-400 mb-2">{p.note}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900 text-sm">Rs.{p.price}</span>
                    {qty === 0 ? (
                      <button
                        onClick={() => addOne(p.id)}
                        className="bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full active:bg-orange-600"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-orange-500 rounded-full px-1 py-1">
                        <button
                          onClick={() => removeOne(p.id)}
                          className="w-5 h-5 flex items-center justify-center text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-xs font-semibold w-4 text-center">{qty}</span>
                        <button
                          onClick={() => addOne(p.id)}
                          className="w-5 h-5 flex items-center justify-center text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
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
            className="bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-1 active:bg-orange-600"
          >
            View cart <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 4: Cart review
// ---------------------------------------------------------------------------

function CartScreen({ cartItems, categoriesCovered, subtotal, total, addOne, removeOne, setScreen }) {
  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: cartItems.filter((i) => i.category === cat.id),
  })).filter((g) => g.items.length > 0);

  const missingCategory = CATEGORIES.find((c) => !cartItems.some((i) => i.category === c.id));

  return (
    <div className="flex flex-col h-full bg-white">
      <ScreenHeader title="Your move-in kit" onBack={() => setScreen('category')} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {cartItems.length === 0 ? (
          <div className="text-center text-zinc-400 text-sm mt-20">
            Your kit is empty. Go add some essentials!
          </div>
        ) : (
          <div className="space-y-5">
            {grouped.map(({ cat, items }) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id}>
                  <h3 className="text-xs font-bold text-zinc-400 tracking-wide mb-2">
                    {cat.fullLabel.toUpperCase()}
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-zinc-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-zinc-900 truncate">{item.name}</div>
                          <div className="text-xs text-zinc-400">
                            Qty {item.qty} - {item.note}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-bold text-zinc-900 mb-1">
                            Rs.{money(item.price * item.qty)}
                          </div>
                          <div className="flex items-center gap-2 bg-zinc-100 rounded-full px-1 py-0.5">
                            <button
                              onClick={() => removeOne(item.id)}
                              className="w-5 h-5 flex items-center justify-center text-zinc-600"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold w-3 text-center">{item.qty}</span>
                            <button
                              onClick={() => addOne(item.id)}
                              className="w-5 h-5 flex items-center justify-center text-zinc-600"
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

            {missingCategory ? (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex gap-2 items-start">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-800 leading-snug">
                  {categoriesCovered} of {CATEGORIES.length} categories covered. Add a {missingCategory.label}{' '}
                  essential to complete your kit.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex gap-2 items-start">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-800 leading-snug">
                  All {CATEGORIES.length} categories covered. Your kit is complete!
                </p>
              </div>
            )}

            <div className="bg-zinc-50 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium text-zinc-900">Rs.{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Delivery to hostel</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-zinc-200 pt-2 flex justify-between">
                <span className="font-semibold text-zinc-900">Total</span>
                <span className="font-bold text-zinc-900">Rs.{money(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-zinc-100 px-4 py-3 flex-shrink-0 safe-bottom">
        <button
          disabled={cartItems.length === 0}
          onClick={() => setScreen('delivery')}
          className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-1 transition ${
            cartItems.length ? 'bg-orange-500 text-white active:bg-orange-600' : 'bg-zinc-200 text-zinc-400'
          }`}
        >
          Continue to delivery details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 5: Delivery details
// ---------------------------------------------------------------------------

function DeliveryScreen({ delivery, setDelivery, setScreen }) {
  const update = (field) => (e) => setDelivery((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="flex flex-col h-full bg-white">
      <ScreenHeader title="Delivery details" onBack={() => setScreen('cart')} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <div>
          <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Full name</label>
          <input
            value={delivery.fullName}
            onChange={update('fullName')}
            placeholder="As per hostel allotment letter"
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Hostel block</label>
          <div className="grid grid-cols-2 gap-3">
            {['Boys hostel', 'Girls hostel'].map((opt) => (
              <button
                key={opt}
                onClick={() => setDelivery((prev) => ({ ...prev, hostelBlock: opt }))}
                className={`py-3 rounded-xl text-sm font-semibold border transition ${
                  delivery.hostelBlock === opt
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-600 border-zinc-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Hostel name &amp; room no.</label>
          <input
            value={delivery.hostelRoom}
            onChange={update('hostelRoom')}
            placeholder="e.g. BH-3, Room 214"
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Preferred delivery date</label>
          <input
            value={delivery.deliveryDate}
            onChange={update('deliveryDate')}
            placeholder="14 July 2026"
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Your WhatsApp number</label>
          <input
            value={delivery.whatsapp}
            onChange={update('whatsapp')}
            placeholder="+91 98765 43210"
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>
      <div className="border-t border-zinc-100 px-4 py-3 flex-shrink-0 safe-bottom">
        <button
          onClick={() => setScreen('success')}
          className="w-full py-3.5 rounded-2xl font-semibold bg-orange-500 text-white active:bg-orange-600 flex items-center justify-center gap-1"
        >
          Review &amp; send order <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 6: WhatsApp handoff
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
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900 mb-2">Your kit is ready to send</h1>
        <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
          Tap below to send this directly to Wisor on WhatsApp. We&apos;ll confirm final pricing and delivery
          within a few hours.
        </p>

        <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-left mb-6">
          <div className="text-xs font-bold text-zinc-500 mb-2">
            NEW WISOR ORDER {college ? `- ${college.name.toUpperCase()}` : ''}
          </div>
          <div className="text-sm font-semibold text-zinc-900 mb-1">
            {delivery.fullName || 'Your name'} - {delivery.hostelRoom || 'Room not set'}
          </div>
          <div className="text-xs text-zinc-500 mb-3">Delivery by: {delivery.deliveryDate || 'TBD'}</div>
          <div className="space-y-1 mb-3">
            {cartItems.length === 0 && <div className="text-xs text-zinc-400">No items added yet</div>}
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-xs text-zinc-600 gap-2">
                <span className="truncate">
                  {item.qty}x {item.name}
                </span>
                <span className="font-medium text-zinc-800 flex-shrink-0">
                  Rs.{money(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-200 pt-2 flex justify-between items-center">
            <span className="text-sm font-bold text-zinc-900">Total: Rs.{money(total)}</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 pt-2 flex-shrink-0 safe-bottom">
        <button
          onClick={handleSendWhatsApp}
          className="w-full py-3.5 rounded-2xl font-semibold bg-green-600 text-white active:bg-green-700 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" /> Send cart on WhatsApp
        </button>
        <p className="text-center text-xs text-zinc-400 mt-3">Opens WhatsApp with this order pre-filled</p>
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

  const cartItems = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }));

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal;
  const categoriesCovered = new Set(cartItems.map((i) => i.category)).size;

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

  function addKit(kit) {
    setCart((prev) => {
      const next = { ...prev };
      kit.items.forEach((id) => {
        next[id] = (next[id] || 0) + 1;
      });
      return next;
    });
    showToast(`${kit.name} added to your kit`);
  }

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(''), 1700);
  }

  function buildWhatsAppMessage() {
    const lines = [];
    lines.push(`New Wisor order - ${college ? college.name : 'Hostel'}`);
    lines.push(
      `${delivery.fullName || 'Name not provided'} | ${delivery.hostelBlock}, Room ${delivery.hostelRoom || 'TBD'}`
    );
    lines.push(`Delivery by: ${delivery.deliveryDate || 'TBD'}`);
    lines.push(`Customer WhatsApp: ${delivery.whatsapp || 'Not provided'}`);
    lines.push('');
    cartItems.forEach((i) => lines.push(`${i.qty}x ${i.name} - Rs.${money(i.price * i.qty)}`));
    lines.push('');
    lines.push(`Total: Rs.${money(total)}`);
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
      case 'home':
        return <HomeScreen {...sp} college={college} cartCount={cartCount} setActiveCategory={setActiveCategory} addKit={addKit} />;
      case 'category':
        return (
          <CategoryScreen
            {...sp}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            cart={cart}
            addOne={addOne}
            removeOne={removeOne}
            cartCount={cartCount}
            total={total}
          />
        );
      case 'cart':
        return (
          <CartScreen
            {...sp}
            cartItems={cartItems}
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
            cartItems={cartItems}
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

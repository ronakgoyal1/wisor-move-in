import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
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
  Star,
  ExternalLink,
  X,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Config & Data
// ---------------------------------------------------------------------------
import { WISOR_WA_NUMBER, FREE_DELIVERY_THRESHOLD, DELIVERY_FEE_AMOUNT, MAX_QTY } from './data/config.js';
import { COLLEGES } from './data/colleges.js';
import { CATEGORIES } from './data/categories.js';
import { PRODUCTS } from './data/products.js';
import { money } from './utils/helpers.js';

// ---------------------------------------------------------------------------

function StarRating({ rating, count, source, size = 'sm' }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < full || (i === full && half) ? 'text-amber-400' : 'text-zinc-300'}>★</span>
  ));
  if (size === 'lg') return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-zinc-900">{rating}</span>
        <div className="flex text-xl leading-none">{stars}</div>
      </div>
      <div className="text-xs text-zinc-500">{count} ratings on <span className="font-semibold text-zinc-700">{source}</span></div>
    </div>
  );
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-xs leading-none">{stars}</div>
      <span className="text-[10px] font-semibold text-zinc-700">{rating}</span>
      <span className="text-[10px] text-zinc-400">({count})</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product Detail Modal (used on both mobile + desktop)
// ---------------------------------------------------------------------------
function ProductModal({ product, cart, addOne, removeOne, onClose }) {
  const qty = cart[product.id] || 0;
  const CatIcon = CATEGORIES.find(c => c.id === product.category)?.icon || BedDouble;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxWidth: '520px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0 md:hidden">
          <div className="w-10 h-1 bg-zinc-200 rounded-full" />
        </div>
        <div className="flex justify-end px-4 pt-3 pb-1 flex-shrink-0">
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition">
            <X className="w-4 h-4 text-zinc-600" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 pb-4">
          <div className="mx-4 rounded-2xl overflow-hidden bg-zinc-50 h-52 mb-4 border border-zinc-100 relative">
            {product.tag && <span className="absolute top-3 left-3 z-10 text-[10px] font-bold text-green-700 bg-green-100/90 px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">{product.tag}</span>}
            {product.image ? <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><CatIcon className="w-16 h-16 text-zinc-200" /></div>}
          </div>
          <div className="px-5">
            <h2 className="text-lg font-bold text-zinc-900 leading-snug mb-1">{product.name}</h2>
            <p className="text-sm text-zinc-500 mb-3">{product.note}</p>
            {product.warranty && (
              <div className="flex items-center gap-1.5 text-[#2e7d32] mb-3 bg-[#2e7d32]/10 inline-flex px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wide uppercase">{product.warranty}</span>
              </div>
            )}
            <p className="text-sm text-zinc-600 leading-relaxed mb-4">{product.description}</p>
            {product.specs && (
              <div className="mb-4">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Specifications</div>
                <div className="space-y-1.5">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-zinc-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {product.officialUrl && (
              <a href={product.officialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition mb-4">
                <ExternalLink className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="flex-1">See on official website</span>
                <span className="text-[10px] text-zinc-400 font-normal">{product.ratingSource}</span>
              </a>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 border-t border-zinc-100 px-5 py-4 flex items-center justify-between bg-white">
          <div>
            <div className="text-xs text-zinc-400 font-medium">Price</div>
            {product.originalPrice ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="bg-[#2e7d32] text-white font-black px-2 py-0.5 rounded-lg text-lg">Rs.{money(product.price)}</span>
                  <span className="text-zinc-400 line-through text-sm font-medium">Rs.{money(product.originalPrice)}</span>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold tracking-wide mt-0.5">Rs.{money(product.originalPrice - product.price)} OFF</span>
              </div>
            ) : (
              <div className="text-xl font-black text-zinc-900">Rs.{money(product.price)}</div>
            )}
          </div>
          {qty === 0 ? (
            <button onClick={() => addOne(product.id)} className="bg-orange-500 text-white font-bold px-7 py-3 rounded-2xl hover:bg-orange-600 shadow-lg shadow-orange-500/25 transition flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Add to cart
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-orange-500 rounded-2xl px-3 py-2.5 shadow-lg shadow-orange-500/25">
              <button onClick={() => removeOne(product.id)} className="w-7 h-7 flex items-center justify-center text-white bg-white/20 rounded-xl"><Minus className="w-3.5 h-3.5" /></button>
              <span className="text-white font-bold text-sm w-4 text-center">{qty}</span>
              <button onClick={() => { if (qty < MAX_QTY) addOne(product.id); }} className={`w-7 h-7 flex items-center justify-center text-white rounded-xl ${qty >= MAX_QTY ? 'bg-white/10 cursor-not-allowed' : 'bg-white/20'}`}><Plus className="w-3.5 h-3.5" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// MOBILE SCREENS (unchanged)
// ===========================================================================

function ScreenHeader({ title, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-zinc-200/50 bg-white/70 backdrop-blur-md flex-shrink-0 safe-top relative z-10">
      <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full active:bg-zinc-100 transition" aria-label="Back">
        <ChevronLeft className="w-5 h-5 text-zinc-700" />
      </button>
      <h1 className="text-base font-semibold text-zinc-900">{title}</h1>
      <div className="w-9 h-9" />
    </div>
  );
}

function GateScreen({ collegeId, setCollegeId, setScreen }) {
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-2 safe-top relative z-10">
        <div className="mb-16">
          <div className="text-4xl font-black tracking-tight mb-1">wisor<span className="text-orange-500">.</span></div>
          <div className="text-zinc-500 text-xs font-medium">Your hostel room, sorted.</div>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-2">Which campus are<br />you joining?</h1>
        <p className="text-zinc-400 text-sm mb-5 leading-relaxed">We'll show only the essentials your hostel actually needs - nothing else.</p>
        <div className="space-y-3">
          {COLLEGES.map((c) => {
            const active = collegeId === c.id;
            return (
              <button key={c.id} onClick={() => setCollegeId(c.id)} className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 ${active ? 'border-orange-500 bg-zinc-900 shadow-lg shadow-orange-500/10' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 ${active ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-zinc-800 text-zinc-300'}`}>{c.code}</div>
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-zinc-400">{c.sub}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-colors ${active ? 'text-orange-500' : 'text-zinc-600'}`} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-6 pb-5 pt-3 flex-shrink-0 safe-bottom border-t border-zinc-900">
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="inline-flex items-center justify-center">
            <img src="/sleepwell_logo.png" alt="Sleepwell" className="h-6 object-contain invert brightness-0" />
          </div>
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest text-center">Partnered with authorized dealers</span>
        </div>
        <button onClick={() => collegeId && setScreen('category')} disabled={!collegeId} className={`w-full py-3.5 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${collegeId ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 active:scale-95' : 'bg-zinc-800 text-zinc-500'}`}>
          Customize your room {collegeId && <ChevronRight className="w-4 h-4" />}
        </button>
        <button onClick={() => setScreen('category')} className="w-full text-center text-xs text-zinc-500 mt-2.5 py-1 hover:text-zinc-300 transition-colors">Not sure yet? Browse without selecting</button>
      </div>
    </div>
  );
}

function CategoryScreen({ college, activeCategory, setActiveCategory, setScreen, cart, addOne, removeOne, cartCount, total }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cat = CATEGORIES.find((c) => c.id === activeCategory);
  const items = PRODUCTS.filter((p) => p.category === activeCategory && !p.hidden);
  const CatIcon = cat.icon;

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>
      <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-zinc-200/50 bg-white/70 backdrop-blur-md flex-shrink-0 safe-top relative z-10">
        <div className="flex items-center gap-2">
          <button onClick={() => setScreen('gate')} className="w-8 h-8 flex items-center justify-center rounded-full active:bg-zinc-100 transition" aria-label="Back">
            <ChevronLeft className="w-5 h-5 text-zinc-700" />
          </button>
          <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-full pl-1 pr-3 py-1 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center">{college ? college.code[0] : '?'}</div>
            <span className="text-xs font-medium text-zinc-800">{college ? college.name : 'All Campuses'}</span>
          </div>
        </div>
        <button onClick={() => setScreen('cart')} className="relative w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm active:bg-zinc-50 transition" aria-label="Cart">
          <ShoppingCart className="w-4 h-4 text-zinc-700" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">{cartCount}</span>}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        <div className="w-16 bg-zinc-50 border-r border-zinc-100 flex flex-col items-center py-2 gap-0.5 overflow-y-auto flex-shrink-0">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const active = c.id === activeCategory;
            return (
              <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`w-full flex flex-col items-center gap-1 py-3 border-l-2 transition-all duration-200 ${active ? 'border-orange-500 bg-white shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${active ? 'bg-orange-50' : ''}`}>
                  <Icon className={`w-4 h-4 ${active ? 'text-orange-500' : 'text-zinc-400'}`} />
                </div>
                <span className={`text-[9px] leading-tight text-center ${active ? 'text-orange-600 font-bold' : 'text-zinc-400'}`}>{c.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-auto px-3 pt-3 pb-4 bg-zinc-50/50">
          <h2 className="text-base font-bold text-zinc-900 px-1">{cat.fullLabel}</h2>
          <p className="text-xs text-zinc-400 mb-3 px-1">{items.length} options carefully selected • tap to explore</p>
          {cat.id === 'sleep' && (
            <div className="mx-1 mb-3 bg-[#e8f5e9] border border-[#c8e6c9] rounded-xl p-3 flex flex-col gap-1 shadow-sm">
              <div className="font-bold text-[#2e7d32] text-xs flex items-center gap-1.5">
                <span className="text-sm leading-none">💚</span> Price Match Promise
              </div>
              <div className="text-[10px] text-[#2e7d32]/90 leading-tight">
                Found the same product cheaper (including delivery charges)? Call or WhatsApp us at <span className="font-bold">+91 74003 90244</span>. We'll do our best to match or beat the price.
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {items.map((p) => {
              const qty = cart[p.id] || 0;
              return (
                <div key={p.id} className="border border-zinc-200 rounded-2xl p-3 relative bg-white flex flex-col shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]" onClick={() => setSelectedProduct(p)}>
                  {p.tag && <span className="absolute top-2 left-2 z-10 text-[10px] font-bold text-green-700 bg-green-100/90 px-2 py-0.5 rounded-full uppercase tracking-wide">{p.tag}</span>}
                  {p.image ? (
                    <div className="h-32 rounded-xl bg-zinc-50 mb-2.5 overflow-hidden relative border border-zinc-100/50">
                      <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-24 rounded-xl bg-zinc-50 flex items-center justify-center mb-2.5 border border-zinc-100/50">
                      <CatIcon className="w-8 h-8 text-zinc-300" />
                    </div>
                  )}
                  <div className="text-sm font-semibold text-zinc-900 leading-snug mb-0.5">{p.name}</div>
                  <div className="text-xs text-zinc-400 mb-1.5">{p.note}</div>
                  {p.warranty && (
                    <div className="flex items-center gap-1 text-[#2e7d32] mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold tracking-wide uppercase">{p.warranty}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto" onClick={(e) => e.stopPropagation()}>
                    {p.originalPrice ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-[#2e7d32] text-white font-bold px-1.5 py-0.5 rounded text-[13px]">Rs.{money(p.price)}</span>
                          <span className="text-zinc-400 line-through text-xs font-medium">Rs.{money(p.originalPrice)}</span>
                        </div>
                        <span className="text-[#2e7d32] text-[10px] font-bold tracking-wide mt-0.5">Rs.{money(p.originalPrice - p.price)} OFF</span>
                      </div>
                    ) : (
                      <span className="font-bold text-zinc-900 text-sm">Rs.{money(p.price)}</span>
                    )}
                    {qty === 0 ? (
                      <button onClick={(e) => { e.stopPropagation(); addOne(p.id); }} className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl active:bg-orange-600 shadow-sm shadow-orange-500/20 hover:bg-orange-600 transition-all duration-150 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2.5 bg-orange-500 rounded-xl px-2 py-1.5 shadow-sm shadow-orange-500/20">
                        <button onClick={(e) => { e.stopPropagation(); removeOne(p.id); }} className="w-5 h-5 flex items-center justify-center text-white bg-white/20 rounded-lg"><Minus className="w-3 h-3" /></button>
                        <span className="text-white text-xs font-bold w-3 text-center">{qty}</span>
                        <button onClick={(e) => { e.stopPropagation(); if (qty < MAX_QTY) addOne(p.id); }} className={`w-5 h-5 flex items-center justify-center text-white rounded-lg ${qty >= MAX_QTY ? 'bg-white/10 cursor-not-allowed' : 'bg-white/20'}`}><Plus className="w-3 h-3" /></button>
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
        <div className="flex-shrink-0 border-t border-zinc-100 safe-bottom" style={{ background: 'rgba(255,255,255,0.97)' }}>
          <div className="px-4 py-3">
            <button onClick={() => setScreen('cart')} className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-2xl flex items-center justify-between px-5 shadow-lg shadow-orange-500/25 active:bg-orange-600 transition-all duration-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-xs font-black">{cartCount}</div>
                <span>{cartCount} item{cartCount > 1 ? 's' : ''} added</span>
              </div>
              <div className="flex items-center gap-1.5"><span>Rs.{money(total)}</span><ChevronRight className="w-4 h-4" /></div>
            </button>
          </div>
        </div>
      )}
      {selectedProduct && <ProductModal product={selectedProduct} cart={cart} addOne={addOne} removeOne={removeOne} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}

function CartScreen({ cartItems, categoriesCovered, subtotal, total, deliveryFee, addOne, removeOne, setScreen }) {

  const realItems = cartItems.filter(i => i.id !== 'free-pillow');
  const mattressCount = realItems.filter(i => i.category === 'sleep' && i.id.startsWith('m')).reduce((sum, i) => sum + i.qty, 0);
  const hasFreePillow = mattressCount > 0;
  const grouped = CATEGORIES.map((cat) => ({ cat, items: realItems.filter((i) => i.category === cat.id) })).filter((g) => g.items.length > 0);
  const missingCategory = CATEGORIES.find((c) => !realItems.some((i) => i.category === c.id));

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>
      <ScreenHeader title="Your room setup" onBack={() => setScreen('category')} />
      <div className="flex-1 overflow-y-auto px-4 py-4 relative z-10">
        {realItems.length === 0 ? (
          <div className="text-center text-zinc-400 text-sm mt-20">Your setup is empty. Go add some essentials!</div>
        ) : (
          <div className="space-y-4">
            {grouped.map(({ cat, items }) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
                  <h3 className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase mb-3 flex items-center gap-2"><Icon className="w-3.5 h-3.5" /> {cat.fullLabel}</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        {item.image ? (
                          <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex-shrink-0 overflow-hidden"><img src={item.image} alt="" className="w-full h-full object-cover" /></div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-zinc-300" /></div>
                        )}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="text-sm font-semibold text-zinc-900 leading-snug">{item.name}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">Rs.{money(item.price)}</div>
                        </div>
                        <div className="text-right flex-shrink-0 pt-0.5">
                          <div className="text-sm font-bold text-zinc-900 mb-2">Rs.{money(item.price * item.qty)}</div>
                          <div className="flex items-center gap-2 bg-zinc-100 rounded-xl px-1.5 py-1">
                            <button onClick={() => removeOne(item.id)} className="w-5 h-5 flex items-center justify-center text-zinc-600 bg-white rounded-lg shadow-sm"><Minus className="w-3 h-3" /></button>
                            <span className="text-xs font-semibold w-3 text-center">{item.qty}</span>
                            <button onClick={() => addOne(item.id)} className="w-5 h-5 flex items-center justify-center text-zinc-600 bg-white rounded-lg shadow-sm"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {hasFreePillow && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-200/50 rounded-full blur-xl" />
                <h3 className="text-[10px] font-bold text-indigo-500 tracking-wider uppercase mb-3 flex items-center gap-2 relative z-10">🎁 Special Offer Unlocked</h3>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white border border-indigo-100 flex-shrink-0 overflow-hidden p-1.5"><img src="/cloud_pillow.webp" alt="" className="w-full h-full object-contain rounded-lg" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-indigo-900">Cloud Pillow {mattressCount > 1 ? `(x${mattressCount})` : ''}</div>
                    <div className="text-xs text-indigo-700">Free with mattress</div>
                  </div>
                  <div className="text-sm font-bold text-green-600">Free</div>
                </div>
              </div>
            )}

            {missingCategory ? (
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 flex gap-2 items-start shadow-sm">
                <Lightbulb className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-800 leading-snug">You haven't added any {missingCategory.label} essentials. Want to go back and check?</p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex gap-2 items-start shadow-sm">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-800 leading-snug">Awesome! You've got essentials from all categories.</p>
              </div>
            )}
            <div className="bg-white rounded-2xl p-4 space-y-3 border border-zinc-100 shadow-sm">
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Cart subtotal</span><span className="font-medium text-zinc-900">Rs.{money(subtotal)}</span></div>

              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Delivery to hostel room</span>
                {deliveryFee > 0
                  ? <span className="font-bold text-zinc-700">Rs.{money(deliveryFee)}</span>
                  : <span className="font-bold text-green-600">Free</span>}
              </div>
              <div className="border-t border-dashed border-zinc-200 pt-3 flex justify-between">
                <span className="font-bold text-zinc-900">Total to pay</span>
                <span className="text-lg font-black text-orange-500">Rs.{money(total)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 flex items-center gap-1.5">
                  <span>🚚</span>
                  <span>Add <strong>Rs.{money(FREE_DELIVERY_THRESHOLD - subtotal)}</strong> more for <strong>free delivery</strong></span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white/70 backdrop-blur-md border-t border-zinc-100 px-4 py-3 flex-shrink-0 safe-bottom">
        <button disabled={realItems.length === 0} onClick={() => setScreen('delivery')} className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${realItems.length ? 'bg-orange-500 text-white active:bg-orange-600 shadow-orange-500/20 hover:bg-orange-600' : 'bg-zinc-100 text-zinc-400 shadow-none'}`}>
          Proceed to delivery <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function DeliveryScreen({ delivery, setDelivery, setScreen }) {
  const update = (field) => (e) => setDelivery((prev) => ({ ...prev, [field]: e.target.value }));
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!delivery.fullName.trim())    e.fullName    = 'Full name is required';
    if (!delivery.hostelBlock.trim()) e.hostelBlock = 'Please select a hostel block';
    if (!delivery.hostelRoom.trim())  e.hostelRoom  = 'Hostel name & room number is required';
    if (!delivery.deliveryDate.trim())e.deliveryDate= 'Preferred delivery date is required';
    const phone = delivery.whatsapp.replace(/\D/g, '').replace(/^91/, '');
    if (!phone) e.whatsapp = 'WhatsApp number is required';
    else if (!/^[6-9]\d{9}$/.test(phone)) e.whatsapp = 'Please enter a valid 10-digit Indian mobile number';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>
      <ScreenHeader title="Delivery details" onBack={() => setScreen('cart')} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 relative z-10">
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Full name <span className="text-red-400">*</span></label>
          <input value={delivery.fullName} onChange={update('fullName')} placeholder="As per hostel allotment letter" className={`w-full border-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white transition-colors ${errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-zinc-100 focus:border-orange-500'}`} />
          {errors.fullName && <p className="text-xs text-red-500 mt-1 font-medium">{errors.fullName}</p>}
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Hostel block <span className="text-red-400">*</span></label>
          <div className="grid grid-cols-2 gap-3">
            {['Boys hostel', 'Girls hostel'].map((opt) => (
              <button key={opt} onClick={() => { setDelivery((prev) => ({ ...prev, hostelBlock: opt })); setErrors(p => ({ ...p, hostelBlock: undefined })); }} className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${delivery.hostelBlock === opt ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-sm' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-200'}`}>{opt}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Hostel name &amp; room no. <span className="text-red-400">*</span></label>
          <input value={delivery.hostelRoom} onChange={update('hostelRoom')} placeholder="e.g. BH-3, Room 214" className={`w-full border-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white transition-colors ${errors.hostelRoom ? 'border-red-400 focus:border-red-400' : 'border-zinc-100 focus:border-orange-500'}`} />
          {errors.hostelRoom && <p className="text-xs text-red-500 mt-1 font-medium">{errors.hostelRoom}</p>}
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Preferred delivery date <span className="text-red-400">*</span></label>
          <input value={delivery.deliveryDate} onChange={update('deliveryDate')} type="date" min={new Date().toISOString().split('T')[0]} className={`w-full border-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white transition-colors ${errors.deliveryDate ? 'border-red-400 focus:border-red-400' : 'border-zinc-100 focus:border-orange-500'}`} />
          {errors.deliveryDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.deliveryDate}</p>}
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Your WhatsApp number <span className="text-red-400">*</span></label>
          <input value={delivery.whatsapp} onChange={update('whatsapp')} type="tel" placeholder="+91 98765 43210" className={`w-full border-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white transition-colors ${errors.whatsapp ? 'border-red-400 focus:border-red-400' : 'border-zinc-100 focus:border-orange-500'}`} />
          {errors.whatsapp && <p className="text-xs text-red-500 mt-1 font-medium">{errors.whatsapp}</p>}
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Alternative mobile number (Optional)</label>
          <input value={delivery.altMobile} onChange={update('altMobile')} type="tel" placeholder="+91 12345 67890" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
        </div>
      </div>
      <div className="border-t border-zinc-200/50 px-4 py-3 flex-shrink-0 safe-bottom bg-white/70 backdrop-blur-md relative z-10">
        {Object.keys(errors).length > 0 && (
          <div className="mb-2 px-1">
            {Object.values(errors).map((err, i) => (
              <div key={i} className="text-xs text-red-500 font-medium flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />{err}
              </div>
            ))}
          </div>
        )}
        <button disabled={isSending} onClick={() => { if (validate()) submitOrder(); }} className={`w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${isSending ? 'bg-zinc-400 cursor-not-allowed shadow-none' : 'bg-orange-500 active:bg-orange-600 shadow-orange-500/20 hover:bg-orange-600'}`}>
          {isSending ? 'Saving Order...' : 'Review & send order'} {!isSending && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function SuccessScreen({ college, delivery, cartItems, total, handleSendWhatsApp, setScreen, orderId, orderSubmitted, isSending }) {
  if (orderSubmitted) {
    return (
      <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="flex-1 overflow-y-auto px-6 pt-12 pb-4 flex flex-col items-center text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900 mb-2">Order placed!</h1>
          <p className="text-sm text-zinc-500 mb-8">Your order ID is <span className="font-bold text-zinc-900">{orderId}</span></p>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 w-full mb-8">
            <p className="text-xs leading-relaxed text-orange-800 font-medium">We'll confirm pricing, availability, and delivery timing within a few hours on WhatsApp.</p>
          </div>
          <button onClick={() => { window.location.reload(); }} className="text-sm font-bold text-zinc-400">Start new order</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>
      <div className="flex items-center px-4 pt-3 pb-1 flex-shrink-0 safe-top relative z-10">
        <button onClick={() => setScreen('delivery')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm shadow-sm active:bg-zinc-100 transition" aria-label="Back">
          <ChevronLeft className="w-5 h-5 text-zinc-700" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4 flex flex-col items-center text-center relative z-10">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5 border border-green-100">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-zinc-900 mb-2">Almost done!</h1>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed max-w-[280px]">Send this directly to Wisor on WhatsApp. We'll confirm your order and delivery schedule instantly.</p>
        <div className="w-full bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 text-left mb-6 shadow-sm">
          <div className="text-[10px] font-black text-zinc-400 mb-3 tracking-widest uppercase">Order Summary {college ? `• ${college.name}` : ''}</div>
          <div className="text-sm font-bold text-zinc-900 mb-1">{delivery.fullName || 'Your name'}</div>
          <div className="text-xs font-medium text-zinc-500 mb-4">{delivery.hostelBlock}, {delivery.hostelRoom || 'Room TBD'}<br />By {delivery.deliveryDate || 'TBD'}</div>
          <div className="space-y-2 mb-4">
            {cartItems.map((item, idx) => (
              <div key={item.id || idx} className="flex justify-between text-xs font-medium gap-2">
                <span className={`truncate ${item.price === 0 ? 'text-indigo-600' : 'text-zinc-600'}`}>{item.qty}x {item.name} {item.price === 0 && '(Free)'}</span>
                <span className={`flex-shrink-0 ${item.price === 0 ? 'text-indigo-600' : 'text-zinc-800'}`}>Rs.{money(item.price * item.qty)}</span>
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
        <button onClick={handleSendWhatsApp} disabled={isSending} className={`w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all ${isSending ? 'bg-zinc-400 cursor-not-allowed' : 'bg-[#25D366] active:bg-[#1DA851] hover:-translate-y-0.5'}`}>
          <MessageCircle className="w-5 h-5" /> {isSending ? 'Sending...' : 'Send order on WhatsApp'}
        </button>
        <p className="text-center text-[10px] font-medium text-zinc-400 mt-4 tracking-wide uppercase">OPENS WHATSAPP WITH PRE-FILLED DETAILS</p>
      </div>
    </div>
  );
}

// ===========================================================================
// DESKTOP COMPONENTS (lg and above)
// ===========================================================================

function DesktopNav({ college, cartCount, total, screen, setScreen, setCollegeId }) {
  return (
    <header className="h-16 bg-white border-b border-zinc-100 flex items-center justify-between px-8 flex-shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-black tracking-tight text-zinc-900">wisor<span className="text-orange-500">.</span></div>
        {college && screen !== 'gate' && (
          <button onClick={() => { setCollegeId(null); setScreen('gate'); }} className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors">
            <div className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[9px] font-bold flex items-center justify-center">{college.code[0]}</div>
            {college.name} <span className="text-zinc-400">·</span> <span className="text-zinc-400">Change</span>
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        {screen === 'category' && cartCount > 0 && (
          <button onClick={() => setScreen('delivery')} className="flex items-center gap-2 bg-orange-500 text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20">
            <ShoppingCart className="w-4 h-4" /> {cartCount} item{cartCount > 1 ? 's' : ''} · Rs.{money(total)} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
        {(screen === 'delivery' || screen === 'cart') && (
          <button onClick={() => setScreen('category')} className="flex items-center gap-2 border border-zinc-200 text-zinc-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-zinc-50 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to shopping
          </button>
        )}
      </div>
    </header>
  );
}

function DesktopGate({ collegeId, setCollegeId, setScreen }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left hero */}
      <div className="w-1/2 bg-zinc-950 flex flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-5 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="text-4xl font-black tracking-tight text-white mb-1">wisor<span className="text-orange-500">.</span></div>
          <div className="text-zinc-500 text-sm font-medium">Your hostel room, sorted.</div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white leading-tight mb-5">Everything<br />your hostel<br />room needs.</h1>
          <p className="text-zinc-400 leading-relaxed max-w-sm text-base">Carefully curated essentials delivered directly to your hostel room before you arrive.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Free delivery', 'Hostel-ready picks', 'WhatsApp order'].map(tag => (
              <span key={tag} className="text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">✓ {tag}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2 mb-2">
            <div className="inline-flex items-center justify-center">
              <img src="/sleepwell_logo.png" alt="Sleepwell" className="h-8 object-contain invert brightness-0" />
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Partnered with authorized dealers</span>
          </div>
          <div className="text-zinc-700 text-xs">Trusted by students at IIIT &amp; MNNIT Allahabad</div>
        </div>
      </div>

      {/* Right: college selector */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Which campus<br />are you joining?</h2>
          <p className="text-zinc-400 text-sm mb-8">We'll show only the items your hostel actually needs.</p>
          <div className="space-y-3 mb-8">
            {COLLEGES.map((c) => {
              const active = collegeId === c.id;
              return (
                <button key={c.id} onClick={() => setCollegeId(c.id)} className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all duration-200 ${active ? 'border-orange-500 bg-orange-50 shadow-md shadow-orange-500/10' : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200 hover:bg-white'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-200 ${active ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-zinc-200 text-zinc-600'}`}>{c.code}</div>
                    <div>
                      <div className="font-bold text-zinc-900 text-base">{c.name}</div>
                      <div className="text-sm text-zinc-400">{c.sub}</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${active ? 'border-orange-500 bg-orange-500' : 'border-zinc-300'}`}>
                    {active && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
          <button onClick={() => collegeId && setScreen('category')} disabled={!collegeId} className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 ${collegeId ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/25 hover:bg-orange-600 hover:-translate-y-0.5' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}>
            {collegeId ? 'Customize my room' : 'Select a campus first'}
            {collegeId && <ChevronRight className="w-5 h-5" />}
          </button>
          <button onClick={() => setScreen('category')} className="w-full text-center text-sm text-zinc-400 mt-3 py-2 hover:text-zinc-600 transition-colors">Browse without selecting →</button>
        </div>
      </div>
    </div>
  );
}

function DesktopShop({ college, activeCategory, setActiveCategory, setScreen, cart, addOne, removeOne, subtotal, finalCartItems, deliveryFee, total: totalWithDelivery }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cat = CATEGORIES.find((c) => c.id === activeCategory);
  const items = PRODUCTS.filter((p) => p.category === activeCategory && !p.hidden);

  const realItems = finalCartItems.filter(i => i.id !== 'free-pillow');
  const mattressCount = realItems.filter(i => i.category === 'sleep' && i.id.startsWith('m')).reduce((sum, i) => sum + i.qty, 0);
  const hasFreePillow = mattressCount > 0;
  const missingCategory = CATEGORIES.find((c) => !realItems.some((i) => i.category === c.id));
  const cartCount = realItems.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left: Category Sidebar */}
      <div className="w-52 bg-zinc-50 border-r border-zinc-100 flex flex-col py-4 overflow-y-auto flex-shrink-0">
        <div className="px-4 mb-3">
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Categories</div>
        </div>
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const active = c.id === activeCategory;
          const catCartCount = realItems.filter(i => i.category === c.id).reduce((s, i) => s + i.qty, 0);
          return (
            <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 relative ${active ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}>
              {active && <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-orange-500 rounded-r" />}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${active ? 'bg-orange-50' : 'bg-zinc-100'}`}>
                <Icon className={`w-4 h-4 ${active ? 'text-orange-500' : 'text-zinc-400'}`} />
              </div>
              <span className={`text-sm font-semibold flex-1 ${active ? 'text-orange-600' : 'text-zinc-600'}`}>{c.fullLabel}</span>
              {catCartCount > 0 && <span className="w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">{catCartCount}</span>}
            </button>
          );
        })}

      </div>

      {/* Center: Product Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-5 bg-zinc-50/50">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-zinc-900">{cat.fullLabel}</h2>
          <p className="text-sm text-zinc-400 mt-0.5">{items.length} options carefully selected · click to see details</p>
          {cat.id === 'sleep' && (
            <div className="mt-4 mb-2 bg-[#e8f5e9] border border-[#c8e6c9] rounded-xl p-4 flex flex-col gap-1.5 shadow-sm max-w-2xl">
              <div className="font-bold text-[#2e7d32] text-sm flex items-center gap-1.5">
                <span className="leading-none">💚</span> Price Match Promise
              </div>
              <div className="text-xs text-[#2e7d32]/90 leading-relaxed">
                Found the same product cheaper (including delivery charges)? Call or WhatsApp us at <span className="font-bold">+91 74003 90244</span>. We'll do our best to match or beat the price.
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((p) => {
            const qty = cart[p.id] || 0;
            const CatIcon = cat.icon;
            return (
              <div key={p.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col group" onClick={() => setSelectedProduct(p)}>
                <div className="h-40 bg-zinc-50 relative overflow-hidden border-b border-zinc-100">
                  {p.tag && <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold text-green-700 bg-green-100/90 px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">{p.tag}</span>}
                  {p.image ? <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-full flex items-center justify-center"><CatIcon className="w-12 h-12 text-zinc-200" /></div>}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-sm font-bold text-zinc-900 leading-snug mb-0.5">{p.name}</div>
                  <div className="text-xs text-zinc-400 mb-2">{p.note}</div>
                  {p.warranty && (
                    <div className="flex items-center gap-1 text-[#2e7d32] mb-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[11px] font-bold tracking-wide uppercase">{p.warranty}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-2" onClick={e => e.stopPropagation()}>
                    {p.originalPrice ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-[#2e7d32] text-white font-bold px-1.5 py-0.5 rounded text-sm">Rs.{money(p.price)}</span>
                          <span className="text-zinc-400 line-through text-xs font-medium">Rs.{money(p.originalPrice)}</span>
                        </div>
                        <span className="text-[#2e7d32] text-xs font-bold tracking-wide mt-0.5">Rs.{money(p.originalPrice - p.price)} OFF</span>
                      </div>
                    ) : (
                      <span className="font-black text-zinc-900">Rs.{money(p.price)}</span>
                    )}
                    {qty === 0 ? (
                      <button onClick={(e) => { e.stopPropagation(); addOne(p.id); }} className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-600 shadow-sm shadow-orange-500/20 transition-all flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-orange-500 rounded-xl px-2 py-1.5 shadow-sm shadow-orange-500/20">
                        <button onClick={(e) => { e.stopPropagation(); removeOne(p.id); }} className="w-5 h-5 flex items-center justify-center text-white bg-white/20 rounded-lg"><Minus className="w-3 h-3" /></button>
                        <span className="text-white text-xs font-bold w-4 text-center">{qty}</span>
                        <button onClick={(e) => { e.stopPropagation(); if (qty < MAX_QTY) addOne(p.id); }} className={`w-5 h-5 flex items-center justify-center text-white rounded-lg ${qty >= MAX_QTY ? 'bg-white/10 cursor-not-allowed' : 'bg-white/20'}`}><Plus className="w-3 h-3" /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Live Cart Panel */}
      <div className="w-80 bg-white border-l border-zinc-100 flex flex-col flex-shrink-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between flex-shrink-0">
          <div className="font-bold text-zinc-900 flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-orange-500" /> Your setup</div>
          {cartCount > 0 && <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{cartCount} item{cartCount > 1 ? 's' : ''}</span>}
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {realItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-8">
              <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-3"><ShoppingBag className="w-6 h-6 text-zinc-300" /></div>
              <p className="text-sm text-zinc-400 font-medium">Your cart is empty</p>
              <p className="text-xs text-zinc-300 mt-1">Click any product to add it</p>
            </div>
          ) : (
            <div className="space-y-3">
              {realItems.map((item) => {
                const Icon = CATEGORIES.find(c => c.id === item.category)?.icon || BedDouble;
                return (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-zinc-50">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden flex-shrink-0">
                      {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Icon className="w-4 h-4 text-zinc-300" /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-zinc-900 leading-snug truncate">{item.name}</div>
                      <div className="text-xs text-zinc-400">Rs.{money(item.price)}</div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-zinc-100 rounded-lg px-1 py-0.5 flex-shrink-0">
                      <button onClick={() => removeOne(item.id)} className="w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-zinc-800 bg-white rounded-md shadow-sm"><Minus className="w-2.5 h-2.5" /></button>
                      <span className="text-xs font-bold w-3 text-center text-zinc-800">{item.qty}</span>
                      <button onClick={() => addOne(item.id)} className="w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-zinc-800 bg-white rounded-md shadow-sm"><Plus className="w-2.5 h-2.5" /></button>
                    </div>
                  </div>
                );
              })}
              {hasFreePillow && (
                <div className="flex items-center gap-3 py-2 border-b border-zinc-50">
                  <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center flex-shrink-0 p-1"><img src="/cloud_pillow.webp" alt="" className="w-full h-full object-contain rounded-lg" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-indigo-800">Cloud Pillow {mattressCount > 1 ? `(x${mattressCount})` : ''}</div>
                    <div className="text-xs text-indigo-400">Free gift</div>
                  </div>
                  <span className="text-xs font-bold text-green-600">FREE</span>
                </div>
              )}

              {missingCategory && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2 mt-2">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">Missing <strong>{missingCategory.label}</strong> essentials</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 border-t border-zinc-100 p-4 space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-zinc-500"><span>Subtotal</span><span className="font-medium text-zinc-800">Rs.{money(subtotal)}</span></div>
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Delivery</span>
              {deliveryFee > 0
                ? <span className="font-bold text-zinc-700">Rs.{money(deliveryFee)}</span>
                : <span className="font-bold text-green-600">Free</span>}
            </div>
            {deliveryFee > 0 && (
              <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1.5 flex items-center gap-1">
                🚚 Add <strong className="mx-0.5">Rs.{money(FREE_DELIVERY_THRESHOLD - subtotal)}</strong> for free delivery
              </div>
            )}
            <div className="flex justify-between font-bold text-sm pt-1 border-t border-dashed border-zinc-200">
              <span className="text-zinc-900">Total</span>
              <span className="text-orange-500 text-base font-black">Rs.{money(totalWithDelivery)}</span>
            </div>
          </div>
          <button disabled={realItems.length === 0} onClick={() => setScreen('delivery')} className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all duration-200 ${realItems.length > 0 ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20 hover:-translate-y-0.5' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}>
            {realItems.length > 0 ? <> Proceed to delivery <ChevronRight className="w-4 h-4" /></> : 'Add items to continue'}
          </button>
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} cart={cart} addOne={addOne} removeOne={removeOne} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}

function DesktopDelivery({ delivery, setDelivery, setScreen, finalCartItems, subtotal, total, deliveryFee }) {
  const update = (field) => (e) => setDelivery((prev) => ({ ...prev, [field]: e.target.value }));
  const realItems = finalCartItems.filter(i => i.id !== 'free-pillow');
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!delivery.fullName.trim())    e.fullName    = 'Full name is required';
    if (!delivery.hostelBlock.trim()) e.hostelBlock = 'Please select a hostel block';
    if (!delivery.hostelRoom.trim())  e.hostelRoom  = 'Hostel name & room number is required';
    if (!delivery.deliveryDate.trim())e.deliveryDate= 'Preferred delivery date is required';
    const phone = delivery.whatsapp.replace(/\D/g, '').replace(/^91/, '');
    if (!phone) e.whatsapp = 'WhatsApp number is required';
    else if (!/^[6-9]\d{9}$/.test(phone)) e.whatsapp = 'Please enter a valid 10-digit Indian mobile number';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className="flex-1 overflow-y-auto flex items-start justify-center px-6 py-10 bg-zinc-50">
      <div className="w-full max-w-3xl grid grid-cols-5 gap-6">
        <div className="col-span-3 bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900 mb-1">Delivery details</h2>
          <p className="text-sm text-zinc-400 mb-6">We'll deliver directly to your hostel room.</p>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Full name <span className="text-red-400">*</span></label>
              <input value={delivery.fullName} onChange={update('fullName')} placeholder="As per hostel allotment letter" className={`w-full border-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:bg-white transition-colors ${errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-zinc-100 focus:border-orange-500'}`} />
              {errors.fullName && <p className="text-xs text-red-500 mt-1 font-medium">{errors.fullName}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Hostel block <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-2 gap-3">
                {['Boys hostel', 'Girls hostel'].map((opt) => (
                  <button key={opt} onClick={() => { setDelivery((prev) => ({ ...prev, hostelBlock: opt })); setErrors(p => ({ ...p, hostelBlock: undefined })); }} className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${delivery.hostelBlock === opt ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-200'}`}>{opt}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Hostel name &amp; room no. <span className="text-red-400">*</span></label>
              <input value={delivery.hostelRoom} onChange={update('hostelRoom')} placeholder="e.g. BH-3, Room 214" className={`w-full border-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:bg-white transition-colors ${errors.hostelRoom ? 'border-red-400 focus:border-red-400' : 'border-zinc-100 focus:border-orange-500'}`} />
              {errors.hostelRoom && <p className="text-xs text-red-500 mt-1 font-medium">{errors.hostelRoom}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Preferred delivery date <span className="text-red-400">*</span></label>
              <input value={delivery.deliveryDate} onChange={update('deliveryDate')} type="date" min={new Date().toISOString().split('T')[0]} className={`w-full border-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:bg-white transition-colors ${errors.deliveryDate ? 'border-red-400 focus:border-red-400' : 'border-zinc-100 focus:border-orange-500'}`} />
              {errors.deliveryDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.deliveryDate}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Your WhatsApp number <span className="text-red-400">*</span></label>
              <input value={delivery.whatsapp} onChange={update('whatsapp')} type="tel" placeholder="+91 98765 43210" className={`w-full border-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:bg-white transition-colors ${errors.whatsapp ? 'border-red-400 focus:border-red-400' : 'border-zinc-100 focus:border-orange-500'}`} />
              {errors.whatsapp && <p className="text-xs text-red-500 mt-1 font-medium">{errors.whatsapp}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Alternative mobile number (Optional)</label>
              <input value={delivery.altMobile} onChange={update('altMobile')} type="tel" placeholder="+91 12345 67890" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
            </div>
          </div>
          <div className="border-t border-zinc-200 pt-5 mt-6">
            {Object.keys(errors).length > 0 && (
              <div className="mb-3 px-1">
                {Object.values(errors).map((err, i) => (
                  <div key={i} className="text-xs text-red-500 font-medium flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />{err}
                  </div>
                ))}
              </div>
            )}
            <button disabled={isSending} onClick={() => { if (validate()) submitOrder(); }} className={`w-full py-4 rounded-xl font-bold text-base text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${isSending ? 'bg-zinc-400 cursor-not-allowed shadow-none' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'}`}>
              {isSending ? 'Saving Order...' : 'Review & place order'} {!isSending && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Order summary</div>
            <div className="space-y-3 mb-4">
              {realItems.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden flex-shrink-0">
                    {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 truncate">{item.name}</div>
                    <div className="text-xs text-zinc-400">×{item.qty}</div>
                  </div>
                  <span className="text-xs font-bold text-zinc-800 flex-shrink-0">Rs.{money(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-zinc-200 pt-3 space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Delivery</span>
                {deliveryFee > 0
                  ? <span className="font-bold text-zinc-700">Rs.{money(deliveryFee)}</span>
                  : <span className="font-bold text-green-600">Free</span>}
              </div>
              <div className="flex justify-between font-black text-base"><span className="text-zinc-900">Total</span><span className="text-orange-500">Rs.{money(total)}</span></div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 leading-relaxed">
              {deliveryFee > 0
                ? <><strong>Rs.{money(DELIVERY_FEE_AMOUNT)} delivery charge</strong> applies for orders under Rs.{money(FREE_DELIVERY_THRESHOLD)}. Add Rs.{money(FREE_DELIVERY_THRESHOLD - subtotal)} more to unlock free delivery!</>
                : <><strong>Free delivery</strong> directly to your hostel room. We confirm over WhatsApp within 30 minutes.</>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopSuccess({ college, delivery, cartItems, total, handleSendWhatsApp, setScreen, orderId, orderSubmitted, isSending }) {
  if (orderSubmitted) {
    return (
      <div className="flex-1 overflow-y-auto flex items-center justify-center px-6 py-10 bg-zinc-50">
        <div className="w-full max-w-lg bg-white rounded-3xl p-10 border border-zinc-100 shadow-lg text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-zinc-900 mb-2">Order placed!</h1>
          <p className="text-zinc-500 mb-6">Your order ID is <span className="font-bold text-zinc-900">{orderId}</span></p>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-8">
            <p className="text-sm text-orange-800 font-medium">We'll confirm pricing, availability, and delivery timing within a few hours on WhatsApp.</p>
          </div>
          <button onClick={() => { window.location.reload(); }} className="text-sm font-semibold text-zinc-500 hover:text-zinc-800 transition-colors">Start a new order</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto flex items-center justify-center px-6 py-10 bg-zinc-50">
      <div className="w-full max-w-lg bg-white rounded-3xl p-10 border border-zinc-100 shadow-lg text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-black text-zinc-900 mb-2">Almost done!</h1>
        <p className="text-zinc-500 mb-8 leading-relaxed max-w-sm mx-auto">Tap below to send your order details to Wisor on WhatsApp. We confirm instantly.</p>
        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-left mb-6">
          <div className="text-[10px] font-black text-zinc-400 mb-3 tracking-widest uppercase">Order Summary {college ? `· ${college.name}` : ''}</div>
          <div className="font-bold text-zinc-900 mb-0.5">{delivery.fullName || 'Your name'}</div>
          <div className="text-xs text-zinc-500 mb-4">{delivery.hostelBlock}, {delivery.hostelRoom || 'Room TBD'} · By {delivery.deliveryDate || 'TBD'}</div>
          <div className="space-y-2 mb-4">
            {cartItems.map((item, idx) => (
              <div key={item.id || idx} className="flex justify-between text-xs font-medium gap-2">
                <span className={`truncate ${item.price === 0 ? 'text-indigo-600' : 'text-zinc-600'}`}>{item.qty}× {item.name} {item.price === 0 && '(Free)'}</span>
                <span className={`flex-shrink-0 ${item.price === 0 ? 'text-indigo-600' : 'text-zinc-800'}`}>Rs.{money(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-zinc-200 pt-3 flex justify-between">
            <span className="font-bold text-zinc-900">Total</span>
            <span className="text-lg font-black text-orange-500">Rs.{money(total)}</span>
          </div>
        </div>
        <button onClick={handleSendWhatsApp} disabled={isSending} className={`w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${isSending ? 'bg-zinc-400 cursor-not-allowed' : 'bg-[#25D366] shadow-[#25D366]/20 hover:-translate-y-0.5 hover:shadow-xl'}`}>
          <MessageCircle className="w-5 h-5" /> {isSending ? 'Sending...' : 'Send order on WhatsApp'}
        </button>
        <p className="text-xs text-zinc-400 mt-3 tracking-wide uppercase">Opens WhatsApp with pre-filled details</p>
        <button onClick={() => setScreen('category')} className="mt-4 text-sm text-zinc-400 hover:text-zinc-700 transition-colors">← Back to shopping</button>
      </div>
    </div>
  );
}

// ===========================================================================
// Main App — state + responsive render
// ===========================================================================
export default function App() {
  const [screen, setScreen] = useState('gate');
  const [collegeId, setCollegeId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('sleep');
  const [cart, setCart] = useState(() => {
    try { const saved = localStorage.getItem('wisor-cart'); return saved ? JSON.parse(saved) : {}; }
    catch { return {}; }
  });
  const [delivery, setDelivery] = useState({ fullName: '', hostelBlock: 'Boys hostel', hostelRoom: '', deliveryDate: '', whatsapp: '', altMobile: '' });
  const [toast, setToast] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSending, setIsSending] = useState(false);
  const toastTimerRef = React.useRef(null);

  // Persist cart to localStorage
  useEffect(() => {
    try { localStorage.setItem('wisor-cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  // Browser history navigation
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.screen) setScreen(e.state.screen);
      else setScreen('gate');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newScreen) => {
    window.history.pushState({ screen: newScreen }, '', `#${newScreen}`);
    setScreen(newScreen);
  };

  useEffect(() => {
    if (collegeId) {
      const code = COLLEGES.find(c => c.id === collegeId)?.code || 'WSR';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let id = '';
      for (let i = 0; i < 4; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
      setOrderId(`WSR-${code}-${id}`);
    }
  }, [collegeId]);

  const college = COLLEGES.find((c) => c.id === collegeId) || null;
  const baseCartItems = Object.entries(cart).filter(([, qty]) => qty > 0).map(([id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return null;
    return { ...product, qty };
  }).filter(Boolean);
  const cartCount = baseCartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = baseCartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  let finalCartItems = [...baseCartItems];
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE_AMOUNT;
  const total = subtotal + deliveryFee;
  const categoriesCovered = new Set(baseCartItems.map((i) => i.category)).size;

  function addOne(id) {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current >= MAX_QTY) return prev;
      return { ...prev, [id]: current + 1 };
    });
  }
  function removeOne(id) {
    setCart((prev) => {
      const next = { ...prev };
      const q = (next[id] || 0) - 1;
      if (q <= 0) delete next[id]; else next[id] = q;
      return next;
    });
  }
  function showToast(msg) {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(''), 1700);
  }
  function buildWhatsAppMessage() {
    const lines = [];
    lines.push(`*New Wisor order* - ${college ? college.name : 'Hostel'}`);
    lines.push(`*Order ID:* ${orderId}`);
    lines.push(`---`);
    lines.push(`*Name:* ${delivery.fullName || 'Not provided'}`);
    lines.push(`*Room:* ${delivery.hostelBlock}, ${delivery.hostelRoom || 'TBD'}`);
    lines.push(`*Delivery:* ${delivery.deliveryDate || 'TBD'}`);
    lines.push(`*Phone:* ${delivery.whatsapp || 'Not provided'}`);
    if (delivery.altMobile) lines.push(`*Alt Phone:* ${delivery.altMobile}`);
    lines.push(`---`);
    finalCartItems.forEach((i) => {
      if (i.price === 0) lines.push(`${i.qty}x ${i.name} - *FREE*`);
      else lines.push(`${i.qty}x ${i.name} - Rs.${money(i.price * i.qty)}`);
    });
    lines.push(`---`);
    if (deliveryFee > 0) lines.push(`Delivery charges - Rs.${money(deliveryFee)}`);
    else lines.push(`Delivery - *FREE* (order above Rs.${money(FREE_DELIVERY_THRESHOLD)})`);
    lines.push(`*Total: Rs.${money(total)}*`);
    return lines.join('\n');
  }

  async function saveOrderToSpreadsheet() {
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
    if (!sheetUrl) return; 
    
    const payload = {
      Timestamp: new Date().toISOString(),
      OrderID: orderId,
      Name: delivery.fullName,
      PrimaryMobile: `'${delivery.whatsapp}`,
      AlternativeMobile: delivery.altMobile ? `'${delivery.altMobile}` : '',
      College: college ? college.name : '',
      HostelBlock: delivery.hostelBlock,
      Room: delivery.hostelRoom,
      DeliveryDate: delivery.deliveryDate,
      OrderValue: total,
      ProductsJSON: finalCartItems.map(item => `${item.qty}x ${item.name} (Rs.${item.price * item.qty})`).join('\n'),
      WhatsAppMessage: buildWhatsAppMessage(),
      WhatsAppURL: `https://wa.me/${WISOR_WA_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`,
      Status: 'Pending',
      Remarks: ''
    };

    try {
      await fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Sheet save error:", err);
    }
  }

  async function submitOrder() {
    if (isSending) return;
    setIsSending(true);
    showToast('Saving your order...');
    
    try {
      await saveOrderToSpreadsheet();
    } catch (err) {
      console.error('Order save failed:', err);
    }
    
    setOrderSubmitted(true);
    setCart({});
    try { localStorage.removeItem('wisor-cart'); } catch {}
    
    setIsSending(false);
    navigateTo('success');
  }

  function handleSendWhatsApp() {
    showToast('Preparing WhatsApp...');
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${WISOR_WA_NUMBER}?text=${encodeURIComponent(message)}`;
    
    if (window.innerWidth < 1024 || /Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = url;
    } else {
      try { window.open(url, '_blank'); } catch (_e) {}
    }
  }

  // Mobile screens
  function renderMobileScreen() {
    const sp = { setScreen: navigateTo };
    switch (screen) {
      case 'gate': return <GateScreen {...sp} collegeId={collegeId} setCollegeId={setCollegeId} />;
      case 'category': return <CategoryScreen {...sp} college={college} activeCategory={activeCategory} setActiveCategory={setActiveCategory} cart={cart} addOne={addOne} removeOne={removeOne} cartCount={cartCount} total={total} deliveryFee={deliveryFee} />;
      case 'cart': return <CartScreen {...sp} cartItems={finalCartItems} categoriesCovered={categoriesCovered} subtotal={subtotal} total={total} deliveryFee={deliveryFee} addOne={addOne} removeOne={removeOne} />;
      case 'delivery': return <DeliveryScreen {...sp} delivery={delivery} setDelivery={setDelivery} />;
      case 'success': return <SuccessScreen {...sp} college={college} delivery={delivery} cartItems={finalCartItems} total={total} handleSendWhatsApp={handleSendWhatsApp} orderId={orderId} orderSubmitted={orderSubmitted} isSending={isSending} />;
      default: return <GateScreen {...sp} collegeId={collegeId} setCollegeId={setCollegeId} />;
    }
  }

  // Desktop content (inside the fixed-height shell)
  function renderDesktopContent() {
    switch (screen) {
      case 'gate': return <DesktopGate collegeId={collegeId} setCollegeId={setCollegeId} setScreen={navigateTo} />;
      case 'category': return <DesktopShop college={college} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setScreen={navigateTo} cart={cart} addOne={addOne} removeOne={removeOne} subtotal={subtotal} finalCartItems={finalCartItems} deliveryFee={deliveryFee} total={total} />;
      case 'cart':
      case 'delivery': return <DesktopDelivery delivery={delivery} setDelivery={setDelivery} setScreen={navigateTo} finalCartItems={finalCartItems} subtotal={subtotal} total={total} deliveryFee={deliveryFee} />;
      case 'success': return <DesktopSuccess college={college} delivery={delivery} cartItems={finalCartItems} total={total} handleSendWhatsApp={handleSendWhatsApp} setScreen={navigateTo} orderId={orderId} orderSubmitted={orderSubmitted} isSending={isSending} />;
      default: return <DesktopGate collegeId={collegeId} setCollegeId={setCollegeId} setScreen={navigateTo} />;
    }
  }

  return (
    <>
      {/* ── MOBILE (hidden on lg+) ─────────────────────────────────────── */}
      <div className="md:hidden bg-zinc-100 flex items-center justify-center" style={{ minHeight: '100svh' }}>
        <div className="bg-white overflow-hidden relative w-full" style={{ maxWidth: '430px', height: '100svh', maxHeight: '844px' }}>
          <div style={{ height: '100%' }}>{renderMobileScreen()}</div>
          {toast && (
            <div className="absolute left-1/2 bottom-24 transform -translate-x-1/2 bg-zinc-900 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg z-50 whitespace-nowrap">{toast}</div>
          )}
        </div>
      </div>

      {/* ── DESKTOP (hidden below lg) ──────────────────────────────────── */}
      <div className="hidden md:flex flex-col bg-zinc-50" style={{ height: '100svh' }}>
        <DesktopNav college={college} cartCount={cartCount} total={total} screen={screen} setScreen={navigateTo} setCollegeId={setCollegeId} />
        <div className="flex flex-1 overflow-hidden">
          {renderDesktopContent()}
        </div>
        {toast && (
          <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-xl z-50 whitespace-nowrap">{toast}</div>
        )}
      </div>
    </>
  );
}

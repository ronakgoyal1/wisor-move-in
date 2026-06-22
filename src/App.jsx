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
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const WISOR_WA_NUMBER = import.meta.env.VITE_WISOR_WA_NUMBER || '917400390244';

const COLLEGES = [
  { id: 'iiit', code: 'IIIT', name: 'IIIT Allahabad', sub: 'Jhalwa campus' },
  { id: 'mnnit', code: 'MNNIT', name: 'MNNIT Allahabad', sub: 'Naini campus' },
];

const CATEGORIES = [
  { id: 'sleep',   label: 'Sleep',   fullLabel: 'Sleep Essentials',    icon: BedDouble },
  { id: 'bathroom',label: 'Bath',    fullLabel: 'Bathroom Essentials',  icon: Droplets  },
  { id: 'study',   label: 'Study',   fullLabel: 'Study Essentials',     icon: Lightbulb },
  { id: 'storage', label: 'Storage', fullLabel: 'Storage Essentials',   icon: Archive   },
  { id: 'weather', label: 'Weather', fullLabel: 'Weather Essentials',   icon: Umbrella  },
];

const PRODUCTS = [
  { id:'s1',  category:'sleep',   name:'Sleepwell Ortho Pro Spring Mattress',    price:7000, note:'Premium Support', image:'/sleepwell_7k.png',     tag:'Top Tier',  rating:4.5, ratingCount:'2,841',  ratingSource:'Amazon.in', officialUrl:'https://www.mysleepwell.com/mattress/ortho-pro-spring', description:'Premium triple-zone pocket spring mattress with memory foam layer. Recommended by physiotherapists for optimal spinal alignment. Ideal for long-term hostel use.', specs:['Single size: 72×36×5 inches','Triple-zone pocket springs','Memory foam top layer','5-year warranty'] },
  { id:'s2',  category:'sleep',   name:'Sleepwell Dual Pro Profiled Foam',       price:5000, note:'Medium Firm',     image:'/sleepwell_5k.png',     tag:'Bestseller', rating:4.3, ratingCount:'4,512',  ratingSource:'Amazon.in', officialUrl:'https://www.mysleepwell.com/mattress/dual-pro',         description:'Dual-sided comfort mattress — one side firm, one side soft. Perfect for students who need flexibility as seasons change.',                                       specs:['Single size: 72×36×4 inches','Dual-comfort reversible','HD foam core','3-year warranty'] },
  { id:'s3',  category:'sleep',   name:'Sleepwell Starlite PU Foam',             price:4000, note:'Standard Comfort', image:'/sleepwell_4k.png',    rating:4.1, ratingCount:'6,203',  ratingSource:'Amazon.in', officialUrl:'https://www.mysleepwell.com/mattress/starlite',          description:'Trusted entry-level Sleepwell foam mattress. Good back support with comfortable PU foam — a great value pick for first-year students.',                         specs:['Single size: 72×36×4 inches','PU foam construction','Anti-skid base','2-year warranty'] },
  { id:'s4',  category:'sleep',   name:'Basic Coir Mattress',                    price:1800, note:'Firm & Basic',    image:'/mattress_basic.png',   rating:3.8, ratingCount:'1,102',  ratingSource:'Flipkart',  officialUrl:'https://www.flipkart.com/search?q=coir+mattress+single', description:'Natural coir fiber mattress offering firm sleeping support. Great for those who prefer a hard surface. Highly breathable for summer months.',                    specs:['Single size: 72×36×3 inches','Natural coir fiber','Breathable fabric','1-year warranty'] },
  { id:'s5',  category:'sleep',   name:'EPE Economy Foam Mattress',              price:1200, note:'Budget Pick',     image:'/mattress_epe.png',     rating:3.5, ratingCount:'893',    ratingSource:'Flipkart',  officialUrl:'https://www.flipkart.com/search?q=epe+foam+mattress+single', description:'Ultra-affordable EPE foam roll mattress. Lightweight and easy to move. Perfect for short-term stays or those on a tight budget.',                            specs:['Single size: 72×30×2.5 inches','EPE foam','Rolls up for easy storage','Basic fabric cover'] },
  { id:'s6',  category:'sleep',   name:'Pillow + Bedsheet Set',                  price:600,  note:'Sky blue',        image:'/pillow_bedsheet.png',  rating:4.2, ratingCount:'3,740',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=pillow+bedsheet+set+single',   description:'Soft microfiber pillow paired with a crisp sky-blue bedsheet. Smooth 200 thread count fabric that stays cool through the night.',                              specs:['Pillow: 17×27 inches','Bedsheet: 90×60 inches','200 TC microfiber','Machine washable'] },
  { id:'s7',  category:'sleep',   name:'Quilt / Blanket, Single',                price:950,  note:'Grey melange',    image:'/quilt_blanket.png',    rating:4.3, ratingCount:'5,211',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=single+quilt+blanket+grey',    description:'Warm grey melange single quilt with hollow fiber fill. Light enough for North Indian summers yet cozy for Allahabad winters.',                                  specs:['Size: 60×90 inches','Hollow fiber fill','Grey melange cover','Machine washable'] },
  { id:'b1',  category:'bathroom',name:'Bucket, Mug & Soap Holder Set',          price:180,  note:'Red',             image:'/bucket_mug_set.png',   rating:4.0, ratingCount:'8,420',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=bucket+mug+soap+dish+set',     description:'Durable PP plastic bathroom trio in vibrant red. The set includes a 20L bucket, 500ml mug, and a sturdy soap dish holder.',                                    specs:['Bucket: 20 litres','Mug: 500 ml','Soap dish included','BPA-free PP plastic'] },
  { id:'b2',  category:'bathroom',name:'Bathroom Slippers',                       price:199,  note:'Size 9',          image:'/bathroom_slippers.png',rating:4.1, ratingCount:'12,034', ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=bathroom+slippers+eva',         description:'Anti-skid EVA foam flip-flops with textured sole. Lightweight, waterproof and quick-drying — essential for shared hostel bathrooms.',                          specs:['Material: EVA foam','Anti-skid textured sole','Waterproof & quick-dry','Available: sizes 6–11'] },
  { id:'b3',  category:'bathroom',name:'Drying Rope + Clips Pack',               price:149,  note:'3 metre',         image:'/drying_rope.png',      rating:4.2, ratingCount:'4,882',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=drying+rope+laundry+clips',    description:'3-metre coated nylon drying rope with 12 colorful ABS plastic clips. Easy to tie anywhere, strong enough for wet clothes.',                                    specs:['Rope length: 3 metres','12 clips included','Coated nylon rope','ABS plastic clips'] },
  { id:'st1', category:'study',   name:'LED Study Lamp, Flexible Neck',          price:349,  note:'White',           image:'/led_study_lamp.png',   tag:'Top pick', rating:4.4, ratingCount:'9,311',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=led+desk+lamp+flexible+neck+study', description:'USB-powered LED desk lamp with 360° flexible gooseneck. 3 brightness modes, flicker-free light — perfect for late-night study sessions without straining eyes.', specs:['USB powered (5V)','3 brightness levels','360° flexible neck','Energy saving 5W LED'] },
  { id:'st2', category:'study',   name:'4-Socket Surge-Protected Extension Board',price:429, note:'2m cable',        image:'/extension_board.png',  rating:4.3, ratingCount:'15,670', ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=4+socket+extension+board+surge+protector', description:'ISI-marked 4-socket extension board with built-in surge protection and master switch. 2m heavy-duty cable handles high-load devices safely.',                specs:['4 universal sockets','ISI marked','2m heavy-duty cable','Surge & spike protection'] },
  { id:'st3', category:'study',   name:'Waterproof Table Cover, Study Desk',     price:149,  note:'Clear',           image:'/table_cover.png',      rating:4.0, ratingCount:'2,130',  ratingSource:'Flipkart',  officialUrl:'https://www.flipkart.com/search?q=waterproof+transparent+table+cover+desk', description:'Crystal-clear PVC table protector. Protects your study desk from spills, scratches and ink stains. Cut to size easily.',                                    specs:['Size: 60×40 cm','Clear PVC material','Waterproof & wipeable','Easy to cut to size'] },
  { id:'st4', category:'study',   name:'Desk Organiser Tray, 3-Section',         price:199,  note:'Wood finish',     image:'/desk_organizer.png',   rating:4.2, ratingCount:'3,450',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=desk+organizer+tray+wood+finish', description:'Elegant wood-finish 3-section desk organizer. Keeps pens, rulers, stationery neatly sorted. Adds a premium look to your study table.',                       specs:['3 sections','Wood-finish MDF','Non-slip base','Dimensions: 25×12×7 cm'] },
  { id:'sto1',category:'storage', name:'Foldable Wardrobe Organiser, 6-Shelf',   price:899,  note:'Grey',            image:'/foldable_wardrobe.png', rating:4.1, ratingCount:'6,780',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=foldable+wardrobe+organizer+6+shelf', description:'Space-saving foldable wardrobe with 6 shelves and a hanging rod. Made from durable non-woven fabric with a steel frame. Assembles in minutes.',            specs:['6 shelves + hanging rod','Non-woven fabric','Steel frame','Folds flat for storage'] },
  { id:'sto2',category:'storage', name:'Under-Bed Storage Bags, Set of 2',       price:349,  note:'Large',           image:'/under_bed_storage.png',rating:4.0, ratingCount:'4,219',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=under+bed+storage+bag+large',   description:'Maximize your hostel room space with these large under-bed storage bags. Zippered closure, transparent window — perfect for seasonal clothes.',                  specs:['Set of 2 bags','Transparent window','Full zip closure','Size: 80×60×20 cm each'] },
  { id:'sto3',category:'storage', name:'Study Table Drawer Organiser',           price:249,  note:'Black',           image:'/drawer_organizer.png', rating:4.1, ratingCount:'2,890',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=desk+drawer+organizer+black',   description:'Multi-compartment black drawer organizer. Keeps your study table drawer neat — from cables to stationery, everything has a place.',                              specs:['Multiple compartments','ABS black plastic','Non-slip bottom','Easy to clean'] },
  { id:'w1',  category:'weather', name:'Compact Umbrella, Wind-Resistant',       price:399,  note:'Navy',            image:'/umbrella_compact.png', rating:4.2, ratingCount:'11,203', ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=compact+umbrella+wind+resistant', description:"Auto open/close wind-resistant compact umbrella with 8-rib reinforced frame. Fits in any bag — essential for Allahabad's unpredictable monsoon.",           specs:['8-rib reinforced frame','Auto open/close','UV-coated canopy','Folds to 27cm'] },
  { id:'w2',  category:'weather', name:'Raincoat, Hooded',                       price:549,  note:'Olive',           image:'/raincoat_hooded.png',  rating:4.1, ratingCount:'3,640',  ratingSource:'Amazon.in', officialUrl:'https://www.amazon.in/s?k=hooded+raincoat+olive+waterproof', description:'Full-body hooded waterproof raincoat in earthy olive. Lightweight and packable — ideal for riding on two-wheelers or cycling to class in the rain.',         specs:['100% waterproof PVC','Adjustable hood','One-size fits most','Packs into pouch'] },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function money(n) { return n.toLocaleString('en-IN'); }

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
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl lg:rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxWidth: '520px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0 lg:hidden">
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
            {product.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><CatIcon className="w-16 h-16 text-zinc-200" /></div>}
          </div>
          <div className="px-5">
            <h2 className="text-lg font-bold text-zinc-900 leading-snug mb-1">{product.name}</h2>
            <p className="text-sm text-zinc-500 mb-3">{product.note}</p>
            {product.rating && (
              <div className="mb-4 p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1"><Star className="w-3 h-3" /> Customer Ratings</div>
                <StarRating rating={product.rating} count={product.ratingCount} source={product.ratingSource} size="lg" />
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
            <div className="text-xl font-black text-zinc-900">Rs.{money(product.price)}</div>
          </div>
          {qty === 0 ? (
            <button onClick={() => addOne(product.id)} className="bg-orange-500 text-white font-bold px-7 py-3 rounded-2xl hover:bg-orange-600 shadow-lg shadow-orange-500/25 transition flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Add to cart
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-orange-500 rounded-2xl px-3 py-2.5 shadow-lg shadow-orange-500/25">
              <button onClick={() => removeOne(product.id)} className="w-7 h-7 flex items-center justify-center text-white bg-white/20 rounded-xl"><Minus className="w-3.5 h-3.5" /></button>
              <span className="text-white font-bold text-sm w-4 text-center">{qty}</span>
              <button onClick={() => addOne(product.id)} className="w-7 h-7 flex items-center justify-center text-white bg-white/20 rounded-xl"><Plus className="w-3.5 h-3.5" /></button>
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
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 flex-shrink-0 safe-top">
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
    <div className="flex flex-col h-full bg-zinc-950 text-white">
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-2 safe-top">
        <div className="text-xl font-bold tracking-tight mb-6">wisor<span className="text-orange-500">.</span></div>
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
        <button onClick={() => collegeId && setScreen('category')} disabled={!collegeId} className={`w-full py-3.5 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${collegeId ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 active:scale-95' : 'bg-zinc-800 text-zinc-500'}`}>
          Customize your room {collegeId && <ChevronRight className="w-4 h-4" />}
        </button>
        <button onClick={() => setScreen('category')} className="w-full text-center text-xs text-zinc-500 mt-2.5 py-1 hover:text-zinc-300 transition-colors">Not sure yet? Browse without selecting</button>
      </div>
    </div>
  );
}

function CategoryScreen({ college, activeCategory, setActiveCategory, setScreen, cart, addOne, removeOne, cartCount, total, subtotalForPillow }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cat = CATEGORIES.find((c) => c.id === activeCategory);
  const items = PRODUCTS.filter((p) => p.category === activeCategory);
  const CatIcon = cat.icon;
  const progressToPillow = Math.min(100, (subtotalForPillow / 7000) * 100);

  return (
    <div className="flex flex-col h-full bg-white" style={{ position: 'relative' }}>
      <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-zinc-100 flex-shrink-0 safe-top">
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
      <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-indigo-900">{subtotalForPillow >= 7000 ? '🎉 Free Premium Pillow Unlocked!' : '🎁 Get a Free Premium Pillow!'}</span>
          <span className="text-[10px] font-medium text-indigo-700">{subtotalForPillow >= 7000 ? 'Achieved ✓' : `Add Rs.${money(7000 - subtotalForPillow)} more`}</span>
        </div>
        <div className="w-full bg-indigo-200/50 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full transition-all duration-700 ${subtotalForPillow >= 7000 ? 'bg-green-500' : 'bg-indigo-500'}`} style={{ width: `${progressToPillow}%` }} />
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
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
          <div className="flex flex-col gap-3">
            {items.map((p) => {
              const qty = cart[p.id] || 0;
              return (
                <div key={p.id} className="border border-zinc-200 rounded-2xl p-3 relative bg-white flex flex-col shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]" onClick={() => setSelectedProduct(p)}>
                  {p.tag && <span className="absolute top-2 left-2 z-10 text-[10px] font-bold text-green-700 bg-green-100/90 px-2 py-0.5 rounded-full uppercase tracking-wide">{p.tag}</span>}
                  {p.image ? (
                    <div className="h-32 rounded-xl bg-zinc-50 mb-2.5 overflow-hidden relative border border-zinc-100/50">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-24 rounded-xl bg-zinc-50 flex items-center justify-center mb-2.5 border border-zinc-100/50">
                      <CatIcon className="w-8 h-8 text-zinc-300" />
                    </div>
                  )}
                  <div className="text-sm font-semibold text-zinc-900 leading-snug mb-0.5">{p.name}</div>
                  <div className="text-xs text-zinc-400 mb-1.5">{p.note}</div>
                  {p.rating && <div className="mb-2"><StarRating rating={p.rating} count={p.ratingCount} source={p.ratingSource} size="sm" /></div>}
                  <div className="flex items-center justify-between mt-auto" onClick={(e) => e.stopPropagation()}>
                    <span className="font-bold text-zinc-900 text-sm">Rs.{money(p.price)}</span>
                    {qty === 0 ? (
                      <button onClick={(e) => { e.stopPropagation(); addOne(p.id); }} className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl active:bg-orange-600 shadow-sm shadow-orange-500/20 hover:bg-orange-600 transition-all duration-150 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2.5 bg-orange-500 rounded-xl px-2 py-1.5 shadow-sm shadow-orange-500/20">
                        <button onClick={(e) => { e.stopPropagation(); removeOne(p.id); }} className="w-5 h-5 flex items-center justify-center text-white bg-white/20 rounded-lg"><Minus className="w-3 h-3" /></button>
                        <span className="text-white text-xs font-bold w-3 text-center">{qty}</span>
                        <button onClick={(e) => { e.stopPropagation(); addOne(p.id); }} className="w-5 h-5 flex items-center justify-center text-white bg-white/20 rounded-lg"><Plus className="w-3 h-3" /></button>
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

function CartScreen({ cartItems, categoriesCovered, subtotal, total, addOne, removeOne, setScreen }) {
  const isFreePillowUnlocked = subtotal >= 7000;
  const realItems = cartItems.filter(i => i.id !== 'free-pillow');
  const grouped = CATEGORIES.map((cat) => ({ cat, items: realItems.filter((i) => i.category === cat.id) })).filter((g) => g.items.length > 0);
  const missingCategory = CATEGORIES.find((c) => !realItems.some((i) => i.category === c.id));

  return (
    <div className="flex flex-col h-full bg-zinc-50">
      <ScreenHeader title="Your room setup" onBack={() => setScreen('category')} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
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
                          {item.rating && <div className="mt-0.5"><StarRating rating={item.rating} count={item.ratingCount} source={item.ratingSource} size="sm" /></div>}
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
            {isFreePillowUnlocked && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-200/50 rounded-full blur-xl" />
                <h3 className="text-[10px] font-bold text-indigo-500 tracking-wider uppercase mb-3 flex items-center gap-2 relative z-10">🎁 Special Offer Unlocked</h3>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center flex-shrink-0 text-2xl">☁️</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-indigo-900">Premium Pillow</div>
                    <div className="text-xs text-indigo-700">Free gift on orders above Rs.7K</div>
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
              {isFreePillowUnlocked && <div className="flex justify-between text-sm"><span className="text-indigo-600">Free Premium Pillow</span><span className="font-medium text-indigo-600">-</span></div>}
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Delivery to hostel room</span><span className="font-bold text-green-600">Free</span></div>
              <div className="border-t border-dashed border-zinc-200 pt-3 flex justify-between">
                <span className="font-bold text-zinc-900">Total to pay</span>
                <span className="text-lg font-black text-orange-500">Rs.{money(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white border-t border-zinc-100 px-4 py-3 flex-shrink-0 safe-bottom">
        <button disabled={realItems.length === 0} onClick={() => setScreen('delivery')} className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${realItems.length ? 'bg-orange-500 text-white active:bg-orange-600 shadow-orange-500/20 hover:bg-orange-600' : 'bg-zinc-100 text-zinc-400 shadow-none'}`}>
          Proceed to delivery <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function DeliveryScreen({ delivery, setDelivery, setScreen }) {
  const update = (field) => (e) => setDelivery((prev) => ({ ...prev, [field]: e.target.value }));
  return (
    <div className="flex flex-col h-full bg-white">
      <ScreenHeader title="Delivery details" onBack={() => setScreen('cart')} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Full name</label>
          <input value={delivery.fullName} onChange={update('fullName')} placeholder="As per hostel allotment letter" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Hostel block</label>
          <div className="grid grid-cols-2 gap-3">
            {['Boys hostel', 'Girls hostel'].map((opt) => (
              <button key={opt} onClick={() => setDelivery((prev) => ({ ...prev, hostelBlock: opt }))} className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${delivery.hostelBlock === opt ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-sm' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-200'}`}>{opt}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Hostel name &amp; room no.</label>
          <input value={delivery.hostelRoom} onChange={update('hostelRoom')} placeholder="e.g. BH-3, Room 214" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Preferred delivery date</label>
          <input value={delivery.deliveryDate} onChange={update('deliveryDate')} placeholder="e.g. 14 July 2026" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1.5 block uppercase tracking-wide">Your WhatsApp number</label>
          <input value={delivery.whatsapp} onChange={update('whatsapp')} type="tel" placeholder="+91 98765 43210" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
        </div>
      </div>
      <div className="border-t border-zinc-100 px-4 py-3 flex-shrink-0 safe-bottom bg-white">
        <button onClick={() => setScreen('success')} className="w-full py-3.5 rounded-2xl font-bold bg-orange-500 text-white active:bg-orange-600 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all duration-200">
          Review &amp; send order <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SuccessScreen({ college, delivery, cartItems, total, handleSendWhatsApp, setScreen }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center px-4 pt-3 pb-1 flex-shrink-0 safe-top">
        <button onClick={() => setScreen('delivery')} className="w-8 h-8 flex items-center justify-center rounded-full active:bg-zinc-100 transition" aria-label="Back">
          <ChevronLeft className="w-5 h-5 text-zinc-700" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4 flex flex-col items-center text-center">
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
        <button onClick={handleSendWhatsApp} className="w-full py-4 rounded-2xl font-bold bg-[#25D366] text-white active:bg-[#1DA851] flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5">
          <MessageCircle className="w-5 h-5" /> Send order on WhatsApp
        </button>
        <p className="text-center text-[10px] font-medium text-zinc-400 mt-4 tracking-wide">OPENS WHATSAPP WITH PRE-FILLED DETAILS</p>
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
        <div className="text-zinc-700 text-xs">Trusted by students at IIIT &amp; MNNIT Allahabad</div>
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

function DesktopShop({ college, activeCategory, setActiveCategory, setScreen, cart, addOne, removeOne, subtotal, finalCartItems }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cat = CATEGORIES.find((c) => c.id === activeCategory);
  const items = PRODUCTS.filter((p) => p.category === activeCategory);
  const isFreePillowUnlocked = subtotal >= 7000;
  const progressToPillow = Math.min(100, (subtotal / 7000) * 100);
  const realItems = finalCartItems.filter(i => i.id !== 'free-pillow');
  const missingCategory = CATEGORIES.find((c) => !realItems.some((i) => i.category === c.id));
  const cartCount = realItems.reduce((s, i) => s + i.qty, 0) + (isFreePillowUnlocked ? 1 : 0);

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
        <div className="mx-4 mt-6 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl">
          <div className="text-xs font-bold text-indigo-800 mb-1">{isFreePillowUnlocked ? '🎉 Free Pillow Unlocked!' : '🎁 Free Premium Pillow'}</div>
          <div className="text-[11px] text-indigo-600 mb-2">{isFreePillowUnlocked ? 'Added to your order!' : `Add Rs.${money(7000 - subtotal)} more`}</div>
          <div className="w-full bg-indigo-200/50 rounded-full h-1.5">
            <div className={`h-1.5 rounded-full transition-all duration-700 ${isFreePillowUnlocked ? 'bg-green-500' : 'bg-indigo-500'}`} style={{ width: `${progressToPillow}%` }} />
          </div>
        </div>
      </div>

      {/* Center: Product Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-5 bg-zinc-50/50">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-zinc-900">{cat.fullLabel}</h2>
          <p className="text-sm text-zinc-400 mt-0.5">{items.length} options carefully selected · click to see details</p>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((p) => {
            const qty = cart[p.id] || 0;
            const CatIcon = cat.icon;
            return (
              <div key={p.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col group" onClick={() => setSelectedProduct(p)}>
                <div className="h-40 bg-zinc-50 relative overflow-hidden border-b border-zinc-100">
                  {p.tag && <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold text-green-700 bg-green-100/90 px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">{p.tag}</span>}
                  {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-full flex items-center justify-center"><CatIcon className="w-12 h-12 text-zinc-200" /></div>}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-sm font-bold text-zinc-900 leading-snug mb-0.5">{p.name}</div>
                  <div className="text-xs text-zinc-400 mb-2">{p.note}</div>
                  {p.rating && <div className="mb-2"><StarRating rating={p.rating} count={p.ratingCount} source={p.ratingSource} size="sm" /></div>}
                  <div className="flex items-center justify-between mt-auto pt-2" onClick={e => e.stopPropagation()}>
                    <span className="font-black text-zinc-900">Rs.{money(p.price)}</span>
                    {qty === 0 ? (
                      <button onClick={(e) => { e.stopPropagation(); addOne(p.id); }} className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-600 shadow-sm shadow-orange-500/20 transition-all flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-orange-500 rounded-xl px-2 py-1.5 shadow-sm shadow-orange-500/20">
                        <button onClick={(e) => { e.stopPropagation(); removeOne(p.id); }} className="w-5 h-5 flex items-center justify-center text-white bg-white/20 rounded-lg"><Minus className="w-3 h-3" /></button>
                        <span className="text-white text-xs font-bold w-4 text-center">{qty}</span>
                        <button onClick={(e) => { e.stopPropagation(); addOne(p.id); }} className="w-5 h-5 flex items-center justify-center text-white bg-white/20 rounded-lg"><Plus className="w-3 h-3" /></button>
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
              {isFreePillowUnlocked && (
                <div className="flex items-center gap-3 py-2 border-b border-zinc-50">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-lg">☁️</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-indigo-800">Premium Pillow</div>
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
            <div className="flex justify-between text-xs text-zinc-500"><span>Delivery</span><span className="font-bold text-green-600">Free</span></div>
            <div className="flex justify-between font-bold text-sm pt-1 border-t border-dashed border-zinc-200">
              <span className="text-zinc-900">Total</span>
              <span className="text-orange-500 text-base font-black">Rs.{money(subtotal)}</span>
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

function DesktopDelivery({ delivery, setDelivery, setScreen, finalCartItems, subtotal, total }) {
  const update = (field) => (e) => setDelivery((prev) => ({ ...prev, [field]: e.target.value }));
  const realItems = finalCartItems.filter(i => i.id !== 'free-pillow');

  return (
    <div className="flex-1 overflow-y-auto flex items-start justify-center px-6 py-10 bg-zinc-50">
      <div className="w-full max-w-3xl grid grid-cols-5 gap-6">
        <div className="col-span-3 bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900 mb-1">Delivery details</h2>
          <p className="text-sm text-zinc-400 mb-6">We'll deliver directly to your hostel room.</p>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Full name</label>
              <input value={delivery.fullName} onChange={update('fullName')} placeholder="As per hostel allotment letter" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Hostel block</label>
              <div className="grid grid-cols-2 gap-3">
                {['Boys hostel', 'Girls hostel'].map((opt) => (
                  <button key={opt} onClick={() => setDelivery((prev) => ({ ...prev, hostelBlock: opt }))} className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${delivery.hostelBlock === opt ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-200'}`}>{opt}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Hostel name &amp; room no.</label>
              <input value={delivery.hostelRoom} onChange={update('hostelRoom')} placeholder="e.g. BH-3, Room 214" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Preferred delivery date</label>
              <input value={delivery.deliveryDate} onChange={update('deliveryDate')} placeholder="e.g. 14 July 2026" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1.5 block uppercase tracking-widest">Your WhatsApp number</label>
              <input value={delivery.whatsapp} onChange={update('whatsapp')} type="tel" placeholder="+91 98765 43210" className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" />
            </div>
          </div>
          <button onClick={() => setScreen('success')} className="w-full mt-8 py-4 rounded-2xl font-bold bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5">
            Review &amp; send order <ChevronRight className="w-4 h-4" />
          </button>
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
              <div className="flex justify-between text-xs text-zinc-500"><span>Delivery</span><span className="font-bold text-green-600">Free</span></div>
              <div className="flex justify-between font-black text-base"><span className="text-zinc-900">Total</span><span className="text-orange-500">Rs.{money(total)}</span></div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 leading-relaxed"><strong>Free delivery</strong> directly to your hostel room. We confirm over WhatsApp within 30 minutes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopSuccess({ college, delivery, cartItems, total, handleSendWhatsApp, setScreen }) {
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
        <button onClick={handleSendWhatsApp} className="w-full py-4 rounded-2xl font-bold text-base bg-[#25D366] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200">
          <MessageCircle className="w-5 h-5" /> Send order on WhatsApp
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
  const [cart, setCart] = useState({});
  const [delivery, setDelivery] = useState({ fullName: '', hostelBlock: 'Boys hostel', hostelRoom: '', deliveryDate: '', whatsapp: '' });
  const [toast, setToast] = useState('');

  const college = COLLEGES.find((c) => c.id === collegeId) || null;
  const baseCartItems = Object.entries(cart).filter(([, qty]) => qty > 0).map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }));
  const cartCount = baseCartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = baseCartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  let finalCartItems = [...baseCartItems];
  if (subtotal >= 7000) finalCartItems.push({ id: 'free-pillow', category: 'sleep', name: 'Premium Pillow (Offer)', price: 0, qty: 1, image: null });
  const total = subtotal;
  const categoriesCovered = new Set(baseCartItems.map((i) => i.category)).size;

  function addOne(id) { setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 })); }
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
      if (i.price === 0) lines.push(`${i.qty}x ${i.name} - *FREE*`);
      else lines.push(`${i.qty}x ${i.name} - Rs.${money(i.price * i.qty)}`);
    });
    lines.push(`---`);
    lines.push(`*Total: Rs.${money(total)}*`);
    return lines.join('\n');
  }
  function handleSendWhatsApp() {
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${WISOR_WA_NUMBER}?text=${encodeURIComponent(message)}`;
    try { window.open(url, '_blank'); } catch (_e) {}
    showToast('Opening WhatsApp…');
  }

  // Mobile screens
  function renderMobileScreen() {
    const sp = { setScreen };
    switch (screen) {
      case 'gate': return <GateScreen {...sp} collegeId={collegeId} setCollegeId={setCollegeId} />;
      case 'category': return <CategoryScreen {...sp} college={college} activeCategory={activeCategory} setActiveCategory={setActiveCategory} cart={cart} addOne={addOne} removeOne={removeOne} cartCount={cartCount + (subtotal >= 7000 ? 1 : 0)} total={total} subtotalForPillow={subtotal} />;
      case 'cart': return <CartScreen {...sp} cartItems={finalCartItems} categoriesCovered={categoriesCovered} subtotal={subtotal} total={total} addOne={addOne} removeOne={removeOne} />;
      case 'delivery': return <DeliveryScreen {...sp} delivery={delivery} setDelivery={setDelivery} />;
      case 'success': return <SuccessScreen {...sp} college={college} delivery={delivery} cartItems={finalCartItems} total={total} handleSendWhatsApp={handleSendWhatsApp} />;
      default: return <GateScreen {...sp} collegeId={collegeId} setCollegeId={setCollegeId} />;
    }
  }

  // Desktop content (inside the fixed-height shell)
  function renderDesktopContent() {
    switch (screen) {
      case 'gate': return <DesktopGate collegeId={collegeId} setCollegeId={setCollegeId} setScreen={setScreen} />;
      case 'category': return <DesktopShop college={college} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setScreen={setScreen} cart={cart} addOne={addOne} removeOne={removeOne} subtotal={subtotal} finalCartItems={finalCartItems} />;
      case 'cart':
      case 'delivery': return <DesktopDelivery delivery={delivery} setDelivery={setDelivery} setScreen={setScreen} finalCartItems={finalCartItems} subtotal={subtotal} total={total} />;
      case 'success': return <DesktopSuccess college={college} delivery={delivery} cartItems={finalCartItems} total={total} handleSendWhatsApp={handleSendWhatsApp} setScreen={setScreen} />;
      default: return <DesktopGate collegeId={collegeId} setCollegeId={setCollegeId} setScreen={setScreen} />;
    }
  }

  return (
    <>
      {/* ── MOBILE (hidden on lg+) ─────────────────────────────────────── */}
      <div className="lg:hidden bg-zinc-100 flex items-center justify-center" style={{ minHeight: '100svh' }}>
        <div className="bg-white overflow-hidden relative w-full" style={{ maxWidth: '430px', height: '100svh', maxHeight: '844px' }}>
          <div style={{ height: '100%' }}>{renderMobileScreen()}</div>
          {toast && (
            <div className="absolute left-1/2 bottom-24 transform -translate-x-1/2 bg-zinc-900 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg z-50 whitespace-nowrap">{toast}</div>
          )}
        </div>
      </div>

      {/* ── DESKTOP (hidden below lg) ──────────────────────────────────── */}
      <div className="hidden lg:flex flex-col bg-zinc-50" style={{ height: '100svh' }}>
        <DesktopNav college={college} cartCount={cartCount + (subtotal >= 7000 ? 1 : 0)} total={total} screen={screen} setScreen={setScreen} setCollegeId={setCollegeId} />
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

import { BedDouble, Droplets, Lightbulb, Archive, Umbrella, Shirt } from 'lucide-react';

export const CATEGORIES = [
  { id: 'sleep',   label: 'Sleep',   fullLabel: 'Sleep Essentials',    icon: BedDouble },
  // { id: 'bathroom',label: 'Bath',    fullLabel: 'Bathroom Essentials',  icon: Droplets  },
  { id: 'study',   label: 'Tech',    fullLabel: 'Tech Essentials',      icon: Lightbulb },
  { id: 'curtains', label: 'Curtains', fullLabel: 'Curtains',   icon: Archive   },
  // { id: 'weather', label: 'Weather', fullLabel: 'Weather Essentials',   icon: Umbrella  },
  { id: 'iiita-merch', label: 'Merch', fullLabel: 'IIIT-A Merchandise', icon: Shirt },
];

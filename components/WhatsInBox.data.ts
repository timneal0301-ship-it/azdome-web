export const WHATS_IN_BOX_ICONS = [
  "Camera",
  "CircleDot",
  "Layers",
  "Cable",
  "Hammer",
  "BookOpen",
  "Package",
  "Smartphone",
  "Wifi",
] as const;

export type BoxItem = {
  /** Lucide icon name — see WHATS_IN_BOX_ICONS for allowed values. */
  iconName: string;
  name: string;
  detail: string;
  /** Set to true to skip rendering this item. */
  hidden?: boolean;
};

export const DEFAULT_BOX_ITEMS: BoxItem[] = [
  { iconName: "Camera", name: "M550 Pro Front Camera", detail: "4K Starvis 2 sensor" },
  { iconName: "CircleDot", name: "1080p Rear Camera", detail: "Full HD + 6m cable" },
  { iconName: "Layers", name: "3M Adhesive Mounts ×2", detail: "Pre-applied, residue-free" },
  { iconName: "Cable", name: "Type-C Power Cable", detail: "3.5m, fits most cabin trims" },
  { iconName: "Hammer", name: "Trim Removal Tool", detail: "For cable routing" },
  { iconName: "BookOpen", name: "Quick-Start Guide", detail: "Setup in under 20 min" },
];

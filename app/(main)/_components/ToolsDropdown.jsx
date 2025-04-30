// ✅ Tools dropdown with hover (improved stability with pointer-events)

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function ToolsDropdown() {
  const tools = [
    { label: "🖌️ Edit Image", href: "/tools/edit" },
    { label: "🎨 Extract Colors", href: "/tools/extract-color" },
    { label: "✂️ Remove BG", href: "/tools/remove-bg" },
  ];

  return (
    <div className="relative group">
      <button className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:outline-none">
        Tools
        <ChevronDown className="h-4 w-4" />
      </button>

      <div className="absolute left-0 mt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 min-w-[180px] rounded-md border bg-white shadow-md z-50 pointer-events-auto">
        <div className="py-1">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// app/components/Navigation.tsx
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center">
      {/* Logo */}
      <div className="mb-4 md:mb-0">
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
          OCC
        </Link>
        <p className="text-[10px] text-gray-400 tracking-widest mt-1 hidden md:block">
          ORIGIN COFFEE CRAFTER
        </p>
      </div>

      {/* 導航連結 */}
      <ul className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
        {/* About 下拉選單 (或直接顯示) */}
        <li className="relative group">
          <span className="text-gray-600 hover:text-black transition-colors cursor-pointer">
            About
          </span>
          <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-100 shadow-lg rounded-md py-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <li>
              <Link href="/about/mission" className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50">
                Mission
              </Link>
            </li>
            <li>
              <Link href="/about/founder" className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50">
                Founder
              </Link>
            </li>
            <li>
              <Link href="/about/manifesto" className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50">
                Manifesto
              </Link>
            </li>
            <li>
              <Link href="/about/sustainability" className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50">
                Sustainability
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/solutions" className="text-gray-600 hover:text-black transition-colors">
            Solutions
          </Link>
        </li>

        <li>
          <Link href="/origin" className="text-gray-600 hover:text-black transition-colors">
            Origin
          </Link>
        </li>
      </ul>

      {/* 底部品牌訊息 (移動版) */}
      <div className="mt-4 md:hidden text-center">
        <p className="text-[10px] text-gray-400 tracking-widest">
          ZERO-COMPROMISE COFFEE INFRASTRUCTURE
        </p>
      </div>
    </nav>
  );
}
// app/components/Navigation.tsx
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="p-8 md:p-12">
      {/* Logo / 品牌名稱 */}
      <div className="mb-12">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          OCC
        </Link>
        <p className="text-xs text-gray-500 tracking-widest mt-2">
          ORIGIN COFFEE CRAFTER
        </p>
      </div>

      {/* 主導航連結 */}
      <ul className="space-y-6">
        {/* About 區塊 */}
        <li>
          <div className="text-gray-400 text-xs tracking-widest mb-3">
            ABOUT
          </div>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about/mission"
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Mission</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about/founder"
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Founder</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about/manifesto"
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Manifesto</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about/sustainability"
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Sustainability</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Solutions 區塊 */}
        <li className="pt-4">
          <div className="text-gray-400 text-xs tracking-widest mb-3">
            SOLUTIONS
          </div>
          <ul className="space-y-3">
            <li>
              <Link
                href="/solutions/wholesale"
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Wholesale</span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/roasting"
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Roasting Program</span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/academy"
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Barista Staffing</span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/equipment"
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Equipment Service</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Blog 區塊 */}
        <li className="pt-4">
          <Link
            href="/blog"
            className="text-gray-700 hover:text-black transition-colors text-sm block group"
          >
            <span className="group-hover:pl-2 transition-all duration-200">Blog</span>
          </Link>
        </li>

        {/* Origin (預留) */}
        <li className="pt-4">
          <Link
            href="/origin"
            className="text-gray-500 text-sm hover:text-black transition-colors block group"
          >
            <span className="group-hover:pl-2 transition-all duration-200">Origin</span>
          </Link>
        </li>
      </ul>

      {/* 底部資訊 */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-[10px] text-gray-400 tracking-widest">
          ZERO-COMPROMISE<br />
          COFFEE INFRASTRUCTURE
        </p>
      </div>
    </nav>
  );
}

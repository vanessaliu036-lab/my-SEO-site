// app/components/Navigation.tsx
import Link from "next/link";

type NavigationProps = {
  onNavigate?: () => void;
};

export default function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav className="p-8 md:p-12">
      {/* Logo / 品牌名稱 */}
      <div className="mb-12">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          OCC
        </Link>
        <p className="text-xs text-gray-500 tracking-widest mt-2">
          ORIGIN COFFEE CAMBODIA
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
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Mission</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about/founder"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Founder</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about/manifesto"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Manifesto</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about/sustainability"
                onClick={onNavigate}
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
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Wholesale</span>
                <span className="ml-1.5 text-[9px] text-gray-400 tracking-wider">↗</span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/roasting-program"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Roasting Program</span>
                <span className="ml-1.5 text-[9px] text-gray-400 tracking-wider">↗</span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/barista-staffing"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Barista Staffing</span>
                <span className="ml-1.5 text-[9px] text-gray-400 tracking-wider">↗</span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/equipment-service"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Equipment Service</span>
                <span className="ml-1.5 text-[9px] text-gray-400 tracking-wider">↗</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Collection 區塊 */}
        <li className="pt-4">
          <div className="text-gray-400 text-xs tracking-widest mb-3">
            COLLECTION
          </div>
          <ul className="space-y-3">
            <li>
              <Link
                href="/collection"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">Mondulkiri Origin Collection</span>
              </Link>
            </li>
            <li>
              <Link
                href="/collection/sovann"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">SOVANN</span>
                <span className="ml-1.5 text-[9px] text-gray-400 tracking-wider">↗</span>
              </Link>
            </li>
            <li>
              <Link
                href="/collection/prek"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">PREK</span>
                <span className="ml-1.5 text-[9px] text-gray-400 tracking-wider">↗</span>
              </Link>
            </li>
            <li>
              <Link
                href="/collection/angkar"
                onClick={onNavigate}
                className="text-gray-700 hover:text-black transition-colors text-sm block group"
              >
                <span className="group-hover:pl-2 transition-all duration-200">ANGKAR</span>
                <span className="ml-1.5 text-[9px] text-gray-400 tracking-wider">↗</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Blog 區塊 */}
        <li className="pt-4">
          <Link
            href="/blog"
            onClick={onNavigate}
            className="text-gray-700 hover:text-black transition-colors text-sm block group"
          >
            <span className="group-hover:pl-2 transition-all duration-200">Blog</span>
          </Link>
        </li>

        <li className="pt-4">
          <Link
            href="/contact"
            onClick={onNavigate}
            className="text-gray-700 hover:text-black transition-colors text-sm block group"
          >
            <span className="group-hover:pl-2 transition-all duration-200">Contact</span>
            <span className="ml-1.5 text-[9px] text-gray-400 tracking-wider">↗</span>
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

      {/* 浮水印：固定在 menu 底部下方,被菜單文字遮住是預期 */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-[-60px] bottom-[-40px] text-[150px] font-bold text-[rgba(230,230,230,0.6)] leading-none whitespace-nowrap"
        style={{ fontFamily: "var(--font-sans), Inter, Arial, sans-serif" }}
      >
        OCC.
      </div>
    </nav>
  );
}

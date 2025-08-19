export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 text-white">
      <div className="mx-auto max-w-[88rem] flex items-center justify-between py-4">
        <div className="flex items-center gap-1">
          {/* Logo kiri */}
          <img src="/logo.png" alt="Mbah buyut house" className="h-12" />
          <a href="/" className="font-medium text-xl">
            MBAH BUYUT HOUSE
          </a>
        </div>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8 text-lg font-medium cursor-pointer">
            <a className="hover:text-gray-300" href="/menu">
              Menu
            </a>
            <a className="hover:text-gray-300" href="/about">
              About
            </a>
            <a className="hover:text-gray-300" href="/contact">
              Contact
            </a>
          </ul>
          {/* Hamburger menu for mobile */}
          <button className="md:hidden flex flex-col justify-center cursor-pointer">
            <span className="block w-6 h-[2px] bg-white mb-[4px]"></span>
            <span className="block w-6 h-[2px] bg-white mb-[4px]"></span>
            <span className="block w-6 h-[2px] bg-white"></span>
          </button>
        </div>
        {/* Nomor RSVP kanan */}
        <span className="font-medium hidden md:block">RSVP +628 1234 5678</span>
      </div>
    </nav>
  );
}

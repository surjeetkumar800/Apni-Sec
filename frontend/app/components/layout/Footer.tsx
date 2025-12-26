import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              ApniSec
            </h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              ApniSec helps organizations secure their digital infrastructure
              with modern, reliable, and scalable cybersecurity solutions.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Product
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Platform
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Security Monitoring
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Threat Detection
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-600">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-800">ApniSec</span>. All
            rights reserved.
          </span>

          <span className="text-sm text-gray-500">
            Trusted cybersecurity solutions for modern businesses
          </span>
        </div>
      </div>
    </footer>
  );
}

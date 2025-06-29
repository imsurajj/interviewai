import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">InterviewAce</h3>
            <p className="text-gray-400">
              AI-powered interview practice platform helping professionals land their dream jobs.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Voice Practice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Chat Practice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 InterviewAce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

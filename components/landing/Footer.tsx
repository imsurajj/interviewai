import Link from "next/link"
import { Zap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg">
                <Zap className="size-4" />
              </div>
              <h3 className="text-2xl font-bold ml-3">InterviewLab</h3>
            </div>
            <p className="text-gray-500">
              AI-powered interview practice platform helping professionals land their dream jobs.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-red-600">
                  Voice Practice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Chat Practice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-red-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-red-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 InterviewLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

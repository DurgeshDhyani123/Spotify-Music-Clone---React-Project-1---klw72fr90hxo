export default function Footer() {
    return (
        <div>
            <footer className="bg-gray-200 py-4 text-center">
                <div className="flex justify-center">
                    <ul className="flex space-x-6">
                        <li><a href="/about-us" className="text-gray-700 hover:text-gray-900">About Us</a></li>
                        <li><a href="/privacy-policy" className="text-gray-700 hover:text-gray-900">Privacy Policy</a></li>
                        <li><a href="/terms-of-service" className="text-gray-700 hover:text-gray-900">Terms of Service</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

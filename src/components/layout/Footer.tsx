export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-orange-400 font-black text-xl">7</span>
              <span className="text-white font-bold">-Eleven Vietnam</span>
            </div>
            <p className="text-sm">Cửa hàng tiện lợi trực tuyến</p>
            <p className="text-sm">Đặt hàng nhanh, giao hàng tận nơi</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Liên kết nhanh</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">Trang chủ</a>
              </li>
              <li>
                <a href="/admin" className="hover:text-white transition-colors">Quản trị</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Liên hệ</h4>
            <p className="text-sm">Email: support@7eleven.vn</p>
            <p className="text-sm">Hotline: 1800-1234</p>
            <p className="text-sm">24/7 hỗ trợ khách hàng</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          © 2026 7-Eleven Vietnam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

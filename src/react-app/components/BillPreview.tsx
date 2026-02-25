import { CartItem } from "@/react-app/components/Cart";
import { Button } from "@/react-app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/react-app/components/ui/dialog";
import { Printer, Download, X } from "lucide-react";

interface BillPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  billNumber: string;
  customerName?: string;
  customerPhone?: string;
}

export default function BillPreview({ isOpen, onClose, items, billNumber, customerName, customerPhone }: BillPreviewProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Invoice Preview</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Printable Bill */}
        <div id="bill-content" className="bg-white text-black p-6 rounded-lg border-2 border-dashed border-gray-300">
          {/* Header */}
          <div className="text-center border-b border-gray-300 pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">🏺 Sharma Crockery</h1>
            <p className="text-sm text-gray-600">Quality Kitchen & Home Essentials</p>
            <p className="text-xs text-gray-500 mt-1">123, Main Market, New Delhi - 110001</p>
            <p className="text-xs text-gray-500">Phone: +91 98765 43210 | GST: 07XXXXX1234X1ZX</p>
          </div>

          {/* Bill Details */}
          <div className="flex justify-between text-sm mb-4 bg-gray-50 p-2 rounded">
            <div>
              <p><span className="text-gray-500">Bill No:</span> <span className="font-semibold">{billNumber}</span></p>
              {customerName && <p><span className="text-gray-500">Customer:</span> {customerName}</p>}
              {customerPhone && <p><span className="text-gray-500">Phone:</span> {customerPhone}</p>}
            </div>
            <div className="text-right">
              <p><span className="text-gray-500">Date:</span> {currentDate}</p>
              <p><span className="text-gray-500">Time:</span> {currentTime}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2">Item</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-right py-2">Rate</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.product.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-2 pr-2">
                    <p className="font-medium">{item.product.name}</p>
                  </td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-right py-2">₹{item.product.price}</td>
                  <td className="text-right py-2 font-medium">₹{item.product.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t-2 border-gray-300 pt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">GST (18%):</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300 mt-2">
              <span>Grand Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-dashed border-gray-300 text-center">
            <p className="text-sm font-medium text-gray-700">Thank you for shopping with us! 🙏</p>
            <p className="text-xs text-gray-500 mt-1">Exchange within 7 days with original bill</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button onClick={handlePrint} className="flex-1">
            <Printer className="w-4 h-4 mr-2" />
            Print Bill
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Save PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

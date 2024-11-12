'use client'
import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

export default function Home() {
  const [vCardData, setVCardData] = useState({
    name: '',
    designation: '',
    emailPrefix: '',
    phoneNumber: '',
    additionalPhoneNumber: '',
    organization: '',
    website: '',
    address: '',
  });
  const [qrCode, setQrCode] = useState(null);
  const qrCodeRef = useRef();

  const organizations = ["Almondz Global Securities limited",
     "ALMONDZ FINANCIAL SERVICES LTD",
      "Almondz Global Infra Consultant Limited","Acrokx Realty Private Limited"];
  const websites = [
    "https://www.almondz.com/",
     "https://almondzfinancial.com/",
     "https://almondztrade.com/",
     "https://almondzglobal.com/",
     "https://www.itekvisioncentre.com/","https://www.acrokx.com/"];

  const generateVCardText = () => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${vCardData.name}
ORG:${vCardData.organization}
TITLE:${vCardData.designation}
TEL:+91${vCardData.phoneNumber}
TEL:+91${vCardData.additionalPhoneNumber}
EMAIL:${vCardData.emailPrefix}@almondz.com
ADR:${vCardData.address}
URL:${vCardData.website}
END:VCARD`;
  };

  const generateQRCode = () => {
    const vCardText = generateVCardText();
    setQrCode(vCardText);
  };

  const downloadQRCodeAsPNG = () => {
    html2canvas(qrCodeRef.current, { backgroundColor: null, scale: 4 }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      const fileName = vCardData.name ? `${vCardData.name}-qr.png` : 'vcard-qr-code.png';
      link.download = fileName;
      link.click();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-purple-300 text-white">
      <h1 className="text-3xl font-bold mb-6">Almondz QR Code Generator</h1>
      <div className="w-full max-w-lg bg-white text-gray-900 p-6 rounded-lg shadow-lg">
        
        <form className="space-y-4">
          {['name', 'designation'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-semibold mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                value={vCardData[field]}
                onChange={(e) => setVCardData({ ...vCardData, [field]: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <div className="flex items-center">
              <input
                type="text"
                value={vCardData.emailPrefix}
                onChange={(e) => setVCardData({ ...vCardData, emailPrefix: e.target.value })}
                className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email prefix"
              />
              <span className="bg-gray-200 px-3 py-2 rounded-r text-gray-700">@almondz.com</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone</label>
            <div className="flex items-center">
              <span className="bg-gray-200 px-3 py-2 rounded-l text-gray-700">+91</span>
              <input
                type="text"
                value={vCardData.phoneNumber}
                onChange={(e) => setVCardData({ ...vCardData, phoneNumber: e.target.value })}
                className="flex-grow border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Additional Phone Number</label>
            <div className="flex items-center">
              <span className="bg-gray-200 px-3 py-2 rounded-l text-gray-700">+91</span>
              <input
                type="text"
                value={vCardData.additionalPhoneNumber}
                onChange={(e) => setVCardData({ ...vCardData, additionalPhoneNumber: e.target.value })}
                className="flex-grow border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter additional phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Organization</label>
            <select
              value={vCardData.organization}
              onChange={(e) => setVCardData({ ...vCardData, organization: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Organization</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Website</label>
            <select
              value={vCardData.website}
              onChange={(e) => setVCardData({ ...vCardData, website: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Website</option>
              {websites.map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Address</label>
            <textarea
              value={vCardData.address}
              onChange={(e) => setVCardData({ ...vCardData, address: e.target.value })}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
            />
          </div>

          <button
            onClick={generateQRCode}
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition duration-300"
          >
            Generate QR Code
          </button>
        </form>
      </div>

      {qrCode && (
        <div className="mt-8 flex flex-col items-center">
          <div ref={qrCodeRef} className="bg-white p-4 rounded-lg shadow-lg">
            <QRCode value={qrCode} size={150} level="M" />
          </div>
          <button
            onClick={downloadQRCodeAsPNG}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Download QR Code as PNG
          </button>
        </div>
      )}
    </div>
  );
}

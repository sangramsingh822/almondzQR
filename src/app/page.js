'use client'
import { useState, useRef,useEffect } from 'react';
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
  const qrCodeSectionRef = useRef(null);
  const qrCodeRefWebsite = useRef();
  const [qrCodeWebsite, setQrCodeWebsite] = useState(null);

  const organizations = ["Almondz Global Securities Limited",
     "ALMONDZ FINANCIAL SERVICES LTD",
      "Almondz Global Infra Consultant Limited","Acrokx Realty Private Limited"];
  const websites = [
    "https://www.almondz.com/",
     "https://almondzfinancial.com/",
     "https://almondztrade.com/",
     "https://almondzglobal.com/",
     "https://www.itekvisioncentre.com/","https://www.acrokx.com/"];


     const [firstName, ...lastName] = vCardData.name.split(" ");
     const lastNameStr = lastName.join(" ");
  const generateVCardText = () => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${vCardData.name}
N:${lastNameStr};${firstName};;;
ORG:${vCardData.organization}
TITLE:${vCardData.designation}
TEL:+91${vCardData.phoneNumber}
EMAIL:${vCardData.emailPrefix}@almondz.com
ADR:${vCardData.address}
URL:${vCardData.website}
END:VCARD`;
  };

  const generateQRCode = () => {
    const vCardText = generateVCardText();
    setQrCode(vCardText);
    setQrCodeWebsite(vCardData.website.trim());
  };

  const downloadQRCodeAsPNG = (type) => {
    const qrCodeRefs = type === 'vcard' ? qrCodeRef : qrCodeRefWebsite;
    html2canvas(qrCodeRefs.current, { backgroundColor: null, scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      const fileName = type === 'vcard' ? `${vCardData.name}-qr.png` : `${vCardData.website.match(/https?:\/\/(?:www\.)?([^\/]+)/)[1].split('.')[0]}-qr.png`;
      link.download = fileName;
      link.click();
    });
  };

  useEffect(() => {
    if (qrCode && qrCodeSectionRef.current) {
      qrCodeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [qrCode]);
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
  <div ref={qrCodeSectionRef} className="mt-8 flex flex-col items-center">
    {/* First QR Code */}
    <div ref={qrCodeRef} className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <QRCode value={qrCode} size={150} level="M" />
    </div>
    <button
     onClick={() => downloadQRCodeAsPNG('vcard')}
      className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      Download QR Code as PNG
    </button>

    {/* Second QR Code */}
    <div ref={ qrCodeRefWebsite} className="bg-white p-4 rounded-lg shadow-lg mt-8">
      <QRCode value={qrCodeWebsite} size={150} level="M" />
    </div>
    <button
      onClick={() => downloadQRCodeAsPNG('website')}
      className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      Download Website QR Code as PNG
    </button>
  </div>
)}


   
    </div>
  );
}

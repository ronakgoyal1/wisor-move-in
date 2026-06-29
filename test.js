const sheetUrl = "https://script.google.com/macros/s/AKfycby1kUj9FKypw0NeZ6OCQZ4ZroDF_x881w0zFgr8nYKkqWT9zCB2ssLKhxEyl8es2IbO/exec";

const payload = {
  Timestamp: new Date().toISOString(),
  OrderID: "TEST-1234",
  Name: "Test User",
  PrimaryMobile: "'+919876543210",
  AlternativeMobile: "",
  College: "Test College",
  HostelBlock: "Boys hostel",
  Room: "Room 101",
  DeliveryDate: "2026-07-01",
  OrderValue: 5000,
  ProductsJSON: "1x Test Item (Rs.5000)",
  WhatsAppMessage: "Test msg",
  WhatsAppURL: "http://wa.me/test",
  Status: "Pending",
  Remarks: ""
};

fetch(sheetUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  body: JSON.stringify(payload)
}).then(res => res.text())
  .then(text => console.log("Response:", text))
  .catch(err => console.error("Error:", err));

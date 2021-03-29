function noop() {
  return (window.location = 'qrcode/in');
}
async function onScanSuccess(qrCodeMessage) {
  // handle on success condition with the decoded message
  onScanSuccess = await noop;
  axios.post(`/qrcode/scan/${qrCodeMessage}/in`).then(function (res) {
    //p.innerHTML = res.data;
    alert(`Successfully Scan ${res.data.toUpperCase()}`);
    window.location = '/qrcode/in';
    html5QrcodeScanner.clear();
  });
}

var html5QrcodeScanner = new Html5QrcodeScanner('reader', {
  fps: 10,
  qrbox: 250,
});

html5QrcodeScanner.render(onScanSuccess);

async function onScanSuccess(qrCodeMessage) {
  // handle on success condition with the decoded message
  //onScanSuccess = await noop;
  html5QrcodeScanner.clear();
  axios.post(`/qrcode/scan/${qrCodeMessage}/out`).then(function (res) {
    //p.innerHTML = res.data;
    alert(`successfuly scan ${res.data}`);
    window.location = '/qrcode/in';
  });
}

var html5QrcodeScanner = new Html5QrcodeScanner('reader', {
  fps: 10,
  qrbox: 250,
});

html5QrcodeScanner.render(onScanSuccess);

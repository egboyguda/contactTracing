function onScanSuccess(qrCodeMessage) {
  // handle on success condition with the decoded message
  console.log(qrCodeMessage);
  axios
    .post(`/qrcode/scan/${qrCodeMessage}/in`)
    .then(function (res) {
      //p.innerHTML = res.data;
      console.log(res.data);
      alert(`Successfully Scan ${res.data.toUpperCase()}`);
      html5QrcodeScanner.clear();
      //document.getElementById('p').textContent+=`Succesfuly Scan`
    })
    .then(function () {
      window.location = '/qrcode/in';
    });
}

var html5QrcodeScanner = new Html5QrcodeScanner('reader', {
  fps: 10,
  qrbox: 250,
});

html5QrcodeScanner.render(onScanSuccess);

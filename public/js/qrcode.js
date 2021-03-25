
function onScanSuccess(qrCodeMessage) {
	// handle on success condition with the decoded message


           
            console.log(qrCodeMessage)
            axios.get(`/scan/${qrCodeMessage}`)
                .then(function(res){
                    //p.innerHTML = res.data;
                    alert('Successfully Scan')
                    //document.getElementById('p').textContent+=`Succesfuly Scan`
                })
            html5QrcodeScanner.clear();
            window.location ='/qrcode'
        }

    var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 });

    
    html5QrcodeScanner.render(onScanSuccess);

function onScanSuccess(qrCodeMessage) {
	// handle on success condition with the decoded message


           
            console.log(qrCodeMessage)
            axios.get(`/scan/${qrCodeMessage}`)
                .then(function(res){
                    //p.innerHTML = res.data;
                    console.log(res.data)
                    document.getElementById('p').textContent+=`Succesfuly Scan`
                })


            html5QrcodeScanner.clear();
        }

    var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 });

    
    html5QrcodeScanner.render(onScanSuccess);
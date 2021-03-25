
function onScanSuccess(qrCodeMessage) {
	// handle on success condition with the decoded message


           
            console.log(qrCodeMessage)
            axios.get(`/scan/${qrCodeMessage}`)
                .then(function(res){
                    //p.innerHTML = res.data;
                    alert('Successfully Scan')
                    html5QrcodeScanner.clear();
                    //document.getElementById('p').textContent+=`Succesfuly Scan`
                })
                .then(function(){
                    
                    window.location ='/qrcode'
                })
           
        }

    var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 });

    
    html5QrcodeScanner.render(onScanSuccess);
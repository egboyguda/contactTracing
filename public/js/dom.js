
let e = document.getElementById('regions');
//console.log(e.value)
const province = document.getElementById('province');
const municipal =document.getElementById('municipal')
const barangay =document.getElementById('barangay')



address()



async function address(){
   await e.addEventListener('input',async function(){
       //console.log(this.value)
        axios.get(`/province/${this.value}`)
                .then((result) => {
                    //console.log((result.data))
                    return result.data
        
                })
                .then((data)=>{
                    removeOptions(province)
                    for(pro of data){
                        //console.log(pro)
                        loop(pro.name,pro.prov_code,province)
                    }
                })
                .catch((err) => {
                    
                });
               
             
        },false)
    await province.addEventListener('input',async function(){
            //console.log(this.value)
            axios.get(`/province/${e.value}/${this.value}`)
            .then((result) => {
                //console.log((result.data))
                return result.data
    
            })
            .then((data)=>{
                //console.log(data)
                removeOptions(municipal)
                for(mun of data){
                    //loop(mun.name,mun.)
                    loop(mun.name, mun.mun_code,municipal)
                    
                }
            })
           
            .catch((err) => {
                
            });
        })
        municipal.addEventListener('input',async function(){
            console.log(this.value)
            axios.get(`/province/${e.value}/${province.value}/${this.value}`)
             .then((result) => {
                 console.log((result.data))
                 return result.data
    
          })
             .then((datas)=>{
                 //console.log(data)
                 removeOptions(barangay)
                 for(data of datas){
                     //loop(mun.name,mun.)
                     loop(data.name, data.name,barangay)
                    
                 }
             })
           
            // .catch((err) => {
                
            // });
        })
}

//function para mag create optin sa select

function loop(req,reqVal,select){
    let opt = document.createElement('option');
    opt.value = reqVal;
    opt.innerHTML = req;
    select.appendChild(opt);
}


function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }
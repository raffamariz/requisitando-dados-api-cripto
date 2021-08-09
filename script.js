var apikey = {
	key: '3947de1b-8a62-4e21-8fae-5fec1aa1ecb5'
}


//GET fetch requisition
fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + apikey.key)
	.then((response) => {
			if(!response.ok) throw new Error('Erro ao executar a execução, status ' + response.status);
			return response.json();
		})
	.then((api) => {
			var texto = "<div class='card-group'>";

			//get 10 coins and symbols
			for(let i = 0; i < 12; i++){
				var j = Math.floor(Math.random() * (5970 - 1) + 1);

				date = new Date(api.data[j].first_historical_data);
				year = date.getFullYear();
				month = date.getMonth()+1;
				dt = date.getDate();

				if (dt < 10) {
				  dt = '0' + dt;
				}
				if (month < 10) {
				  month = '0' + month;
				}

				//show api information
				texto += `
    			<div class="card">
    				<img src="coin.jpg" class="card-img-top" alt="coin">
				    <div class="card-body">
				        <h4 class="card-title mb-2">${api.data[j].name} (${api.data[j].symbol})</h4>
				        <p class="card-text">${api.data[j].name}'s first historical data was registered on ${dt}-${month}-${year}.
				        					 This cryptocurrency is ranked ${api.data[j].rank}${rank(api.data[j].rank)} and it is currently ${isActive(api.data[j].is_active)}.</p>
				    </div>
			    </div>
				`;

				if((i+1)%4 == 0){
					texto += "</div><div class='card-group'>";
				}
			}
				texto += "</div>";document.getElementById("coins").innerHTML = texto;
		})
	.catch((error) => {
		console.error(error.message);
	});

let isActive = (active) => active == 1 ? "active" : "not active";
function rank(rank){
	if(toString(rank).endsWith('1')){
		return 'st';
	} else if(toString(rank).endsWith('2')){
		return 'nd';
	} else if(toString(rank).endsWith('3')){
		return 'rd';
	} else{
		return 'th';
	}

}
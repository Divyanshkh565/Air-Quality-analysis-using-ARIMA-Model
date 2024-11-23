let state = document.getElementById('sts');
let city = document.getElementById('state');
let cardContainer = document.getElementById('card-container');

async function getData(){
    let response = await fetch(`https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bcountry%5D=India&filters%5Bstate%5D=${state.value.trim().includes(" ")?state.value.trim().split(" ")[0]+state.value.trim().split(" ")[1]:state.value.trim()}&filters%5Bcity%5D=${city.value.trim()}`);
    let data = await response.json();
    if(data["records"].length > 0){
        cardContainer.innerHTML = "";
        data["records"].forEach(element => {
            let newNode = document.createElement('div');
            newNode.className = "max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 rounded-xl shadow-xl";
            newNode.innerHTML = `
            <h2 class="text-xl font-bold mb-2" id="station-name">${element.station}</h2>
            <p class="text-gray-700" id="pollutant">Pollutant: ${element.pollutant_id}</p>
            <p class="text-gray-600" id="min-value">Min Value: ${element.min_value}</p>
            <p class="text-gray-600" id="max-value">Max Value: ${element.max_value}</p>
            <p class="text-gray-600" id="avg-value">Avg Value: ${element.avg_value}</p>
            <p class="text-gray-500 text-sm mt-4" id="last-update">Last Updated: ${element.last_update}</p>`;
            cardContainer.appendChild(newNode);
        });
    }
    else{
        cardContainer.innerHTML = "<div class='text-xl font-bold'>No Data Found!</div>";
    }
}
    
import { getFlights } from '../api/flights.ts';
import type { Flight } from '../entities/flight.ts';

let flights : Flight[] = [];

async function loadFlights() {
  try {
    flights = await getFlights();
  } catch (err) {
    console.error(err);
  }
}

await loadFlights();

// Datos de ejemplo — reemplaza por llamada a la API
// const flights = [
//     {id:1, flightNumber:'EC201', aircraft:'A320', airline:'AeroEcuador', from:'GYE', to:'UIO', depart:'2025-11-05T08:15:00-05:00', arrive:'2025-11-05T09:10:00-05:00', duration:55, category:'Economy', price:75},
//     {id:2, flightNumber:'LA459', aircraft:'B737', airline:'LatAm', from:'GYE', to:'MIA', depart:'2025-11-05T12:40:00-05:00', arrive:'2025-11-05T17:10:00-05:00', duration:210, category:'Business', price:420},
//     {id:3, flightNumber:'AV120', aircraft:'A320', airline:'Avianca', from:'UIO', to:'CLO', depart:'2025-11-06T06:00:00-05:00', arrive:'2025-11-06T07:05:00-05:00', duration:65, category:'Economy', price:95},
//     {id:4, flightNumber:'EC305', aircraft:'A330', airline:'AeroEcuador', from:'GYE', to:'JFK', depart:'2025-11-05T22:30:00-05:00', arrive:'2025-11-06T06:50:00-05:00', duration:380, category:'Premium Economy', price:560},
//     {id:5, flightNumber:'LA782', aircraft:'B787', airline:'LatAm', from:'UIO', to:'MAD', depart:'2025-11-07T13:10:00-05:00', arrive:'2025-11-08T07:25:00-05:00', duration:515, category:'Economy', price:720},
//     {id:6, flightNumber:'SC010', aircraft:'A220', airline:'SkyAir', from:'GYE', to:'UIO', depart:'2025-11-05T09:45:00-05:00', arrive:'2025-11-05T10:40:00-05:00', duration:55, category:'Economy', price:68},
//     {id:7, flightNumber:'AV455', aircraft:'A321', airline:'Avianca', from:'GYE', to:'CLO', depart:'2025-11-06T14:20:00-05:00', arrive:'2025-11-06T15:30:00-05:00', duration:70, category:'Business', price:160}
// ];

// // Estado
// let state = {page:1, perPage:10};

// // Inicialización
// const airlineSelect = document.getElementById('airline');
const flightsList = document.querySelector<HTMLDivElement>('#flights-list')!;
// const resultsCount = document.getElementById('resultsCount');
// const pagination = document.getElementById('pagination');

// function uniqueAirlines(data: any){
//     const set = new Set(data.map(f=>f.airline));
//     return [...set].sort();
// }

function formatTime(iso: any){
    const d = new Date(iso);
    return d.toLocaleString([], {year:'numeric',month:'short',day:'numeric', hour:'2-digit', minute:'2-digit'});
}

// function populateAirlines(){
//     const list = uniqueAirlines(flights);
//     list.forEach(a=>{
//     const opt = document.createElement('option'); opt.value = a; opt.textContent = a; airlineSelect.appendChild(opt);
//     })
// }

// function applyFilters(){
//     const date = document.getElementById('date').value; // YYYY-MM-DD
//     const timeFrom = document.getElementById('timeFrom').value; // HH:MM
//     const timeTo = document.getElementById('timeTo').value;
//     const seat = document.getElementById('seatCategory').value;
//     const airline = document.getElementById('airline').value;
//     const priceMax = document.getElementById('priceMax').value;
//     const search = document.getElementById('search').value.trim().toLowerCase();
//     const sortBy = document.getElementById('sortBy').value;
//     const perPage = parseInt(document.getElementById('perPage').value,10);
//     state.perPage = perPage;

//     let results = flights.slice();

//     // Fecha exacta
//     if(date){
//     results = results.filter(f=>{
//         const d = new Date(f.depart);
//         const isoDate = d.toISOString().slice(0,10);
//         return isoDate === date;
//     });
//     }

//     // Rango horario (solo compara hora local)
//     if(timeFrom){
//     results = results.filter(f=>{
//         const hhmm = new Date(f.depart).toTimeString().slice(0,5);
//         return hhmm >= timeFrom;
//     });
//     }
//     if(timeTo){
//     results = results.filter(f=>{
//         const hhmm = new Date(f.depart).toTimeString().slice(0,5);
//         return hhmm <= timeTo;
//     });
//     }

//     if(seat){ results = results.filter(f=>f.category === seat); }
//     if(airline){ results = results.filter(f=>f.airline === airline); }
//     if(priceMax){ results = results.filter(f=>f.price <= Number(priceMax)); }

//     if(search){
//     results = results.filter(f=>{
//         return [f.from,f.to,f.flightNumber,f.aircraft,f.airline].join(' ').toLowerCase().includes(search);
//     });
//     }

//     // Ordenamiento
//     results.sort((a,b)=>{
//     if(sortBy === 'time_asc') return new Date(a.depart) - new Date(b.depart);
//     if(sortBy === 'time_desc') return new Date(b.depart) - new Date(a.depart);
//     if(sortBy === 'price_asc') return a.price - b.price;
//     if(sortBy === 'price_desc') return b.price - a.price;
//     return 0;
//     });

//     return results;
// }

function render(){
    // const data = applyFilters();
    // const total = data.length;
    // const perPage = state.perPage || 10;
    // const page = Math.max(1, state.page || 1);
    // const start = (page-1)*perPage;
    // const end = start + perPage;
    // const pageItems = data.slice(start,end);

    // resultsCount.textContent = `${total} vuelo(s) encontrado(s)`;

    // flightsList.innerHTML = '';
    
    // if(pageItems.length === 0) {
    //     flightsList.innerHTML = '<div style="padding:14px;color:var(--muted)">No se encontraron vuelos con esos filtros.</div>';
    // }

    flights.forEach(f => {
        const div = document.createElement('div'); div.className='flight';
    
        div.innerHTML = `
            <div>
            <div class="time">${new Date(f.departure_time_string!).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
            <div class="airport">${f.departure_airport?.name} → ${f.arrival_airport?.name}</div>
            </div>
            <div>
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
                <div style="font-weight:700">${f.flight_id}</div>
                <div class="pill">${f.airline?.name}</div>
            </div>
            <div class="meta">${f.airline?.name} · ${f.aircraft?.name} · Duración ${f.duration} min</div>
            <div style="color:var(--muted);font-size:12px;margin-top:6px">Salida: ${formatTime(f.departure_time_string)} — Llega: ${formatTime(f.arrival_time_string)}</div>
            </div>
            <div style="text-align:right">
            <div class="price">US$ ${150}</div>
            <div style="margin-top:8px"><button style="padding:8px 10px;border-radius:8px;border:0;background:var(--accent);color:#fff;cursor:pointer">Reservar</button></div>
            </div>
        `;
        
        flightsList.appendChild(div);
    });

    // Paginación simple
    // pagination.innerHTML = '';
    // const totalPages = Math.max(1, Math.ceil(total / perPage));
    // const prev = document.createElement('button'); prev.textContent='◀'; prev.disabled = page===1; prev.onclick = ()=>{ state.page = page-1; render(); }
    // const next = document.createElement('button'); next.textContent='▶'; next.disabled = page===totalPages; next.onclick = ()=>{ state.page = page+1; render(); }
    // pagination.appendChild(prev);

    // const info = document.createElement('div'); info.style.color='var(--muted)'; info.textContent = `Página ${page} de ${totalPages}`;
    // pagination.appendChild(info);
    // pagination.appendChild(next);
}

// function hookEvents(){
//     document.getElementById('applyBtn').addEventListener('click', ()=>{ state.page = 1; render(); });
//     document.getElementById('resetBtn').addEventListener('click', ()=>{
//     document.getElementById('date').value='';
//     document.getElementById('timeFrom').value='';
//     document.getElementById('timeTo').value='';
//     document.getElementById('seatCategory').value='';
//     document.getElementById('airline').value='';
//     document.getElementById('priceMax').value='';
//     document.getElementById('search').value='';
//     document.getElementById('sortBy').value='time_asc';
//     document.getElementById('perPage').value='10';
//     state.page = 1; render();
//     });

//     // Aplicar en cambios pequeños (mejor UX)
//     ['date','timeFrom','timeTo','seatCategory','airline','priceMax','search','sortBy','perPage'].forEach(id=>{
//     document.getElementById(id).addEventListener('change', ()=>{ state.page = 1; render(); });
//     });

//     // búsqueda por texto con 'input' para respuesta inmediata
//     document.getElementById('search').addEventListener('input', ()=>{ state.page = 1; render(); });
// }

// // Init
// populateAirlines();
// hookEvents();
render();
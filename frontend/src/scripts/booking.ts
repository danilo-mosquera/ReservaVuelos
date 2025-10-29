const seatsContainer = document.getElementById('seats-container')!;
const confirmBtn = document.getElementById('confirm-btn')!;
const totalSeats = 36;
const occupiedSeats = [3, 4, 9, 15, 20, 28];

for (let i = 1; i <= totalSeats; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = String(i);
    if (occupiedSeats.includes(i)) {
    seat.classList.add('occupied');
    } else {
    seat.addEventListener('click', () => seat.classList.toggle('selected'));
    }
    seatsContainer.appendChild(seat);
}

confirmBtn.addEventListener('click', async () => {
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(s => s.textContent);
    const cardNumber = document.querySelector<HTMLInputElement>('cardNumber')!.value.trim();
    const cardHolder = document.querySelector<HTMLInputElement>('cardHolder')!.value.trim();
    const expiry = document.querySelector<HTMLInputElement>('expiry')!.value.trim();
    const cvv = document.querySelector<HTMLInputElement>('cvv')!.value.trim();
    const errorMsg = document.querySelector<HTMLInputElement>('payment-error')!;

    errorMsg.textContent = "";

    if (selectedSeats.length === 0) {
        alert('Selecciona al menos un asiento.');
        return;
    }

    // Validación básica del pago
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        errorMsg.textContent = "Número de tarjeta inválido.";
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        errorMsg.textContent = "Formato de expiración incorrecto (MM/AA).";
        return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
        errorMsg.textContent = "CVV inválido.";
        return;
    }

    // Simulación del POST
    const res = await fetch('http://localhost:3000/api/flights/1/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            seatNumbers: selectedSeats,
            payment: { cardNumber, cardHolder, expiry, cvv }
        })
    });

    if (res.ok) {
        alert('Reserva confirmada y pago procesado con éxito.');
        location.reload();
    } else {
        alert('Error al confirmar la reserva.');
    }
});
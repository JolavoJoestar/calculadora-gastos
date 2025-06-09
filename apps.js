// Recupera os elementos da página
const form = document.getElementById('form-gasto');
const lista = document.getElementById('lista-gastos');
const totalSpan = document.getElementById('total');

// Carrega os gastos do LocalStorage
let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
renderizarGastos();

// Quando o formulário for enviado
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (!descricao || isNaN(valor) || valor <= 0) {
        alert('Preencha corretamente!');
        return;
    }

    const gasto = { descricao, valor };
    gastos.push(gasto);

    salvarGastos();
    renderizarGastos();

    // Limpa o formulário
    form.reset();
});

// Salva no LocalStorage
function salvarGastos() {
    localStorage.setItem('gastos', JSON.stringify(gastos));
}

// Mostra os gastos na tela
function renderizarGastos() {
    lista.innerHTML = '';

    let total = 0;
    gastos.forEach((gasto, index) => {
        total += gasto.valor;

        const li = document.createElement('li');
        li.textContent = `${gasto.descricao}: R$ ${gasto.valor.toFixed(2)}`;

        const btn = document.createElement('button');
        btn.textContent = 'Remover';
        btn.className = 'delete';
        btn.addEventListener('click', () => {
            gastos.splice(index, 1);
            salvarGastos();
            renderizarGastos();
        });

        li.appendChild(btn);
        lista.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}


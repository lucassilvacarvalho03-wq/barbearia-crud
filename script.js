const form = document.getElementById('form-agendamento');
const lista = document.getElementById('agendamentos');
const botaoSubmit = form.querySelector('button[type="submit"]');

let itemEmEdicao = null;

form.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const cliente = document.getElementById('cliente').value;
  const servico = document.getElementById('servico').value;
  const dataHora = document.getElementById('data-hora').value;

  if (itemEmEdicao) {
    itemEmEdicao.querySelector('.texto-agendamento').textContent = `${cliente} — ${servico} (${dataHora}) `;
    itemEmEdicao = null;
    botaoSubmit.textContent = 'Agendar';
    form.reset();
    return;
  }

  const item = document.createElement('li');

  const texto = document.createElement('span');
  texto.className = 'texto-agendamento';
  texto.textContent = `${cliente} — ${servico} (${dataHora}) `;

  const botaoEditar = document.createElement('button');
  botaoEditar.type = 'button';
  botaoEditar.textContent = 'Editar';

  botaoEditar.addEventListener('click', function () {
    document.getElementById('cliente').value = cliente;
    document.getElementById('servico').value = servico;
    document.getElementById('data-hora').value = dataHora;

    itemEmEdicao = item;
    botaoSubmit.textContent = 'Salvar Edição';
  });

  const botaoRemover = document.createElement('button');
  botaoRemover.type = 'button';
  botaoRemover.textContent = 'Remover';

  botaoRemover.addEventListener('click', function () {
    if (itemEmEdicao === item) {
      itemEmEdicao = null;
      botaoSubmit.textContent = 'Agendar';
      form.reset();
    }
    item.remove();
  });

  item.appendChild(texto);
  item.appendChild(botaoEditar);
  item.appendChild(botaoRemover);
  lista.appendChild(item);
  form.reset();
});
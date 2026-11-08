

const botaoAbrir = document.getElementById("abrirFormulario");
const formulario = document.getElementById("formulario");
const form = document.getElementById("formAgendamento");
const lista = document.getElementById("listaAgendamentos");

botaoAbrir.addEventListener("click", () => {
    formulario.scrollIntoView({
        behavior: "smooth"
    });
});

let agendamentos = JSON.parse(
    localStorage.getItem("agendamentos") || "[]"
);

const campoData = document.getElementById("data");

const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

campoData.min = `${ano}-${mes}-${dia}`;

function salvarAgendamentos() {
    localStorage.setItem(
        "agendamentos",
        JSON.stringify(agendamentos)
    );
}

function mostrarAgendamentos() {

    lista.innerHTML = "";

    if (agendamentos.length === 0) {
        lista.textContent = "Nenhum agendamento realizado.";
        return;
    }

    agendamentos.forEach((agendamento) => {

        const cartao = document.createElement("div");
        cartao.className = "agendamento";

        const nome = document.createElement("h3");
        nome.textContent = agendamento.nome;

        const turma = document.createElement("p");
        turma.textContent = "Turma: " + agendamento.turma;

        const motivo = document.createElement("p");
        motivo.textContent = "Motivo: " + agendamento.motivo;

        const data = document.createElement("p");
        data.textContent = "Data: " + agendamento.data;

        const horario = document.createElement("p");
        horario.textContent = "Horário: " + agendamento.horario;

        const botao = document.createElement("button");
        botao.textContent = "Cancelar agendamento";
        botao.className = "botao-cancelar";

        botao.addEventListener("click", () => {

            agendamentos = agendamentos.filter(
                item => item.id !== agendamento.id
            );

            salvarAgendamentos();
            mostrarAgendamentos();

        });

        cartao.append(
            nome,
            turma,
            motivo,
            data,
            horario,
            botao
        );

        lista.appendChild(cartao);

    });
}

form.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const novoAgendamento = {
        id: Date.now(),
        nome: document.getElementById("nome").value.trim(),
        turma: document.getElementById("turma").value.trim(),
        motivo: document.getElementById("motivo").value,
        data: campoData.value,
        horario: document.getElementById("horario").value
    };

    if (!novoAgendamento.nome || !novoAgendamento.turma) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const horarioOcupado = agendamentos.some(item =>
    item.data === novoAgendamento.data &&
    item.horario === novoAgendamento.horario
);

if (horarioOcupado) {
    alert("Este horário já está ocupado!");
    return;
}

    agendamentos.push(novoAgendamento);

    salvarAgendamentos();

    mostrarAgendamentos();

    form.reset();

    alert("Agendamento realizado com sucesso!");

});

mostrarAgendamentos();

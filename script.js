import { data } from "./data.js";
console.log(data);

let carrinho = [];
let carrinhoItemId = 0;

function montarListaDeItens() {
    let valorTotal = 0.00;

    data.forEach((item) => {
        const ulCompra = document.querySelector(".compra-ul ");
        ulCompra.insertAdjacentHTML("beforeend", `
            <li class="li-compra">
                        <div class="d-flex">
                            <div>
                                <img height="75" src="${item.img}">
                            </div>
                            <div>
                                <p>${item.nome}</p>
                                <p>${item.descricao}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-center">
                            <button class="btn-acao btn-compra-${item.id}">Adicionar ao carrinho</button>
                        </div>
            </li>
        `);

        const btnCompra = document.querySelector(`.btn-compra-${item.id}`);
        btnCompra.addEventListener("click", () => {
            let temItem = carrinho.find((car) => car.id === item.id);
            if (temItem) {
                item.qnt += 1;
            } else {
                item.qnt = 1;
                carrinho.push(item); // Armazena item com id exclusivo
            }
            const btnFinalizar = document.querySelector("#btn-finalizar");
            btnFinalizar.disabled = false;
            adicionarItemCarrinho(valorTotal); // Atualiza o carrinho
        });



    });



    const btnLimparCarrinho = document.querySelector("#btn-limpar-carrinho");
    btnLimparCarrinho.addEventListener("click", () => {
        const carrinhoUl = document.querySelector(".carrinho-ul");
        carrinhoUl.innerHTML = "";
        carrinho = [];
        const pTotal = document.querySelector("#p-total");
        pTotal.innerHTML = `Total: R$0`;
    });

    const btnFinalizar = document.querySelector("#btn-finalizar");
    btnFinalizar.addEventListener("click", () => {
        modal();
    });

    // const btnModalRemover = document.querySelector(".btn-modal-close");
    // btnModalRemover.addEventListener("click", ()=>{
    //     console.log("coisa")
    // })


    // modal()


}
function modal() {
    let valorTotal = 0;
    carrinho.forEach((item) => {
        valorTotal += item.preco * item.qnt;
    });
    console.log(valorTotal, "total")
    // const btnFinalizar = document.querySelector("#btn-finalizar");
    // btnFinalizar.addEventListener("click", (event) => {
    console.log(event)
    const body = document.body;
    body.insertAdjacentHTML("beforeend", `
    <div class="modal-wrapper d-flex justify-center align-center">
        <div class="modal">
            <div class="modal-header">
                <h2>✔Concluir</h2>
                <button class="btn-modal-close">X</button>
            </div>
            <div class="modal-body d-flex">
                <p>Sua compra esta concluida</p>
                <p>Total: R$${valorTotal.toFixed(2)} + R$1200(imposto)</p>
                <button id="btn-modal-comprar" class="btn-carrinho">Comprar</button>
            </div>
        </div>
    </div>`)

    const btnModalClose = document.querySelector(".btn-modal-close");
    btnModalClose.addEventListener("click", () => {
        const modal = document.querySelector(".modal-wrapper");
        modal.remove();
    })

    const btnModalComprar = document.querySelector("#btn-modal-comprar");
    btnModalComprar.addEventListener("click", () => {
        const modal = document.querySelector(".modal-wrapper");
        modal.remove();
    })
    // })
}
montarListaDeItens();

function adicionarItemCarrinho(valorTotal) {
    // Resetar a div
    const carrinhoUl = document.querySelector(".carrinho-ul");
    carrinhoUl.innerHTML = "";

    valorTotal = 0.00;
    carrinho.forEach((item) => { // Usar o id exclusivo para cada item
        carrinhoUl.insertAdjacentHTML("beforeend", `
            <li class="li-compra remove-id-${item.id}">
                        <div class="d-flex">
                            <div>
                                <img height="75"
                                    src="${item.img}">
                            </div>
                            <div>
                                <div>
                                    <p>${item.nome}</p>
                                </div>
                                <div class="div-btn-qnt">
                                    <div>
                                        <p>R$${item.preco}</p>
                                    </div>
                                    <div class="d-flex">
                                        <p>Quantidade: ${item.qnt}</p>
                                        <button id="btn-adicionar-${item.id}" class="btn-carrinho">+</button>
                                        <button id="btn-diminuir-${item.id}" class="btn-carrinho">-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-center">
                            <button class="btn-acao btn-remove-id-${item.id}">Remover</button>
                        </div>
            </li>

        `);

        valorTotal += item.preco * item.qnt;

        const pTotal = document.querySelector("#p-total");
        pTotal.innerHTML = `Total: R$${valorTotal.toFixed(2)}`;

        const btnRemover = document.querySelector(`.btn-remove-id-${item.id}`);
        btnRemover.addEventListener("click", () => {
            let carrinhoLi = document.querySelector(`.remove-id-${item.id}`);
            carrinhoLi.remove();
            valorTotal -= item.preco * item.qnt;
            pTotal.innerHTML = `Total: R$${valorTotal}`;

            item.qnt = 0;
            carrinho = carrinho.filter(car => car.id !== item.id); // Remove o item do carrinho pelo id
            adicionarItemCarrinho(valorTotal);
        });

        const btnAdicionar = document.querySelector(`#btn-adicionar-${item.id}`);
        btnAdicionar.addEventListener("click", () => {

            item.qnt += 1;
            adicionarItemCarrinho(valorTotal);
        });

        const btnDiminuir = document.querySelector(`#btn-diminuir-${item.id}`);
        btnDiminuir.addEventListener("click", () => {
            if (item.qnt === 1) {
                valorTotal -= (item.preco * item.qnt);
                item.qnt -= 1;
                pTotal.innerHTML = `Total: R$${valorTotal}`;

                let carrinhoLi = document.querySelector(`.remove-id-${item.id}`);
                carrinhoLi.remove();
                carrinho = carrinho.filter(car => car.id !== item.id); // Remove o item do carrinho pelo id
            } else {
                item.qnt -= 1;
            }
            if (carrinho.length < 1) {
                console.log("entrou disabled")
                const btnFinalizar = document.querySelector("#btn-finalizar");
                btnFinalizar.disabled = true;
            }
            adicionarItemCarrinho(valorTotal);
        })
    });
}
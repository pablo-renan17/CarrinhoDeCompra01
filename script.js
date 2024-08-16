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
            adicionarItemCarrinho(valorTotal); // Atualiza o carrinho
        });

        
        
    });
    
        const btnFinalizarCompra = document.querySelector("#btn-finalizar");
        btnFinalizarCompra.addEventListener("click", ()=>{
            console.log("BUMBO")
        });
        
        const btnLimparCarrinho = document.querySelector("#btn-limpar-carrinho");
        btnLimparCarrinho.addEventListener("click", () => {
            const carrinhoUl = document.querySelector(".carrinho-ul");
            carrinhoUl.innerHTML = "";
            carrinho = [];
            const pTotal = document.querySelector("#p-total");
            pTotal.innerHTML = `Total: R$0`;
        });
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
            if(item.qnt === 1) {
                valorTotal -= (item.preco * item.qnt);
                item.qnt -= 1;
                pTotal.innerHTML = `Total: R$${valorTotal}`;

                let carrinhoLi = document.querySelector(`.remove-id-${item.id}`);
                carrinhoLi.remove();
                carrinho = carrinho.filter(car => car.id !== item.id); // Remove o item do carrinho pelo id
            }else{
                item.qnt -= 1;
            }
            adicionarItemCarrinho(valorTotal);
        })
    });
}
import { data } from "./data.js";
console.log(data);

let carrinho = [];
let carrinhoItemId = 0;

function montarListaDeItens() {
    data.forEach((item) => {
        const ulCompra = document.querySelector(".compra");
        ulCompra.insertAdjacentHTML("beforeend", `
            <li class="li-compra">
                        <div class="d-flex">
                            <div>
                                <img height="75" src="${item.img}">
                            </div>
                            <div>
                                <p>${item.nome}</p>
                                <p>Qnt</p>
                            </div>
                        </div>
                        <div class="d-flex justify-center">
                            <button class="btn-acao btn-compra-${item.id}">Adicionar ao carrinho</button>
                        </div>
                    </li>
        `);

        const btnCompra = document.querySelector(`.btn-compra-${item.id}`);
        btnCompra.addEventListener("click", () => {
            carrinhoItemId++; // Incrementa antes de adicionar ao carrinho
            let temItem = carrinho.find((car)=>car.id===item.id);
            if(temItem){
                item.qnt += 1;
            }else{
                item.qnt = 1;
                carrinho.push(item); // Armazena item com id exclusivo
            }
            console.log(carrinho)
            adicionarItemCarrinho(); // Atualiza o carrinho
        });
    });
}
montarListaDeItens();

function adicionarItemCarrinho() {
    // Resetar a div
    const carrinhoUl = document.querySelector(".carrinho-ul");
    carrinhoUl.innerHTML = "";

    carrinho.forEach((item) => { // Usar o id exclusivo para cada item
        carrinhoUl.insertAdjacentHTML("beforeend", `
            <li class="li-compra remove-id-${item.id}">
                        <div class="d-flex">
                            <div>
                                <img height="75" src="${item.img}">
                            </div>
                            <div>
                                <p>${item.nome}</p>
                                <p>${item.qnt}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-center">
                            <button class="btn-acao btn-remove-id${item.id}">Remover</button>
                        </div>
                    </li>

        `);

        const btnRemover = document.querySelector(`.btn-remove-id${item.id}`);
        btnRemover.addEventListener("click", () => {
            let carrinhoLi = document.querySelector(`.remove-id-${item.id}`);
            carrinhoLi.remove();
            carrinho = carrinho.filter(teste => teste.id !== item.id); // Remove o item do carrinho pelo id
            if(carrinho = []){
                carrinhoItemId = 0;
            }
        });
    });
}
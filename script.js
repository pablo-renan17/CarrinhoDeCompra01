import {data} from "./data.js";
console.log(data);

let carrinho = [];
let carrinhoItemId = 0;
function montarListaDeItens(){
    data.forEach((item)=>{
        const ulCompra = document.querySelector(".compra");
        ulCompra.insertAdjacentHTML("beforeend",`
            <li>
                <p>${item.nome}</p>
                <button id="btn-compra-${item.id}">Adicionar ao carrinho</button>
            </li>
            `);
        const btnCompra = document.querySelector(`#btn-compra-${item.id}`);
        btnCompra.addEventListener("click", ()=>{
            console.log(item);
            carrinho.push([item, carrinhoItemId]);
            adicionarItemCarrinho(item);
        });
    })
}
montarListaDeItens();

function adicionarItemCarrinho(){
    const carrinhoUl = document.querySelector(".carrinho-ul");
    carrinhoUl.innerHTML = "";
    carrinho.forEach((item)=>{
        carrinhoUl.insertAdjacentHTML("beforeend",`
            <li id="li-carrinho-${carrinhoItemId}">
                <p>${item[0].nome}</p>
                <button id="btn-carrinho-${carrinhoItemId}">Remover</button>
            </li>
            `)
        const btnRemover = document.querySelector(`#btn-carrinho-${carrinhoItemId}`);
        btnRemover.addEventListener("click", ()=>{
            let carrinhoLi = document.querySelector(`#li-carrinho-${carrinhoItemId}`);
            carrinhoLi.remove();
            carrinho = carrinho.filter(teste=> !teste.includes(carrinhoItemId));

            
        });
       
    })
}

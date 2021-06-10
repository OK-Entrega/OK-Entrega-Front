import React from 'react';
import notebook from '../../../src/assets/images/homes/notebook-removebg-preview.png';
import appst from '../../../src/assets/images/homes/app-removebg-preview.png';
import { Container } from 'react-bootstrap';
//import './style.css';

export default function Home() {
    return (
        <>
        <div class="completa">
        <div class="textos">
            <h1>Gerencie suas entregas com nossa solução em nuvem  </h1>
            <h3>Saiba tudo o que você pode fazer com nossos sistemas web/mobile.</h3>
            <div class="botao">
                <button class="bot1">Ver mais</button>
                <button class="bot2">Começar</button>
            </div>
        </div>
        <div class="imagem">
        <img src={notebook}/>
        </div>
    </div>
    <div class="divOk">
    <h1 class="h1_2">O que posso fazer com o </h1><h1 class="h1_3">OkEntrega?</h1>
</div>
    <div class="divs">
        

        

        <div class="coluna1">
            <h2>
                Logístico
            </h2>
            <div class="div1">
                <p> <span class="corVerde">Importe </span> suas <span class="corVerde"> NFe’s </span>para a plataforma.</p>
            </div>
            <div>
                <p><span class="corVerde">Gerencia </span> a organização,<span class="corVerde">separe </span> as entregas e as coloque nos celulares dos motoristas</p>
            </div>
            <div>
                <p>Visualize todos os dados em uma <span class="corVerde">dashboard </span> completa e interativa, receba <span class="corVerde">ocorrências em tempo real </span> e muito mais!</p>
            </div>
        </div>
        <div class="coluna2">
            <h2>
                Motorista
            </h2>
            <div>
                <p>Receba as <span class="corVerde">rotas </span> para suas entregas do dia, <span class="corVerde">ordenadas </span> por data de entrega e distancia!</p>
            </div>
            <div>
                <p>Tenha um<span class="corVerde"> GPS já integrado </span> na plataforma</p>
            </div>
            <div>
                <p>Escaneie o <span class="corVerde"> código de barras </span> das notas e tire fotos das<span class="corVerde"> mercadorias e do canhoto </span></p>
            </div>
        </div>
    </div>

    <div class="divisao">
    <div class="tempo">
        <h2>Não perca mais tempo!</h2>
        <button>Começar</button>
    </div>
    <div>
    <img src={appst}/>
    </div>
    </div>
    </>
    );
}
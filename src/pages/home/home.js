import React from 'react';
import notebook from '../../../src/assets/images/home/notebook-removebg-preview.png';
import appst from '../../../src/assets/images/home/app-removebg-preview.png';
import okzinho from '../../../src/assets/images/home/okzinho-removebg-preview.png';
import okzinho1 from '../../../src/assets/images/home/okzinho.jpeg';
import redes from '../../../src/assets/images/home/redes-removebg-preview.png';
import whats from '../../../src/assets/images/home/whats-removebg-preview.png';
import './home.css';

export default function Home() {
    return (
        <>

            <body>
                <header class="cabecalho">
                    <div class="container">
                        <img src={okzinho} />
                        <li><a href="/">Início</a></li>
                    </div>
                    <nav>
                        <ul>
                            <li> <a href="/signup">Cadastre-se</a></li>
                            <li><a href="/signin">Login</a></li>
                        </ul>
                    </nav>
                </header>

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
                        <img src={notebook} />
                    </div>
                </div>
                <div class="divOk">
                    <h1 class="h1_2">O que posso fazer com o <span class="corVerde">OkEntrega? </span> </h1>
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
                        <img src={appst} />
                    </div>
                </div>
                <div style={{height: 100}}></div>

                {/* <footer>
                    <div class="copy">
                        <img src={okzinho1} />
                        <p>OkEntrega 2020 © Todos os direitos reservados</p>
                    </div>
                    <div class="sociais">
                        <p class="redes">Nossas redes sociais</p>
                        <img src={redes} />
                        <div class="whatsapp">
                            <img src={whats} />
                            <p>(11)99999-9999</p>
                        </div>
                    </div>
                </footer> */}
            </body>
        </>
    );
}
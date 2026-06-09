// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Site carregado!'); // Para teste no console
    
    // ========== 1. MENU HAMBURGUER ==========
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            console.log('Menu clicado'); // Teste
        });
    }
    
    // Fechar menu ao clicar no link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
            }
        });
    });
    
    // ========== 2. CALCULADORA DE CARBONO (100% FUNCIONAL) ==========
    const hectaresInput = document.getElementById('hectares');
    const tecnologiaSelect = document.getElementById('tecnologia');
    const carbonoValue = document.getElementById('carbonoValue');
    const mensagem = document.getElementById('mensagemDinamica');
    const calcularBtn = document.getElementById('calcularBtn');
    const resetBtn = document.getElementById('resetSimulador');
    
    // Verificar se os elementos existem
    console.log('Elementos da calculadora:', {
        hectares: hectaresInput,
        tecnologia: tecnologiaSelect,
        carbono: carbonoValue,
        mensagem: mensagem
    });
    
    // Função principal da calculadora
    function calcularCarbono() {
        console.log('Calculando...'); // Teste
        
        // Pega os valores
        let hectares = parseFloat(hectaresInput.value);
        const tecnologia = parseFloat(tecnologiaSelect.value);
        
        console.log('Hectares:', hectares, 'Tecnologia:', tecnologia);
        
        // Validações
        if (isNaN(hectares) || hectares < 1) {
            hectares = 100;
            hectaresInput.value = 100;
            mensagem.innerHTML = '⚠️ Valor ajustado para 100 hectares';
        }
        
        if (hectares > 10000) {
            hectares = 10000;
            hectaresInput.value = 10000;
            mensagem.innerHTML = '⚠️ Limite máximo: 10.000 hectares';
        }
        
        // CÁLCULO: hectares * 3.2 (fator médio de captura) * tecnologia
        let carbonoTotal = hectares * 3.2 * tecnologia;
        carbonoTotal = Math.round(carbonoTotal * 10) / 10;
        
        // Exibe o resultado
        carbonoValue.innerHTML = carbonoTotal + ' t CO₂e';
        
        // Mensagem personalizada
        if (carbonoTotal > 1000) {
            mensagem.innerHTML = '🚜✨ Excelente! Fazenda carbono neutro! Continue assim!';
        } else if (carbonoTotal > 400) {
            mensagem.innerHTML = '💚 Bom caminho! Invista em mais tecnologias verdes.';
        } else {
            mensagem.innerHTML = '🌱 Aumente o nível tecnológico para capturar mais carbono.';
        }
        
        console.log('Resultado:', carbonoTotal);
    }
    
    // Eventos da calculadora
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calcularCarbono);
        console.log('Botão calcular configurado');
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            hectaresInput.value = 100;
            tecnologiaSelect.value = "1.2";
            calcularCarbono();
            mensagem.innerHTML = '💧 Valores resetados! Simule novos cenários.';
            console.log('Resetado');
        });
    }
    
    // Calcula automaticamente
    if (hectaresInput) {
        hectaresInput.addEventListener('input', calcularCarbono);
    }
    if (tecnologiaSelect) {
        tecnologiaSelect.addEventListener('change', calcularCarbono);
    }
    
    // Executa a primeira vez
    calcularCarbono();
    
    // ========== 3. QUIZ INTERATIVO (100% FUNCIONAL) ==========
    const perguntas = [
        {
            pergunta: "Qual prática agrícola contribui diretamente para o sequestro de carbono no solo?",
            opcoes: ["Plantio direto na palha", "Queima da palhada", "Uso intensivo de arado", "Monocultura extensiva"],
            correta: 0
        },
        {
            pergunta: "O que significa a sigla 'ILPF' na agricultura sustentável?",
            opcoes: ["Integração Lavoura-Pecuária-Floresta", "Índice de Lucro por Fazenda", "Irrigação de Larga Precisão", "Insumo de Longa Proteção"],
            correta: 0
        },
        {
            pergunta: "Qual tecnologia reduz o consumo de água na agricultura em até 50%?",
            opcoes: ["Irrigação por gotejamento", "Irrigação por aspersão", "Irrigação por inundação", "Irrigação por sulcos"],
            correta: 0
        },
        {
            pergunta: "O biogás produzido no campo é benéfico porque:",
            opcoes: ["Aproveita resíduos e gera energia renovável", "Polui mais que o diesel", "É muito caro e inviável", "Não tem aplicação prática"],
            correta: 0
        }
    ];
    
    let perguntaAtual = 0;
    let pontuacao = 0;
    let respondeu = false;
    let totalPerguntas = perguntas.length;
    
    const quizPergunta = document.getElementById('quizQuestion');
    const quizOpcoes = document.getElementById('quizOptions');
    const quizFeedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('nextQuizBtn');
    const scoreText = document.getElementById('quizScoreText');
    
    console.log('Elementos do quiz:', {
        pergunta: quizPergunta,
        opcoes: quizOpcoes,
        feedback: quizFeedback,
        nextBtn: nextBtn
    });
    
    function atualizarPontuacao() {
        scoreText.innerHTML = `✅ Pontuação: ${pontuacao}/${totalPerguntas}`;
    }
    
    function carregarPergunta() {
        console.log('Carregando pergunta', perguntaAtual);
        respondeu = false;
        quizFeedback.innerHTML = '';
        
        const p = perguntas[perguntaAtual];
        quizPergunta.innerHTML = p.pergunta;
        
        // Limpa e recria os botões
        quizOpcoes.innerHTML = '';
        
        p.opcoes.forEach((opcao, index) => {
            const btn = document.createElement('button');
            btn.textContent = opcao;
            btn.classList.add('quiz-btn');
            btn.setAttribute('data-index', index);
            btn.addEventListener('click', function() {
                responderPergunta(index, btn);
            });
            quizOpcoes.appendChild(btn);
        });
        
        // Habilita todos os botões
        document.querySelectorAll('.quiz-btn').forEach(btn => {
            btn.disabled = false;
            btn.style.background = '#f1f3ec';
            btn.style.color = '#1f2a1e';
        });
        
        // Atualiza texto do botão próximo
        if (perguntaAtual === totalPerguntas - 1) {
            nextBtn.innerHTML = '🏆 Ver resultado final';
        } else {
            nextBtn.innerHTML = 'Próxima pergunta →';
        }
    }
    
    function responderPergunta(resposta, botao) {
        if (respondeu) {
            quizFeedback.innerHTML = '⚠️ Você já respondeu esta pergunta! Avance para a próxima.';
            return;
        }
        
        console.log('Resposta selecionada:', resposta);
        const p = perguntas[perguntaAtual];
        const isCorreta = (resposta === p.correta);
        
        if (isCorreta) {
            pontuacao++;
            quizFeedback.innerHTML = '🎉 CORRETO! 🌾 Excelente conhecimento sobre agro sustentável!';
            botao.style.background = '#4caf50';
            botao.style.color = 'white';
        } else {
            quizFeedback.innerHTML = `❌ INCORRETO! A resposta correta é: "${p.opcoes[p.correta]}"`;
            botao.style.background = '#f44336';
            botao.style.color = 'white';
            
            // Destaca a resposta correta em verde
            const botoes = document.querySelectorAll('.quiz-btn');
            botoes[p.correta].style.background = '#4caf50';
            botoes[p.correta].style.color = 'white';
        }
        
        respondeu = true;
        atualizarPontuacao();
        
        // Desabilita todos os botões
        document.querySelectorAll('.quiz-btn').forEach(btn => {
            btn.disabled = true;
        });
    }
    
    function proximaPergunta() {
        console.log('Próxima pergunta clicada, respondeu:', respondeu);
        
        if (!respondeu && perguntaAtual < totalPerguntas) {
            quizFeedback.innerHTML = '🔔 Por favor, selecione uma resposta antes de continuar!';
            return;
        }
        
        if (perguntaAtual + 1 < totalPerguntas) {
            perguntaAtual++;
            carregarPergunta();
        } else {
            // Fim do quiz
            const mensagemFinal = pontuacao === totalPerguntas 
                ? '🎉 PARABÉNS! Você acertou todas! Você é um especialista em agro sustentável! 🌟'
                : `✨ Quiz finalizado! Você acertou ${pontuacao} de ${totalPerguntas} questões. ✨`;
            
            quizFeedback.innerHTML = mensagemFinal;
            nextBtn.innerHTML = '🔄 Recomeçar Quiz';
            
            // Substitui o evento para reiniciar
            nextBtn.onclick = function() {
                reiniciarQuiz();
            };
        }
    }
    
    function reiniciarQuiz() {
        console.log('Reiniciando quiz');
        perguntaAtual = 0;
        pontuacao = 0;
        respondeu = false;
        atualizarPontuacao();
        carregarPergunta();
        quizFeedback.innerHTML = '♻️ Quiz reiniciado! Boa sorte! 🌱';
        
        // Restaura o evento original
        nextBtn.onclick = proximaPergunta;
    }
    
    // Configura o evento do botão próximo
    if (nextBtn) {
        nextBtn.onclick = proximaPergunta;
        console.log('Botão próximo configurado');
    }
    
    // Inicia o quiz
    carregarPergunta();
    atualizarPontuacao();
    
    // ========== 4. SCROLL SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('Scroll para:', targetId);
            }
        });
    });
    
    console.log('Site completamente inicializado!');
});

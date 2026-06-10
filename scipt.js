// AGUARDA O HTML CARREGAR COMPLETAMENTE
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('=== SITE INICIADO ===');
    
    // ============================================
    // 1. MENU HAMBURGUER
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            console.log('Menu alternado');
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
    
    // ============================================
    // 2. CALCULADORA DE CARBONO (FUNCIONAL)
    // ============================================
    
    // Pegando os elementos do DOM
    const hectaresInput = document.getElementById('hectares');
    const tecnologiaSelect = document.getElementById('tecnologia');
    const carbonoValue = document.getElementById('carbonoValue');
    const mensagemDinamica = document.getElementById('mensagemDinamica');
    const calcularBtn = document.getElementById('calcularBtn');
    const resetSimuladorBtn = document.getElementById('resetSimulador');
    
    // Verificar se encontrou os elementos
    console.log('Elementos encontrados:', {
        hectares: !!hectaresInput,
        tecnologia: !!tecnologiaSelect,
        carbono: !!carbonoValue,
        mensagem: !!mensagemDinamica,
        calcular: !!calcularBtn,
        reset: !!resetSimuladorBtn
    });
    
    // Função que calcula o carbono
    function calcularCarbono() {
        console.log('=== CALCULANDO ===');
        
        // Pega os valores
        let hectares = parseFloat(hectaresInput.value);
        let tecnologia = parseFloat(tecnologiaSelect.value);
        
        console.log('Hectares:', hectares, 'Tecnologia:', tecnologia);
        
        // Validações
        if (isNaN(hectares) || hectares < 1) {
            hectares = 100;
            hectaresInput.value = 100;
            mensagemDinamica.innerHTML = '⚠️ Valor ajustado para 100 hectares';
        }
        
        if (hectares > 10000) {
            hectares = 10000;
            hectaresInput.value = 10000;
            mensagemDinamica.innerHTML = '⚠️ Limite máximo: 10.000 hectares';
        }
        
        // CÁLCULO: hectares * 3.2 (fator médio) * tecnologia
        let carbonoTotal = hectares * 3.2 * tecnologia;
        carbonoTotal = Math.round(carbonoTotal * 10) / 10;
        
        // Exibe o resultado
        carbonoValue.innerHTML = carbonoTotal + ' t CO₂e';
        
        // Mensagem personalizada
        if (carbonoTotal > 1000) {
            mensagemDinamica.innerHTML = '🚜✨ EXCELENTE! Fazenda carbono neutro! Parabéns!';
        } else if (carbonoTotal > 400) {
            mensagemDinamica.innerHTML = '💚 BOM CAMINHO! Continue investindo em tecnologias verdes.';
        } else {
            mensagemDinamica.innerHTML = '🌱 INVISTA MAIS! Aumente o nível tecnológico para capturar mais carbono.';
        }
        
        console.log('Resultado:', carbonoTotal, 't CO₂e');
    }
    
    // Configurar eventos da calculadora
    if (calcularBtn) {
        calcularBtn.addEventListener('click', function() {
            console.log('Botão CALCULAR clicado');
            calcularCarbono();
        });
    }
    
    if (resetSimuladorBtn) {
        resetSimuladorBtn.addEventListener('click', function() {
            console.log('Botão RESETAR clicado');
            hectaresInput.value = 100;
            tecnologiaSelect.value = "1.2";
            calcularCarbono();
            mensagemDinamica.innerHTML = '💧 Valores resetados! Simule novos cenários.';
        });
    }
    
    // Atualizar automaticamente quando digitar ou mudar
    if (hectaresInput) {
        hectaresInput.addEventListener('input', calcularCarbono);
    }
    if (tecnologiaSelect) {
        tecnologiaSelect.addEventListener('change', calcularCarbono);
    }
    
    // Executar cálculo inicial
    calcularCarbono();
    
    // ============================================
    // 3. QUIZ INTERATIVO (FUNCIONAL)
    // ============================================
    
    // Banco de perguntas
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
    
    // Variáveis do quiz
    let perguntaAtual = 0;
    let pontuacao = 0;
    let respondeu = false;
    let totalPerguntas = perguntas.length;
    
    // Elementos do quiz
    const quizPergunta = document.getElementById('quizQuestion');
    const quizOpcoes = document.getElementById('quizOptions');
    const quizFeedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('nextQuizBtn');
    const scoreText = document.getElementById('quizScoreText');
    
    console.log('Elementos do quiz:', {
        pergunta: !!quizPergunta,
        opcoes: !!quizOpcoes,
        feedback: !!quizFeedback,
        nextBtn: !!nextBtn,
        score: !!scoreText
    });
    
    // Atualizar pontuação na tela
    function atualizarPontuacao() {
        if (scoreText) {
            scoreText.innerHTML = `✅ Pontuação: ${pontuacao}/${totalPerguntas}`;
        }
    }
    
    // Carregar pergunta atual
    function carregarPergunta() {
        console.log('Carregando pergunta', perguntaAtual + 1);
        respondeu = false;
        
        if (quizFeedback) quizFeedback.innerHTML = '';
        
        const p = perguntas[perguntaAtual];
        if (quizPergunta) quizPergunta.innerHTML = p.pergunta;
        
        // Limpar e recriar botões
        if (quizOpcoes) {
            quizOpcoes.innerHTML = '';
            
            p.opcoes.forEach((opcao, index) => {
                const btn = document.createElement('button');
                btn.textContent = opcao;
                btn.classList.add('quiz-btn');
                btn.style.margin = '5px';
                btn.setAttribute('data-index', index);
                
                btn.addEventListener('click', function() {
                    responderPergunta(index, btn);
                });
                
                quizOpcoes.appendChild(btn);
            });
        }
        
        // Atualizar texto do botão próximo
        if (nextBtn) {
            if (perguntaAtual === totalPerguntas - 1) {
                nextBtn.innerHTML = '🏆 Ver resultado final';
            } else {
                nextBtn.innerHTML = 'Próxima pergunta →';
            }
        }
    }
    
    // Função para responder
    function responderPergunta(resposta, botao) {
        if (respondeu) {
            if (quizFeedback) quizFeedback.innerHTML = '⚠️ Você já respondeu esta pergunta! Avance para a próxima.';
            return;
        }
        
        console.log('Resposta selecionada:', resposta);
        const p = perguntas[perguntaAtual];
        const isCorreta = (resposta === p.correta);
        
        if (isCorreta) {
            pontuacao++;
            if (quizFeedback) {
                quizFeedback.innerHTML = '🎉 CORRETO! 🌾 Excelente conhecimento sobre agro sustentável!';
                quizFeedback.style.background = '#d4edda';
                quizFeedback.style.color = '#155724';
            }
            botao.style.background = '#4caf50';
            botao.style.color = 'white';
        } else {
            if (quizFeedback) {
                quizFeedback.innerHTML = `❌ INCORRETO! A resposta correta é: "${p.opcoes[p.correta]}"`;
                quizFeedback.style.background = '#f8d7da';
                quizFeedback.style.color = '#721c24';
            }
            botao.style.background = '#f44336';
            botao.style.color = 'white';
            
            // Destacar resposta correta
            const botoes = document.querySelectorAll('.quiz-btn');
            if (botoes[p.correta]) {
                botoes[p.correta].style.background = '#4caf50';
                botoes[p.correta].style.color = 'white';
            }
        }
        
        respondeu = true;
        atualizarPontuacao();
        
        // Desabilitar todos os botões
        const botoes = document.querySelectorAll('.quiz-btn');
        botoes.forEach(btn => {
            btn.disabled = true;
        });
    }
    
    // Próxima pergunta ou finalizar
    function proximaPergunta() {
        console.log('Próxima pergunta, respondeu:', respondeu);
        
        if (!respondeu) {
            if (quizFeedback) {
                quizFeedback.innerHTML = '🔔 Por favor, selecione uma resposta antes de continuar!';
                quizFeedback.style.background = '#fff3cd';
                quizFeedback.style.color = '#856404';
            }
            return;
        }
        
        if (perguntaAtual + 1 < totalPerguntas) {
            perguntaAtual++;
            carregarPergunta();
        } else {
            // Fim do quiz
            let mensagemFinal = '';
            if (pontuacao === totalPerguntas) {
                mensagemFinal = '🎉 PARABÉNS! Você acertou todas! Você é um especialista em agro sustentável! 🌟';
            } else {
                mensagemFinal = `✨ Quiz finalizado! Você acertou ${pontuacao} de ${totalPerguntas} questões. ✨`;
            }
            
            if (quizFeedback) {
                quizFeedback.innerHTML = mensagemFinal;
                quizFeedback.style.background = '#d1ecf1';
                quizFeedback.style.color = '#0c5460';
            }
            
            if (nextBtn) {
                nextBtn.innerHTML = '🔄 Recomeçar Quiz';
                nextBtn.onclick = function() {
                    reiniciarQuiz();
                };
            }
        }
    }
    
    // Reiniciar quiz
    function reiniciarQuiz() {
        console.log('Reiniciando quiz');
        perguntaAtual = 0;
        pontuacao = 0;
        respondeu = false;
        
        atualizarPontuacao();
        carregarPergunta();
        
        if (quizFeedback) {
            quizFeedback.innerHTML = '♻️ Quiz reiniciado! Boa sorte! 🌱';
            quizFeedback.style.background = '#e2f0d9';
            quizFeedback.style.color = '#2e7d32';
        }
        
        if (nextBtn) {
            nextBtn.onclick = proximaPergunta;
        }
    }
    
    // Inicializar quiz
    if (nextBtn) {
        nextBtn.onclick = proximaPergunta;
    }
    
    carregarPergunta();
    atualizarPontuacao();
    
    // ============================================
    // 4. SCROLL SUAVE
    // ============================================
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
    
    console.log('=== SITE PRONTO PARA USO ===');
});

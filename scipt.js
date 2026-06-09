// ---------- JAVASCRIPT ESTRUTURADO COM FUNÇÕES, MANIPULAÇÃO DOM, VALIDAÇÕES, EVENTOS ----------

// Aguarda o DOM totalmente carregado para garantir que os elementos existam
document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- 1. MENU HAMBURGUER (responsivo e acessível) ----------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const expanded = navLinks.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Fechar menu ao clicar em link (boa prática)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
                if(menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ---------- 2. SIMULADOR DE CARBONO (funções, validações) ----------
    const hectaresInput = document.getElementById('hectares');
    const tecnologiaSelect = document.getElementById('tecnologia');
    const carbonoValueSpan = document.getElementById('carbonoValue');
    const mensagemDinamica = document.getElementById('mensagemDinamica');
    const calcularBtn = document.getElementById('calcularBtn');
    const resetSimuladorBtn = document.getElementById('resetSimulador');

    // Função principal para calcular crédito de carbono simulado (toneladas CO2eq capturado/ano)
    function calcularImpacto() {
        let hectares = parseFloat(hectaresInput.value);
        // Validação dinâmica
        if (isNaN(hectares) || hectares < 5) {
            hectaresInput.value = 10;
            hectares = 10;
            mensagemDinamica.innerText = '⚠️ Mínimo 5 hectares. Ajustado para 10 hectares.';
            setTimeout(() => {
                if (mensagemDinamica.innerText.includes('Mínimo')) mensagemDinamica.innerText = '✅ Valor atualizado.';
            }, 1800);
        } else if (hectares > 5000) {
            hectaresInput.value = 5000;
            hectares = 5000;
            mensagemDinamica.innerText = '🌳 Área muito grande, limite máximo 5000 hectares.';
            setTimeout(() => {
                if (mensagemDinamica.innerText.includes('limite')) mensagemDinamica.innerText = '🌿 Excelente escala sustentável.';
            }, 2000);
        } else {
            mensagemDinamica.innerText = '🌍 Simulação baseada em técnicas regenerativas.';
        }

        const fatorTecnologico = parseFloat(tecnologiaSelect.value);
        // Cálculo base: cada hectare com manejo conservacionista captura entre 2 a 6 ton CO2e / ano
        let carbonoTotal = hectares * 3.2 * fatorTecnologico;
        carbonoTotal = Math.round(carbonoTotal * 10) / 10;
        carbonoValueSpan.innerText = `${carbonoTotal} t CO₂e`;

        let mensagemExtra = '';
        if (carbonoTotal > 800) mensagemExtra = '🚜✨ Fazenda carbono neutro! Exemplo de agricultura positiva.';
        else if (carbonoTotal > 300) mensagemExtra = '💚 Bom caminho! Invista em sistemas agroflorestais.';
        else mensagemExtra = '🌿 Aumente a integração lavoura-pecuária para mais créditos.';
        document.getElementById('mensagemDinamica').innerHTML = `<i class="fas fa-info-circle"></i> ${mensagemExtra}`;
    }

    // Evento de calcular
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calcularImpacto);
    }

    // Reset simulador
    if (resetSimuladorBtn) {
        resetSimuladorBtn.addEventListener('click', () => {
            hectaresInput.value = 100;
            tecnologiaSelect.value = "1.2";
            calcularImpacto();
            mensagemDinamica.innerHTML = '💧 Valores redefinidos. Simule novos cenários!';
            setTimeout(() => {
                if (mensagemDinamica.innerHTML.includes('redefinidos')) calcularImpacto();
            }, 1000);
        });
    }

    // atualizar ao digitar (validação live + cálculo automático)
    if (hectaresInput) hectaresInput.addEventListener('input', calcularImpacto);
    if (tecnologiaSelect) tecnologiaSelect.addEventListener('change', calcularImpacto);
    // inicializar simulador
    calcularImpacto();

    // ---------- 3. QUIZ INTERATIVO (eventos, manipulação dinâmica DOM, transições, pontuação) ----------
    const quizData = [
        {
            question: "Qual prática agrícola contribui diretamente para o sequestro de carbono no solo?",
            options: ["Plantio direto na palha", "Queima da palhada", "Uso intensivo de arado", "Monocultura extensiva"],
            correct: 0
        },
        {
            question: "O que é o conceito de 'ILPF'?",
            options: ["Integração Lavoura-Pecuária-Floresta", "Índice de Logística Produtiva Familiar", "Inseminação de Larvas e Pragas Fixas", "Irrigação de Larga Perda de Fluxo"],
            correct: 0
        },
        {
            question: "Qual tecnologia reduz o consumo de água na agricultura em até 50%?",
            options: ["Irrigação por sulco", "Aspersão convencional", "Gotejamento e sensores de umidade", "Inundação controlada"],
            correct: 2
        },
        {
            question: "Biogás no campo é benéfico porque:",
            options: ["Polui mais que diesel", "Aproveita resíduos e gera energia renovável", "Aumenta o efeito estufa", "Não tem aplicação real"],
            correct: 1
        }
    ];

    let currentQuestionIndex = 0;
    let quizScore = 0;
    let quizAnswered = false;
    let totalQuestions = quizData.length;

    const quizQuestionElem = document.getElementById('quizQuestion');
    const quizOptionsElem = document.getElementById('quizOptions');
    const quizFeedbackElem = document.getElementById('quizFeedback');
    const nextQuizBtn = document.getElementById('nextQuizBtn');
    const quizScoreText = document.getElementById('quizScoreText');

    function updateScoreDisplay() {
        quizScoreText.innerHTML = `✅ Pontuação: ${quizScore}/${totalQuestions}`;
    }

    function loadQuestion() {
        quizAnswered = false;
        quizFeedbackElem.innerHTML = '';
        const current = quizData[currentQuestionIndex];
        quizQuestionElem.textContent = current.question;
        quizOptionsElem.innerHTML = '';
        current.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.classList.add('quiz-btn');
            btn.setAttribute('data-opt-index', idx);
            btn.addEventListener('click', () => handleAnswer(idx, btn));
            quizOptionsElem.appendChild(btn);
        });
        const allBtns = document.querySelectorAll('.quiz-btn');
        allBtns.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
        });
        nextQuizBtn.disabled = false;
        nextQuizBtn.textContent = (currentQuestionIndex === totalQuestions - 1) ? "Ver resultado final" : "Próxima pergunta →";
    }

    function handleAnswer(selectedIdx, btnElement) {
        if (quizAnswered) {
            quizFeedbackElem.innerHTML = '⚠️ Você já respondeu esta pergunta! Avance para a próxima.';
            return;
        }
        const current = quizData[currentQuestionIndex];
        const isCorrect = (selectedIdx === current.correct);
        if (isCorrect) {
            quizScore++;
            quizFeedbackElem.innerHTML = '🎉 Correto! 🌾 Essa prática fortalece a sustentabilidade.';
            btnElement.classList.add('highlight');
            setTimeout(() => btnElement.classList.remove('highlight'), 400);
        } else {
            const respostaCerta = current.options[current.correct];
            quizFeedbackElem.innerHTML = `❌ Resposta incorreta. A alternativa correta é: "${respostaCerta}". Estude mais sobre agroecologia!`;
            btnElement.style.background = "#f5cfcf";
        }
        quizAnswered = true;
        updateScoreDisplay();

        const allOptionBtns = document.querySelectorAll('.quiz-btn');
        allOptionBtns.forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.getAttribute('data-opt-index')) === current.correct && !isCorrect) {
                btn.style.background = "#c8e6c9";
                btn.style.border = "2px solid #2e7d32";
            }
        });
    }

    function nextQuestion() {
        if (!quizAnswered && currentQuestionIndex < totalQuestions) {
            quizFeedbackElem.innerHTML = '🔔 Por favor, selecione uma resposta antes de continuar.';
            return;
        }
        if (currentQuestionIndex + 1 < totalQuestions) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            quizFeedbackElem.innerHTML = `✨ Quiz finalizado! Sua pontuação: ${quizScore}/${totalQuestions}. Recomece se quiser. 🌱`;
            nextQuizBtn.textContent = "Recomeçar Quiz";
            nextQuizBtn.disabled = false;
            nextQuizBtn.onclick = () => {
                resetQuiz();
            };
            return;
        }
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        quizScore = 0;
        quizAnswered = false;
        updateScoreDisplay();
        loadQuestion();
        quizFeedbackElem.innerHTML = '♻️ Quiz reiniciado! Boa sorte.';
        nextQuizBtn.onclick = nextQuestion;
        nextQuizBtn.textContent = "Próxima pergunta →";
    }

    if (nextQuizBtn) {
        nextQuizBtn.onclick = nextQuestion;
    }

    loadQuestion();
    updateScoreDisplay();

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

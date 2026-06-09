🌾 Agro Forte, Futuro Sustentável
📌 Visão Geral do Projeto
Este projeto foi desenvolvido como parte de uma avaliação acadêmica com o tema "Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente". O objetivo é demonstrar como a tecnologia e as boas práticas agrícolas podem caminhar juntas para garantir alta produtividade sem comprometer os recursos naturais para as futuras gerações.

O site apresenta conceitos de agricultura regenerativa, um simulador interativo de pegada de carbono e um quiz educativo, tudo isso em uma interface moderna, responsiva e acessível.

🛠️ Tecnologias Utilizadas
Tecnologia	Finalidade
HTML5	Estrutura semântica do conteúdo, acessibilidade e organização das seções.
CSS3	Estilização visual, layout responsivo (Flexbox, Grid), animações suaves e media queries para adaptação mobile.
JavaScript (Vanilla)	Lógica de programação: manipulação do DOM, eventos de clique/input, validações dinâmicas, controle de variáveis e funções.
Font Awesome 6	Ícones vetoriais para enriquecer a experiência visual.
Google Fonts (padrão)	Tipografia limpa e legível (fallback Segoe UI).
Importante: Não foram utilizadas bibliotecas externas de JavaScript ou frameworks. Todo o código é puro e segue os requisitos do projeto.

📂 Estrutura de Arquivos
text
projeto-agro-sustentavel/
│
├── index.html          # Estrutura principal do site
├── style.css           # Estilos e responsividade
├── script.js           # Lógica JavaScript (simulador, quiz, menu)
└── README.md           # Este arquivo de documentação
Como executar localmente:
Faça o download ou clone este repositório.

Certifique-se de que os três arquivos (index.html, style.css, script.js) estejam na mesma pasta.

Abra o arquivo index.html em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).

Nenhum servidor web é necessário – o site roda completamente no lado do cliente.

🧩 Funcionalidades Implementadas
1. 🧭 Menu de Navegação Responsivo
Menu horizontal em desktop que se transforma em menu hambúrguer em dispositivos móveis (max-width: 768px).

Links com rolagem suave para as seções internas.

Destaque visual do item ativo.

2. 📱 Layout Responsivo (CSS Media Queries)
Breakpoints em 768px e 480px.

Grid de cards se adapta automaticamente.

Área do simulador e quiz ajustam disposição em telas menores.

Tipografia e padding redimensionados para melhor legibilidade.

3. 🌱 Simulador de Pegada de Carbono (JavaScript)
O usuário informa:

Área cultivada (em hectares) – com validação de limites (5 a 5000 hectares).

Nível tecnológico sustentável – três opções com diferentes fatores de eficiência ambiental.

O cálculo simula a quantidade de carbono capturado por ano (t CO₂e) com base na fórmula:

text
Carbono = hectares × 3.2 (fator médio) × índice tecnológico
Funcionalidades extras:

Validação dinâmica: se o usuário digitar valores inválidos, o sistema corrige automaticamente.

Feedback visual e textual com mensagens personalizadas.

Botão "Resetar" para restaurar valores padrão.

Atualização automática ao digitar ou alterar o seletor.

4. 🧠 Quiz Educativo Interativo
4 perguntas sobre práticas sustentáveis no agro.

O usuário clica em uma das opções e recebe feedback imediato (certo/errado).

Ao errar, a resposta correta é destacada em verde.

Pontuação acumulada é exibida e atualizada em tempo real.

Botão "Próxima pergunta" só avança após resposta.

Ao final, exibe pontuação total e permite recomeçar o quiz.

Animações sutis (pulse) em respostas corretas.

5. ♿ Acessibilidade
Atributos aria-label e aria-expanded no menu hambúrguer.

Foco visível personalizado para navegação por teclado (outline em botões e links).

Estrutura HTML semântica (<header>, <main>, <section>, <footer>).

6. 🎨 Transições e Microinterações
Hover nos cards com elevação suave.

Botões com escala sutil ao passar o mouse.

Feedback visual de carregamento e validações.

Scroll suave entre seções.

📊 Complexidade Técnica – Atendimento aos Critérios
Critério	Como foi atendido
I. Layout responsivo	Media queries para 768px e 480px; menu hambúrguer; grid adaptável.
II. Semântica HTML avançada	Uso de section, article implícito nos cards, header, footer, nav, main.
III. Lógica estruturada em JS	Funções modulares (calcularImpacto, loadQuestion, handleAnswer, resetQuiz). Manipulação eficiente do DOM com createElement, addEventListener. Controle de variáveis de estado (quizAnswered, currentQuestionIndex).
IV. Documentação e comentários	Este README detalhado + comentários no código CSS e JS explicando blocos principais.
V. Funcionalidades adicionais	Simulador com validação dinâmica, quiz completo, menu responsivo interativo, animações CSS e mensagens contextuais.
🌍 Temática "Agro Forte, Futuro Sustentável"
O conteúdo do site aborda:

Plantio Direto – conservação do solo.

Irrigação Inteligente – economia hídrica.

Energia Limpa no Campo – biogás e solar.

Corredores Ecológicos / ILPF – integração lavoura-pecuária-floresta.

O simulador reforça a ideia de que quanto maior o nível tecnológico sustentável, maior a captura de carbono, mostrando na prática o equilíbrio entre produção e meio ambiente.

O quiz educa o visitante sobre conceitos-chave, fixando o aprendizado de forma lúdica.

🔧 Possíveis Melhorias Futuras
Salvar pontuação do quiz no localStorage para visitantes recorrentes.

Gráficos interativos (Chart.js) para visualizar evolução da captura de carbono.

Inclusão de mais práticas e vídeos explicativos.

Modo escuro (dark mode) como opção de acessibilidade.

📝 Considerações Finais
Este projeto atende integralmente aos requisitos propostos:

✅ Uso exclusivo de HTML, CSS e JavaScript.

✅ Site responsivo com media queries.

✅ JavaScript com funções, manipulação de DOM e eventos.

✅ Documentação clara e comentários no código.

✅ Funcionalidades interativas que enriquecem a experiência do usuário.

Desenvolvido por: Estudante de Tecnologia
Ano: 2026
Licença: Livre para fins acadêmicos e educacionais.

📧 Contato
Para dúvidas ou sugestões, entre em contato através do repositório ou ambiente acadêmico.

"Produzir mais, preservar melhor: o futuro do agro depende do equilíbrio que construirmos hoje." 🌱

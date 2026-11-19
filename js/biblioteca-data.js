/* Biblioteca interativa — coleções de conhecimento
   Formato modular: categorias > temas > capítulos. Novas coleções podem ser
   adicionadas aqui sem alterar o renderizador. Conteúdo revisado para estudantes. */
(function (global) {
  'use strict';

  const IMG = 'assets/images/tecnologia/';

  const CATEGORIA = {
    id: 'tecnologia',
    titulo: 'Tecnologia e Futuro',
    kicker: 'Coleção 01 · Ciência, invenção e imaginação',
    imagem: IMG + 'tech-hero.svg',
    intro: 'Da primeira ferramenta de pedra aos sistemas que aprendem com dados, a tecnologia é uma história contínua de perguntas, tentativas e descobertas.',
    descricao: 'A tecnologia mudou a forma como vivemos, trabalhamos, nos comunicamos e guardamos o que sabemos. Nesta coleção, você percorre três caminhos: descobre como a inteligência artificial aprende, acompanha a evolução das máquinas ao longo do tempo e entende como os robôs são construídos.',
    temas: [
      {
        id: 'ia',
        numero: '01',
        titulo: 'Inteligência Artificial',
        subtitulo: 'Aprender com dados',
        resumo: 'Como sistemas reconhecem padrões, geram respostas e ajudam pessoas — e onde precisamos de cuidado.',
        imagem: IMG + 'tech-ia.svg',
        cor: 'ia',
        duracao: '6 capítulos',
        intro: 'A inteligência artificial deixou de ser ideia de laboratório e passou a fazer parte de buscas, traduções, recomendações e ferramentas de criação. Aqui, você vai entender o que esses sistemas fazem, como aprendem e quais são seus limites.',
        capitulos: [
          {
            id: 'conceito',
            numero: 1,
            titulo: 'O que é inteligência artificial?',
            intro: 'Antes de falar em redes ou algoritmos, vale começar pelo básico: o que torna um sistema "inteligente"?',
            imagem: IMG + 'tech-ia.svg',
            blocos: [
              { titulo: 'Um conceito amplo', texto: 'Inteligência artificial (IA) é a área da computação que cria sistemas capazes de realizar tarefas que normalmente exigiriam inteligência humana: reconhecer imagens, entender linguagem, prever situações, sugerir decisões ou gerar textos. Isso não significa que a máquina tenha consciência, emoções ou intenções próprias.' },
              { titulo: 'Programa tradicional × sistema inteligente', texto: 'Um programa tradicional segue regras escritas uma a uma pelo programador: "se acontecer X, faça Y". Um sistema de IA recebe exemplos e ajusta seus parâmetros internos para encontrar padrões. Ele generaliza a partir do que viu, em vez de repetir apenas uma lista fixa de instruções.' },
              { titulo: 'Presente no cotidiano', texto: 'Você já usa IA ao executar uma busca, filtrar mensagens indesejadas, traduzir um texto, receber sugestões de filmes, desbloquear o celular pelo rosto ou pedir a uma assistente de voz que toque uma música. Muitas dessas funções passam despercebidas justamente por funcionarem bem.' },
              { titulo: 'Aplicações que já existem', texto: 'Reconhecimento de fala em mensagens, leitura automática de caracteres em documentos, recomendações em lojas e plataformas de ensino, detecção de fraudes em transações e ferramentas de apoio à criação de imagens e textos são exemplos concretos de IA em uso hoje.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'IA não é uma mente dentro do computador: é um conjunto de técnicas para encontrar padrões e produzir respostas úteis a partir de dados.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'O termo "inteligência artificial" foi usado em 1956, na Conferência de Dartmouth, nos Estados Unidos. Na época, pesquisadores já imaginavam máquinas capazes de simular aspectos do raciocínio humano.' },
            vocabulario: [
              { termo: 'Algoritmo', definicao: 'Sequência ordenada de passos para resolver um problema ou realizar uma tarefa.' },
              { termo: 'Modelo', definicao: 'Estrutura matemática ajustada com dados e usada para fazer previsões ou gerar respostas.' }
            ],
            pergunta: {
              enunciado: 'O que distingue um sistema de IA de um programa tradicional?',
              opcoes: [
                { texto: 'Ele aprende padrões a partir de dados, em vez de seguir apenas regras escritas manualmente.', correta: true, porque: 'Essa é a diferença central: o modelo é ajustado por exemplos e consegue generalizar para situações novas dentro do que aprendeu.' },
                { texto: 'Ele precisa necessariamente de acesso à internet para funcionar.', correta: false, porque: 'Muitos modelos podem rodar localmente, sem conexão; a internet é comum, mas não obrigatória.' },
                { texto: 'Ele tem consciência e intenções próprias.', correta: false, porque: 'Sistemas atuais processam informações e geram respostas, mas não possuem consciência nem intenção.' },
                { texto: 'Ele nunca comete erros.', correta: false, porque: 'Modelos podem errar, especialmente diante de dados diferentes daqueles usados no treinamento.' }
              ]
            }
          },
          {
            id: 'aprendizado',
            numero: 2,
            titulo: 'Como as máquinas aprendem?',
            intro: 'Aprender, para uma máquina, significa melhorar o desempenho em uma tarefa com base em exemplos.',
            imagem: IMG + 'tech-ia.svg',
            blocos: [
              { titulo: 'Aprendizado de máquina', texto: 'Machine Learning, ou aprendizado de máquina, é a área da IA que desenvolve métodos para que sistemas melhorem seu desempenho usando dados. Em vez de escrever uma regra para cada caso, o programador define uma estrutura e um objetivo; o modelo encontra os ajustes que reduzem o erro.' },
              { titulo: 'Encontrando padrões', texto: 'Para reconhecer, por exemplo, mensagens indesejadas, o sistema observa milhares de mensagens classificadas. Ele percebe combinações de palavras, remetentes e formatos que aparecem com mais frequência em cada grupo. Com o tempo, passa a reconhecer sinais parecidos em mensagens nunca vistas.' },
              { titulo: 'A importância dos dados', texto: 'Dados são a matéria-prima. A quantidade ajuda, mas a qualidade importa mais: exemplos variados, corretos e representativos produzem modelos melhores. Se os dados estiverem incompletos ou errados, o aprendizado também será comprometido.' },
              { titulo: 'Treinamento e teste', texto: 'Durante o treinamento, o modelo compara suas respostas com as respostas esperadas e ajusta parâmetros internos. Depois, é avaliado com exemplos separados, que nunca viu antes. Esse teste indica se ele realmente aprendeu a generalizar ou apenas decorou os exemplos do treino.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Aprender é ajustar parâmetros internos para reduzir erros — e, principalmente, para lidar bem com exemplos novos.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'O Perceptron, criado por Frank Rosenblatt em 1957, já mostrava que uma máquina podia ajustar pesos para classificar padrões simples. Foi um dos precursores das redes neurais modernas.' },
            vocabulario: [
              { termo: 'Treinamento', definicao: 'Processo de apresentar exemplos ao modelo e ajustar seus parâmetros para melhorar o desempenho.' },
              { termo: 'Generalização', definicao: 'Capacidade de lidar corretamente com dados novos, não apenas com os exemplos usados no treino.' }
            ],
            pergunta: {
              enunciado: 'Por que a qualidade dos dados é tão importante no treinamento de um modelo?',
              opcoes: [
                { texto: 'Porque o modelo aprende os padrões presentes nos dados; dados ruins geram respostas ruins.', correta: true, porque: 'O modelo reproduz regularidades do que recebe. Dados incorretos, pobres ou tendenciosos limitam e distorcem o aprendizado.' },
                { texto: 'Porque quanto maior o arquivo, mais rápido o computador desliga.', correta: false, porque: 'O tamanho do arquivo não funciona assim; o que importa é a informação que ele contém e o processo de treino.' },
                { texto: 'Porque dados não influenciam o resultado de um modelo.', correta: false, porque: 'São justamente os dados que definem o que o modelo aprende.' },
                { texto: 'Porque só dados em vídeo podem ser usados em IA.', correta: false, porque: 'Textos, imagens, áudio, números e sensores também são usados como dados.' }
              ]
            }
          },
          {
            id: 'redes',
            numero: 3,
            titulo: 'Redes neurais artificiais',
            intro: 'Uma das arquiteturas mais conhecidas da IA se inspira, de forma geral, na ideia de muitas unidades conectadas.',
            imagem: IMG + 'tech-rede-neural.svg',
            diagrama: IMG + 'tech-rede-neural.svg',
            blocos: [
              { titulo: 'Inspiração, não cópia', texto: 'A ideia surgiu observando que o cérebro é formado por muitas células interconectadas. A rede artificial transforma essa ideia em matemática: unidades simples recebem números, aplicam operações e passam o resultado adiante. Ela não reproduz um cérebro biológico: não tem células, sangue, consciência nem a complexidade de um sistema nervoso real.' },
              { titulo: 'Organização em camadas', texto: 'A camada de entrada recebe os dados. As camadas ocultas realizam transformações intermediárias. A camada de saída apresenta o resultado: uma classe, uma previsão ou um valor. Cada conexão entre unidades possui um peso, que indica a importância relativa daquela informação.' },
              { titulo: 'Como a informação flui', texto: 'Cada unidade soma as entradas multiplicadas por seus pesos, aplica uma função matemática simples e envia o resultado para a próxima camada. Empilhando muitas camadas, a rede consegue representar padrões progressivamente mais complexos, como formas em uma imagem ou relações em um texto.' },
              { titulo: 'Ajustando a rede', texto: 'Após comparar a resposta da rede com a resposta esperada, um processo chamado retropropagação ajusta os pesos, camada por camada. Repetindo isso com muitos exemplos, a rede diminui seus erros. O resultado é um modelo treinado, pronto para responder a entradas novas.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'A comparação com o cérebro é uma metáfora útil: redes neurais artificiais são modelos matemáticos, não tecido vivo.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Pesquisadores Warren McCulloch e Walter Pitts publicaram em 1943 um modelo matemático de unidades interconectadas. Décadas depois, essa ideia voltou a ganhar força com mais dados e mais capacidade de cálculo.' },
            vocabulario: [
              { termo: 'Peso', definicao: 'Valor numérico que ajusta a influência de uma conexão dentro da rede.' },
              { termo: 'Camada oculta', definicao: 'Conjunto de unidades entre a entrada e a saída que transforma a informação ao longo do processamento.' }
            ],
            pergunta: {
              enunciado: 'O que acontece em uma camada oculta de uma rede neural artificial?',
              opcoes: [
                { texto: 'Ela transforma as entradas com pesos e funções matemáticas antes de passar o resultado adiante.', correta: true, porque: 'As camadas ocultas são etapas intermediárias de processamento; delas surgem representações cada vez mais úteis para a tarefa.' },
                { texto: 'Ela armazena os arquivos usados no treinamento.', correta: false, porque: 'Arquivos ficam em memória ou disco; a camada realiza cálculos, não guarda arquivos.' },
                { texto: 'Ela é idêntica a um neurônio biológico.', correta: false, porque: 'É uma abstração matemática inspirada na ideia geral de conexões, sem a biologia de um neurônio real.' },
                { texto: 'Ela desliga as conexões que não estão sendo usadas.', correta: false, porque: 'Isso não é a função principal de uma camada oculta.' }
              ]
            }
          },
          {
            id: 'aplicacoes',
            numero: 4,
            titulo: 'Tipos e aplicações da inteligência artificial',
            intro: 'A IA aparece em muitos formatos diferentes. Conhecer algumas categorias ajuda a entender notícias e ferramentas que surgem todos os dias.',
            imagem: IMG + 'tech-ia.svg',
            blocos: [
              { titulo: 'O que os sistemas fazem', texto: 'Alguns sistemas classificam (qual categoria pertence a uma imagem), outros preveem (qual será a demanda de energia amanhã), detectam anomalias (um comportamento incomum em uma rede), recomendam (qual conteúdo pode interessar) ou geram (um texto, uma imagem ou um áudio novo a partir de padrões aprendidos).' },
              { titulo: 'Saúde e educação', texto: 'Na medicina, a IA pode ajudar a analisar exames, organizar prontuários e apoiar a pesquisa de tratamentos, sempre com supervisão de profissionais. Na educação, pode adaptar exercícios ao ritmo do estudante e auxiliar na correção de atividades, sem substituir o papel do professor.' },
              { titulo: 'Comunicação, transportes e indústria', texto: 'Tradução automática, resumos, filtros e assistentes de voz facilitam a comunicação. Em transportes, modelos ajudam no planejamento de rotas, na manutenção de veículos e em sistemas de direção assistida, que exigem supervisão. Na indústria, a IA apoia o controle de qualidade, a manutenção preditiva e o uso eficiente de recursos.' },
              { titulo: 'Pesquisa e criação', texto: 'Cientistas usam IA para analisar grandes volumes de dados, simular fenômenos e encontrar padrões em áreas como biologia e climatologia. Ferramentas generativas ajudam a criar imagens, textos e músicas. Elas ampliam a criatividade, mas o resultado precisa ser avaliado por pessoas, especialmente quando envolve autoria, fatos ou direitos.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Na maior parte dos casos, a IA é uma ferramenta de apoio: ela sugere, organiza e acelera, enquanto decisões importantes continuam humanas.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Sistemas de recomendação estão entre as aplicações mais discretas e presentes no dia a dia: eles ajudam a escolher músicas, vídeos, livros e até rotas de navegação.' },
            vocabulario: [
              { termo: 'Classificação', definicao: 'Tarefa de atribuir uma categoria a um item, como identificar se uma mensagem é indesejada.' },
              { termo: 'Geração', definicao: 'Produção de conteúdo novo — texto, imagem ou áudio — a partir de padrões aprendidos.' }
            ],
            pergunta: {
              enunciado: 'Qual alternativa descreve um uso responsável de IA na medicina?',
              opcoes: [
                { texto: 'Usar a ferramenta como apoio à análise de exames, com a decisão final nas mãos do profissional de saúde.', correta: true, porque: 'A IA pode auxiliar, mas exames, histórico e julgamento clínico continuam sendo conduzidos por profissionais responsáveis.' },
                { texto: 'Substituir o médico por um aplicativo sem qualquer supervisão.', correta: false, porque: 'Isso tiraria a responsabilidade humana e poderia colocar pessoas em risco.' },
                { texto: 'Acreditar que o sistema nunca erra porque usa inteligência artificial.', correta: false, porque: 'Modelos podem errar e precisam de avaliação constante.' },
                { texto: 'Divulgar dados de pacientes sem autorização para melhorar o modelo.', correta: false, porque: 'Dados sensíveis exigem consentimento, segurança e respeito à privacidade.' }
              ]
            }
          },
          {
            id: 'limites',
            numero: 5,
            titulo: 'Limites e desafios da IA',
            intro: 'Uma ferramenta poderosa também cria responsabilidades. Entender os limites é parte do conhecimento sobre IA.',
            imagem: IMG + 'tech-ia.svg',
            blocos: [
              { titulo: 'Erros e respostas incorretas', texto: 'Modelos podem confundir exemplos semelhantes, inventar informações com aparência convincente ou falhar quando a situação é muito diferente do treinamento. Em sistemas de linguagem, esse fenômeno é chamado de "alucinação": a resposta soa plausível, mas não é verdadeira. Por isso, fatos importantes devem ser verificados.' },
              { titulo: 'Privacidade e proteção de dados', texto: 'Muitos sistemas aprendem com dados que podem incluir informações pessoais. É preciso saber o que é coletado, por que é usado, por quanto tempo fica armazenado e quem tem acesso. Consentimento claro, anonimização quando possível e boas práticas de segurança são fundamentais.' },
              { titulo: 'Preconceitos nos dados', texto: 'Se um conjunto de dados registra desigualdades históricas, o modelo pode reproduzi-las. Isso é chamado de viés: um padrão distorcido aprendido dos exemplos. Reduzir esse problema exige dados variados, testes cuidadosos, auditorias e pessoas diferentes participando do desenvolvimento.' },
              { titulo: 'Responsabilidade e ética', texto: 'Quando um sistema causa dano ou toma uma decisão importante, é preciso saber quem responde: desenvolvedores, instituições e usuários têm papéis distintos. Transparência, explicabilidade, respeito à privacidade e uso consciente ajudam a garantir que a tecnologia sirva às pessoas.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Um sistema pode ser tecnicamente impressionante e ainda assim inadequado se ignorar contexto, privacidade ou justiça.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Auditorias de modelos são testes sistemáticos feitos para descobrir erros, vieses e comportamentos indesejados antes e depois da implantação de um sistema.' },
            vocabulario: [
              { termo: 'Viés', definicao: 'Distorção sistemática em um modelo, frequentemente herdada dos dados usados no treinamento.' },
              { termo: 'Privacidade', definicao: 'Direito de controlar o uso de informações pessoais e de saber como elas são tratadas.' }
            ],
            pergunta: {
              enunciado: 'O que é um viés em um sistema de inteligência artificial?',
              opcoes: [
                { texto: 'Um padrão injusto ou distorcido aprendido a partir dos dados de treinamento.', correta: true, porque: 'O modelo reproduz o que aparece nos dados, inclusive desigualdades e erros históricos presentes neles.' },
                { texto: 'Um tipo de vírus que ataca somente redes neurais.', correta: false, porque: 'Viés não é um vírus; é uma distorção no aprendizado ou nas decisões do modelo.' },
                { texto: 'A capacidade de funcionar sem energia elétrica.', correta: false, porque: 'Sistemas computacionais precisam de energia para operar.' },
                { texto: 'Um sinal de que o sistema foi treinado com muitos dados.', correta: false, porque: 'Muitos dados ajudam, mas não eliminam vieses; a qualidade e a variedade é que importam.' }
              ]
            }
          },
          {
            id: 'futuro',
            numero: 6,
            titulo: 'O futuro da inteligência artificial',
            intro: 'Prever o futuro é difícil, mas algumas direções já podem ser observadas em pesquisas e aplicações atuais.',
            imagem: IMG + 'tech-hero.svg',
            blocos: [
              { titulo: 'Avanços possíveis', texto: 'Pesquisadores buscam modelos mais eficientes, capazes de aprender com menos energia e menos dados. Também avançam sistemas multimodais, que combinam texto, imagem, áudio e vídeo em uma mesma interação, e modelos que podem rodar em dispositivos pequenos, como celulares e sensores.' },
              { titulo: 'Novas aplicações', texto: 'A IA pode apoiar diagnósticos precoces, educação inclusiva, acessibilidade para pessoas com deficiência, monitoramento ambiental, planejamento urbano e pesquisa científica. Em muitos casos, o ganho não vem de substituir pessoas, mas de ampliar o que pequenas equipes conseguem observar e fazer.' },
              { titulo: 'Humanos e sistemas inteligentes', texto: 'Uma relação produtiva costuma ser de colaboração: a máquina sugere opções, organiza informações e executa tarefas repetitivas; a pessoa define objetivos, avalia contexto e assume responsabilidade. Saber fazer perguntas, checar respostas e reconhecer limites será uma habilidade cada vez mais importante.' },
              { titulo: 'Desafios para as próximas gerações', texto: 'Será preciso regular usos sensíveis, auditar modelos, proteger dados, garantir acesso equitativo e discutir o impacto no trabalho e no meio ambiente. O treinamento de modelos grandes consome energia, então eficiência e sustentabilidade também fazem parte do debate.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'O futuro da IA depende tanto dos avanços técnicos quanto das escolhas humanas sobre como, quando e para que usá-la.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Modelos de linguagem maiores podem exigir quantidades significativas de energia para serem treinados. Por isso, pesquisar eficiência computacional é um tema ativo — e não apenas uma questão de custo.' },
            vocabulario: [
              { termo: 'Multimodalidade', definicao: 'Capacidade de um sistema trabalhar com mais de um tipo de informação, como texto e imagem juntos.' },
              { termo: 'Auditoria', definicao: 'Exame sistemático para verificar segurança, erros, vieses e conformidade de um sistema.' }
            ],
            pergunta: {
              enunciado: 'Qual atitude ajuda a conviver bem com sistemas de IA?',
              opcoes: [
                { texto: 'Usar com curiosidade e espírito crítico, verificando respostas e respeitando limites e privacidade.', correta: true, porque: 'É a combinação de aproveitar a ferramenta e manter julgamento humano, checagem e cuidado com dados.' },
                { texto: 'Aceitar todas as respostas como verdadeiras sem conferir.', correta: false, porque: 'Modelos podem errar e inventar informações.' },
                { texto: 'Evitar qualquer discussão sobre ética e privacidade.', correta: false, porque: 'Esses temas são centrais para o uso responsável.' },
                { texto: 'Trocar todos os profissionais por sistemas automáticos.', correta: false, porque: 'Responsabilidade, contexto e cuidado humano continuam necessários.' }
              ]
            }
          }
        ]
      },
      {
        id: 'evolucao',
        numero: '02',
        titulo: 'Evolução da Tecnologia',
        subtitulo: 'Da pedra ao digital',
        resumo: 'Uma linha do tempo cinematográfica das invenções que mudaram a vida humana.',
        imagem: IMG + 'tech-evolucao.svg',
        cor: 'evolucao',
        duracao: '7 capítulos',
        intro: 'Cada geração herdou ferramentas da anterior e acrescentou algo novo. Esta jornada mostra como pedra, fogo, engrenagens, válvulas, transistores e redes digitais se ligam em uma mesma história.',
        capitulos: [
          {
            id: 'primeiras-invencoes',
            numero: 1,
            titulo: 'As primeiras invenções humanas',
            intro: 'Muito antes da escrita, pessoas já observavam o ambiente e transformavam materiais para sobreviver.',
            imagem: IMG + 'tech-evolucao.svg',
            era: 'pedra',
            blocos: [
              { titulo: 'Ferramentas de pedra', texto: 'Bater uma pedra contra outra para obter bordas cortantes foi uma das primeiras tecnologias humanas. Lâminas e pontas de lança permitiram cortar, raspar, caçar e preparar alimentos. Cada novo formato era uma ideia que podia ser ensinada a outras pessoas.' },
              { titulo: 'O domínio do fogo', texto: 'Controlar o fogo trouxe luz, calor, proteção e a possibilidade de cozinhar alimentos. Cozinhar melhora a digestão e amplia o aproveitamento nutricional. O fogo também permitiu trabalhar madeira e, mais tarde, metais.' },
              { titulo: 'Instrumentos e materiais', texto: 'Com o tempo surgiram agulhas de osso, recipientes de cerâmica, tecidos, cordas e construções. Cada material exigia uma técnica própria: moldar argila, fiar fibras, polir pedra, curtir pele. Saber fazer era tão importante quanto ter o objeto.' },
              { titulo: 'Por que isso importa', texto: 'Invenções acumuladas mudaram a vida em sociedade: grupos conseguiam produzir mais, cuidar uns dos outros, construir moradias e transmitir conhecimento. A tecnologia começou como resposta a necessidades concretas e nunca mais parou.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Tecnologia começou antes da escrita: cada ferramenta guardava uma ideia que podia ser repetida e ensinada.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'O controle do fogo é uma das tecnologias mais antigas da humanidade. Seus efeitos vão muito além do calor: influenciaram alimentação, convivência e até a capacidade de fabricar novos materiais.' },
            vocabulario: [
              { termo: 'Lascamento', definicao: 'Técnica de retirar fragmentos de uma pedra para criar bordas cortantes.' },
              { termo: 'Tecnologia', definicao: 'Conjunto de técnicas, ferramentas e conhecimentos usados para resolver problemas e transformar o mundo.' }
            ],
            pergunta: {
              enunciado: 'Por que o domínio do fogo foi uma transformação tão grande?',
              opcoes: [
                { texto: 'Porque permitiu cozinhar, aquecer, iluminar e proteger, ampliando a sobrevivência.', correta: true, porque: 'O fogo mudou alimentação, segurança e até a fabricação de outros materiais.' },
                { texto: 'Porque tornou as ferramentas de pedra desnecessárias.', correta: false, porque: 'Pedra e fogo foram usados juntos; uma não substituiu a outra.' },
                { texto: 'Porque criou a primeira máquina de calcular.', correta: false, porque: 'Isso aconteceu milhares de anos depois.' },
                { texto: 'Porque eliminou completamente a necessidade de abrigos.', correta: false, porque: 'Abrigos continuaram sendo importantes.' }
              ]
            }
          },
          {
            id: 'contagem',
            numero: 2,
            titulo: 'As primeiras formas de cálculo',
            intro: 'Comércio, construção e observação do céu criaram a necessidade de contar e registrar quantidades.',
            imagem: IMG + 'tech-evolucao.svg',
            era: 'papel',
            blocos: [
              { titulo: 'Contar com o que está por perto', texto: 'Dedos, pedras, grãos e nós em cordas foram usados para acompanhar quantidades. Em diferentes culturas, esses recursos ajudavam a registrar trocas, dívidas, colheitas e informações astronômicas. O importante era criar uma correspondência entre o objeto contado e o registro.' },
              { titulo: 'O ábaco', texto: 'O ábaco é um instrumento de cálculo com peças que deslizam em hastes ou ranhuras. Versões antigas apareceram em diferentes civilizações há mais de dois mil anos. Ele permite somar, subtrair, multiplicar e dividir com movimentos organizados, e ainda é usado em alguns lugares.' },
              { titulo: 'Números e escrita', texto: 'Sistemas numéricos transformaram quantidades em símbolos. A escrita permitiu guardar contas e transmiti-las a outras pessoas. Sem esse passo, operações complexas dependeriam apenas da memória de quem estava presente.' },
              { titulo: 'Uma necessidade permanente', texto: 'Calcular sempre esteve ligado à vida prática: dividir alimentos, medir terrenos, construir, negociar, pagar impostos e prever estações. A história das máquinas de calcular começa exatamente nessa necessidade.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Contar foi uma das primeiras formas de transformar o mundo em informação registrável.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'O ábaco sobreviveu a muitas invenções modernas. Sua simplicidade, durabilidade e independência de energia elétrica explicam por que ele ainda é ensinado e utilizado.' },
            vocabulario: [
              { termo: 'Ábaco', definicao: 'Instrumento de cálculo com peças deslizantes dispostas em hastes ou ranhuras.' },
              { termo: 'Quantidade', definicao: 'Medida de "quanto" existe de algo; pode ser contada ou medida.' }
            ],
            pergunta: {
              enunciado: 'Qual era a função principal do ábaco?',
              opcoes: [
                { texto: 'Realizar contagens e operações matemáticas com peças deslizantes.', correta: true, porque: 'As posições das peças representam valores e seus movimentos realizam cálculos.' },
                { texto: 'Armazenar alimentos por longos períodos.', correta: false, porque: 'Ele era usado para cálculo, não para conservação de alimentos.' },
                { texto: 'Gerar energia elétrica.', correta: false, porque: 'O ábaco é um instrumento manual.' },
                { texto: 'Substituir completamente a escrita.', correta: false, porque: 'Ele complementava a escrita e a memória, mas não as eliminava.' }
              ]
            }
          },
          {
            id: 'maquinas-calcular',
            numero: 3,
            titulo: 'O nascimento das máquinas de calcular',
            intro: 'Engrenagens e mecanismos começaram a executar operações que antes exigiam cálculo manual.',
            imagem: IMG + 'tech-evolucao.svg',
            era: 'mecanica',
            blocos: [
              { titulo: 'Pascalina', texto: 'No século XVII, Blaise Pascal construiu uma máquina com engrenagens que somava e subtraía números. Era mecânica: as pessoas giravam discos e o mecanismo realizava os "vai-um" automaticamente. Uma dessas máquinas foi apresentada à academia científica francesa em 1645.' },
              { titulo: 'Leibniz e outras operações', texto: 'Gottfried Wilhelm Leibniz aprimorou a ideia com um mecanismo de degraus que permitia multiplicar e dividir. Seu objetivo era reduzir o trabalho repetitivo e os erros dos cálculos feitos à mão.' },
              { titulo: 'Babbage e a Máquina Analítica', texto: 'No século XIX, Charles Babbage projetou a Máquina Diferencial e, depois, a Máquina Analítica. Esta última previa uma parte para processamento, outra para armazenamento de números e instruções, além de entrada e saída de dados — ideias que anteciparam o computador moderno, embora não tenham sido construídas na íntegra na época.' },
              { titulo: 'Ada Lovelace', texto: 'Ada Lovelace estudou a Máquina Analítica e publicou, em 1843, instruções para que ela realizasse cálculos. Ela também percebeu que uma máquina desse tipo poderia ir além dos números, manipulando símbolos conforme regras. Por isso é frequentemente lembrada como uma precursora da programação.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'A Máquina Analítica nunca foi concluída por Babbage, mas seu desenho separava processamento e memória — uma ideia fundamental.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Ada Lovelace escreveu suas notas sobre a Máquina Analítica antes da existência de linguagens de programação como as conhecemos hoje. Suas ideias ajudaram a ampliar a visão do que uma máquina poderia fazer.' },
            vocabulario: [
              { termo: 'Engrenagem', definicao: 'Peça com dentes que transmite movimento entre partes de uma máquina.' },
              { termo: 'Algoritmo', definicao: 'Sequência finita de passos para resolver um problema ou executar uma tarefa.' }
            ],
            pergunta: {
              enunciado: 'Qual foi a contribuição de Ada Lovelace para a história da computação?',
              opcoes: [
                { texto: 'Escrever instruções para a Máquina Analítica e perceber que ela poderia manipular mais do que números.', correta: true, porque: 'Suas notas são consideradas um dos primeiros exemplos de algoritmo destinado a uma máquina.' },
                { texto: 'Inventar a válvula eletrônica.', correta: false, porque: 'A válvula surgiu em contexto bem diferente, voltado à eletrônica.' },
                { texto: 'Criar a primeira linguagem de programação moderna.', correta: false, porque: 'Linguagens formais como as atuais apareceram muito depois.' },
                { texto: 'Construir o primeiro computador pessoal.', correta: false, porque: 'Isso aconteceu no século XX.' }
              ]
            }
          },
          {
            id: 'computadores',
            numero: 4,
            titulo: 'O surgimento dos computadores',
            intro: 'A eletrônica tornou os cálculos muito mais rápidos — no início, em máquinas gigantes.',
            imagem: IMG + 'tech-computadores.svg',
            era: 'eletronica',
            blocos: [
              { titulo: 'As primeiras máquinas eletrônicas', texto: 'Computadores como o ENIAC, apresentado em 1945, ocupavam salas inteiras, usavam milhares de válvulas e consumiam muita energia. Eram operados por equipes especializadas e exigiam cuidado constante, porque as válvulas queimavam com frequência.' },
              { titulo: 'Válvulas, transistores e chips', texto: 'A válvula foi substituída pelo transistor, criado nos Bell Labs em 1947. Transistores eram menores, mais confiáveis e consumiam menos energia. Depois vieram os circuitos integrados, que reuniram muitos transistores em uma única peça, e o microprocessador, que concentrou a função de processamento em um chip.' },
              { titulo: 'Computadores pessoais', texto: 'Com componentes menores e mais baratos, surgiram computadores para uso individual e profissional, como o Altair 8800 (1975), o Apple II (1977) e o IBM PC (1981). A tecnologia saiu de grandes instituições e chegou a escolas, escritórios e casas.' },
              { titulo: 'Uma mudança contínua', texto: 'A redução de tamanho veio acompanhada de aumento de capacidade e queda de custo. Em 1965, Gordon Moore observou que o número de componentes em chips tendia a crescer rapidamente ao longo do tempo. Era uma observação empírica, não uma lei da natureza, mas ela ajudou a orientar a indústria por décadas.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'A evolução dos componentes tornou o computador menor, mais confiável, mais rápido e mais acessível.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'O ENIAC pesava várias toneladas e exigia uma equipe para operar. Um chip atual, muito menor, realiza tarefas incomparavelmente mais complexas.' },
            vocabulario: [
              { termo: 'Válvula', definicao: 'Componente eletrônico antigo que controlava o fluxo de corrente e era usado antes do transistor.' },
              { termo: 'Circuito integrado', definicao: 'Pequena peça que reúne muitos componentes eletrônicos em um único bloco de material semicondutor.' }
            ],
            pergunta: {
              enunciado: 'O que substituiu as válvulas nos computadores?',
              opcoes: [
                { texto: 'Transistores, menores, mais rápidos e mais confiáveis.', correta: true, porque: 'O transistor resolveu muitos problemas de tamanho, calor e falhas das válvulas.' },
                { texto: 'Engrenagens de metal.', correta: false, porque: 'Engrenagens pertencem às máquinas mecânicas anteriores.' },
                { texto: 'Pedras polidas.', correta: false, porque: 'Não têm função eletrônica.' },
                { texto: 'Fios de cobre sem nenhum componente ativo.', correta: false, porque: 'Fios sozinhos não amplificam nem controlam sinais.' }
              ]
            }
          },
          {
            id: 'internet',
            numero: 5,
            titulo: 'A chegada da internet',
            intro: 'Computadores deixaram de trabalhar isolados e passaram a trocar informações em escala global.',
            imagem: IMG + 'tech-hero.svg',
            era: 'digital',
            blocos: [
              { titulo: 'Redes de computadores', texto: 'A ARPANET, criada em 1969 com apoio do governo dos Estados Unidos, conectou inicialmente algumas universidades e centros de pesquisa. A ideia era compartilhar recursos e trocar mensagens divididas em pequenos pedaços, chamados pacotes, que podiam caminhar por diferentes rotas.' },
              { titulo: 'Um protocolo comum', texto: 'Para que redes diferentes conversassem, foi necessário padronizar a comunicação. O conjunto de protocolos TCP/IP foi adotado amplamente em 1983 e se tornou a base da internet: a rede de redes que conecta milhões de redes pelo mundo.' },
              { titulo: 'A World Wide Web', texto: 'Em 1989, Tim Berners-Lee propôs no CERN um sistema de hipertexto para compartilhar informações. A Web combinou páginas ligadas por links, endereços (URL), um protocolo de acesso (HTTP) e uma linguagem de marcação (HTML). Ela é um serviço que funciona sobre a internet, não a internet inteira.' },
              { titulo: 'Transformação da comunicação', texto: 'Com navegadores como o Mosaic, em 1993, a Web ficou mais acessível e começou a se expandir para o público geral. Ensino, comércio, jornais, entretenimento e conversas passaram a acontecer online. A proximidade trouxe oportunidades, mas também desafios como privacidade, segurança e desinformação.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'A internet é a infraestrutura das redes; a World Wide Web é um dos serviços que circulam sobre ela.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'A primeira mensagem enviada pela ARPANET, em 1969, tentou digitar a palavra LOGIN. O sistema travou depois das duas primeiras letras, "LO" — um começo modesto para algo que mudaria a comunicação mundial.' },
            vocabulario: [
              { termo: 'Pacote', definicao: 'Pequeno pedaço de dados enviado por uma rede, que pode seguir rotas diferentes e ser remontado no destino.' },
              { termo: 'Hipertexto', definicao: 'Texto com ligações que permitem navegar de um documento para outro.' }
            ],
            pergunta: {
              enunciado: 'Qual é a diferença entre internet e World Wide Web?',
              opcoes: [
                { texto: 'A internet é a infraestrutura de redes; a Web é um serviço de páginas que usa essa infraestrutura.', correta: true, porque: 'E-mails, jogos e chamadas também usam a internet sem serem a Web.' },
                { texto: 'São dois nomes para exatamente a mesma coisa.', correta: false, porque: 'A Web roda sobre a internet, mas não é a rede inteira.' },
                { texto: 'A Web é um cabo físico e a internet é um aplicativo.', correta: false, porque: 'A definição está invertida.' },
                { texto: 'A internet só existe em computadores antigos.', correta: false, porque: 'Ela está presente em celulares, televisões, sensores e muitos dispositivos.' }
              ]
            }
          },
          {
            id: 'dispositivos',
            numero: 6,
            titulo: 'A era dos dispositivos inteligentes',
            intro: 'O computador deixou de ser um objeto de mesa e passou a acompanhar as pessoas em muitos momentos.',
            imagem: IMG + 'tech-hero.svg',
            era: 'digital',
            blocos: [
              { titulo: 'Do celular ao smartphone', texto: 'Os primeiros telefones móveis eram grandes e serviam principalmente para voz. Com o tempo, ganharam mensagens de texto, câmera, agenda e acesso à internet móvel. Telas sensíveis ao toque e sistemas operacionais próprios transformaram esses aparelhos em verdadeiros computadores de bolso.' },
              { titulo: 'Aplicativos e serviços', texto: 'Aplicativos organizaram funções em ferramentas fáceis de usar: mapas, mensagens, bancos, transportes, estudos e entretenimento. Muitos serviços funcionam combinando o aparelho, a conexão e computadores remotos que processam informações e devolvem respostas.' },
              { titulo: 'Computação em nuvem', texto: 'Guardar arquivos ou executar tarefas em servidores remotos permite acessar informações de diferentes dispositivos e compartilhar recursos. Isso facilita a colaboração e a atualização de serviços, mas também exige atenção à segurança e à privacidade dos dados.' },
              { titulo: 'Objetos conectados', texto: 'A Internet das Coisas reúne dispositivos como câmeras, sensores, eletrodomésticos, medidores e equipamentos industriais que trocam dados pela rede. Em casa, nas cidades e na saúde, essa conexão pode aumentar a eficiência — desde que projeto, uso e proteção de dados sejam bem cuidados.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'A tecnologia deixou de ser um lugar para o qual a pessoa ia e passou a fazer parte dos ambientes que ela atravessa.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Um smartphone moderno reúne vários sensores: de proximidade, luz, movimento, orientação e posição. É essa combinação que permite girar a tela, explorar mapas e reconhecer gestos.' },
            vocabulario: [
              { termo: 'Nuvem', definicao: 'Infraestrutura de servidores remotos usada para armazenar, processar e distribuir dados pela internet.' },
              { termo: 'Internet das Coisas', definicao: 'Rede de objetos físicos com sensores e conexão capazes de coletar e trocar dados.' }
            ],
            pergunta: {
              enunciado: 'O que significa computação em nuvem?',
              opcoes: [
                { texto: 'Usar servidores remotos para armazenar e processar dados, acessíveis pela internet.', correta: true, porque: 'Os arquivos e processos não ficam apenas no dispositivo local, mas em infraestrutura acessada pela rede.' },
                { texto: 'Guardar informações apenas dentro do aparelho celular.', correta: false, porque: 'Isso é armazenamento local, não nuvem.' },
                { texto: 'Usar computadores que não precisam de energia.', correta: false, porque: 'Servidores também consomem energia.' },
                { texto: 'Trocar arquivos somente por cabos entre duas pessoas.', correta: false, porque: 'A nuvem usa redes, inclusive a internet.' }
              ]
            }
          },
          {
            id: 'futuro-tecnologia',
            numero: 7,
            titulo: 'O futuro da tecnologia',
            intro: 'Algumas tecnologias já estão em pesquisa ou uso inicial; outras ainda pertencem ao campo das possibilidades.',
            imagem: IMG + 'tech-hero.svg',
            era: 'futuro',
            blocos: [
              { titulo: 'Computação quântica', texto: 'Computadores quânticos usam propriedades da mecânica quântica, como superposição e emaranhamento, para manipular informação de forma diferente dos computadores clássicos. Eles são promissores para certos problemas, como simulação de moléculas e otimização, mas ainda são experimentais e não substituem os computadores comuns.' },
              { titulo: 'Realidade virtual e aumentada', texto: 'A realidade virtual cria ambientes simulados; a realidade aumentada sobrepõe informações ao mundo real, geralmente por meio de câmeras e telas. Já há usos em treinamento, educação, saúde, arquitetura e entretenimento, com desafios de custo, conforto e acessibilidade.' },
              { titulo: 'Mais conexão e novas interfaces', texto: 'Redes mais rápidas, tradução em tempo real, assistentes e sensores tornam a interação mais natural. A Internet das Coisas deve seguir crescendo, e pesquisas com interfaces cérebro-computador exploram formas alternativas de comunicação — sempre com cuidado com privacidade e segurança.' },
              { titulo: 'Tecnologias emergentes', texto: 'Biotecnologia, novos materiais, energia, nanotechnologia e computação avançada podem transformar áreas como saúde, alimentação e clima. Previsões são incertas: o futuro depende de resultados de pesquisa, investimentos, regras sociais e das escolhas de quem usa cada Ferramenta.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Previsões tecnológicas são incertas: o futuro depende tanto da ciência quanto das decisões humanas sobre segurança, acesso e sustentabilidade.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Computadores quânticos não são simplesmente "computadores mais rápidos para tudo". Eles podem ajudar muito em tipos específicos de problema, mas continuam limitados e exigem condições especiais de operação.' },
            vocabulario: [
              { termo: 'Quântica', definicao: 'Área da física que estuda o comportamento de partículas em escalas muito pequenas.' },
              { termo: 'Realidade aumentada', definicao: 'Tecnologia que acrescenta elementos digitais à visão do mundo real.' }
            ],
            pergunta: {
              enunciado: 'Qual afirmação sobre computação quântica é correta?',
              opcoes: [
                { texto: 'Ela é promissora para certos problemas, mas ainda é experimental e não substitui os computadores atuais.', correta: true, porque: 'Seu valor está em problemas específicos, e a tecnologia ainda enfrenta limites técnicos importantes.' },
                { texto: 'Ela já substitui todos os computadores comuns.', correta: false, porque: 'Computadores clássicos continuam essenciais no dia a dia.' },
                { texto: 'Ela funciona sem nenhum projeto físico especial.', correta: false, porque: 'Sistemas quânticos exigem condições rigorosas de controle.' },
                { texto: 'Ela serve apenas para criar imagens em movimento.', correta: false, porque: 'Seu objetivo é processar informação, não apenas gerar imagens.' }
              ]
            }
          }
        ]
      },
      {
        id: 'robotica',
        numero: '03',
        titulo: 'Robótica',
        subtitulo: 'Do desenho ao movimento',
        resumo: 'Como sensores, motores e programação se juntam para criar máquinas que agem no mundo.',
        imagem: IMG + 'tech-robotica.svg',
        cor: 'robotica',
        duracao: '6 capítulos',
        intro: 'Robótica é a área que transforma ideias em movimentos concretos. Aqui você vai conhecer as partes de um robô, a lógica que o comanda e os lugares onde ele já trabalha junto com pessoas.',
        capitulos: [
          {
            id: 'conceito',
            numero: 1,
            titulo: 'O que é robótica?',
            intro: 'Robôs são máquinas que conectam o mundo digital das instruções ao mundo físico das ações.',
            imagem: IMG + 'tech-robotica.svg',
            blocos: [
              { titulo: 'Uma área compartilhada', texto: 'A robótica combina engenharia mecânica, engenharia elétrica, computação e teoria do controle. Projetar um robô envolve escolher materiais, montar estruturas, instalar sensores e motores, escrever programas e testar o comportamento no ambiente real.' },
              { titulo: 'O que caracteriza um robô', texto: 'De forma geral, um robô é uma máquina reprogramável que percebe o ambiente por meio de sensores e realiza ações por meio de atuadores. Ele pode ter diferentes graus de autonomia: alguns seguem instruções humanas em tempo real; outros executam parte da tarefa sozinhos dentro de limites definidos.' },
              { titulo: 'Robô × máquina automatizada simples', texto: 'Uma máquina com botão e timer, como certos eletrodomésticos, executa uma sequência fixa. Um robô pode ser programado para novas tarefas e, em muitos casos, ajustar sua ação ao que os sensores percebem. Essa combinação de reprogramabilidade e percepção é o que costuma diferenciá-lo.' },
              { titulo: 'Exemplos próximos', texto: 'Braços em fábricas, aspiradores automáticos, rovers espaciais, drones de inspeção, robôs de resgate e próteses eletrônicas mostram a variedade da área. Todos têm algo em comum: recebem instruções, percebem alguma coisa e agem sobre o mundo.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Robótica é a ponte entre instruções digitais e movimentos no mundo físico.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'A palavra "robô" ficou conhecida com a peça teatral R.U.R., do dramaturgo Karel Čapek, de 1920. Ela vem de uma palavra tcheca ligada à ideia de trabalho.' },
            vocabulario: [
              { termo: 'Autonomia', definicao: 'Capacidade de realizar parte de uma tarefa sem intervenção humana constante.' },
              { termo: 'Atuador', definicao: 'Componente que transforma uma ordem de controle em movimento ou ação física.' }
            ],
            pergunta: {
              enunciado: 'O que costuma diferenciar um robô de uma máquina automatizada simples?',
              opcoes: [
                { texto: 'Ele pode ser reprogramado e usar sensores para ajustar suas ações.', correta: true, porque: 'Reprogramabilidade e percepção do ambiente são características centrais dos robôs.' },
                { texto: 'Ele não precisa de nenhuma fonte de energia.', correta: false, porque: 'Todo robô precisa de energia para operar.' },
                { texto: 'Ele sempre tem formato parecido com o de uma pessoa.', correta: false, porque: 'A maioria dos robôs não tem forma humana.' },
                { texto: 'Ele nunca pode ser desligado.', correta: false, porque: 'Robôs podem ser desligados e mantidos normalmente.' }
              ]
            }
          },
          {
            id: 'funcionamento',
            numero: 2,
            titulo: 'Como os robôs funcionam?',
            intro: 'Um robô é um sistema: cada parte tem uma função, e todas precisam trabalhar juntas.',
            imagem: IMG + 'tech-robo-partes.svg',
            diagrama: IMG + 'tech-robo-partes.svg',
            blocos: [
              { titulo: 'Estrutura física', texto: 'Chassis, braços, juntas e garras formam o corpo do robô. Cada junta permite um tipo de movimento, e a ferramenta na extremidade — chamada efetuador — pode ser uma garra, uma broca, uma câmera ou um pulverizador, dependendo da tarefa.' },
              { titulo: 'Eletrônica e controle', texto: 'Placas eletrônicas abrigam o controlador, que executa o programa e coordena as ações. Motores elétricos, hidráulicos ou pneumáticos movem as partes, enquanto engrenagens e correias transmitem força. A fonte de energia pode ser bateria, tomada ou outro sistema, e define por quanto tempo o robô consegue atuar.' },
              { titulo: 'Percepção', texto: 'Sensores medem distância, luz, temperatura, força, posição e outros aspectos do ambiente. Sem eles, o robô executaria movimentos "cegos". Com eles, consegue perceber obstáculos, confirmar resultados e tomar decisões simples dentro do que foi programado.' },
              { titulo: 'O ciclo perceber-decidir-agir', texto: 'O funcionamento acontece em ciclo: os sensores coletam dados, o controlador compara com o objetivo e decide, os atuadores movem o robô e novos sensores verificam o resultado. Esse ciclo se repete muitas vezes por segundo em muitos sistemas.' }
            ],
            componentes: [
              { numero: 1, nome: 'Sensores e câmera', funcao: 'Percebem o ambiente e enviam informações ao controlador.' },
              { numero: 2, nome: 'Controlador', funcao: 'Executa o programa e decide o que fazer com os dados recebidos.' },
              { numero: 3, nome: 'Circuito e memória', funcao: 'Guardam instruções e permitem a comunicação entre as partes.' },
              { numero: 4, nome: 'Braço e articulações', funcao: 'Permitem alcançar posições diferentes com movimentos controlados.' },
              { numero: 5, nome: 'Efetuador (garra)', funcao: 'É a ferramenta final que entra em contato com o objeto ou o ambiente.' },
              { numero: 6, nome: 'Base e energia', funcao: 'Dão sustentação e fornecem a energia necessária para o funcionamento.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Um robô funciona em ciclo: perceber, decidir, agir e perceber de novo.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Robôs industriais conseguem repetir um movimento com precisão muito maior que a humana. Ainda assim, eles não "entendem" a tarefa como uma pessoa: executam o que foi programado e testado.' },
            vocabulario: [
              { termo: 'Efetuador', definicao: 'Parte final do robô que entra em contato com o ambiente para realizar a tarefa.' },
              { termo: 'Controlador', definicao: 'Componente que executa o programa e coordena sensores e motores.' }
            ],
            pergunta: {
              enunciado: 'Qual é a sequência básica de funcionamento de um robô?',
              opcoes: [
                { texto: 'Sensores coletam dados, o controlador decide e os atuadores realizam o movimento.', correta: true, porque: 'Esse ciclo descreve como percepção, processamento e ação se conectam.' },
                { texto: 'O motor decide, o sensor move e o controlador apenas observa.', correta: false, porque: 'As funções estão trocadas.' },
                { texto: 'O robô age primeiro e só depois recebe instruções.', correta: false, porque: 'As ações dependem de um programa e de informações dos sensores.' },
                { texto: 'Somente a bateria controla todos os movimentos.', correta: false, porque: 'A bateria fornece energia; quem coordena é o controlador.' }
              ]
            }
          },
          {
            id: 'sensores',
            numero: 3,
            titulo: 'Sensores e movimentos',
            intro: 'Perceber o ambiente e saber se mover são habilidades que dependem de sensores e atuadores bem escolhidos.',
            imagem: IMG + 'tech-robo-partes.svg',
            blocos: [
              { titulo: 'Medindo distância e luz', texto: 'Sensores de distância podem usar ultrassom, infravermelho ou laser para estimar a proximidade de objetos. Já fotossensores medem luz: com eles, um robô consegue seguir uma linha no chão, detectar mudanças de iluminação ou evitar superfícies muito brilhantes.' },
              { titulo: 'Temperatura, força e câmeras', texto: 'Sensores de temperatura ajudam em tarefas industriais e de segurança. Sensores de força indicam pressão em uma garra, evitando danificar objetos. Câmeras, combinadas com software de visão computacional, permitem reconhecer formas, cores, marcas e posições.' },
              { titulo: 'Motores e articulações', texto: 'Motores giram eixos; servomotores permitem controlar posição com precisão; mecanismos lineares produzem movimentos em linha reta. Articulações são as juntas do robô, e o número de movimentos independentes é chamado de graus de liberdade.' },
              { titulo: 'Percepção e ação combinadas', texto: 'Sensor e motor trabalham em conjunto: a câmera identifica um objeto, o controlador calcula onde a garra deve ir e o motor executa o caminho. Novas medições confirmam se o objeto foi alcançado. Sem esse retorno, erros se acumulariam rapidamente.' }
            ],
            componentes: [
              { numero: 1, nome: 'Sensor de distância', funcao: 'Estima a proximidade de objetos para evitar colisões.' },
              { numero: 2, nome: 'Câmera', funcao: 'Capta imagens que podem ser analisadas por visão computacional.' },
              { numero: 3, nome: 'Sensor de força', funcao: 'Mede a pressão exercida pela garra e evita danificar objetos.' },
              { numero: 4, nome: 'Servomotor', funcao: 'Move uma parte com posição e velocidade controladas.' },
              { numero: 5, nome: 'Articulação', funcao: 'Funciona como uma junta e permite um movimento independente.' },
              { numero: 6, nome: 'Controlador', funcao: 'Interpreta os sensores e comanda os movimentos.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Sem sensores, o robô seria "cego" e repetiria movimentos sem perceber o que acontece ao redor.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'O LiDAR, que usa feixes de laser para medir distâncias, é empregado em robôs e veículos autônomos para construir mapas do ambiente e detectar obstáculos.' },
            vocabulario: [
              { termo: 'Sensor', definicao: 'Dispositivo que mede uma grandeza física e a transforma em sinal que o controlador consegue ler.' },
              { termo: 'Grau de liberdade', definicao: 'Movimento independente que uma junta ou eixo permite ao robô realizar.' }
            ],
            pergunta: {
              enunciado: 'Para que serve um sensor de distância em um robô?',
              opcoes: [
                { texto: 'Para medir a proximidade de objetos e evitar colisões ou guiar movimentos.', correta: true, porque: 'A medição permite ao controlador ajustar a trajetória e parar antes de um obstáculo.' },
                { texto: 'Para aumentar a velocidade do processador.', correta: false, porque: 'Sensor e processador têm funções diferentes.' },
                { texto: 'Para armazenar o programa do robô.', correta: false, porque: 'Programas ficam em memória.' },
                { texto: 'Para gerar energia para os motores.', correta: false, porque: 'Sensores medem; não são fontes de energia.' }
              ]
            }
          },
          {
            id: 'programacao',
            numero: 4,
            titulo: 'Programação e automação',
            intro: 'Instruções bem escritas transformam um conjunto de peças em uma máquina que realiza uma tarefa.',
            imagem: IMG + 'tech-robotica.svg',
            blocos: [
              { titulo: 'Como o robô recebe instruções', texto: 'O programa define o que fazer e em que ordem. Pode ser escrito em linguagens como Python ou C++, ou organizado com ferramentas específicas de robótica, como o ROS, que ajuda diferentes partes do sistema a trocarem mensagens. Em muitos casos, o código também define como reagir a sensores.' },
              { titulo: 'Algoritmos e decisões simples', texto: 'Um algoritmo é uma sequência de passos. Em robótica, ele costuma incluir condições: "se o sensor detectar obstáculo, pare e desvie; senão, continue". Combinações de decisões simples permitem comportamentos mais complexos sem exigir que tudo seja previsto linha por linha.' },
              { titulo: 'Programando movimentos', texto: 'Movimentos são descritos por posições, velocidades, acelerações e trajetórias. Antes de executar, muitos robôs são testados em simuladores: um ambiente digital que reproduz o comportamento esperado. Isso ajuda a encontrar erros sem risco de quebrar o equipamento.' },
              { titulo: 'Automação e inteligência artificial', texto: 'A automação é muito útil em tarefas repetitivas, precisas ou perigosas. Quando se adiciona IA, o robô pode reconhecer objetos, planejar caminhos e aprender com exemplos. Mesmo assim, sistemas críticos exigem limites claros e supervisão humana.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Programar um robô é descrever não só o que fazer, mas também como reagir quando o mundo muda.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Simuladores de robótica permitem testar milhares de tentativas em poucos minutos. Depois que o comportamento está estável, o programa é transferido para o robô real.' },
            vocabulario: [
              { termo: 'ROS', definicao: 'Conjunto de ferramentas e bibliotecas usado no desenvolvimento de muitos sistemas robóticos.' },
              { termo: 'Simulação', definicao: 'Teste feito em ambiente digital que imita o comportamento do sistema real.' }
            ],
            pergunta: {
              enunciado: 'Por que testar um robô em um simulador antes do mundo real?',
              opcoes: [
                { texto: 'Para verificar o comportamento com segurança e ajustar o programa sem riscos.', correta: true, porque: 'O simulador permite repetir testes rapidamente, sem danificar pessoas, objetos ou o próprio robô.' },
                { texto: 'Porque robôs reais não podem ser programados.', correta: false, porque: 'Robôs reais são programados; a simulação é uma etapa extra de teste.' },
                { texto: 'Porque simuladores eliminam a necessidade de sensores.', correta: false, porque: 'Eles ajudam no projeto, mas o robô real ainda precisa perceber o ambiente.' },
                { texto: 'Porque o simulador aumenta a bateria do robô.', correta: false, porque: 'Simulação é um teste de software, não uma fonte de energia.' }
              ]
            }
          },
          {
            id: 'mundo-real',
            numero: 5,
            titulo: 'Robôs no mundo real',
            intro: 'Robôs já atuam em lugares visíveis e em ambientes onde a presença humana é difícil ou arriscada.',
            imagem: IMG + 'tech-robotica.svg',
            blocos: [
              { titulo: 'Saúde e indústria', texto: 'Sistemas robóticos auxiliam cirurgias com precisão e estabilidade, sempre sob responsabilidade médica. Também apoiam reabilitação e locomoção. Na indústria, braços robóticos realizam solda, pintura, montagem e inspeção, aumentando a consistência e reduzindo a exposição a tarefas perigosas.' },
              { titulo: 'Agricultura e meio ambiente', texto: 'Robôs e drones ajudam no plantio, na colheita, na pulverização inteligente e no monitoramento de lavouras. Equipamentos autônomos também coletam dados em oceanos, florestas e áreas de difícil acesso, apoiando pesquisas ambientais.' },
              { titulo: 'Espaço e resgate', texto: 'Rovers como Curiosity e Perseverance exploram Marte com instrumentos científicos. Como a comunicação com a Terra demora minutos, eles precisam de autonomia para evitar obstáculos e escolher ações locais. Em resgates, robôs podem entrar em escombros, áreas radioativas ou ambientes submarinos antes das pessoas.' },
              { titulo: 'Pesquisa e vida cotidiana', texto: 'Laboratórios usam robôs para manusear amostras e repetir experimentos. Em casa, aspiradores automáticos e cortadores de grama já são comuns. Em todos os casos, o projeto precisa considerar segurança, manutenção e o contexto de uso.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'Robôs costumam trabalhar onde a tarefa é repetitiva, precisa, perigosa ou difícil de alcançar.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Rovers marcianos recebem instruções da Terra, mas não esperam um comando para cada movimento: a distância torna a comunicação lenta, então parte das decisões precisa acontecer no próprio robô.' },
            vocabulario: [
              { termo: 'Teleoperação', definicao: 'Controle de um robô à distância por uma pessoa.' },
              { termo: 'Autonomia', definicao: 'Capacidade de executar ações sem depender de comandos humanos a cada instante.' }
            ],
            pergunta: {
              enunciado: 'Qual característica torna robôs úteis em ambientes perigosos?',
              opcoes: [
                { texto: 'Eles podem ser operados à distância ou agir com autonomia, reduzindo a exposição humana.', correta: true, porque: 'É essa combinação que permite trabalhar em escombros, radiação, profundidade ou espaço.' },
                { texto: 'Eles não precisam de manutenção.', correta: false, porque: 'Robôs exigem manutenção como qualquer equipamento.' },
                { texto: 'Eles sempre funcionam sem supervisão.', correta: false, porque: 'Muitas operações exigem acompanhamento e limites definidos.' },
                { texto: 'Eles substituem todas as pessoas sem exceção.', correta: false, porque: 'Cada contexto pede uma combinação diferente de pessoas e máquinas.' }
              ]
            }
          },
          {
            id: 'futuro-robotica',
            numero: 6,
            titulo: 'O futuro da robótica',
            intro: 'Os próximos anos devem combinar melhor percepção, mais colaboração e novas formas de ajuda às pessoas.',
            imagem: IMG + 'tech-hero.svg',
            blocos: [
              { titulo: 'Robôs humanoides e colaborativos', texto: 'Robôs humanoides tentam adotar forma semelhante à humana para atuar em ambientes criados para pessoas, como escadas, portas e ferramentas. Robôs colaborativos, ou cobots, são projetados para trabalhar perto de humanos, com sensores de força, limites de velocidade e parada de segurança.' },
              { titulo: 'Próteses e tecnologias assistivas', texto: 'Membros robóticos, exoesqueletos e dispositivos de mobilidade podem ampliar a independência de pessoas com deficiência ou limitações temporárias. O desafio é combinar leveza, resistência, conforto, controle intuitivo e custo acessível.' },
              { titulo: 'Robótica espacial e integração com IA', texto: 'Robôs autônomos podem inspecionar satélites, montar estruturas e apoiar missões lunares ou marcianas. A inteligência artificial melhora reconhecimento visual e planejamento de movimentos, mas decisões críticas ainda exigem limites, testes e responsabilidade humana.' },
              { titulo: 'Desafios técnicos, sociais e éticos', texto: 'Segurança é o primeiro requisito. Também importam privacidade de câmeras e sensores, responsabilidade por acidentes, impacto no mercado de trabalho, acesso equitativo à tecnologia e transparência sobre o que o robô pode ou não fazer.' }
            ],
            destaque: { titulo: 'Ideia-chave', texto: 'O futuro da robótica não é apenas ter mais robôs, mas fazer com que eles sejam seguros, úteis e bem integrados à vida humana.' },
            curiosidade: { titulo: 'Curiosidade', texto: 'Cobots são projetados para parar ou recuar ao detectar contato com uma pessoa. Esse comportamento é uma das diferenças em relação a robôs industriais tradicionais, que operam em áreas isoladas.' },
            vocabulario: [
              { termo: 'Cobot', definicao: 'Robô projetado para colaborar com pessoas no mesmo espaço de trabalho.' },
              { termo: 'Exoesqueleto', definicao: 'Estrutura vestível que apoia ou amplia o movimento do corpo.' }
            ],
            pergunta: {
              enunciado: 'O que diferencia um robô colaborativo de um robô industrial tradicional?',
              opcoes: [
                { texto: 'Ele é projetado para trabalhar perto de pessoas, com sensores e limites de segurança.', correta: true, porque: 'A segurança em torno de humanos orienta o projeto de um cobot.' },
                { texto: 'Ele nunca usa sensores.', correta: false, porque: 'Sensores são justamente o que permite detectar pessoas e aproximações.' },
                { texto: 'Ele não pode ser programado.', correta: false, porque: 'Cobots também são programáveis.' },
                { texto: 'Ele funciona apenas no espaço.', correta: false, porque: 'Colaboração acontece em fábricas, hospitais, escritórios e outros ambientes.' }
              ]
            }
          }
        ]
      }
    ]
  };

  // A coleção é exportada como lista para que novas categorias possam ser
  // adicionadas apenas incluindo outro objeto neste array.
  const COLECOES = [CATEGORIA];

  global.BIBLIOTECA_DATA = CATEGORIA;
  global.BIBLIOTECA_COLECOES = COLECOES;
})(window);

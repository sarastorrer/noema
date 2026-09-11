export type Article = { id:string; slug:string; title:string; excerpt:string; category:string; series:string; body:string; sources:string; cover:string; status:string; published_at:string; updated_at:string; version:number };
export const BLUE_SERIES='Filosofia da Inteligência';
const make=(id:string,title:string,excerpt:string,category:string,body:string,sources='',date='2026-09-10'):Article=>({id,slug:id,title,excerpt,category,series:category===BLUE_SERIES?BLUE_SERIES:'',body,sources,cover:id,status:'published',published_at:date,updated_at:date+'T12:00:00.000Z',version:1});
export const seedArticles:Article[]=[
make('desejo','Pode existir inteligência sem desejo?','Resolver um problema, perseguir um objetivo e sentir que algo importa são capacidades diferentes.',BLUE_SERIES,`Uma IA pode encontrar a melhor jogada sem que isso demonstre vontade de vencer. Para uma pessoa, perder pode estragar o dia.

A palavra inteligência costuma reunir capacidades diferentes: resolver problemas, perseguir objetivos e sentir que algo importa. Nos humanos, elas aparecem tão próximas que parecem inseparáveis.

## O pensamento tem um corpo

O pensamento humano acontece em um corpo que sente fome, se cansa, busca afeto e evita ameaças. Damásio e Carvalho relacionam os sentimentos à regulação da vida: eles participam do reconhecimento das necessidades do organismo. Isso ajuda a explicar a mente humana, mas não estabelece uma condição para toda inteligência possível.

Na IA, “recompensa” tem outro sentido. Em aprendizagem por reforço, é um sinal que orienta o aprendizado. Uma pontuação maior não comprova prazer, assim como um erro não comprova frustração.

Um sistema pode aprender a alcançar um resultado sem demonstrar que alcançar aquilo tem algum significado para ele.

> Perseguir um objetivo não comprova que exista alguém desejando alcançá-lo.

## O que significa querer

A dificuldade está no verbo querer. Se significa agir em direção a um objetivo, cabe atribuir objetivos a máquinas. Se significa sentir vontade, falta ou expectativa, são necessárias outras evidências. Resolver problemas e falar sobre sentimentos não bastam para encerrar essa discussão.

Reconhecer capacidade intelectual não exige presumir uma vida interior. Tampouco a ausência de sentimentos reconhecivelmente humanos demonstra que qualquer experiência artificial seja impossível.

Há ainda uma consequência prática: uma máquina sem desejos próprios pode servir aos desejos de alguém. Os critérios que orientam seu funcionamento carregam escolhas de quem a desenvolve e utiliza.

Uma IA não precisa ser ambiciosa para participar de um projeto de poder.`,`Damásio e Carvalho — The nature of feelings (2013) | https://pubmed.ncbi.nlm.nih.gov/23329161/
Silver e colegas — Reward Is Enough (2021) | https://doi.org/10.1016/j.artint.2021.103535
Butlin e colegas — Consciousness in Artificial Intelligence (2023) | https://arxiv.org/abs/2308.08708`,'2026-09-11'),
make('energia','A inteligência é artificial. O consumo é real.','A nuvem tem endereço. E uma conta de luz que também precisa entrar na discussão.','Análise',`Na tela, uma resposta aparece em segundos. A infraestrutura necessária para produzi-la ocupa espaço, consome eletricidade e depende de redes que atendem também a outras necessidades.

Nas projeções da Agência Internacional de Energia, o consumo elétrico global dos data centers passa de 485 TWh em 2025 para cerca de 950 TWh em 2030 — aproximadamente 3% da demanda mundial de eletricidade.

Esses números abrangem data centers em geral, não apenas IA. São projeções, não um resultado garantido.

## A escala local

Na Irlanda, data centers responderam por 23% do consumo medido de eletricidade em 2025, segundo o órgão nacional de estatística. Em 2015, essa participação era de 5%.

O percentual global conta apenas parte da história. Para avaliar um projeto, é preciso olhar para o lugar: a disponibilidade de energia, a origem da eletricidade e a infraestrutura que precisará ser construída.

> Benefícios prometidos e custos materiais precisam caber na mesma análise.

Cobrar essa informação faz parte de avaliar a tecnologia com seriedade. Quando uma empresa anuncia um novo data center, a notícia deveria mostrar também o que acontece do lado de fora dele.`,`Agência Internacional de Energia — Key questions on energy and AI | https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary
CSO — Data Centres Metered Electricity Consumption 2025 | https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2025/keyfindings/`),
make('poder','Você pode usar a IA. Mas quem manda nela?','O acesso às ferramentas não distribui, por si só, o poder de decidir como elas funcionam.','Análise',`Abrir uma conta e começar a usar uma IA é relativamente simples. Participar das decisões sobre seu desenvolvimento é outra história.

Modelos dependem de infraestrutura, capacidade de computação, dados e pessoas especializadas. A distribuição desses recursos ajuda a determinar quem consegue construir sistemas e quem depende de condições estabelecidas por terceiros.

## Acesso e controle

Uma ferramenta pode estar disponível para milhões de pessoas enquanto as decisões sobre preço, acesso e funcionamento permanecem concentradas. Popularidade não equivale a participação nas decisões.

Essa dependência ganha peso quando a ferramenta passa a integrar o trabalho de empresas, serviços e profissionais. Uma mudança contratual ou a retirada de uma função pode alterar processos que já não são fáceis de substituir.

> Usar uma tecnologia e ter poder sobre ela são posições diferentes.

A análise precisa alcançar os contratos, as alternativas de migração e a infraestrutura. Celebrar o acesso sem examinar essas condições deixa de fora uma parte importante da discussão sobre poder.`,`OCDE — Artificial intelligence markets | https://www.oecd.org/en/publications/artificial-intelligence-markets_d531d73f-en/full-report.html`,'2026-09-09'),
make('rede','A IA precisa ser alguém?','Talvez a inteligência mais relevante esteja nas relações entre as partes.',BLUE_SERIES,`Nenhuma formiga isolada é o formigueiro. Ainda assim, a atividade da colônia pode distribuir tarefas e responder ao ambiente sem depender de um centro que organize tudo.

Essa imagem permite deslocar a discussão sobre inteligência. Em vez de procurar apenas um indivíduo capaz de pensar, cabe observar o que a coordenação entre partes torna possível.

## A unidade da inteligência

Uma rede pode produzir resultados que nenhum de seus participantes conseguiria produzir sozinho. Isso não significa que ela tenha uma consciência coletiva, uma identidade ou uma experiência subjetiva. Comportamento coordenado e vida interior continuam sendo questões diferentes.

Na IA, a hipótese merece atenção: a interface com a qual uma pessoa conversa pode ser apenas uma parte de um sistema maior, composto por modelos, ferramentas, registros e decisões humanas.

Distribuir tarefas também não garante resultados melhores. Sistemas podem reproduzir o mesmo erro, amplificá-lo ou perder informação na passagem entre etapas.

> Uma conversa pode mostrar apenas uma pequena parte do sistema que a torna possível.

Talvez uma forma importante de inteligência artificial venha a se parecer menos com uma pessoa e mais com uma organização. Seria possível conversar com uma de suas partes e confundi-la com o todo.`,'','2026-09-08'),
make('deus','Uma superinteligência seria algo próximo de Deus?','Conhecimento e competência não conferem automaticamente autoridade moral.',BLUE_SERIES,`Uma superinteligência capaz de reunir conhecimento, interpretar situações e resolver problemas muito além da capacidade humana poderia ocupar um lugar extraordinário na vida social.

Mas inteligência e divindade não são a mesma coisa. Prever consequências com precisão não estabelece, por si só, quais consequências deveriam ser desejadas.

## Da competência à autoridade

O risco da analogia aparece quando competência passa a ser confundida com legitimidade. Uma resposta impressionante pode gerar confiança. A repetição dessa experiência pode tornar a confiança um hábito e reduzir o espaço para contestação.

Mesmo uma inteligência muito superior teria de lidar com objetivos, conflitos de valores e escolhas sobre quem recebe os benefícios e quem suporta os custos.

> “O que vai acontecer?” e “O que deveria acontecer?” exigem justificativas diferentes.

A hipótese mais interessante talvez seja social: uma máquina não precisaria se declarar divina para receber um papel quase religioso. Consultar, confiar e obedecer poderiam aproximar-se gradualmente.

Reconhecer capacidades superiores não exige tratar a própria capacidade de julgamento como dispensável.`,'','2026-09-07'),
make('eleicoes','IA no período eleitoral: o que não pode?','O aviso “feito com IA” não transforma toda manipulação em conteúdo permitido.','Política',`Usar inteligência artificial na propaganda eleitoral exige atenção ao tipo de conteúdo e à maneira como ele é apresentado.

Pelas regras do TSE, ajustes para melhorar a qualidade de imagem e som estão entre as exceções à obrigação de identificar o uso de IA. Já imagens e sons sintéticos na propaganda, em regra, exigem identificação clara e acessível, incluindo a tecnologia usada.

Chatbots precisam se identificar. Não podem fingir ser o candidato.

## A identificação tem limites

Fabricar uma fala realista para favorecer ou prejudicar uma candidatura entra na proibição de deepfake. Mesmo com autorização.

Há também uma restrição específica próxima à votação: nas 72 horas anteriores e nas 24 posteriores ao término do pleito, fica proibido publicar ou republicar novos conteúdos sintéticos com imagem, voz ou manifestação de candidatos ou pessoas públicas, mesmo identificados.

O enquadramento depende do conteúdo, do contexto e das regras aplicáveis. O aviso ajuda a reconhecer uma montagem, mas não torna permitido aquilo que a norma proíbe.

Em caso de possível irregularidade na propaganda, guarde o link e os registros da publicação e encaminhe a denúncia à Justiça Eleitoral. A análise cabe às autoridades.`,`TSE — Resolução 23.610, artigos 9º-B e 9º-C, texto compilado | https://www.tse.jus.br/legislacao/compilada/res/2019/resolucao-no-23-610-de-18-de-dezembro-de-2019`,'2026-09-06'),
make('trabalho','A IA economiza tempo. Quem fica com ele?','Ganhos de produtividade não se transformam sozinhos em uma vida melhor.','Trabalho',`Terminar uma tarefa em menos tempo parece uma vantagem evidente. O que acontece depois depende de como o trabalho é organizado.

O tempo economizado pode se tornar descanso, aprendizado ou redução de jornada. Também pode virar uma meta maior, mais demandas e menos pessoas na equipe.

## A produtividade tem destino

A tecnologia altera o que é possível produzir. A distribuição desse ganho envolve decisões sobre remuneração, jornada, contratos e poder de negociação.

Quando a avaliação do trabalho se limita ao volume entregue, melhorar a ferramenta pode apenas elevar o que passa a ser considerado normal.

> Economizar tempo e ter tempo disponível não são a mesma coisa.

A discussão sobre IA no trabalho precisa acompanhar o destino dos ganhos. Sem esse acompanhamento, a promessa de aliviar tarefas pode conviver com uma rotina ainda mais intensa.`,'','2026-09-05')];
export const coverOptions=['desejo','energia','poder','rede','deus','eleicoes','trabalho'];
export function minutes(body:string){return Math.max(1,Math.ceil(body.trim().split(/\s+/).length/200));}
export function dateLabel(date:string){return new Date(date+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'});}

/* ===== Protocolo 4a ed - DADOS DOS LIVROS =====
   conteudo dos livros: alfabeto, atributos, pericias, condicoes, raizes, FARDOS,
   sussurros por elemento, ELEMS, GRAUS, MAGIAS, TALENTOS e as BANDAS de Ruido.
   carregado ANTES de core.js e climate.js: ambos leem estas constantes. */
/* ============ PROTOCOLO 4ª ED — DADOS DOS LIVROS ============ */
const ALFA={A:"⟟",B:"⌇",C:"☊",D:"⌖",E:"⋔",F:"⟒",G:"⊬",H:"⌭",I:"⊙",J:"⟡",K:"⌬",L:"⌰",M:"⋉",N:"⌯",O:"◊",P:"⊢",Q:"⌾",R:"⟑",S:"⊕",T:"⊥",U:"⋏",V:"⌖",W:"⍜",X:"⌘",Y:"⍟",Z:"⊗"};
function alien(s){return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split("").map(ch=>ALFA[ch]||ch).join("");}
const W_RUIDO=alien("RUIDO"); /* ⟑⋏⊙⌖◊ */

const ATTRS=[["car","Carne","o corpo e a força"],["ner","Nervo","velocidade e mãos"],["jui","Juízo","saber e notar"],["tem","Têmpera","o que segura a mente"],["lab","Lábia","o peso diante dos outros"]];

const PERICIAS=[
["Atletismo","car"],["Briga","car"],["Força Bruta","car"],
["Acrobacia","ner"],["Furtividade","ner"],["Pilotagem","ner"],["Pontaria","ner"],["Mãos Hábeis","ner"],
["Investigação","jui"],["Percepção","jui"],["Medicina","jui"],["Ciências","jui"],["Tecnologia","jui"],["Engenharia","jui"],["Ocultismo","jui"],["Sobrevivência","jui"],["História","jui"],["Línguas","jui"],["Burocracia","jui"],["Mídia","jui"],
["Coragem","tem"],["Vigor Mental","tem"],["Intuição","tem"],["Fé","tem"],
["Diplomacia","lab"],["Persuasão","lab"],["Enganação","lab"],["Intimidação","lab"],["Liderança","lab"],["Atuação","lab"]];

const CONDICOES=[
["Atordoado","Perde a Ação no próximo turno (ainda tem o Movimento)."],
["Caído","No chão: corpo a corpo contra você tem +1; à distância, −1. Levantar custa o Movimento."],
["Sangrando","Perde 1 de Vida por turno até ser estabilizado."],
["Lento","Movimento pela metade e −1 na Defesa."],
["Vulnerável","Ataques contra você têm +1 até o seu próximo turno."],
["Desprevenido","Sem Reação; ataques contra você têm +1. Dura até o seu primeiro turno."],
["Cego","Desvantagem em tudo que depende de ver; ataques contra você têm +1."],
["Confuso","Desvantagem em ações que exijam foco; o mestre pode redirecionar uma ação."],
["Apavorado","−1 em tudo enquanto a fonte do medo estiver à vista; não se aproxima dela de vontade."],
["Em Pânico","Você foge ou congela diante da fonte; não consegue agir contra ela."],
["Agarrado","Não se move; escapar é uma Ação (Força Bruta ou Acrobacia contra quem agarrou)."],
["Exausto","−1 acumulativo em testes físicos. Vigor Mental ignora um deles, 1×/cena."],
["Envenenado","Perde Vida ou sofre −1 a cada turno, conforme a fonte, por uma duração."],
["Semeado (X)","Condição do Germe: X de dano no fim de cada turno. Não acumula (a maior substitui). Absorção não conta. Remover: Medicina (8), fogo, ou uma cena de tratamento."],
["Inconsciente","Caído e fora de combate: não age, e golpes de perto acertam sem rolagem."]];

const RAIZES=[
{n:"Acadêmico",f:"Entre livros e cafés ruins.",per:["Ciências","História"],prof:"idioma extra, etiqueta acadêmica",rs:4000,item:"laptop velho + credencial universitária",c:["Erudição","1×/sessão, sabe um fato acadêmico sem teste."]},
{n:"Detetive Particular",f:"Já seguiu marido infiel demais.",per:["Investigação","Percepção"],prof:"arrombamento, etiqueta do submundo",rs:3500,item:"distintivo falso + câmera + caderninho",c:["Faro","+1 para perceber mentira ou ocultação."]},
{n:"Ex-Policial",f:"Saiu da corporação. As razões variam.",per:["Pontaria","Intimidação"],prof:"Armas Restritas, veículos comuns",rs:5000,item:"arma registrada + colete usado",c:["Contatos na Corporação","1×/sessão, uma informação ou favor de alguém na ativa."]},
{n:"Profissional de Saúde",f:"Plantões ensinaram a não dormir.",per:["Medicina","Coragem"],prof:"ferramentas médicas",rs:8000,item:"kit médico + acesso a hospital",c:["Mãos Calejadas","Estabilizar não o abala; +1 em Medicina sob estresse."]},
{n:"Hacker / TI",f:"Mora mais na internet que no corpo.",per:["Tecnologia","Mídia"],prof:"ferramentas técnicas, inglês técnico",rs:6000,item:"setup potente + HDs suspeitos",c:["Pegada Digital","1×/sessão, acha online algo trabalhoso."]},
{n:"Operário / Técnico",f:"Conserta o que os outros quebram.",per:["Engenharia","Força Bruta"],prof:"ferramentas técnicas, veículos comuns",rs:2500,item:"caixa de ferramentas + veículo velho",c:["Jeitinho","Improvisa um conserto ou solução mecânica."]},
{n:"Religioso",f:"Fé inabalável — até ver coisas.",per:["Fé","Persuasão"],prof:"etiqueta religiosa, idioma litúrgico",rs:2000,item:"símbolo religioso + texto sagrado",c:["Conforto Espiritual","1×/cena, recupera 1 de Lucidez de um aliado."]},
{n:"Artista",f:"Vive de aplausos e contas atrasadas.",per:["Atuação","Diplomacia"],prof:"etiqueta artística, idioma extra",rs:3000,item:"equipamento de palco + guarda-roupa",c:["Plateia na Mão","1×/cena, +2 para cativar um público."]},
{n:"Herdeiro",f:"Nunca trabalhou — e faz questão.",per:["Diplomacia","Persuasão"],prof:"etiqueta da alta sociedade, veículos comuns",rs:60000,item:"carro bom + contatos influentes",c:["Carteira Recheada","1×/sessão, resolve com dinheiro (dentro do plausível)."]},
{n:"Lutador",f:"O corpo é o currículo.",per:["Briga","Atletismo"],prof:"armas brancas",rs:3000,item:"equipamento de treino + troféus",c:["Instinto de Ringue","+1 para agir primeiro num confronto físico."]},
{n:"Motorista",f:"Conhece a cidade melhor que o GPS — que nem existe ainda.",per:["Pilotagem","Mídia"],prof:"veículos comuns e especiais",rs:2000,item:"veículo confiável + as ruas na cabeça",c:["Atalho","1×/sessão, conhece uma rota mais rápida ou uma saída."]},
{n:"Ex-Militar",f:"Treinado para o pior.",per:["Furtividade","Força Bruta"],prof:"Armas Militares, explosivos, etiqueta militar",rs:5000,item:"equipamento tático + documentos antigos",c:["Treinamento","+1 contra ser pego de surpresa."]},
{n:"Jornalista",f:"Faz a pergunta que ninguém quer.",per:["Investigação","Mídia"],prof:"idioma extra, etiqueta da imprensa",rs:4000,item:"credencial + gravador + contatos",c:["Fonte Confiável","1×/sessão, conhece quem sabe do assunto."]},
{n:"Sobrevivente das Ruas",f:"A vida ensinou na marra.",per:["Furtividade","Sobrevivência"],prof:"arrombamento, etiqueta do submundo",rs:500,item:"mochila + uma rede marginal",c:["Faro de Perigo","+1 para sentir encrenca chegando."]},
{n:"Funcionário Genérico",f:"Já viu de tudo no trabalho.",per:["Burocracia","Diplomacia"],prof:"etiqueta corporativa, veículos comuns",rs:3500,item:"crachá + conhecimento de processos",c:["Sobrevivente Corporativo","1×/sessão, sabe a papelada ou a pessoa que resolve."]},
{n:"Interior / Mateiro",f:"Cresceu perto do silêncio.",per:["Sobrevivência","Percepção"],prof:"Armas Restritas (caça), veículos comuns",rs:1500,item:"facão + o saber do mato e dos bichos",c:["Filho da Terra","+1 em ambiente natural ou rural."]},
{n:"Investigador do Oculto",f:"Lê fóruns estranhos de madrugada.",per:["Ocultismo","Mídia"],prof:"idioma morto, etiqueta de cultos",rs:2500,item:"anotações + amuleto duvidoso",ruido:1,c:["Já Vi Isso Antes","1×/sessão, reconhece um padrão sobrenatural."]}];

/* ---- FARDOS (Dossiê de Fardos, 4ª ed.) ---- */
/* h = habilidade: {n:nome, cst:custo, ac:ação+frequência, sab:sabor, ef:efeito, req?{nv,ruido,req}} */
const FARDOS={
"Casca-Grossa":{f:"Quando o mundo mostra os dentes, alguém mostra os punhos.",vida:3,comb:"fol",cv:2,tre:["Briga","Atletismo","Força Bruta"],profs:"armas brancas, fogo leves, proteções",
base:[
{n:"Não Passa",cst:"—",ac:"Passiva",
 sab:"Você não é um obstáculo que se contorna. É a parede que decide o fim do corredor.",
 ef:"Nunca sofre penalidade de improviso ou de não-proficiência com armas. Inimigos não te ultrapassam sem dar a volta (gasta o Movimento deles). Inimigo adjacente que ataca um aliado seu em vez de você faz isso com −1. Você não pode ser empurrado nem derrubado contra a vontade."},
{n:"Investida",cst:"—",ac:"Ação",
 sab:"Você não corre até o inimigo. Você chega nele.",
 ef:"Mova-se até o deslocamento total e ataque no fim. Se avançou 3m+ em linha reta, +1 de dano. Parcial: você termina exposto (o alvo ganha +1 contra você até seu próximo turno). Total: escolha — o alvo fica Caído ou Atordoado; se bateu num obstáculo, agrava (dano +1). Crítico: ambos, Caído e Atordoado."},
{n:"Encaixar o Golpe",cst:"—",ac:"Reação · 1×/cena (2×/cena no nível 8)",
 sab:"O golpe que era do seu amigo agora é seu. Você aguenta.",
 ef:"Quando você ou um aliado adjacente é atingido, receba o golpe no lugar dele e reduza aquele dano pela metade (arredonda p/ baixo)."}
],
esc:[
{n:"Muralha",cst:"1 Fôlego (só na parte de Reação)",ac:"Ação (+ Reação opcional)",
 sab:"Enquanto você estiver de pé, ninguém atrás de você cai.",
 ef:"+2 no seu Limiar de Defesa até seu próximo turno. Como Reação (1 Fôlego), intercepte um ataque contra um aliado adjacente, somando sua Carne ao Limiar de Defesa dele contra aquele golpe."},
{n:"Empurrão de Guerra",cst:"—",ac:"Ação",
 sab:"Às vezes o melhor lugar pra bater é a parede atrás dele.",
 ef:"Ataque com dano pela metade. Parcial: alvo empurrado 3m ou Caído (você escolhe). Total: você escolhe empurrão ou queda, +1 de dano se ele bater em obstáculo."},
{n:"Desarme Brutal",cst:"1 Fôlego",ac:"Ação",
 sab:"A arma dele não serve pra nada no chão do outro lado da sala.",
 ef:"Força Bruta oposta contra o alvo. No sucesso, a arma dele voa para longe."},
{n:"Rugir",cst:"—",ac:"Ação Livre · 1×/cena",
 sab:"Alguns não precisam apanhar pra decidir que não vale a pena.",
 ef:"Um inimigo à sua escolha testa Coragem (7) ou fica Apavorado de você."},
{n:"Castigo",cst:"—",ac:"Gatilho",
 sab:"Bater no seu amigo na sua frente foi o último erro dele.",
 ef:"Quando um inimigo adjacente ataca um aliado seu, faça um ataque de oportunidade nele."},
{n:"Quebra-Guarda",cst:"1 Fôlego",ac:"Ação · NV 6",
 sab:"Não existe blindagem que você não amasse com tempo suficiente.",
 ef:"Seu ataque ignora a Absorção do alvo. Total: a Absorção dele cai 1 até ser reparada.",
 req:{nv:6}}
],
mae:[{n:"Berserker",s:"a dor como combustível",
 regra:{n:"Risco da Fúria",ef:"Você tem um medidor de Fúria (0–6 baseado no estágio), começa cada cena em 0. Sobe +1 sempre que você sofre dano ou reduz um inimigo a 0. Não desce sozinho — só cai ao fim da cena ou quando gasta Fúria numa manobra. Cada ponto de Fúria: +1 de dano corpo a corpo a cada 2 pontos; −1 na Defesa a cada 2 pontos. No início do turno, se Fúria ≥4, teste Coragem (Limiar = a própria Fúria) — falhou, ataca a criatura mais próxima, amiga ou inimiga, antes de qualquer outra ação."},
 medidor:{chave:"furia",nome:"Fúria",min:0,tetos:[6,6,6,9],reset:"cena"},
 st:[
  [
   {n:"Entrar em Fúria",cst:"—",ac:"Ação Livre · 1×/cena",
    sab:"Você para de segurar.",
    ef:"Ligue a Fúria. Enquanto ativa, você é imune a Apavorado e Em Pânico, e o medidor começa a operar (subir e pesar). Desligar é Ação Livre, mas zera o medidor — recomeçar custa uma cena."},
   {n:"Primeiro Sangue",cst:"—",ac:"Passiva",
    sab:"A primeira ferida é a que abre a torneira.",
    ef:"Quando você entra em Fúria, ganhe imediatamente 1 ponto de Fúria. Se você começou o turno tendo sofrido dano desde seu último turno, o próximo ataque contra o agressor ganha +1 além do bônus da maré."}
  ],
  [
   {n:"Golpe de Maré",cst:"gasta 2 de Fúria",ac:"Gatilho (ao acertar um ataque corpo a corpo)",
    sab:"Você sangra a própria maré pra que o golpe leve tudo junto.",
    ef:"Queime 2 pontos do medidor pra transformar o acerto: o alvo é jogado ao chão (Caído) e o dano vira dano máximo em vez de rolado. Você escolhe usar isto depois de saber que acertou, mas antes de rolar o dano."},
   {n:"Ignorar a Ferida",cst:"—",ac:"Reação · 1×/cena",
    sab:"Dor é informação. Você desligou o aviso.",
    ef:"Ao sofrer uma condição (Atordoado, Lento, Sangrando, etc.), ignore completamente o efeito dela por 1 turno — mas ganhe 1 de Fúria (a dor foi engolida, não some)."}
  ],
  [
   {n:"Não Vou Cair",cst:"—",ac:"Passiva",
    sab:"O corpo já morreu. A maré não percebeu ainda.",
    ef:"Em Fúria, ao chegar a 0 de Vida, você não cai — segue de pé e agindo até o fim do seu próximo turno. Se você reduzir um inimigo a 0 nesse intervalo, ganhe 2 de Fúria e a contagem reinicia. Só cai quando terminar um turno em 0 sem ter matado ninguém nele."},
   {n:"Frenesi",cst:"—",ac:"Gatilho",
    sab:"Um caiu. O mundo tem mais.",
    ef:"Ao reduzir um inimigo a 0, mova-se até um novo alvo ao alcance e ataque de graça."}
  ],
  [
   {n:"Maré Vermelha",cst:"—",ac:"Passiva",
    sab:"Não há mais fundo. Só o vermelho.",
    ef:"O teto da Fúria sobe para 9. Nos pontos 7–9, o bônus de dano continua escalando (+4 em F8), mas o Risco passa a ser testado todo turno em Fúria, não só quando falha — e um teste falho ali significa que você ataca todos os adjacentes, aliados inclusive.",
    req:{nv:12}},
   {n:"Avatar da Carnificina",cst:"gasta toda a Fúria (mínimo 6)",ac:"Ação · 1×/sessão",
    sab:"Você entrega o último fio de gente que ainda restava.",
    ef:"Queime o medidor inteiro (precisa estar em 6+) para um turno de violência absoluta: ataques sem custo, sem limite de alvos adjacentes, ignora Absorção, e nenhuma condição te afeta. Ao fim do turno, a Fúria volta a 0 e você fica Exausto pela cena.",
    req:{nv:12}}
  ]
 ]},
{n:"Sentinela",s:"a muralha que protege",
 regra:{n:"Guarda + Vigília",ef:"No seu turno, gastar a Ação para assumir a Guarda projeta uma zona de alcance Curto ao seu redor até seu próximo turno. Enquanto ativa: você começa com 1 ficha de Vigília e ganha +1 sempre que um inimigo dispara um gatilho seu dentro da zona (ele se move dentro dela, ataca um aliado seu, ou tenta atravessá-la — cada gatilho também dá uma Reação). Vigília não usada some quando a Guarda cai. Sem Guarda ativa, você é um Casca-Grossa comum."},
 medidor:{chave:"vigilia",nome:"Vigília",min:0,tetos:[5,5,5,99],reset:"cena"},
 st:[
  [
   {n:"Assumir a Guarda",cst:"—",ac:"Ação",
    sab:"Os pés se plantam. Daqui você não sai — e ninguém passa.",
    ef:"Ative a Guarda (zona Curto, até seu próximo turno) e ganhe 1 Vigília. Enquanto ativa, você não pode ser empurrado nem forçado a sair dela, e sua Defesa ganha +1."},
   {n:"Interpor",cst:"1 Vigília",ac:"Reação (gatilho: inimigo ataca um aliado na zona)",
    sab:"O golpe encontra você no caminho.",
    ef:"Redirecione para você um ataque contra um aliado na sua Guarda, ou some sua Carne ao Limiar de Defesa dele contra aquele golpe. Você escolhe qual, depois de saber o ataque."}
  ],
  [
   {n:"Castigo de Guarda",cst:"1 Vigília",ac:"Reação (gatilho: inimigo se move na zona ou atravessa)",
    sab:"Cada passo aqui dentro é pago.",
    ef:"Ataque de oportunidade contra quem disparou o gatilho. Se acertar, o deslocamento dele acaba na hora (para onde está) e ele fica Lento até o fim do turno dele."},
   {n:"Prender",cst:"2 Vigília",ac:"Reação",
    sab:"Você fecha a mão. Ele não vai a lugar nenhum.",
    ef:"Um inimigo na zona fica Preso (não pode sair da zona nem se aproximar de outro alvo; só pode agir contra você ou tentar se soltar com Força Bruta oposta)."}
  ],
  [
   {n:"Muralha Viva",cst:"—",ac:"Passiva",
    sab:"A zona não é um lugar. É você.",
    ef:"O alcance da Guarda sobe para Médio e ela passa a te acompanhar quando você se move (não precisa reassumir). Aliados inteiramente dentro da sua Guarda ganham +1 na Defesa."},
   {n:"Revide em Cadeia",cst:"3 Vigília",ac:"Reação · 1×/rodada",
    sab:"Um errou. Todos entenderam.",
    ef:"Quando você acerta uma Reação de Castigo, gaste 3 Vigília para que todos os inimigos na zona testem Coragem (7) ou fiquem Lentos e percam a chance de se mover no próximo turno deles."}
  ],
  [
   {n:"Zona de Execução",cst:"—",ac:"Passiva",
    sab:"Aqui dentro, o tempo é seu.",
    ef:"Não há mais limite de Reações por rodada dentro da Guarda — cada gatilho que um inimigo dispara, você pode responder, desde que tenha Vigília. O teto de Vigília deixa de existir: acumule quanto o inimigo te der.",
    req:{nv:12}},
   {n:"A Última Linha",cst:"toda a Vigília (mínimo 4)",ac:"Reação · 1×/sessão (gatilho: um aliado na zona chegaria a 0)",
    sab:"Enquanto você respira, ele não cai.",
    ef:"Queime toda a Vigília (4+) para anular completamente o golpe que derrubaria um aliado na sua Guarda — dano zero — e contra-atacar o agressor com dano máximo automático.",
    req:{nv:12}}
  ]
 ]},
{n:"Duelista",s:"um inimigo de cada vez",
 regra:{n:"Foco + Ímpeto",ef:"Como Ação Livre, marque um inimigo como seu Foco (só um por vez; remarcar é Ação Livre). Contra o Foco: +1 para acertar, e ignora a penalidade de estar em desvantagem numérica contra ele; toda vez que acerta o Foco, ganha 1 de Ímpeto (máx. conforme estágio). Fora isso, enquanto houver 2+ inimigos adjacentes a você, sua Defesa é −1."},
 medidor:{chave:"impeto",nome:"Ímpeto",min:0,tetos:[3,3,5,8],reset:"cena"},
 st:[
  [
   {n:"En Garde",cst:"—",ac:"Passiva",
    sab:"O peso certo no pé certo. Você já leu o duelo antes de ele começar.",
    ef:"Com uma arma leve, seu deslocamento não provoca reações do seu Foco, e você pode se reposicionar (passo de 1m) de graça uma vez por turno."},
   {n:"Finta",cst:"1 Ímpeto",ac:"Ação (declare antes de atacar o Foco) · Manobra",
    sab:"Você mostra um golpe que nunca vem.",
    ef:"O Foco não pode usar Reação contra este ataque e testa Coragem (7); se falhar, você tem +2 e o acerto abre a guarda dele (o próximo ataque de qualquer aliado contra ele, nesta rodada, ganha +2)."}
  ],
  [
   {n:"Riposte",cst:"1 Ímpeto",ac:"Reação (gatilho: o Foco erra um ataque contra você) · Manobra",
    sab:"O erro dele é o seu convite.",
    ef:"Responda com um ataque imediato. Se acertar, além do dano, recupere o Ímpeto gasto."},
   {n:"Ponto Fraco",cst:"2 Ímpeto",ac:"Ação (declare antes de atacar o Foco) · Manobra",
    sab:"Você viu onde a armadura não cobre. Ou a alma.",
    ef:"Este ataque ignora a Absorção do Foco e, num Total, aplica uma condição à escolha entre Sangrando, Lento ou Cego."}
  ],
  [
   {n:"Tempo Perfeito",cst:"—",ac:"Passiva",
    sab:"Não é mais rápido. É na hora exata.",
    ef:"Sempre que seu Foco fica sem nenhum outro inimigo por perto (um duelo 1×1), você ganha 1 de Ímpeto no início de cada um dos seus turnos."},
   {n:"Desarme Magistral",cst:"2 Ímpeto",ac:"Ação (declare antes de atacar o Foco) · Manobra",
    sab:"A arma dele agora é sua, ou é do chão. Ele que escolha.",
    ef:"Num acerto, o Foco é desarmado (a arma voa a Curto) e fica com −2 para agir até recuperá-la ou sacar outra. Contra inimigos sem arma, ele perde a próxima Reação."}
  ],
  [
   {n:"Mestre-de-Armas",cst:"—",ac:"Passiva",
    sab:"Você não trava mais. Cada troca de lâminas te ensina a próxima.",
    ef:"Você pode declarar duas Manobras diferentes no mesmo turno (pagando as duas), e acertar o Foco recupera 2 de Ímpeto em vez de 1.",
    req:{nv:12}},
   {n:"Golpe de Mestre",cst:"5 Ímpeto",ac:"Ação · 1×/sessão (declare contra o Foco) · Manobra",
    sab:"Toda a conversa levava a esta frase.",
    ef:"Acerto automático, dano máximo, ignora Absorção, e o Foco testa Resistência (Limiar = seu dano) ou é imediatamente incapacitado (inconsciente ou morto, sua escolha). Contra alvos que sobrevivem, ficam Atordoados e Sangrando.",
    req:{nv:12}}
  ]
 ]}]},

"Investigador":{f:"Todo mundo vê. Quase ninguém olha.",vida:2,comb:"sin",cv:2,tre:["Investigação","Percepção","Intuição"],profs:"arrombamento, fotografia e escuta, etiqueta do submundo",
base:[
 {n:"Linha de Raciocínio",cst:"—",ac:"Ação Livre · 1×/cena",
  sab:"Duas peças soltas. Você vê a linha entre elas.",
  ef:"Declare uma conexão entre duas pistas encontradas. Plausível? O mestre confirma e dá um rumo concreto (lugar, nome, próximo passo). Se for um salto, role Investigação (7): sucesso confirma; falha diz que a conexão é real, mas falta uma peça — o mestre diz de que tipo."},
 {n:"Olhar Treinado",cst:"—",ac:"Ação Livre · 1×/cena",
  sab:"Todo mundo vê a sala. Você vê o que está errado nela.",
  ef:"+2 numa Investigação ou Percepção feita com calma. Pode perguntar ao mestre: o que aqui está fora do lugar? — resposta honesta, mesmo num Parcial."},
 {n:"Nunca Esquece o Caso",cst:"—",ac:"Passiva",
  sab:"A campanha inteira está guardada, palavra por palavra.",
  ef:"Memória perfeita de toda pista da campanha; 1×/sessão pede ao mestre que recite uma palavra por palavra. +1 contra tentativas de alterar ou confundir suas memórias — inclusive sobrenaturais."}
],
esc:[
 {n:"Reconstituição",cst:"1 Sintonia",ac:"Ação",
  sab:"A cena ainda guarda o que aconteceu. Você só precisa ler.",
  ef:"Investigação (7) numa cena. Parcial: um quadro congelado — o essencial. Total: uma sequência curta — o quê e em que ordem. Crítico: + um detalhe que ninguém deveria saber. É dedução, não magia: não vê o que não deixou rastro."},
 {n:"Conexões Improváveis",cst:"—",ac:"1×/sessão · NV 6",
  sab:"Você aponta a ligação. E o mundo descobre que ela sempre existiu.",
  ef:"Declare uma ligação entre dois elementos da campanha. Plausível? Vira verdade. Se o mestre julgar falsa, você ganha em vez disso uma pista real sobre por que NÃO se conectam.",
  req:{nv:6}},
 {n:"Perfil",cst:"—",ac:"Ação (uma cena de estudo) · NV 4",
  sab:"Você não adivinha o próximo passo dele. Você já sabe.",
  ef:"Estude um suspeito e monte o Perfil. Contra ele: +1 para antecipar/opor, e 1×/cena pergunte ao mestre qual o próximo passo dele? — resposta honesta em uma frase.",
  req:{nv:4}},
 {n:"Faro de Mentira",cst:"—",ac:"Passiva · NV 6",
  sab:"A mentira tem um cheiro. Você aprendeu a senti-lo.",
  ef:"Quando mentem diretamente para você, você sente (a mentira, não a verdade). Enganadores sobrenaturais forçam teste oposto: sua Intuição vs a Enganação deles.",
  req:{nv:6}},
 {n:"Pressão Psicológica",cst:"—",ac:"Ação (interrogatório) · Req. Linha de Raciocínio",
  sab:"Todo mundo entrega alguma coisa. Basta apertar o lugar certo.",
  ef:"+2 em interrogatórios. Parcial: o alvo revela uma verdade. Total: você também descobre o que ele teme perder.",
  req:{req:"Linha de Raciocínio"}},
 {n:"Vasculhar",cst:"—",ac:"Ação estendida",
  sab:"O que foi escondido com cuidado foi escondido de gente comum.",
  ef:"Percepção (7). Parcial: acha o óbvio escondido. Total: + um item ou pista guardada com cuidado. Crítico: + algo que o próprio dono esqueceu que tinha."}
],
mae:[
{n:"Detetive",s:"a mente que resolve",
 regra:{n:"Dedução",ef:"Você acumula Deduções coletando e conectando informação — cada pista notada, contradição ou detalhe fora do lugar rende 1. Gasta Deduções para declarar conclusões que viram verdade, antecipar comportamentos e expor fraquezas. A Dedução persiste enquanto o caso estiver aberto; resolver ou abandonar o mistério a zera. Sem informação para coletar, você fica sem munição."},
 medidor:{chave:"deducao",nome:"Dedução",min:0,tetos:[5,8,8,99],reset:"sessao"},
 st:[
  [
   {n:"Raciocínio",cst:"—",ac:"Ação Livre · 1×/turno",
    sab:"Você olha a mesma coisa que todos e vê o que ninguém viu.",
    ef:"Observe uma cena, pessoa ou objeto e ganhe 1 Dedução; o mestre responde honestamente uma pergunta dedutiva ('o que está errado aqui?', 'o que ele esconde?', 'o que aconteceu antes?')."},
   {n:"Elementar",cst:"gasta 1 Dedução",ac:"Ação Livre",
    sab:"É óbvio, quando se sabe olhar.",
    ef:"Declare uma conclusão plausível sobre o caso — o mestre confirma ou aponta a peça que falta. Contra um alvo estudado, use para prever o próximo passo dele (age depois de você saber) ou expor uma fraqueza (+2 na próxima ação contra ele)."}
  ],
  [
   {n:"O Palácio Mental",cst:"—",ac:"Passiva",
    sab:"Nada que você percebeu se perde. Está tudo guardado, catalogado, esperando.",
    ef:"Teto de Dedução sobe para 8, e você retém tudo com perfeição — 1×/sessão, peça ao mestre que recite uma informação da campanha palavra por palavra. Pode gastar Deduções fora de combate para resolver um enigma na hora."},
   {n:"A Única Explicação",cst:"gasta 3 Deduções",ac:"Ação · 1×/cena",
    sab:"Eliminado o impossível, o que resta, por mais improvável, é a verdade.",
    ef:"Force uma revelação sobre o mistério atual: o mestre deve te entregar uma verdade central e concreta (a identidade do culpado, a localização do escondido, o método, o elo que faltava)."}
  ],
  [
   {n:"Sempre um Passo à Frente",cst:"gasta Deduções",ac:"Reação",
    sab:"Você já tinha previsto isto. Na verdade, contava com isso.",
    ef:"Revele que você antecipou o que acabou de acontecer: declare retroativamente uma preparação sua que se encaixa (já sabia da armadilha, já tinha o antídoto, já postou alguém ali). Quanto mais Deduções gasta, maior a preparação que você 'sempre teve'."},
   {n:"Leitura Fria",cst:"—",ac:"Ação Livre",
    sab:"Cinco segundos olhando e você sabe mais sobre a situação do que quem vive nela.",
    ef:"Ao entrar em qualquer cena ou encontrar qualquer pessoa, o mestre te entrega de graça um punhado de deduções imediatas — quem manda, quem mente, a tensão oculta, onde está o perigo, o que está fora do lugar."}
  ],
  [
   {n:"A Mente Absoluta",cst:"—",ac:"Passiva",
    sab:"Você não resolve mais casos. Você vê a solução no instante em que vê o problema.",
    ef:"Você gera Deduções continuamente, e suas conclusões deixam de precisar de confirmação — quando declara uma dedução plausível, ela é verdade, e a realidade do caso se conforma a ela (no que o mestre não estabeleceu explicitamente em contrário).",
    req:{nv:12}},
   {n:"Caso Encerrado",cst:"gasta 8 Deduções",ac:"Ação · 1×/campanha",
    sab:"Você reúne todos numa sala. E revela a coisa inteira, do começo ao fim, sem uma peça fora do lugar.",
    ef:"Resolva, de uma vez e por completo, um mistério de qualquer escala. O mestre entrega a verdade total e todas as implicações; você declara como usar essa verdade, e a revelação vira uma arma (expõe o vilão, desfaz seu plano, dá ao grupo o que precisa para vencer).",
    req:{nv:12}}
  ]
 ]},
{n:"Forense",s:"a cena fala",
 regra:{n:"Vestígios",ef:"Você reconstrói o passado a partir do que ficou. Coleta Vestígios examinando cenas, corpos, objetos e locais — cada exame minucioso rende fragmentos do que se passou ali. Gasta Vestígios para montar reconstruções cada vez mais completas. Reviver eventos violentos ou anômalos custa Lucidez: você não lê o massacre, você o revive."},
 medidor:{chave:"vestigios",nome:"Vestígios",min:0,tetos:[5,8,8,99],reset:"sessao"},
 st:[
  [
   {n:"Exame",cst:"—",ac:"Ação",
    sab:"Você toca o que ficou e ele começa a contar.",
    ef:"Examine uma cena, corpo ou objeto e ganhe 1 Vestígio; o mestre entrega um fato concreto sobre o que aconteceu ali (como, com o quê, há quanto tempo, por quem). Identifica automaticamente causas de morte, tipos de dano, resíduos, o que foi movido."},
   {n:"Reconstituição",cst:"gasta Vestígios (1–3)",ac:"Ação",
    sab:"Você fecha os olhos e a cena se remonta, quadro a quadro.",
    ef:"Reconstrua o evento passado de uma cena. 1: um quadro congelado. 2: a sequência (o quê, em que ordem). 3: a cena inteira em movimento. Reviver eventos violentos ou anômalos custa 1 Lucidez. Não vê o que não deixou rastro material."}
  ],
  [
   {n:"O Corpo Não Mente",cst:"—",ac:"Passiva",
    sab:"As pessoas mentem. A carne, os objetos e a poeira, nunca.",
    ef:"Teto de Vestígios sobe para 8. Extrai de restos físicos verdades que testemunhas jamais dariam. Contra tentativas de forjar ou limpar uma cena, você percebe a fraude (a cena 'arrumada' grita mais alto que uma bagunçada)."},
   {n:"Prova Irrefutável",cst:"gasta 3 Vestígios",ac:"Ação",
    sab:"Você não afirma. Você demonstra, e não há como negar.",
    ef:"Transforme sua reconstrução em fato inegável: o que você reconstruiu é aceito como verdade por qualquer um confrontado com a prova (PNJs cedem, aliados ganham certeza acionável, mentiras sobre o evento se desfazem)."}
  ],
  [
   {n:"Autópsia do Impossível",cst:"gasta Vestígios (+ Lucidez)",ac:"Ação estendida",
    sab:"O monstro também deixa restos. E restos você sabe interrogar.",
    ef:"Aplique o método forense ao anômalo: de uma carcaça sobrenatural, do rastro de um ritual, dos destroços de uma manifestação, reconstrua o que era, o que fez, de onde veio e — o mais valioso — como foi ferido ou como pode ser. Cada reconstrução anômala custa Lucidez."},
   {n:"A Cena Completa",cst:"gasta 5 Vestígios",ac:"Ação · 1×/cena",
    sab:"Não um quadro. Não uma sequência. Tudo. Como se você tivesse estado lá o tempo todo.",
    ef:"Reviva um evento passado de forma total e imersiva — você 'assiste' à cena inteira desenrolar em tempo real, de todos os ângulos, podendo pausar e focar detalhes. Nada relevante escapa."}
  ],
  [
   {n:"Memória da Matéria",cst:"—",ac:"Passiva",
    sab:"Tudo que existe se lembra do que tocou. Você aprendeu a linguagem.",
    ef:"Você gera Vestígios continuamente e lê o passado de qualquer coisa física ao toque, instantaneamente, sem precisar de uma 'cena' preparada. O tempo deixa de apagar rastros: reconstrua eventos de séculos atrás tão bem quanto os de ontem.",
    req:{nv:12}},
   {n:"Reconstituição Absoluta",cst:"gasta 8 Vestígios (+ Lucidez pesada)",ac:"Ação estendida · 1×/campanha",
    sab:"Você reúne cada resto, cada fragmento. E o que foi destruído volta a acontecer diante de você, inteiro.",
    ef:"Reconstrua por completo um evento de qualquer escala, por mais antigo, oculto ou apagado que seja. A cena se remonta em totalidade absoluta, sem lacunas, sem possibilidade de mentira. Custa Lucidez pesada, mas entrega a verdade histórica inteira.",
    req:{nv:12}}
  ]
 ]},
{n:"Caçador do Oculto",s:"o que persegue o impossível",
 regra:{n:"O Caso",ef:"Você monta dossiês sobre ameaças anômalas. Sobre uma criatura, culto ou entidade específica, acumula Conhecimento pesquisando, observando, entrevistando sobreviventes, examinando vítimas. Quanto mais Conhecimento sobre um alvo, mais consegue combatê-lo. O Conhecimento é específico e não se transfere para outra ameaça. Estudar o oculto de perto custa Lucidez."},
 medidor:{chave:"conhecimento",nome:"Conhecimento",min:0,tetos:[5,8,8,99],reset:"sessao"},
 st:[
  [
   {n:"Montar o Dossiê",cst:"—",ac:"Ação (pesquisa/observação)",
    sab:"Você começa uma pasta. No fim, ela terá tudo que aquela coisa não queria que soubessem.",
    ef:"Abra um dossiê sobre uma ameaça anômala e ganhe 1 Conhecimento ao pesquisá-la. Cada Conhecimento revela um fato utilizável: um comportamento, uma origem, uma pista de fraqueza. Estudo direto e próximo pode custar 1 Lucidez."},
   {n:"Ponto Fraco",cst:"gasta 1 Conhecimento",ac:"Ação Livre",
    sab:"Toda coisa que não deveria existir tem uma rachadura por onde a realidade a agarra.",
    ef:"Revele e explore uma fraqueza de um alvo anômalo: por uma cena, você e seus aliados ignoram uma de suas defesas/imunidades, ou ganham +2 contra ele, ou sabem como neutralizar um de seus poderes."}
  ],
  [
   {n:"Protocolo de Contenção",cst:"gasta Conhecimento",ac:"Ação",
    sab:"Você sabe o que ele odeia, o que o prende, e o que o faz recuar. E trouxe tudo.",
    ef:"Aplique uma contramedida específica que você preparou contra a ameaça estudada: uma barreira que ela não cruza, uma substância que a fere de verdade, um símbolo que a detém, uma condição que a expõe."},
   {n:"Eu Já Vi Isso Antes",cst:"—",ac:"Passiva",
    sab:"Nomes, sintomas, padrões. Você reconhece o horror pela silhueta.",
    ef:"Teto de Conhecimento sobe para 8. Ao encontrar uma ameaça anômala, mesmo sobre algo que não estudou, o mestre te dá uma pista inicial se ela se parecer com algo dos seus arquivos. Você começa cada caça já com um palpite fundamentado."}
  ],
  [
   {n:"Caçador Experiente",cst:"—",ac:"Passiva",
    sab:"Você não teme mais o escuro. Você o catalogou.",
    ef:"Montar dossiês fica muito mais rápido. Contra ameaças com dossiê, você é imune ao medo que elas causam, resiste melhor aos seus efeitos anômalos, e a Lucidez que elas custam a você cai."},
   {n:"A Fraqueza Fatal",cst:"gasta 5 Conhecimento",ac:"Ação · 1×/cena",
    sab:"Toda lenda diz como o monstro morre. Você descobriu qual lenda era verdade.",
    ef:"Revele a fraqueza fatal de um alvo anômalo — a condição específica sob a qual ele é vulnerável de verdade. Enquanto ela for explorada, a criatura perde suas proteções sobrenaturais e pode ser derrotada como algo mortal."}
  ],
  [
   {n:"Enciclopédia do Abismo",cst:"—",ac:"Passiva",
    sab:"Não há mais monstro novo. Só variações de coisas que você já arquivou.",
    ef:"Você gera Conhecimento continuamente e mantém dossiês ilimitados; contra quase qualquer ameaça anômala, já tem informação utilizável de imediato. Imune ao medo sobrenatural em geral, e reconhece natureza, origem e fraqueza provável de um horror quase instantaneamente.",
    req:{nv:12}},
   {n:"O Nome Verdadeiro",cst:"gasta 8 Conhecimento",ac:"Ação · 1×/campanha",
    sab:"Você descobriu o que ele é de verdade. E dizer isso em voz alta é a arma mais afiada que existe.",
    ef:"Exponha a natureza verdadeira e completa de uma ameaça anômala de grande escala — o que é, de onde veio, como existe, e o que pode desfazê-lo. Munido dessa verdade, aplique a única coisa capaz de derrotá-lo: banir, selar, destruir ou quebrar o impossível.",
    req:{nv:12}}
  ]
 ]}
]},

"Médico":{f:"Você decide quem vira cadáver.",vida:2,comb:"sin",cv:2,tre:["Medicina","Ciências","Intuição"],profs:"ferramentas médicas, veículos comuns, acesso hospitalar",
regra:{n:"Cura-Base",cst:"1 Sintonia",ac:"Ação · Toque",
 sab:"Você não faz milagre. Você compra tempo — e cobra do próprio poço.",
 ef:"Em condições calmas, cura automática de 1d2 + Juízo. Sob pressão (combate, perigo), exige Medicina (7). Falha: cura metade e você se expõe. Parcial: cura normal. Total: cura +1. Crítico: cura o máximo e remove uma condição leve."},
base:[
 {n:"Estabilizar",cst:"—",ac:"Ação · Toque",
  sab:"A linha entre vai ficar e já era cabe nos seus dez segundos.",
  ef:"Alguém a 0 de Vida: Medicina (7). Parcial: estável, mas inconsciente (acorda com 1 de Vida após a cena). Total: volta a 1 de Vida, consciente. Crítico: volta a 1 e pode agir imediatamente. Sem kit: Desvantagem."},
 {n:"Triagem",cst:"—",ac:"Ação Livre · 1×/cena",
  sab:"Você olha e já sabe quem tem tempo e quem não tem.",
  ef:"Olhe um ferido: o mestre diz exatamente o que ele tem — Vida, condições, venenos, e o que mata mais rápido. Em vários feridos, você sabe a ordem certa; quem seguir sua triagem ganha +1 em testes de socorro."},
 {n:"Mãos Firmes",cst:"—",ac:"Passiva",
  sab:"O mundo desaba. Suas mãos não tremem.",
  ef:"Você trata sob estresse como se estivesse calmo: a Cura-Base não exige teste em combate, e Medicina ignora penalidades de ambiente (escuro, chuva, veículo em movimento)."}
],
esc:[
 {n:"Tratamento Intensivo",cst:"2 Sintonia",ac:"Ação · 1×/cena por alvo",
  sab:"Não é remendo. É reparo de verdade, aqui e agora.",
  ef:"O alvo recupera 1d4 + Juízo de Vida e remove Sangrando ou uma condição física leve."},
 {n:"Calmante",cst:"—",ac:"Ação · Adjacente (toque ou voz)",
  sab:"Uma voz, uma mão no ombro. O horror recua um passo.",
  ef:"Remove Apavorado, Confuso ou Em Pânico de um aliado; ele ainda ganha +1 no próximo teste de Coragem da cena."},
 {n:"Farmacologia",cst:"—",ac:"Ação (1 cena de preparo) · Req. Triagem",
  sab:"A química certa transforma um corpo acabado numa arma por mais cinco minutos.",
  ef:"Prepara 2 doses por cena de trabalho (duram a sessão): Estimulante — ignora Exausto e +1 físico por uma cena; depois, Exausto. Sedativo — alvo testa Resistência (8) ou fica Lento; dose dupla apaga. Analgésico forte — ignora penalidades de ferimento por uma cena.",
  req:{req:"Triagem"}},
 {n:"Cirurgia de Campo",cst:"2 Sintonia",ac:"Ação estendida (10+ min) · NV 6",
  sab:"Sem sala, sem luz, sem tempo. Só você e o que precisa sair.",
  ef:"Medicina (8). Parcial: remove uma condição grave, mas o paciente sofre 1 de dano e fica Exausto. Total: remove limpo. Crítico: remove e o paciente cura 1d4. Falha: 1d2 de dano e a condição fica.",
  req:{nv:6}},
 {n:"Estoque de Emergência",cst:"—",ac:"1×/sessão · NV 4",
  sab:"Eu tinha guardado isso pra uma hora dessas.",
  ef:"Declara ter o suprimento certo à mão: antídoto comum, soro, dose, kit completo. Raros e anômalos ficam de fora.",
  req:{nv:4}},
 {n:"Última Tentativa",cst:"2 Sintonia + 1 Lucidez",ac:"Ação",
  sab:"Você sabe que não devia dar certo. Tenta assim mesmo.",
  ef:"Force uma reanimação onde não devia ser possível: Medicina (9). Total: funciona, com um custo definido pelo mestre. Falha: não funciona — e você sente o peso de ter tentado."}
],
mae:[
{n:"Cirurgião",s:"o reparo definitivo",
 regra:{n:"Procedimento",ef:"O Cirurgião não joga Vida de volta no caos — ele opera. Cada cura sua acumula Procedimento sobre um paciente, somando enquanto você continua cuidando dele sem interrupção. Quanto mais Procedimento, mais fundo você conserta. Interromper (mudar de paciente, entrar em combate direto) esfria o Procedimento. Acumular exige ficar parado, focado, de mãos ocupadas — você não luta nem se protege bem enquanto opera."},
 medidor:{chave:"procedimento",nome:"Procedimento",min:0,tetos:[5,5,5,8],reset:"cena"},
 st:[
  [
   {n:"Mãos Precisas",cst:"—",ac:"Passiva",
    sab:"Você não trata. Você resolve.",
    ef:"Sua Cura-Base sobe para 1d4 + Juízo, e cada ação de cura contínua sobre o mesmo paciente rende 1 de Procedimento. Em qualquer Crítico de cura, o paciente remove também uma condição leve."},
   {n:"Estancar",cst:"—",ac:"Reação · 1×/cena",
    sab:"A hemorragia não espera o seu turno. Você também não.",
    ef:"Quando um aliado à vista sofre Sangrando ou cai a 1/4 da Vida, aja fora do seu turno: remova Sangrando e cure 1d4."}
  ],
  [
   {n:"Operação",cst:"2 Sintonia",ac:"Ação (escala com Procedimento)",
    sab:"Você abre, corrige e fecha. O corpo agradece depois.",
    ef:"Cura 2d4 + Juízo e remove uma condição. Escala: Proc. 2+ remove uma condição grave; Proc. 4+ cura o dobro e remove duas condições. Sob fogo, exige Medicina (8) e o Parcial cura metade."},
   {n:"Reparo Profundo",cst:"gasta Procedimento (3+)",ac:"Ação estendida",
    sab:"O que estava perdido volta a funcionar. Leva tempo, mas volta.",
    ef:"Com Procedimento 3+ sobre o paciente, restaure a função de algo danificado — um membro inutilizado, um sentido perdido, uma condição física duradoura. Sequelas permanentes só cedem no Ápice, mas ferimentos 'definitivos' comuns você desfaz."}
  ],
  [
   {n:"Cirurgia Estável",cst:"—",ac:"1×/cena (declare antes)",
    sab:"Não há tremor na sua mão. Não há acaso na sua agulha.",
    ef:"Declare antes de uma cura ou procedimento seu: ele não falha, não complica, e entrega o valor máximo sem rolar."},
   {n:"De Volta da Beira",cst:"3 Sintonia · 1×/sessão",ac:"Ação",
    sab:"A morte é uma condição. Recente o bastante, você a trata.",
    ef:"Sobre alguém morto há até 2 turnos: Medicina (9). Total: volta com 1d4 de Vida e uma Sequela. Parcial: volta com 1, Sequela + Exausto pela sessão. Falha: foi-se de vez. Não pode ser forçada nem repetida no mesmo corpo."}
  ],
  [
   {n:"Mão que Não Erra",cst:"—",ac:"Passiva",
    sab:"Não existe mais dano que você não saiba desfazer. Só o tempo que ele exige.",
    ef:"Teto de Procedimento sobe para 8, e você acumula Procedimento mais rápido (2 por ação de cuidado). Toda cura sua de 8+ remove uma condição à escolha; no downtime você remove Sequelas físicas permanentes (Medicina 9, uma por downtime).",
    req:{nv:12}},
   {n:"Ressurreição",cst:"gasta 8 de Procedimento + 4 Sintonia",ac:"Ação estendida · 1×/campanha",
    sab:"Você teve tempo suficiente. E tempo suficiente, nas suas mãos, vence qualquer coisa — até isso.",
    ef:"Com Procedimento 8 sobre um corpo (vivo ou morto há horas, mesmo destruído), traga alguém de volta inteiro, sem Sequela — ou repare, num único paciente, qualquer condição de qualquer escala, por pior e mais definitiva que seja.",
    req:{nv:12}}
  ]
 ]},
{n:"Praga",s:"a medicina virada arma",
 regra:{n:"Doses",ef:"Você cultiva e carrega Doses — venenos, toxinas e patógenos preparados (estoque recarregado com preparo/downtime), aplicados por lâmina, contato, ingestão ou ar. O dano não é bruto — é o corpo do inimigo se voltando contra ele, no tempo dele. As Doses levam tempo para agir; um inimigo que percebe pode reagir, curar-se, ou te matar antes de a dose amadurecer."},
 medidor:{chave:"doses",nome:"Doses",min:0,tetos:[4,4,8,99],reset:"sessao"},
 st:[
  [
   {n:"Farmacologia Sombria",cst:"—",ac:"Passiva (+ preparo para reabastecer)",
    sab:"O mesmo armário que cura tem uma prateleira de baixo.",
    ef:"Você mantém um estoque de Doses preparadas (recarrega no downtime), identifica automaticamente venenos e doenças alheias, é imune aos seus próprios agentes, e sabe a dose exata de qualquer coisa — para curar ou para o contrário."},
   {n:"Aplicar Dose",cst:"gasta 1 Dose",ac:"Ação (aplicar) · efeito com atraso",
    sab:"Ele nem vai lembrar de quando começou a sentir.",
    ef:"Aplique uma Dose (lâmina envenenada, contato, ingestão). Escolha o efeito: Febre (−1 cumulativo/turno), Torpor (Lento, depois Paralisia parcial), Hemorragia (Sangrando que agrava), ou Náusea (não pode agir ofensivamente sem testar). Começa fraco e piora a cada turno."}
  ],
  [
   {n:"Contágio",cst:"gasta 1 Dose",ac:"Passiva (dispara ao aplicar)",
    sab:"Uma dose. Muitos corpos.",
    ef:"Uma Dose que você aplica passa a ser contagiosa — o primeiro que tocar, socorrer ou ficar adjacente ao alvo por um turno testa Resistência (8) ou também a recebe (versão mais fraca)."},
   {n:"Coquetel",cst:"gasta 2 Doses",ac:"Ação",
    sab:"Você não aplica um veneno. Aplica uma conversa entre vários.",
    ef:"Combine duas Doses num só golpe: os efeitos se somam e interagem (Febre + Torpor = o corpo desliga; Hemorragia + Náusea = ele não consegue nem fugir)."}
  ],
  [
   {n:"Mitridatismo",cst:"—",ac:"Passiva",
    sab:"Você provou um pouco de tudo que pode matar. Nada mais te surpreende.",
    ef:"Teto de Doses sobe muito, e você é imune a todo veneno, doença e toxina (mundanos e a maioria dos anômalos). Pode colher: de qualquer criatura envenenada, doente ou peçonhenta que examine, extraia uma Dose nova baseada na aflição dela — inclusive de horrores anômalos."},
   {n:"Necrose",cst:"gasta 3 Doses",ac:"Ação",
    sab:"Você aponta a parte dele que vai morrer primeiro. E ela obedece.",
    ef:"Condene um sistema do corpo do alvo: um membro apodrece e fica inútil, os pulmões falham (não corre nem conjura com voz), a visão vai embora, ou a coordenação colapsa. Só um tratamento sério reverte."}
  ],
  [
   {n:"Peste Encarnada",cst:"—",ac:"Passiva",
    sab:"Você não carrega mais as doenças. Você é a fonte delas.",
    ef:"Você gera Doses continuamente, suas aflições agem mais rápido (o atraso encolhe), e pode aplicá-las à distância (Curto) por um gesto, um sopro, um olhar. Sua presença prolongada num lugar começa a adoecer os inimigos ali.",
    req:{nv:12}},
   {n:"A Praga que Não Tem Cura",cst:"gasta todas as Doses (mínimo 6)",ac:"Ação · 1×/campanha",
    sab:"Você libera aquilo para o qual não preparou antídoto.",
    ef:"Queime todo o estoque para desencadear uma praga catastrófica sobre uma área enorme, um exército, uma organização, uma linhagem: todos os afetados adoecem de algo implacável e progressivo que a medicina comum não reverte.",
    req:{nv:12}}
  ]
 ]},
{n:"Paramédico",s:"o triador de campo de batalha",
 regra:{n:"Triagem",ef:"Você gerencia a viabilidade do grupo inteiro em tempo real. No início de cada rodada de combate, faça a Triagem: recebe fichas de Atenção (= Juízo) para gastar naquela rodada em ações rápidas de socorro espalhadas pelo grupo. Cura pouco por vez, mas mantém muitos de pé. A Atenção some no fim da rodada — você nunca tem fichas para todos, e escolhe quem deixa sofrer."},
 medidor:{chave:"atencao",nome:"Atenção",min:0,tetos:[4,4,6,99],reset:"cena"},
 st:[
  [
   {n:"Protocolo de Triagem",cst:"—",ac:"Passiva (+ Ação Livre por ficha)",
    sab:"Cada rodada, a mesma pergunta: quem primeiro?",
    ef:"No início de cada rodada de combate, ganhe Atenção = Juízo. Gaste 1 Atenção (Ação Livre, alcance Curto ou instrução gritada) para: estabilizar quem caiu a 0, curar 1d2, ou remover uma condição leve. Atenção não usada some no fim da rodada."},
   {n:"Olho Clínico",cst:"—",ac:"Passiva",
    sab:"Você sabe quem vai cair antes de a pessoa saber.",
    ef:"Você sempre vê a Vida, condições e estado real de todos os aliados à vista, e o mestre te avisa quando um deles está a um golpe de cair."}
  ],
  [
   {n:"Intervenção",cst:"gasta 2 Atenção",ac:"Reação",
    sab:"Você chega no segundo exato entre o golpe e o chão.",
    ef:"Quando um aliado à vista sofreria dano que o derrubaria ou uma condição grave, intervenha à distância: reduza o dano à metade e anule a condição."},
   {n:"Remanejar",cst:"gasta 2 Atenção",ac:"Ação Livre",
    sab:"Um está inteiro e o outro está caindo. Você equilibra a conta.",
    ef:"Redistribua ferimentos e fôlego entre aliados dispostos — mova Vida de quem tem sobra para quem precisa, transfira uma condição de quem não pode carregá-la para quem aguenta, ou passe Fôlego de um para outro."}
  ],
  [
   {n:"Maestro do Caos",cst:"—",ac:"Passiva",
    sab:"No meio do inferno, você é a única pessoa calma.",
    ef:"Sua Atenção por rodada sobe (Juízo + 2), e gastar Atenção deixa de exigir linha de visão direta. 1×/cena, conceda a todos os aliados uma 'ordem de triagem': cada um ganha +1 e ignora a próxima condição."},
   {n:"Ninguém Morre Hoje",cst:"gasta 4 Atenção",ac:"Reação · 1×/cena",
    sab:"Não sob a sua vigília.",
    ef:"Quando um ou mais aliados cairiam a 0 na mesma rodada, segure todos eles em 1 de Vida, conscientes e de pé, até o fim da rodada seguinte."}
  ],
  [
   {n:"Coração do Grupo",cst:"—",ac:"Passiva",
    sab:"Enquanto você respira, o grupo não quebra.",
    ef:"O teto de Atenção deixa de limitar na prática (você gera o suficiente para responder a tudo), e enquanto estiver consciente, nenhum aliado à vista pode ser reduzido a 0 por um único golpe (o excesso vira 1 de Vida).",
    req:{nv:12}},
   {n:"Hora Dourada",cst:"gasta toda a Atenção da rodada",ac:"Ação · 1×/campanha",
    sab:"Existe uma janela em que a morte ainda é reversível para todos. Você a segura aberta com as duas mãos.",
    ef:"Declare uma Hora Dourada sobre o grupo: por uma cena inteira, nenhum aliado à vista pode morrer — quedas viram inconsciência estável, ferimentos mortais esperam, a morte fica em suspenso para todos ao seu redor enquanto você estiver de pé. Ao fim, você desaba, esvaziado.",
    req:{nv:12}}
  ]
 ]}
]},

"Faz-Tudo":{f:"Tudo que liga, desliga. Tudo que tranca, abre.",vida:1,comb:"sin",cv:3,tre:["Tecnologia","Ciências","Engenharia"],profs:"ferramentas técnicas, veículos comuns, inglês técnico",
base:[
 {n:"Olho de Engenheiro",cst:"—",ac:"Ação Livre · 1×/cena",
  sab:"Toda máquina tem um segredo. Você lê na cara dela.",
  ef:"Encare um mecanismo, veículo ou dispositivo: o mestre diz como funciona e onde é o ponto fraco."},
 {n:"Mãos de Oficina",cst:"—",ac:"Passiva",
  sab:"Se tranca, abre. Se falta ferramenta, você inventa uma.",
  ef:"Consertos e trabalhos técnicos levam metade do tempo; você improvisa a ferramenta certa com sucata quando não a tem; fechaduras mecânicas comuns cedem com tempo, sem teste."},
 {n:"Gambiarra de Combate",cst:"1 Sintonia",ac:"Ação · 1×/cena",
  sab:"Um fio, uma faísca, um estrondo na hora certa.",
  ef:"Monte na hora um truque técnico do cenário — fumaça, choque, estrondo. Total: o alvo fica Atordoado ou Cego por 1 turno."}
],
esc:[
 {n:"Invadir Sistema",cst:"1 Sintonia",ac:"Ação",
  sab:"Fechadura, câmera, sinal — tudo obedece a quem sabe pedir.",
  ef:"Tecnologia para burlar uma fechadura eletrônica, câmera ou sistema de segurança — ou embaralhar rádios, câmeras e sinais numa área por uma cena."},
 {n:"Sobrecarga",cst:"1 Sintonia",ac:"Ação",
  sab:"Todo aparelho tem um limite. Você o ultrapassa por ele.",
  ef:"Force um aparelho elétrico a estourar ou queimar: luzes, painel, motor."},
 {n:"Armadilha Técnica",cst:"—",ac:"Ação (prepara)",
  sab:"A sala inteira vira sua, e ninguém percebeu.",
  ef:"Monte uma armadilha (choque, alarme, rede) num ponto; dispara quando alguém cruza."},
 {n:"Desarmar Dispositivo",cst:"—",ac:"Ação",
  sab:"O fio certo, no segundo certo.",
  ef:"Engenharia para neutralizar uma armadilha, carga ou aparelho perigoso."},
 {n:"Suporte Vital",cst:"—",ac:"Ação",
  sab:"Você não é médico. Mas máquina que mantém gente viva, isso você monta.",
  ef:"Improvise um aparelho que mantém um ferido estável, substituindo Estabilizar."},
 {n:"Pulso Eletromagnético",cst:"2 Sintonia",ac:"Ação · NV 8",
  sab:"Por um instante, nada eletrônico nesta sala funciona. Nada.",
  ef:"Um pulso apaga toda eletrônica na área por uma cena.",
  req:{nv:8}}
],
mae:[
{n:"Engenheiro",s:"fazer surgir o que não existe",
 regra:{n:"Construções",ef:"Você mantém um estoque de Componentes e gasta Componentes para montar Construções — máquinas autônomas que agem por conta própria no campo, seguindo uma ordem simples, todo turno, até serem destruídas. Você mantém até [Juízo] Construções ativas ao mesmo tempo. Construções são frágeis: pouca Vida, podem ser destruídas, hackeadas ou desligadas."},
 medidor:{chave:"componentes",nome:"Componentes",min:0,tetos:[6,6,12,99],reset:"sessao"},
 st:[
  [
   {n:"Oficina de Campo",cst:"—",ac:"Passiva (+ preparo para reabastecer)",
    sab:"Você carrega uma oficina inteira em peças soltas e na cabeça.",
    ef:"Conserta qualquer Construção sua gastando 1 Componente, e improvisa Componentes de sucata quando o estoque acaba (com tempo). Reabastece no downtime."},
   {n:"Montar Construção",cst:"1–3 Componentes conforme o porte",ac:"Ação",
    sab:"Um minuto de trabalho e ela já está de pé, esperando ordens.",
    ef:"Monte uma Construção que age na sua iniciativa seguindo uma ordem simples. Modelos base (1 Componente cada): Drone (voa/rola, observa e ataca à distância), Torre (fixa, atira em quem entra no alcance), Autômato (anda e bate corpo a corpo), Utilitário (carrega, ilumina, abre passagem)."}
  ],
  [
   {n:"Enxame",cst:"gasta Componentes",ac:"Ação",
    sab:"Por que um drone, quando cabem seis na mochila?",
    ef:"Monte várias Construções pequenas de uma vez (um enxame de mini-drones, uma matilha de autômatos-aranha). Elas agem em conjunto como uma única unidade coordenada — mais frágeis individualmente, mas cobrem área, distraem e sobrecarregam alvos por número."},
   {n:"Módulos",cst:"1 Componente",ac:"Ação Livre",
    sab:"A mesma carcaça, funções diferentes. Você troca a alma da máquina no meio da luta.",
    ef:"Adicione um módulo a uma Construção sua, mudando ou somando função na hora: arma pesada, blindagem extra, sensor (dá visão/alerta a você), autodestruição, campo de reparo, alto-falante."}
  ],
  [
   {n:"Linha de Montagem",cst:"—",ac:"Passiva",
    sab:"Você para de montar uma de cada vez. A oficina agora trabalha sozinha.",
    ef:"Teto de Componentes sobe para 12, você mantém o dobro de Construções ativas, e montar uma Construção pequena passa a ser Ação Livre 1×/turno. Construções destruídas podem ser reconstruídas de graça no início do seu turno se houver Componentes e destroços por perto."},
   {n:"Rede de Comando",cst:"—",ac:"Passiva",
    sab:"Você não comanda cada uma. Você pensa, e todas obedecem.",
    ef:"Todas as suas Construções agem com inteligência coordenada, sem você gastar ações para dirigi-las. Você vê pelos sensores de todas simultaneamente, e elas se protegem, flanqueiam e focam alvos como uma unidade tática única."}
  ],
  [
   {n:"A Fábrica Andante",cst:"—",ac:"Passiva",
    sab:"Você não é mais um engenheiro com máquinas. Você é o núcleo de um exército que se constrói sozinho.",
    ef:"Componentes praticamente ilimitados. Monte Construções de porte grande e complexo — um autômato de guerra, um veículo autônomo blindado, um drone-mãe que fabrica outros drones. Suas Construções ganham Vida e potência muito maiores.",
    req:{nv:12}},
   {n:"Grande Obra",cst:"gasta todos os Componentes (mínimo 8)",ac:"Ação estendida · 1×/campanha",
    sab:"Você constrói a única máquina que o problema não sobrevive.",
    ef:"Queime todo o estoque e monte, numa cena de trabalho, uma Construção definitiva à altura do problema — poderosa o bastante para ser um personagem por si só — que age ao seu lado por toda a cena ou missão.",
    req:{nv:12}}
  ]
 ]},
{n:"Sabotador",s:"virar os sistemas contra o dono",
 regra:{n:"Controle",ef:"Você invade e assume a infraestrutura de um lugar, acumulando Controle sobre uma instalação/sistema/rede conforme invade seus subsistemas. Quanto mais Controle, mais o lugar obedece a você em vez do dono. Sem sistemas para subverter (mato aberto, lugar 'burro'), você vira um Faz-Tudo comum."},
 medidor:{chave:"controle",nome:"Controle",min:0,tetos:[5,5,8,12],reset:"sessao"},
 st:[
  [
   {n:"Intrusão",cst:"—",ac:"Ação",
    sab:"Toda porta trancada é um convite mal formulado.",
    ef:"Invada um sistema à vista ou ao alcance (câmera, fechadura, terminal, máquina, rede) e ganhe 1 de Controle sobre a instalação a que ele pertence. O mestre diz o que aquele subsistema permite controlar."},
   {n:"Comando",cst:"1 Controle",ac:"Ação Livre",
    sab:"Você não força o sistema. Você só é o novo administrador dele.",
    ef:"Comande um subsistema já invadido: trancar/destrancar portas, cegar câmeras, luzes, redirecionar energia, disparar/silenciar alarmes, mexer em máquinas."}
  ],
  [
   {n:"Virar a Arma",cst:"2 Controle",ac:"Ação",
    sab:"A defesa deles tinha um detalhe: agora é minha.",
    ef:"Assuma uma defesa ou máquina hostil do local — torre automática, drone inimigo, sistema de segurança letal, armadilha — e vire-a contra os donos por [Juízo] turnos."},
   {n:"Fantasma no Sistema",cst:"—",ac:"Passiva",
    sab:"Eles sabem que há alguém lá dentro. Não sabem quem, nem onde, nem como tirar.",
    ef:"Suas intrusões ficam ocultas; expulsá-lo exige um esforço ativo e bem-sucedido. Você mantém Controle sobre uma instalação mesmo à distância e depois de sair fisicamente dela."}
  ],
  [
   {n:"Domínio",cst:"gasta Controle (5+)",ac:"Ação · 1×/cena",
    sab:"A partir de agora, a casa é minha.",
    ef:"Teto de Controle sobe para 8. Com Controle 5+ sobre uma instalação, assuma o domínio total: todos os sistemas obedecem sem gasto adicional, o lugar trabalha contra seus inimigos, e o dono original perde acesso ao próprio forte."},
   {n:"Porta dos Fundos",cst:"—",ac:"Passiva",
    sab:"Todo sistema por que você passou lembra de você com carinho.",
    ef:"Você deixa portas dos fundos permanentes em sistemas já invadidos — pode reassumir Controle sobre qualquer instalação onde já esteve, instantaneamente e à distância, a qualquer momento da campanha."}
  ],
  [
   {n:"Onipresença Digital",cst:"—",ac:"Passiva",
    sab:"Não há mais 'sistema deles'. Há sistemas, e você está em todos.",
    ef:"Invade sistemas quase instantaneamente e sem teste na maioria dos casos, mantém Controle sobre múltiplas instalações ao mesmo tempo, e sua intrusão alcança até tecnologia anômala.",
    req:{nv:12}},
   {n:"Colapso",cst:"gasta todo o Controle (mínimo 6)",ac:"Ação · 1×/campanha",
    sab:"Você deu uma ordem. E tudo que eles construíram obedeceu, uma última vez, contra eles.",
    ef:"Queime todo o Controle para orquestrar o colapso total da infraestrutura de um inimigo de grande escala: defesas se voltam para dentro, sistemas se autodestroem, comunicações mentem, cofres se abrem.",
    req:{nv:12}}
  ]
 ]},
{n:"Artilheiro",s:"força bruta aplicada",
 regra:{n:"Cargas",ef:"Você monta e carrega Cargas — explosivos, sobrecargas, demolições — mantendo um estoque e posicionando-as com antecedência ou improvisando na hora. As Cargas atingem tudo na área, inclusive aliados mal posicionados, e fazem estrondo que denuncia sua posição."},
 medidor:{chave:"cargas",nome:"Cargas",min:0,tetos:[5,5,10,99],reset:"sessao"},
 st:[
  [
   {n:"Arsenal Explosivo",cst:"—",ac:"Passiva (+ preparo para reabastecer)",
    sab:"Você olha uma parede e já sabe quantos gramas ela pede.",
    ef:"Você nunca erra o cálculo básico de uma demolição sua, e improvisa explosivos de material comum com tempo. Reabastece no downtime."},
   {n:"Detonação Controlada",cst:"1 Carga",ac:"Ação",
    sab:"Precisão é só potência com boas maneiras.",
    ef:"Posicione e detone uma Carga com controle: abra uma parede/porta/obstáculo com precisão (sem soterrar quem você não quer), ou cause dano numa área pequena com efeito à escolha (empurrão, Caído, Atordoado pelo estrondo)."}
  ],
  [
   {n:"Sobrecarga",cst:"1 Carga",ac:"Ação",
    sab:"Toda máquina tem um limite. Você o apresenta a ela, violentamente.",
    ef:"Force qualquer coisa energizada ou mecânica a explodir — painel, motor, gerador, veículo, arma inimiga, dispositivo — causando dano em área ao redor do alvo."},
   {n:"Campo Minado",cst:"gasta Cargas",ac:"Ação (preparo)",
    sab:"Você decide, de antemão, quais pedaços do chão são fatais.",
    ef:"Posicione Cargas ocultas numa área; detonam quando você quiser (remotamente) ou quando um inimigo pisar/cruzar. Detectá-las: Percepção (9)."}
  ],
  [
   {n:"Demolição",cst:"gasta 3 Cargas",ac:"Ação · 1×/cena",
    sab:"Estruturas são só sugestões de permanência.",
    ef:"Teto de Cargas sobe para 10. Derrube uma estrutura inteira de forma controlada — parte de um prédio, ponte, teto, torre — sobre os inimigos ou para bloquear/abrir passagem."},
   {n:"Mestre Artificeiro",cst:"—",ac:"Passiva",
    sab:"Você tem, de fato, sempre a carga certa. Sempre.",
    ef:"Nunca fica sem Cargas no momento crítico, e suas detonações passam a ser cirúrgicas o bastante para poupar aliados mesmo em área."}
  ],
  [
   {n:"Força da Natureza",cst:"—",ac:"Passiva",
    sab:"Não é mais engenharia. É meteorologia.",
    ef:"Cargas praticamente ilimitadas. Explosões atingem escala devastadora — destruição comparável a artilharia pesada, derruba estruturas grandes num gesto — e você adiciona ou remove terreno, cobertura e obstáculos à vontade.",
    req:{nv:12}},
   {n:"Terra Arrasada",cst:"gasta todas as Cargas (mínimo 8)",ac:"Ação · 1×/campanha",
    sab:"Você aperta o botão. E onde havia um problema, passa a haver uma cratera.",
    ef:"Queime todo o arsenal para uma detonação de escala apocalíptica sobre uma área enorme: estruturas colapsam, o terreno é reformulado, e a oposição na área é destruída ou soterrada.",
    req:{nv:12}}
  ]
 ]}
]},

"Atirador":{f:"Você termina frases.",vida:2,comb:"fol",cv:2,tre:["Pontaria","Percepção","Furtividade"],profs:"armas de fogo leves, armas Restritas, manutenção de armas",
regra:{n:"Posição Exposta",ac:"Regra de Fardo",
 sab:"Sem cobertura, você troca a própria pele por precisão.",
 ef:"Ao atacar sem cobertura, escolha antes de rolar — Exposição Calculada: +2 de dano; inimigos têm +1 contra você até seu próximo turno. Na Mira de Todos (declare; fica imóvel): +3 de dano e o tiro ignora cobertura leve do alvo; inimigos têm +2 contra você. Atrás de cobertura, atira normal — seguro, sem bônus."},
base:[
 {n:"Mira Calma",cst:"—",ac:"Ação (dura até o disparo)",
  sab:"Você desacelera o mundo até sobrar só o alvo e a respiração.",
  ef:"Gaste a Ação mirando um alvo visível; o próximo disparo contra ele ganha +2. Se sofrer dano antes de atirar, teste Coragem (7) ou a mira se perde."},
 {n:"Sob Mira",cst:"—",ac:"Ação (segura o tiro até disparar ou o começo do seu próximo turno)",
  sab:"Você não atira. Ainda. Mas todo mundo sabe onde a sua luneta está apontada.",
  ef:"Escolha um alvo à vista e segure seu disparo sobre ele. Se ele fizer qualquer coisa ameaçadora antes do seu próximo turno — atacar, correr, sair da cobertura, conjurar — você atira primeiro, como Reação, e o teste dele sai com −2. Enquanto estiver Sob Mira, capangas evitam agir na sua linha; nomeados agem por conta e risco."},
 {n:"Recarga Instintiva",cst:"—",ac:"Passiva",
  sab:"A arma volta a estar pronta antes de você perceber que atirou.",
  ef:"Recarregar é Ação Livre fora de um ataque direto; sob fogo, recarrega como parte do Movimento. Você sempre sabe quantas balas restam — nas suas armas e, ouvindo, nas dos outros."}
],
esc:[
 {n:"Disparo Preciso",cst:"—",ac:"Ação · Req. Mira Calma · NV 6",
  sab:"Você não atira torcendo. Você atira sabendo.",
  ef:"Apenas no turno seguinte a Mira Calma. Parcial: dano +3. Total: dano +3 e escolha — derruba, desarma ou Sangrando. Crítico: contra alvo que nunca o viu, declare incapacitação (fora de combate, vivo) ou cause o dano máximo do acerto.",
  req:{nv:6,req:"Mira Calma"}},
 {n:"Tiro Perfurante",cst:"1 Fôlego",ac:"Gatilho · 1×/cena",
  sab:"Blindagem é uma sugestão. A bala discorda.",
  ef:"Seu ataque ignora a Absorção. Num Crítico, a bala atravessa: quem estiver na linha atrás do alvo sofre dano = margem."},
 {n:"Reposicionar",cst:"—",ac:"Ação Livre · 1×/cena",
  sab:"O tiro saiu; você já não está mais onde ele veio.",
  ef:"Após disparar, mova-se até Curto terminando em cobertura. Quem falhar em Percepção (7) perde sua posição."},
 {n:"Tiro de Aviso",cst:"—",ac:"Ação · 1×/cena",
  sab:"A próxima é na cabeça. Todo mundo entendeu.",
  ef:"Dispare de propósito para não acertar: capangas testam Coragem (7) ou recuam/congelam; nomeados ficam com −1 na próxima ação."},
 {n:"Domínio de Área",cst:"1 Fôlego",ac:"Ação",
  sab:"Aquele pedaço do mapa agora pertence à sua mira.",
  ef:"Varre uma zona Curta: até seu próximo turno, agir ali custa +2 de Limiar. Capangas testam Coragem (7) ou colam na cobertura e perdem a ação. Consome 1 carga extra."}
],
mae:[
{n:"Caçador",s:"o tiro único e perfeito",
 regra:{n:"Foco",ef:"Você acumula Foco (0–5, teto sobe para 8 no Ápice). Ganha 1 ao passar um turno sem atirar (respirar, observar, calcular) e 1 ao mirar um alvo com Ação. O Foco não some entre turnos — só quando você dispara, gastando todo o Foco acumulado de uma vez naquele tiro. Enquanto acumula Foco, sua Defesa cai −1 por ponto."},
 medidor:{chave:"foco",nome:"Foco",min:0,tetos:[5,5,5,8],reset:"cena"},
 st:[
  [
   {n:"Respirar",cst:"—",ac:"Ação (ou Ação Livre 1×/turno se imóvel)",
    sab:"Entre uma batida do coração e a outra, o mundo para.",
    ef:"Ganhe 1 de Foco e trave um alvo à vista. Cada ponto de Foco que você gastar no próximo disparo contra ele adiciona +2 de dano e +1 para acertar."},
   {n:"Leitura de Distância",cst:"—",ac:"Passiva",
    sab:"Vento, queda, distância. Números que os outros nem veem, você já corrigiu.",
    ef:"Você ignora todas as penalidades de distância, cobertura parcial e condições de tiro. Contra um alvo que não sabe que você está lá, seu primeiro disparo da cena gasta o Foco acumulado com efeito dobrado."}
  ],
  [
   {n:"Tiro Cirúrgico",cst:"gasta o Foco acumulado",ac:"Ação",
    sab:"Você não atira nele. Atira no que faz ele funcionar.",
    ef:"Ao disparar com Foco 3+, escolha o efeito além do dano: desarmar, aleijar (deslocamento a 0 e Sangrando), silenciar ([Foco] turnos) ou cegar. Ignora Absorção."},
   {n:"Ninho",cst:"—",ac:"Ação (estabelece posição)",
    sab:"Você escolheu este lugar por um motivo. Todos eles.",
    ef:"Estabeleça uma posição de tiro (dura enquanto você ficar). Nela: ganha Foco +1 extra por turno de espera, não pode ser detectado por quem não vencer Percepção (9) contra sua Furtividade, e tem cobertura total contra a primeira ameaça que o encontrar."}
  ],
  [
   {n:"Um Tiro, Uma Morte",cst:"gasta Foco 5",ac:"Ação · 1×/cena",
    sab:"A frase inteira em uma bala.",
    ef:"Ao disparar com Foco máximo (5), acerto automático, ignora Absorção e cobertura, dano máximo triplicado. Contra chefes, além do dano, aplica Atordoado e Sangrando."},
   {n:"Olho de Deus",cst:"—",ac:"Passiva",
    sab:"De onde você está, tudo é alcance.",
    ef:"Não há mais 'longe demais' — acerta qualquer alvo que consiga enxergar, a qualquer distância, e enxerga através de fumaça, folhagem e escuro. Tiros com Foco 3+ atravessam obstáculos leves."}
  ],
  [
   {n:"A Bala Já Saiu",cst:"—",ac:"Passiva",
    sab:"No instante em que você decide atirar, a coisa já está feita.",
    ef:"Teto de Foco sobe para 8. Uma vez por rodada, declare um disparo como inevitável: o tiro vai acertar no início do seu próximo turno não importa o que o alvo faça.",
    req:{nv:12}},
   {n:"Tiro Impossível",cst:"gasta 8 de Foco",ac:"Ação · 1×/campanha",
    sab:"Você faz o disparo que não deveria ser possível.",
    ef:"Gaste 8 de Foco para um tiro que desafia a realidade: um alvo que nunca viu mas sabe existir, um ricochete por [Juízo] alvos, ou uma bala que atinge um conceito tão bem quanto um corpo.",
    req:{nv:12}}
  ]
 ]},
{n:"Fuzileiro",s:"o volume de fogo e o controle de área",
 regra:{n:"Supressão",ef:"Você marca Zonas de Fogo — áreas Curto que mantém sob supressão enquanto tiver munição e linha de tiro; sustenta até [Juízo] Zonas ao mesmo tempo. Manter Zonas te prende ao volume de fogo: enquanto suprime, não pode se mover mais que um passo nem fazer tiros precisos."},
 medidor:{chave:"municao",nome:"Munição",min:0,tetos:[6,8,10,16],reset:"cena"},
 st:[
  [
   {n:"Abrir Fogo",cst:"2 Munição (+1 por turno mantida)",ac:"Ação",
    sab:"Não precisa acertar. Precisa que eles não consigam levantar a cabeça.",
    ef:"Estabeleça uma Zona de Fogo (Curto). Inimigos que entrem ou ajam nela sofrem 1 de dano e ficam com −2 em tudo; capangas testam Coragem (7) ou ficam presos na cobertura."},
   {n:"Pente Estendido",cst:"—",ac:"Passiva",
    sab:"Você carrega mais, atira mais, e para menos.",
    ef:"Sua capacidade de munição é muito maior (já refletida no teto); recarregar é Ação Livre 1×/turno mesmo em rajada."}
  ],
  [
   {n:"Fogo Cruzado",cst:"2 Munição",ac:"Ação · requer 2+ Zonas",
    sab:"Entre duas linhas de tiro não existe lugar seguro.",
    ef:"Um inimigo pego entre duas de suas Zonas fica Preso (não pode sair sem sofrer um tiro automático de dano cheio) e perde bônus de cobertura."},
   {n:"Rajada de Contenção",cst:"3 Munição",ac:"Reação",
    sab:"Alguém tentou avançar. Você respondeu com uma parede.",
    ef:"Quando um inimigo tenta atravessar ou sair de uma Zona sua, esvazie um pente para detê-lo: o movimento acaba na hora, sofre dano de rajada e testa contra ficar Caído."}
  ],
  [
   {n:"Terra de Ninguém",cst:"4 Munição (+2 por turno mantida)",ac:"Ação · 1×/cena",
    sab:"Deste ponto até aquele, o chão pertence às suas balas.",
    ef:"Transforme uma área Médio em Terra de Ninguém por [Juízo] turnos: nada se move ali sem sofrer dano por metro avançado, conjurações lentas são interrompidas, e todo inimigo dentro age por último."},
   {n:"Metralhar",cst:"3 Munição",ac:"Ação",
    sab:"Você para de escolher alvos. Escolhe direções.",
    ef:"Despeje fogo num arco: inimigos numa linha ou cone (Curto) sofrem dano e ficam Suprimidos (−2 e não podem reagir) até o próximo turno."}
  ],
  [
   {n:"Senhor do Campo",cst:"—",ac:"Passiva",
    sab:"A batalha inteira acontece dentro das regras que você escreveu com chumbo.",
    ef:"Sustenta Zonas ilimitadas e pode mantê-las mesmo se mover. Suas Zonas derrubam projéteis (flechas, mísseis, magias) que cruzem sua linha.",
    req:{nv:12}},
   {n:"Barragem",cst:"toda a Munição que tiver (mínimo 10)",ac:"Ação · 1×/campanha",
    sab:"Você chama todo o fogo que existe para um único lugar.",
    ef:"Queime toda a munição para uma barragem sobre uma área enorme: por uma cena inteira, dano massivo por turno, estruturas cedem, ninguém entra e sobrevive.",
    req:{nv:12}}
  ]
 ]},
{n:"Pistoleiro",s:"a velocidade e o gunplay próximo",
 regra:{n:"Momentum",ef:"Você acumula Momentum (0–5, teto sobe para 8 no Ápice) dentro de uma cena de ação. Ganha 1 a cada disparo certeiro, ao derrubar um inimigo, ou ao se mover e atirar no mesmo turno. Se passar um turno inteiro sem atirar nem se mover, o Momentum zera. A partir de Momentum 3, −1 na Defesa."},
 medidor:{chave:"momentum",nome:"Momentum",min:0,tetos:[5,5,5,8],reset:"cena"},
 st:[
  [
   {n:"Saque",cst:"—",ac:"Passiva",
    sab:"A arma já está na sua mão antes de você decidir sacá-la.",
    ef:"Sacar, trocar de arma ou recarregar nunca gasta ação. Você sempre age primeiro na primeira rodada de um confronto de curta distância. Ao se mover e atirar no mesmo turno, ganhe 1 de Momentum extra."},
   {n:"Fogo Rápido",cst:"1 Momentum",ac:"Ação",
    sab:"Um alvo é pouco. Você tem balas para todos.",
    ef:"Dispare em dois alvos diferentes (ou dois tiros no mesmo), cada um com dano normal. Cada acerto devolve Momentum."}
  ],
  [
   {n:"Giro",cst:"2 Momentum",ac:"Ação",
    sab:"Você roda, e quando para, todos ao seu redor já caíram.",
    ef:"Atire em todos os inimigos em Curto ao seu redor, um tiro cada. Se algum cair, o Momentum gasto volta."},
   {n:"Gatilho Nervoso",cst:"1 Momentum",ac:"Reação",
    sab:"Alguém se mexeu. Você já atirou.",
    ef:"Quando um inimigo em Curto se move, saca, ou age contra você ou um aliado, atire nele primeiro — se causar dano, a ação dele sai com −2 ou falha."}
  ],
  [
   {n:"Dança do Revólver",cst:"Momentum sustentado (3+)",ac:"Passiva",
    sab:"Você não anda pela luta. Você a coreografa.",
    ef:"Com Momentum 3+, mover-se não provoca reações, você atira entre movimentos, e cada inimigo que erra um ataque contra você abre a guarda para seu próximo tiro (dano dobrado)."},
   {n:"Recarga no Sangue",cst:"—",ac:"Gatilho",
    sab:"Cada corpo no chão é uma desculpa para continuar.",
    ef:"Ao reduzir um inimigo a 0, recupere munição cheia instantaneamente, ganhe 2 de Momentum, e seu próximo tiro nesta rodada ignora Absorção."}
  ],
  [
   {n:"Tempo de Pólvora",cst:"—",ac:"Passiva",
    sab:"Para você, o segundo entre o gatilho e o impacto é longo o bastante para viver dentro dele.",
    ef:"Teto de Momentum sobe para 8. Com Momentum 5+, ganha uma Ação extra de disparo por turno, reage a quantos gatilhos quiser (gastando Momentum), e abate projéteis dirigidos a você no ar.",
    req:{nv:12}},
   {n:"Seis Balas, Seis Mortes",cst:"todo o Momentum (mínimo 6)",ac:"Ação · 1×/campanha",
    sab:"Você mira em tudo de uma vez.",
    ef:"Queime todo o Momentum (6+) para designar até 6 alvos visíveis e disparar em todos simultaneamente, acerto automático e dano máximo, ignorando cobertura e Absorção. Alvos comuns morrem; nomeados ficam Atordoados, Sangrando e desarmados.",
    req:{nv:12}}
  ]
 ]}
]},

"Sobrevivente":{f:"O mato só mata quem não escuta.",vida:2,comb:"fol",cv:2,tre:["Sobrevivência","Atletismo","Percepção"],profs:"armas Restritas (caça), navegação, veículos comuns",
base:[
 {n:"Instinto de Presa",cst:"—",ac:"Reação · 1×/cena",
  sab:"Você sentiu o silêncio errado antes de entender o porquê.",
  ef:"Um instante antes do perigo se manifestar, o mestre avisa que algo vem e de onde. Você (e quem alertar com um gesto) não pode ser surpreendido nesse momento, e você age primeiro na primeira rodada."},
 {n:"Dono do Lugar",cst:"—",ac:"Passiva",
  sab:"O mato não te obedece. Mas te respeita — e te conta quem manda.",
  ef:"Terreno natural difícil (mato, lama, pedra solta) não reduz seu deslocamento; +1 contra clima, fome, sede e exaustão; remove Exausto com metade do descanso. Ao entrar numa área nova, o mestre diz se algo grande ou perigoso mora ali."},
 {n:"Vida na Estrada",cst:"—",ac:"Ação (tempo de busca)",
  sab:"Onde os outros veem fim do caminho, você vê o que ainda dá pra usar.",
  ef:"Sobrevivência (6 ambiente generoso / 8 hostil). Parcial: o básico para um — água, abrigo precário, rota. Total: para o grupo, com conforto mínimo. Crítico: + algo valioso (atalho, esconderijo, recurso raro). Funciona até em ruína urbana."}
],
esc:[
 {n:"Rastrear",cst:"—",ac:"Ação contínua",
  sab:"O chão é um jornal. Quase ninguém sabe ler.",
  ef:"Sobrevivência (6 fresca / 8 fria / 10 apagada). Parcial: direção e quantos. Total: + idade da trilha, estado deles e um detalhe. Crítico: + algo que não queriam deixar para trás. Rastros anômalos: Limiar +1, e entendê-los pode custar Lucidez."},
 {n:"Armadilheiro",cst:"1 Fôlego (só na montagem rápida em combate)",ac:"Ação (montagem: 1 cena; rápida em combate: Ação + 1 Fôlego)",
  sab:"O ambiente já tem tudo que você precisa pra machucar alguém.",
  ef:"Com material do ambiente, monte: laço (prende; Atletismo 8 solta) · fojo (1d4 + Caído) · alarme natural · espinhos (1 dano + Sangrando ao atravessar). Detectar uma armadilha sua: Percepção (8)."},
 {n:"Faro do Anômalo",cst:"—",ac:"Passiva · NV 4 · Ruído ≥1",
  sab:"Cheiro errado. Arrepio na direção certa. Você sente antes de ver.",
  ef:"Sente quando lugar, criatura ou objeto é não-natural — direcional, alcance Curto; concentrando (Ação): Médio. Não diz o quê. Diz que e onde.",
  req:{nv:4,ruido:1}},
 {n:"Resistência Sobrenatural",cst:"—",ac:"Reação · 1×/sessão · NV 6",
  sab:"O impossível tentou te derrubar. Escorreu.",
  ef:"Ignore completamente um efeito ambiental, tóxico ou de exaustão que o incapacitaria — inclusive anômalo (miasma, frio impossível, esporos).",
  req:{nv:6}},
 {n:"Água Limpa",cst:"—",ac:"Passiva",
  sab:"O que mata devagar também deixa rastro. Você aprendeu a ver.",
  ef:"Identifica à vista água ou comida estragada, envenenada ou errada; com tempo, purifica o purificável sem teste."},
 {n:"Nó Certo",cst:"—",ac:"Passiva",
  sab:"O que você amarra, fica amarrado.",
  ef:"Cordas, laços e amarras suas não falham; escapar delas exige teste (9). Escalar com corda sua dá +1 a todos."}
],
mae:[
{n:"Guardião do Ermo",s:"o terreno como aliado",
 regra:{n:"Preparar o Campo",ef:"Se você teve qualquer tempo num local antes do confronto (minutos bastam), você o prepara: acumula fichas de Terreno (1 por ação de preparo — armar, estudar, posicionar, esconder). Durante o confronto, gasta Terreno para acionar o que o lugar oferece: armadilhas, cobertura, rotas, perigos naturais. Longe do campo preparado, você é um Sobrevivente comum, sem Terreno para gastar."},
 medidor:{chave:"terreno",nome:"Terreno",min:0,tetos:[5,5,5,8],reset:"cena"},
 st:[
  [
   {n:"Leitura do Campo",cst:"—",ac:"Ação (ao chegar num local)",
    sab:"Num relance, você vê tudo que o lugar pode fazer por você — e contra eles.",
    ef:"Ao ter tempo num local, ganhe 2 de Terreno e o mestre aponta: rotas, pontos de emboscada, perigos naturais e a melhor posição defensiva. Você nunca é surpreendido num lugar que teve tempo de ler."},
   {n:"Armadilhas",cst:"gasta 1 Terreno por armadilha",ac:"Ação (preparo) / Gatilho (dispara)",
    sab:"O lugar já tinha os dentes. Você só os posicionou.",
    ef:"Monte armadilhas com o ambiente (laço, fojo, pedras, espinhos, alarme). Quando um inimigo aciona: dano + uma condição do tipo (Caído, Preso, Lento, Sangrando). Detectá-las: Percepção (8)."}
  ],
  [
   {n:"O Lugar é Meu",cst:"gasta 1 Terreno",ac:"Reação",
    sab:"Você conhece cada pedra. Elas trabalham no seu horário.",
    ef:"Use o campo a seu favor: aparecer de uma cobertura que o inimigo não sabia existir (ataque com Vantagem), sumir numa rota que só você conhece (fica oculto), ou empurrar um inimigo para um perigo natural que você mapeou."},
   {n:"Emboscada",cst:"gasta 3 Terreno",ac:"Ação · 1×/confronto (abre a luta)",
    sab:"O primeiro instante da luta já foi vencido antes de ela começar.",
    ef:"Se você preparou o campo e o inimigo entrou sem saber: todos os seus aliados agem primeiro, com Vantagem, e toda armadilha montada dispara de uma vez. A primeira rodada inteira é sua."}
  ],
  [
   {n:"Fortaleza Natural",cst:"—",ac:"Passiva",
    sab:"Onde você fica de pé, vira posição fortificada, mesmo que seja só mato e pedra.",
    ef:"Teto de Terreno sobe para 8. Qualquer lugar onde passe uma cena preparando vira Fortaleza: aliados dentro ganham +2 na Defesa e não podem ser surpreendidos, você regenera Terreno a cada turno lá dentro, e inimigos tratam o espaço como terreno difícil e hostil."},
   {n:"O Ermo Obedece",cst:"gasta 5 Terreno",ac:"Ação · 1×/cena",
    sab:"Você pede, e a terra faz.",
    ef:"Comande o ambiente num gesto de escala: um desmoronamento numa passagem, uma enchente que arrasta inimigos, um incêndio que fecha metade do campo, o teto de uma ruína cedendo sobre quem você escolher."}
  ],
  [
   {n:"Senhor do Lugar",cst:"—",ac:"Passiva",
    sab:"Não existe mais 'campo alheio'. Onde você está, o lugar é seu.",
    ef:"Você prepara o campo instantaneamente — chegar já conta como tê-lo preparado (ganha Terreno máximo ao entrar em qualquer lugar). Suas armadilhas e comandos funcionam mesmo em ambientes urbanos ou artificiais.",
    req:{nv:12}},
   {n:"Terra Arrasada",cst:"gasta todo o Terreno (mínimo 6)",ac:"Ação · 1×/campanha",
    sab:"Se você não pode vencer aqui, ninguém vence. O lugar inteiro vai embora junto.",
    ef:"Queime todo o Terreno para transformar uma região numa armadilha apocalíptica que você detona de uma vez: o local desmorona, inunda, queima, engole. Tudo que não for seu aliado sofre dano massivo e é preso, soterrado ou arrastado; a geografia muda para sempre.",
    req:{nv:12}}
  ]
 ]},
{n:"Catador",s:"nada se perde",
 regra:{n:"Ferro-Velho",ef:"O mundo inteiro é uma despensa de peças. Você mantém um estoque de Sucata — fichas abstratas de material recolhido (vasculhar um corpo, uma ruína, destroços, uma carcaça rende 1–3 cada). Gasta Sucata para improvisar na hora o que precisar. Todo item improvisado é instável: o mestre pode pedir um teste ao usá-lo; numa falha, quebra no pior momento, sai mais fraco, ou tem um efeito colateral grotesco."},
 medidor:{chave:"sucata",nome:"Sucata",min:0,tetos:[10,10,15,99],reset:"sessao"},
 st:[
  [
   {n:"Vasculhar",cst:"—",ac:"Ação",
    sab:"Onde os outros veem um cadáver, você vê um kit de primeiros socorros, três balas e um pé de cabra.",
    ef:"Revistar qualquer fonte de material (corpo, ruína, destroço, lixo, carcaça) rende 1–3 de Sucata e, às vezes, um item concreto útil. Você sempre acha mais do que deveria haver ali."},
   {n:"Improviso",cst:"gasta Sucata (1–3 conforme a complexidade)",ac:"Ação",
    sab:"Dá um tempo. Eu faço um.",
    ef:"Monte na hora um item improvisado: 1 = simples (tocha, corda, curativo, gazua); 2 = útil (arma branca, ferramenta específica, remédio caseiro, bomba de fumaça); 3 = complexo (explosivo, antídoto, dispositivo). Some depois de usado ou ao fim da cena."}
  ],
  [
   {n:"Remendo de Guerra",cst:"gasta 2 Sucata",ac:"Ação (ou Reação)",
    sab:"Nada está quebrado demais pra durar mais cinco minutos.",
    ef:"Conserte na hora algo quebrado (arma, veículo, porta, equipamento) ou remende um aliado ferido (cura improvisada: 1d4 + remove Sangrando, mas deixa uma 'gambiarra' no corpo que dói). Temporário e feio, mas aguenta."},
   {n:"Arsenal de Lata",cst:"gasta Sucata",ac:"Ação",
    sab:"Você abre a mochila e ela tem, de algum jeito, exatamente o que faltava.",
    ef:"Declare que já tinha improvisado de antemão um item específico (dentro do plausível) e gaste a Sucata correspondente. 1×/cena, esse item vem estável (sem o risco da instabilidade)."}
  ],
  [
   {n:"Engenhoca",cst:"gasta 4 Sucata",ac:"Ação (preparo curto)",
    sab:"Você não faz uma ferramenta. Faz uma máquina.",
    ef:"Teto de Sucata sobe para 15. Construa dispositivos de verdade: uma torreta de sucata que atira sozinha por [Juízo] turnos, um drone de reconhecimento, uma armadilha automática, um gerador, um veículo remendado. A engenhoca age por conta própria depois de montada."},
   {n:"Tudo é Arma",cst:"—",ac:"Passiva",
    sab:"Na sua mão, um garfo é uma faca, um cano é um rifle, e um relógio é uma bomba.",
    ef:"Você nunca está desarmado nem sem ferramenta: qualquer objeto vira o que você precisar, sem gastar Sucata para o básico. Improvisos simples (1 de Sucata) deixam de ser instáveis."}
  ],
  [
   {n:"Alquimista do Lixo",cst:"—",ac:"Passiva",
    sab:"A diferença entre entulho e milagre é só quem está montando.",
    ef:"Teto de Sucata praticamente ilimitado (recolhe de tudo, o tempo todo). Improvisos complexos deixam de ser instáveis por padrão, e você pode improvisar coisas quase-mágicas — um remédio para o incurável, uma arma contra o anômalo — pagando Sucata alta.",
    req:{nv:12}},
   {n:"A Máquina do Fim do Mundo",cst:"gasta toda a Sucata (mínimo 10)",ac:"Ação · 1×/campanha (preparo de uma cena)",
    sab:"Você junta tudo que já catou na vida numa única coisa. E ela resolve o problema. Todo ele.",
    ef:"Queime todo o estoque para construir um dispositivo definitivo do tamanho do problema: uma bomba que arrasa uma fortaleza, um veículo que atravessa o impossível, um aparelho que neutraliza uma ameaça anômala inteira. Funciona uma vez, gloriosamente — depois vira sucata de novo.",
    req:{nv:12}}
  ]
 ]},
{n:"Andarilho",s:"a mobilidade impossível",
 regra:{n:"O Caminho + Impulso",ef:"Você nunca é atrasado por terreno (nenhum tipo), e sempre que se move de verdade num turno (mais que um passo) ganha Impulso: +1 acumulativo (até o teto) em Defesa e testes físicos, que dura enquanto continuar em movimento. Parar zera o Impulso. Manter Impulso alto significa nunca se entrincheirar nem descansar na ação; travessias extremas custam Fôlego, e falhar numa pode custar Vida."},
 medidor:{chave:"impulso",nome:"Impulso",min:0,tetos:[3,3,5,5],reset:"cena"},
 st:[
  [
   {n:"Passo que Não Para",cst:"—",ac:"Passiva",
    sab:"Lama, gelo, escombro, ladeira. Para os seus pés, é tudo chão plano.",
    ef:"Nenhum terreno reduz seu deslocamento; você escala, nada, salta e se equilibra sem teste no que barraria outros. Ganha Impulso ao se mover. É sempre o primeiro a chegar e o último a ser alcançado."},
   {n:"Atalho Impossível",cst:"1 Fôlego",ac:"Ação",
    sab:"Existe um caminho. Sempre existe. Você só precisa querer passar por ele.",
    ef:"Atravesse um obstáculo que deveria ser intransponível numa única ação — uma parede a escalar, um vão a saltar, uma correnteza, uma fenda. Você e quem estiver colado em você passam. O mestre pode pedir teste em travessias extremas."}
  ],
  [
   {n:"Vento",cst:"—",ac:"Ação",
    sab:"Você não corre pelo campo. Você aparece do outro lado dele.",
    ef:"Mova-se o dobro do seu deslocamento e, se terminar adjacente a um inimigo, seu primeiro ataque tem Vantagem. Com Impulso 3, esse movimento não provoca reações de ninguém."},
   {n:"Ninguém me Prende",cst:"—",ac:"Reação",
    sab:"Corda, cela, agarrão, atolamento. Você já saiu antes de perceberem que te pegaram.",
    ef:"Ignore ou escape automaticamente de qualquer coisa que tente restringir seu movimento — Agarrado, Preso, amarras, terreno que prende, uma cela improvisada. 1×/cena, tira um aliado adjacente junto."}
  ],
  [
   {n:"Levar o Grupo",cst:"—",ac:"Passiva",
    sab:"Você não escapa sozinho. Você abre o caminho e puxa todo mundo por ele.",
    ef:"Aliados que te seguem ignoram terreno e restrições como você, e 1×/cena você conduz o grupo inteiro por um Atalho Impossível de uma vez (uma fuga por onde ninguém os seguiria, uma travessia coletiva do intransponível)."},
   {n:"Incansável",cst:"—",ac:"Passiva",
    sab:"O corpo devia ter desistido há muito tempo. Ele não recebeu o aviso.",
    ef:"Teto de Impulso sobe para 5. Você é imune a Exausto e a efeitos que dependam de te deter (Lento, raízes, redução de deslocamento), e com Impulso 3+, reduz todo dano recebido em [Impulso]."}
  ],
  [
   {n:"Onipresente",cst:"—",ac:"Passiva",
    sab:"Perguntar 'onde ele está' não faz mais sentido. Ele está indo.",
    ef:"Com Impulso máximo, você se move rápido o bastante para agir, reagir e se reposicionar múltiplas vezes por rodada, atravessar o campo inteiro entre ações, e nenhum ataque de área ou cerco te alcança (você nunca está parado onde ele cai).",
    req:{nv:12}},
   {n:"A Jornada Impossível",cst:"—",ac:"Ação · 1×/campanha",
    sab:"Existe um lugar aonde ninguém pode chegar. Você chega. E leva quem precisar.",
    ef:"Empreenda uma travessia impossível de qualquer escala: alcançar um lugar inacessível (o fundo de um abismo, o coração de uma fortaleza selada, o outro lado de uma barreira anômala), levando o grupo junto e chegando a tempo, não importa a distância ou o obstáculo. O mestre não pode dizer 'vocês não conseguem chegar lá'.",
    req:{nv:12}}
  ]
 ]}
]},

"Operador":{f:"Você não existe. É exatamente isso que te torna útil.",vida:2,comb:"fol",cv:2,tre:["Furtividade","Pilotagem","Enganação"],profs:"armas de fogo leves, veículos especiais, sistemas de segurança",
base:[
 {n:"Disfarce",cst:"—",ac:"Ação (preparo: minutos a horas)",
  sab:"Você não engana ninguém. Você simplesmente é outra pessoa.",
  ef:"Com preparo, assume identidade crível; só rola Enganação quando alguém tem motivo para duvidar. Parcial: passa, mas fica um fio solto. Total: passa limpo. Crítico: alguém o confunde com exatamente quem você queria ser. Sem disfarce ativo: +1 para não ser reconhecido."},
 {n:"Olho Periférico",cst:"—",ac:"Ação Livre · 1×/cena",
  sab:"Antes de sentar, você já contou as saídas.",
  ef:"Ao entrar num lugar, o mestre lista: saídas, câmeras, guardas e a ameaça mais imediata. Se o quadro mudar depois, você nota primeiro."},
 {n:"Fantasma Operacional",cst:"—",ac:"Passiva",
  sab:"Ninguém te prende, ninguém te segue sem você saber, e você sente a hora que o plano vira.",
  ef:"+1 em Furtividade e invasão de locais controlados; +1 contra surpresa; algemas, cordas e fechaduras simples não o seguram (escapa com tempo, sem teste); sente quando é seguido ou observado (Intuição 6 confirma e localiza); e o mestre te avisa uma rodada antes de uma complicação estourar."}
],
esc:[
 {n:"Eliminação Silenciosa",cst:"—",ac:"Ação · alvo desprevenido adjacente",
  sab:"Um som só. E nem esse, se você fizer certo.",
  ef:"Briga ou Mãos Hábeis vs defesa. Parcial: incapacita, mas há ruído ou rastro. Total: silêncio — escolha apagado ou morto. Crítico: silêncio total e você arruma a cena (ganha tempo antes da descoberta)."},
 {n:"Identidade Falsa",cst:"—",ac:"Downtime · Req. Disfarce",
  sab:"Ela tem nome, documento e passado. Só não tem alma.",
  ef:"Mantém até 2 identidades documentadas que passam em verificações comuns. Verificação profunda exige teste do verificador contra 9. Queimou uma? Downtime para recriar.",
  req:{req:"Disfarce"}},
 {n:"Mãos Limpas",cst:"—",ac:"1×/sessão · NV 8",
  sab:"Você esteve lá. Só que ninguém consegue provar — nem lembrar direito.",
  ef:"Após uma cena, apaga sua presença: testemunhas lembram vagamente, registros somem, câmeras falharam. Não apaga as consequências. Apaga você delas.",
  req:{nv:8}},
 {n:"Protocolo de Fuga",cst:"—",ac:"1×/sessão · NV 6",
  sab:"A rota já estava pronta antes de a coisa dar errado.",
  ef:"Num cerco, declare a rota que já estava preparada. O grupo escapa da cena imediata; o mestre define o custo — o que fica para trás, quem viu.",
  req:{nv:6}},
 {n:"Extração",cst:"1 Fôlego",ac:"Ação",
  sab:"Tirar gente da linha de fogo é ofício.",
  ef:"Agarra um aliado adjacente e move o deslocamento total com ele, sem provocar reações."},
 {n:"Queima de Arquivo",cst:"—",ac:"Ação (downtime curto)",
  sab:"O papel some. A foto some. Você faz a memória do sistema falhar.",
  ef:"Apaga ou corrompe um registro específico sobre alguém: papel, foto, ficha, fita."}
],
mae:[
{n:"Fantasma",s:"a identidade como recurso",
 regra:{n:"Fachadas",ef:"Você não improvisa quem é; você tem um guarda-roupa de pessoas. Mantém um conjunto de Fachadas — identidades construídas, cada uma com um nível de Solidez (1 a 5). Solidez sobe com preparação e cai quando é testada e quase pega. Vestir uma Fachada é Ação Livre; enquanto a veste, você é aquela pessoa para todos os efeitos sociais. Queimar uma Fachada de Solidez 3+ testa contra perder 1 de Lucidez — viver como tanta gente diferente corrói a noção de quem você era."},
 medidor:{chave:"fachadas",nome:"Fachadas",min:0,tetos:[3,4,5,99],reset:"permanente"},
 st:[
  [
   {n:"Guarda-Roupa",cst:"—",ac:"Passiva (+ Downtime para construir)",
    sab:"Cada pessoa que você inventa é real o bastante para outra pessoa acreditar.",
    ef:"Construa Fachadas no downtime — cada uma com nome, história, documentos e Solidez inicial 2 (ou 3 com preparo caprichado). Vesti-las é Ação Livre. Numa Fachada, você não rola Enganação a menos que alguém tenha motivo concreto para duvidar."},
   {n:"Ler a Sala",cst:"—",ac:"Ação Livre · 1×/cena",
    sab:"Antes de decidir quem ser, você descobre quem eles precisam que você seja.",
    ef:"Ao observar um grupo ou pessoa, o mestre diz que tipo de pessoa aquele ambiente confia por instinto. Se você tiver uma Fachada que encaixe, ela ganha +1 de Solidez temporária naquela cena."}
  ],
  [
   {n:"Vestir Mais Fundo",cst:"—",ac:"Ação (uma cena de imersão)",
    sab:"Você não finge o sotaque. Você passa a sonhar nele.",
    ef:"Eleve a Solidez de uma Fachada em +1 (até 5). Numa Fachada de Solidez 4+, até íntimos do impersonado testam contra 9 para notar algo errado, e você extrai um segredo por cena de uma organização infiltrada sem suspeita."},
   {n:"Troca Rápida",cst:"—",ac:"Ação",
    sab:"Um casaco vira outro. A postura muda. Quem estava aqui já não está.",
    ef:"Troque de Fachada no meio de uma cena, na frente das pessoas, sem que percebam a transição. Reconectar essas figuras entre si exige Percepção (10) de quem tentar."}
  ],
  [
   {n:"Agente Duplo",cst:"—",ac:"1×/arco",
    sab:"Você não se infiltrou agora. Você já estava dentro. Sempre esteve.",
    ef:"Revele retroativamente que uma de suas Fachadas esteve infiltrada num lugar/grupo o tempo todo — e que você já plantou, copiou ou sabotou algo relevante durante esse período (dentro do plausível, definido com o mestre)."},
   {n:"Sou Quem Eu Quiser",cst:"—",ac:"Ação (preparo: uma cena)",
    sab:"Não uma pessoa como você. A pessoa. Exata.",
    ef:"Assuma a identidade de um indivíduo específico e real por uma cena — rosto, voz, assinatura, trejeitos (Fachada temporária de Solidez 5). Apenas os mais íntimos testam Intuição (9), uma vez, para sentir que 'há algo estranho hoje'."}
  ],
  [
   {n:"Ninguém Real",cst:"—",ac:"Passiva",
    sab:"Pergunte a dez pessoas quem você é. Terá dez respostas. Nenhuma verdadeira.",
    ef:"Não existe mais prova estável da sua identidade real: fotos saem 'não parecidas', registros se contradizem, biometria falha. Até meios sobrenaturais têm Desvantagem. Fachadas ilimitadas, e queimar uma não custa mais Lucidez — você já aceitou que não há um 'você' original a proteger.",
    req:{nv:12}},
   {n:"O Homem de Mil Faces",cst:"—",ac:"Ação · 1×/campanha",
    sab:"Por um dia, você pode ser todos ao mesmo tempo.",
    ef:"Orquestre uma operação em que você é várias pessoas simultaneamente aos olhos do mundo — em salas diferentes, para grupos diferentes, no mesmo período, cada Fachada com álibi e ações próprias. O mestre trata como se houvesse múltiplos de você operando em paralelo por uma cena estendida ou um dia inteiro.",
    req:{nv:12}}
  ]
 ]},
{n:"Lâmina",s:"o abate cirúrgico",
 regra:{n:"Preparação",ef:"O assassino não vence na hora. Vence antes. Você acumula fichas de Preparação montando o abate antes do golpe: estudar o alvo, isolá-lo, aplicar veneno, posicionar-se. Cada ação de setup rende 1 Preparação sobre um alvo específico. O golpe gasta a Preparação toda de uma vez. A Preparação é frágil: só existe enquanto o alvo não sabe que é alvo — se ele te detecta, é alertado, ou vira combate aberto antes do golpe, toda a Preparação sobre ele evapora."},
 medidor:{chave:"preparacao",nome:"Preparação",min:0,tetos:[5,5,5,8],reset:"cena"},
 st:[
  [
   {n:"Estudar a Presa",cst:"—",ac:"Ação (setup)",
    sab:"Rotina, ponto cego, o momento em que ele baixa a guarda. Você anota tudo.",
    ef:"Observe um alvo e ganhe 1 Preparação sobre ele; o mestre revela uma vulnerabilidade explorável. Ações furtivas contra esse alvo (envenenar, sabotar, aproximar-se) rendem Preparação adicional."},
   {n:"Golpe Furtivo",cst:"—",ac:"Passiva",
    sab:"Contra quem não te espera, você não erra o lugar.",
    ef:"+2 de dano contra alvos desprevenidos ou incapazes de reagir, e cada ponto de Preparação sobre o alvo adiciona +1 de dano contra ele. Furtividade não reduz seu deslocamento; vigilância casual não rola contra você, só atenção ativa."}
  ],
  [
   {n:"Toxinas",cst:"—",ac:"Ação (aplicar; 3 doses por preparo)",
    sab:"A morte já está no corpo dele. Só falta você dizer quando.",
    ef:"Aplique um veneno preparado. No acerto ou ingestão, o alvo testa Resistência (8) ou sofre, à escolha: Sangrando persistente, Lento, Paralisia parcial, ou −1 cumulativo por turno. Aplicar veneno rende +1 Preparação. Venenos podem ser montados para agir depois."},
   {n:"Eliminação Cirúrgica",cst:"gasta Preparação",ac:"Ação",
    sab:"Todo o trabalho, num só movimento.",
    ef:"Desfira o golpe gastando a Preparação. 1–2: dano massivo, ignora Absorção. 3–4: o acima + Resistência (Limiar = Preparação) ou incapacita. 5: abate automático contra comuns e a maioria dos nomeados; contra chefes, dano catastrófico + Atordoado + Sangrando."}
  ],
  [
   {n:"Janela",cst:"—",ac:"Passiva",
    sab:"Existe um segundo em que ele está sozinho, distraído e ao seu alcance. Você sempre o encontra.",
    ef:"1×/cena, o mestre é obrigado a te apontar uma 'janela' — um momento em que um alvo fica isolado e vulnerável. Se você agir nela, o golpe conta com +2 de Preparação de graça."},
   {n:"Sem Rastro",cst:"—",ac:"Reação (após um abate)",
    sab:"O corpo, o som, a testemunha, a pista. Tudo resolvido antes de alguém pensar em procurar.",
    ef:"Ao concluir um abate, apague-o: sem ruído, sem rastro imediato, e você já não está mais ali. A descoberta acontece muito depois, e a investigação começa fria. Contra o sobrenatural que 'sente' mortes, você abafa até isso por uma cena."}
  ],
  [
   {n:"Morte Anunciada",cst:"—",ac:"Passiva",
    sab:"A partir do momento em que você decide que alguém vai morrer, é só questão de quando.",
    ef:"Teto de Preparação sobe para 8, e você mantém Preparação sobre vários alvos ao mesmo tempo. A Preparação não evapora mais só porque ele te detectou uma vez — agora só some se ele escapar completamente do seu alcance por uma cena inteira.",
    req:{nv:12}},
   {n:"Sentença",cst:"gasta 8 de Preparação",ac:"Ação · 1×/campanha",
    sab:"Você pronuncia o nome. E o mundo executa a sentença que você preparou a vida inteira.",
    ef:"Contra um único alvo sobre o qual montou Preparação 8, execute o abate definitivo: não há teste, defesa, ou escape, não importa o poder ou proteção do alvo — se você o alcança, ele morre, agora, do jeito que você planejou.",
    req:{nv:12}}
  ]
 ]},
{n:"Titereiro",s:"a manipulação de pessoas",
 regra:{n:"Ganchos",ef:"Você não move as pessoas. Você planta as razões para elas se moverem sozinhas. Cada Gancho é uma alavanca instalada numa pessoa ou organização: um favor devido, um medo semeado, uma crença falsa, um segredo, um agente seu. Plantar leva tempo e interação; depois você puxa o Gancho para fazê-los agir como quer, sem aparecer. Puxar forte demais faz a pessoa perceber que foi usada, virando um inimigo que sabe do seu jogo."},
 medidor:{chave:"ganchos",nome:"Ganchos",min:0,tetos:[5,5,10,99],reset:"permanente"},
 st:[
  [
   {n:"Plantar Gancho",cst:"—",ac:"Ação (interação social / downtime)",
    sab:"Uma frase na hora certa. Um favor pequeno. Uma mentira que ninguém checa. Sementes.",
    ef:"Instale um Gancho numa pessoa ou grupo com quem interagiu — favor devido, medo plantado, crença falsa, ou segredo em mãos. O mestre diz que tipo de ação aquele Gancho consegue motivar. Ficam guardados até você puxá-los."},
   {n:"Boa Impressão",cst:"—",ac:"Passiva",
    sab:"Ninguém desconfia de quem parece inofensivo, útil e por perto.",
    ef:"As pessoas subestimam suas intenções por padrão. +1 para plantar Ganchos sem levantar suspeita, e ninguém associa eventos convenientes a você sem prova concreta."}
  ],
  [
   {n:"Puxar o Gancho",cst:"gasta 1 Gancho",ac:"Ação Livre (mesmo à distância / fora de cena)",
    sab:"Você não pede. Você aciona o que já estava lá.",
    ef:"Ative um Gancho: a pessoa/grupo age como o Gancho permite — te avisa, abre uma porta, atrasa um inimigo, entrega informação, cria distração, obedece uma ordem plausível. Acontece mesmo que você não esteja presente. Um Gancho pequeno pode não se gastar."},
   {n:"Boato",cst:"—",ac:"Ação (uma cena para se espalhar)",
    sab:"Você diz uma coisa para uma pessoa. Em dois dias, uma cidade acredita.",
    ef:"Solte uma informação (verdadeira ou falsa) na rede certa e ela se propaga sozinha, ganhando credibilidade. Pode virar um Gancho coletivo sobre um grupo inteiro. Rastrear a origem até você exige esforço investigativo sério."}
  ],
  [
   {n:"Rede",cst:"—",ac:"Passiva",
    sab:"Você não tem contatos. Você tem um organismo, e cada célula deve algo a você.",
    ef:"Teto de Ganchos sobe muito, e Ganchos podem ser plantados através de outros Ganchos — um agente seu planta por você, à distância, em pessoas que você nunca conheceu. 1×/sessão, declare que 'alguém que te deve' está exatamente onde você precisa."},
   {n:"Guerra Psicológica",cst:"gasta 2 Ganchos",ac:"Ação (campanha de pressão)",
    sab:"Você não ataca a pessoa. Ataca a confiança dela em tudo ao redor.",
    ef:"Contra um alvo importante, desestabilize-o por dentro: aliados dele duvidam, decisões saem erradas por informação envenenada, a paranoia se instala. O alvo sofre penalidades crescentes em seus planos e pode ser levado a erros graves — sem saber que foi você."}
  ],
  [
   {n:"Eminência Parda",cst:"—",ac:"Passiva",
    sab:"Reis acham que reinam. Você os deixa pensar assim.",
    ef:"Seus Ganchos alcançam qualquer nível de poder. Puxar Ganchos raramente os gasta agora (sua influência é estrutural), e você pode ter Ganchos plantados em alguém através de camadas de intermediários, tornando quase impossível traçar a manipulação de volta.",
    req:{nv:12}},
   {n:"O Mundo é Meu Títere",cst:"gasta todos os Ganchos (mínimo 5)",ac:"Ação · 1×/campanha",
    sab:"Um gesto. E tudo que você plantou, por anos, acontece de uma vez, na ordem exata.",
    ef:"Queime toda a teia (5+) para orquestrar um acontecimento de escala histórica — uma revolução, a queda de uma organização, a coroação ou destruição de uma figura. Cada pessoa que te devia, cada boato, cada crença dispara na sequência perfeita, e o mundo muda de forma. Ninguém sabe que foi você.",
    req:{nv:12}}
  ]
 ]}
]},

"Sintonizador":{f:"Todo mundo paga para saber. Você é o que sobra depois do pagamento.",vida:1,comb:"sin",cv:3,tre:["Ocultismo","Intuição","Fé"],profs:"idioma morto, etiqueta de cultos, ferramentas rituais",
regra:{n:"Maestria Imposta",
 ef:"O Sintonizador não escolhe sua maestria. No primeiro ponto de Ruído, a fonte da exposição define o elemento que o marcou — para sempre. São seis maestrias, uma por elemento — e só uma delas será sua. (Na ficha: o elemento da aba Sintonizar define a trilha.)"},
base:[
 {n:"Conhecimento Proibido",cst:"—",ac:"Passiva",
  sab:"Você sabe nomes que deviam ter morrido com quem os inventou.",
  ef:"+1 em Ocultismo; reconhece símbolos, ritos e nomes que não deveria conhecer. 1×/sessão, pergunte ao mestre o que a tradição diz sobre isto? — a resposta vem inteira. E pode estar errada: tradição não é prova."},
 {n:"Sentir o Véu",cst:"—",ac:"Ação Livre · 1×/cena",
  sab:"Onde o mundo está fino, você sente a corrente de ar.",
  ef:"Sente presença, resíduo ou ponto fraco anômalo em Curto: direção e intensidade. Concentrando (Ação · 1 Sintonia): também o elemento envolvido."},
 {n:"Mente Resignada",cst:"—",ac:"Passiva",
  sab:"Você já viu. Já pagou. A próxima vez dói menos.",
  ef:"+1 contra a primeira perda de Lucidez de cada cena; diante do seu próprio elemento, toda perda cai em 1 (mín. 0)."}
],
esc:[
 {n:"Contramágica",cst:"2 Sintonia",ac:"Reação · NV 6",
  sab:"Você conhece a forma da magia dele. E sabe onde ela racha.",
  ef:"Contra uma conjuração que você percebe, teste oposto (ou contra Grau +2). Total: interrompe — e o Refluxo é dele. Crítico: interrompe e ganha +2 na próxima ação contra a fonte.",
  req:{nv:6}},
 {n:"Selo de Proteção",cst:"1 Sintonia",ac:"Ação (ritual: 1 minuto)",
  sab:"Giz, sal, uma palavra que não devia ser dita. E o lado de dentro fica seu.",
  ef:"Desenhe um círculo em Curto. Pela cena, quem está dentro tem +2 contra efeitos anômalos, e nada de Grau 1–2 atravessa a borda sem vencer sua Sintonia num teste oposto. Sair quebra o selo."},
 {n:"Oferenda",cst:"1 Lucidez ou 2 Vida",ac:"Ação Livre (declare antes de rolar) · 1×/cena",
  sab:"O Outro Lado não faz crédito. Mas aceita adiantamento.",
  ef:"Pague o custo e sua próxima conjuração desta cena não pode dar Refluxo — no pior caso, apenas falha sem consequência. Alternativamente, transforme um Parcial dela em Total."},
 {n:"Pacto Sussurrado",cst:"1 Lucidez, 1 Sina, ou uma Dívida (escolha ao usar)",ac:"1×/sessão · NV 6 · Ruído ≥2",
  sab:"Você sussurra. E, dessa vez, algo sussurra de volta com a resposta.",
  ef:"+3 num teste, ou uma informação verdadeira do Outro Lado. O preço é escolhido na hora, entre os três acima.",
  req:{nv:6,ruido:2}},
 {n:"Foco Ritual",cst:"—",ac:"Passiva · 1×/cena",
  sab:"Um objeto que você consagrou com algo que não se recupera.",
  ef:"Uma conjuração sua custa −1 de Sintonia, 1×/cena. Se o foco for destruído, você sente: perde 1 Lucidez."}
],
mae:[
{n:"Marcado pela Observação",el:"obs",s:"o que registra",
 regra:{n:"Registro",ef:"Atenção total é posse, e ser o alvo dela é enlouquecedor. Você acumula Marcas de Registro. Ganha 1 ao Observar e 1 ao passar um turno sem agir ofensivamente. Enquanto mantém Marcas sobre um alvo, ele sofre Vigiado (paranoia crescente): 1–2 Marcas −1 em concentração/furtividade; 3–4 −1 em tudo e não surpreende ninguém; 5 age por último e não mente na sua presença. A faca: fechar uma cena com 4+ Marcas acumuladas custa 1 de Lucidez que descanso comum não recupera."},
 medidor:{chave:"marcas",nome:"Marcas",min:0,tetos:[5,5,5,9],reset:"cena"},
 st:[
  [
   {n:"Olho que Registra",cst:"—",ac:"Passiva + Ação Livre (1×/turno)",
    sab:"Sua atenção não tem ponto cego. Sua memória não tem apagador. E sua presença não tem alívio.",
    ef:"Passiva: imune a surpresa e emboscada; percebe o oculto, o disfarçado, o deslocado; memória perfeita e permanente do que já observou. Ação Livre (1×/turno): Observe um alvo/cena/objeto — ganhe 1 Marca e o mestre responde uma pergunta sobre ele. Marcas sobre uma criatura impõem Vigiado."},
   {n:"Compartilhar o Olhar",cst:"1 Marca",ac:"Ação Livre",
    sab:"O que você vê, seus aliados passam a ver pelos seus olhos.",
    ef:"Dê a um aliado à vista, até o fim da cena: +2 em qualquer teste contra um alvo que você Observou, e imunidade a surpresa enquanto puder te ver."}
  ],
  [
   {n:"Reconstruir",cst:"2 Marcas (3 para o porquê)",ac:"Ação (cena de análise)",
    sab:"Você olha os fragmentos e o antes se remonta diante de você.",
    ef:"Reconstrua com precisão o que aconteceu num local, corpo, objeto ou cena — a sequência, quem esteve presente, o que foi dito ou levado. Por 3 Marcas, o mestre também revela o porquê. É dedução sobre-humana, não magia."},
   {n:"Sob Vigia",cst:"1 a 3 Marcas",ac:"Ação Livre (declare no início do turno)",
    sab:"Você fixa o olhar. E ele começa a rachar sob o peso dele.",
    ef:"Concentre o olhar num alvo e aposte Marcas (1–3). Até o fim do seu próximo turno, ele trata seu nível de Vigiado como +[Marcas apostadas] mais alto (podendo ir à certeza sufocante de 5 na hora), e você reage a qualquer coisa que ele faça antes dele."}
  ],
  [
   {n:"Ponto Exato",cst:"2 Marcas",ac:"Ação · contra alvo Observado",
    sab:"Você não acerta em algum lugar. Acerta no único lugar que importa.",
    ef:"Contra um alvo Observado nesta cena: acerto automático, ignora Absorção, dano máximo, e aplica uma condição à escolha (Sangrando, Cego, Lento, Atordoado)."},
   {n:"Leitura Completa",cst:"3 Marcas",ac:"Ação · 1×/cena",
    sab:"Você o observou o bastante. Agora você já leu o final dele.",
    ef:"Sobre um alvo Observado: pelo resto da cena (chefes: [Juízo] turnos) você sabe cada ação dele antes que aconteça — ele não te acerta com ataques normais, não te engana, e suas ações contra ele são acerto automático. O alvo fica automaticamente em Vigiado 5."}
  ],
  [
   {n:"Olho que Tudo Vê",cst:"—",ac:"Passiva",
    sab:"Você não está mais num ponto do espaço. Está em todos os que importam. E todos sentem.",
    ef:"Teto de Marcas sobe para 9; ganha 1 Marca no início de cada turno. Percebe tudo simultaneamente numa área ampla, através de paredes e no escuro. Todo inimigo na área sente-se observado o tempo todo (Vigiado mínimo 1, sem gastar Marcas).",
    req:{nv:12}},
   {n:"A Memória do Mundo",cst:"8 Marcas",ac:"Ação · 1×/campanha",
    sab:"Você acumulou observação suficiente para consultar o registro da própria realidade.",
    ef:"Reviva qualquer evento já ocorrido em qualquer lugar; ou observe o presente em qualquer ponto que já pisou; ou preveja o desenrolar total de uma situação (o mestre narra o fim, você age para mudá-lo). O que essa consulta tira de você é permanente, definido com o mestre.",
    req:{nv:12}}
  ]
 ]},
{n:"Marcado pelo Eco",el:"eco",s:"o que repete",
 regra:{n:"Ecos Gravados",ef:"Nada é único; tudo pode acontecer de novo. Você mantém até 3 Ecos gravados por vez (permanecem até serem usados ou substituídos). Como Reação, grava um evento NOTÁVEL que acabou de ocorrer — um Crítico, um sucesso de grande margem, um efeito, uma condição aplicada, um instante-chave (não ataques/testes comuns). Depois, gasta o Eco para reproduzi-lo. A faca — Dissonância: cada Eco reproduzido numa cena dá 1 de Dissonância; ao fim da cena, teste contra ela — se falhar, na próxima cena o mestre pode 1× fazer você reagir a um Eco antigo como se fosse o presente."},
 medidor:{chave:"ecos",nome:"Ecos",min:0,tetos:[3,3,5,5],reset:"cena"},
 st:[
  [
   {n:"Gravar",cst:"—",ac:"Reação",
    sab:"Você prende o instante extraordinário antes que ele passe. Ele não passa mais.",
    ef:"Grave como Eco um evento notável que acabou de ocorrer à sua vista — um Crítico, um sucesso de grande margem, um efeito, uma condição, um instante-chave (até 3 guardados). Ataques e testes comuns não valem gravação."},
   {n:"Reproduzir",cst:"gasta 1 Eco",ac:"Ação (ou Reação, conforme o Eco)",
    sab:"Já aconteceu uma vez, de verdade. Vai acontecer de novo, por sua mão.",
    ef:"Solte um Eco gravado e faça-o acontecer de novo, por você: repita aquele Crítico como acerto garantido de mesmo efeito, reproduza aquele sucesso num teste equivalente, reaplique aquele efeito ou condição."}
  ],
  [
   {n:"Reverberação",cst:"gasta 1 Eco",ac:"Gatilho (ao você acertar um ataque)",
    sab:"O golpe bate num. E a onda dele encontra os outros.",
    ef:"Ao acertar um ataque, o impacto se propaga: o mesmo dano ecoa imediatamente para até [Juízo] inimigos próximos do alvo, como uma onda que se repete pelo espaço. Não é o mesmo golpe repetido no tempo; é um golpe que acontece em vários lugares ao mesmo tempo."},
   {n:"Devolver",cst:"gasta 1 Eco (gravado de um ataque notável do inimigo)",ac:"Reação",
    sab:"O que ele fez de pior, você guardou. E devolve com o nome dele ainda gravado.",
    ef:"Se você gravou um ataque notável de um inimigo (um Crítico dele, um golpe especial), reproduza-o contra ele: sofre o próprio ataque, com o próprio dano e efeito, muitas vezes sem a defesa que teria contra si mesmo."}
  ],
  [
   {n:"Laço",cst:"gasta 2 Ecos",ac:"Ação · 1×/cena",
    sab:"Você prende alguém num instante que não termina.",
    ef:"Prenda um alvo num laço temporal por [Juízo] turnos: a cada turno dele, ele é forçado a repetir exatamente a última ação que fez antes do laço (agora previsível para todos). Alvos poderosos podem gastar a ação inteira para quebrar o laço em vez de repetir."},
   {n:"Eco Persistente",cst:"—",ac:"Passiva",
    sab:"Suas melhores jogadas não morrem. Ficam ressoando.",
    ef:"O teto de Ecos gravados sobe para 5, e um Eco reproduzido tem chance de não se gastar — ao reproduzir, role: num resultado alto, ele permanece gravado. Ecos que ressoam sozinhos contam normal para Dissonância."}
  ],
  [
   {n:"Momento Congelado",cst:"gasta 3 Ecos",ac:"Ação · 1×/cena",
    sab:"Você grava o agora inteiro. E o solta quando quiser que ele volte.",
    ef:"Grave o estado completo de uma cena num instante (posições, Vida, condições de todos). A qualquer momento até o fim da cena, reproduza aquele instante: tudo volta ao estado gravado, exceto o conhecimento de todos (você e aliados lembram o que aprenderam; inimigos não). A Dissonância disso conta como 3 reproduções.",
    req:{nv:12}},
   {n:"A Primeira Vez Nunca Existiu",cst:"todos os Ecos (mínimo 5)",ac:"Ação · 1×/campanha",
    sab:"Você deixou de saber qual era o original. Talvez nunca tenha havido um.",
    ef:"Gaste todos os Ecos (5+) para reescrever um evento por repetição: pegue algo que aconteceu — uma morte, uma derrota, uma catástrofe — e faça a realidade repeti-lo diferente, como se a versão que você reproduz sempre tivesse sido a verdadeira. Ninguém além de você lembra que houve outra. O preço é a certeza de qual é o real, para sempre.",
    req:{nv:12}}
  ]
 ]},
{n:"Marcado pelo Vazio",el:"vaz",s:"o que subtrai",
 regra:{n:"Erosão",ef:"O Vazio não gasta Sintonia nos efeitos maiores; gasta Erosão, um contador permanente que sobe e não volta com descanso. Cada ponto apaga algo de você (uma memória, um afeto, um sentido, um laço — definido na ficção). Marcos: a 3, perde acesso a uma perícia social ou gancho pessoal; a 6, emoções distantes (−1 em tudo que dependa de se importar, mas imune a Apavorado); a 10, você se completa — some da realidade como os que apagou (fim de arco). Os efeitos do Vazio não permitem resistência: você não resiste à ausência."},
 medidor:{chave:"erosao",nome:"Erosão",min:0,tetos:[10,10,10,10],reset:"permanente"},
 st:[
  [
   {n:"Silêncio",cst:"—",ac:"Ação · Curto",
    sab:"Você não faz barulho. Você faz o barulho parar de ter existido.",
    ef:"Crie uma zona de Silêncio (Curto) por 1 cena. Dentro dela nenhum som existe — nada de fala, conjuração verbal, alarme. Não há teste; som simplesmente não acontece. Você e todos ali ficam igualmente mudos."},
   {n:"O que Falta",cst:"—",ac:"Passiva",
    sab:"Você enxerga os buracos que o mundo finge não ter.",
    ef:"Você percebe ausências — o que foi apagado, a passagem que não deveria estar tapada, a pessoa de quem ninguém lembra, a mentira dita por omissão. Custo: você começa com 1 de Erosão. Ver o Vazio já é ser um pouco dele."}
  ],
  [
   {n:"Subtrair",cst:"—",ac:"Ação · Curto",
    sab:"Você não bloqueia o poder dele. Você tira do contrato o direito de tê-lo.",
    ef:"Escolha uma capacidade de um alvo à vista — um bônus ativo, uma resistência, um sentido, a habilidade de conjurar, a força de erguer algo. Por 1 turno, ela não existe para ele. Sem teste. Contra um poder verdadeiramente grande (Ápice inimigo, magia de Grau alto), custa 1 de Erosão."},
   {n:"Zona Morta",cst:"1 de Erosão",ac:"Ação · Médio · concentração",
    sab:"Aqui dentro, nada ajuda ninguém. Nem a esperança.",
    ef:"Uma esfera (Médio) por [Juízo] turnos onde nenhum efeito funciona — magia não conjura, bônus não contam, cura não cura, condições não progridem, itens mágicos ficam inertes. Inclusive os seus."}
  ],
  [
   {n:"Apagar",cst:"2 de Erosão",ac:"Ação · Curto",
    sab:"Não é morte. Morte deixa corpo. Isto não deixa nada.",
    ef:"Remova um alvo pequeno da existência por [Juízo] turnos — uma criatura, um objeto, uma porta, um trecho de parede. Não está lá em sentido nenhum: não pode ser tocado, visto, lembrado ou afetado, e não pode agir. Ao voltar, volta confuso e sem saber onde esteve. Contra alvos poderosos, dura só 1 turno."},
   {n:"Entorpecimento",cst:"—",ac:"Passiva",
    sab:"Você já não sente o frio. Nem o medo. Nem a falta que os outros fazem.",
    ef:"A partir de Erosão 6, você é imune a medo, dor, e a qualquer efeito mental ou emocional — não há 'você' suficiente para atingir. 1×/cena, transfira essa vacância para um inimigo que te ataque psicologicamente: ele testa contra ficar Apavorado e Confuso."}
  ],
  [
   {n:"O Vão Entre as Coisas",cst:"—",ac:"Passiva",
    sab:"Você não caminha mais pelo mundo. Caminha pelos buracos dele.",
    ef:"Você existe parcialmente na ausência. Pode passar por onde não há passagem, não é detectado por meios que dependam de você 'estar' em algum lugar, e o primeiro ataque contra você a cada cena simplesmente erra (você não estava lá). O custo é constante: a Erosão sobe 1 a cada sessão, use poder ou não.",
    req:{nv:12}},
   {n:"O Nada que Resta",cst:"5 de Erosão",ac:"Ação · 1×/campanha",
    sab:"Você pensa no nome. E o mundo esquece que ele um dia significou algo.",
    ef:"Apague algo grande e permanente da existência — uma cidade, uma linhagem, um evento histórico, uma entidade, um conceito. Não é destruído: nunca terá existido. O mundo se reorganiza em volta do buraco. Não há teste, defesa, ou desfazer. Os 5 de Erosão de uma vez quase certamente te levam a 10 — o ato te apaga junto.",
    req:{nv:12}}
  ]
 ]},
{n:"Marcado pela Ascensão",el:"asc",s:"o que acumula",
 regra:{n:"Perfeição",ef:"Um medidor permanente (0–10, sobe para 15 no Ápice) que sobe e não desce com descanso. Sobe quando você se refina (ação, gastando Sintonia) ou supera um limite humano de forma extraordinária (um Crítico, um feito impossível). Cada ponto faz duas coisas para sempre: a cada 2 graus, +1 em TUDO (testes, dano, Defesa, deslocamento); e cada grau reduz sua Lucidez máxima em 1. Quanto mais perfeito, menos sanidade cabe em você. Ao chegar a 10 (Lucidez máxima perto de zero), você transcende — sai da escala do jogo (fim de arco)."},
 medidor:{chave:"perfeicao",nome:"Perfeição",min:0,tetos:[10,10,10,15],reset:"permanente"},
 st:[
  [
   {n:"Refinar-se",cst:"1 Sintonia",ac:"Ação",
    sab:"Você olha o que é e apara o que sobra.",
    ef:"Suba 1 grau de Perfeição. Você pode fazer isso a qualquer momento que tenha Sintonia — o poder está sempre disponível, a decisão é sempre sua."},
   {n:"Corpo Depurado",cst:"—",ac:"Passiva",
    sab:"As pequenas falhas da carne já não são suas.",
    ef:"Você não sente fome, sede, cansaço comum nem dor menor; imune a doença mundana; recupera o dobro em descanso. O bônus de Perfeição (+1 a cada 2 graus) já corre por baixo."}
  ],
  [
   {n:"Mente Expandida",cst:"—",ac:"Passiva",
    sab:"Você pensa em direções que não têm nome.",
    ef:"1×/cena, refaça qualquer teste mental ou de percepção e fique com o melhor; você resolve enigmas na hora (o mestre dá a resposta), e percebe padrões, mentiras e intenções antes que sejam ditos. Cada grau de Perfeição acima de 3 dá +1 nisso."},
   {n:"Impor-se",cst:"1 Sintonia",ac:"Ação",
    sab:"Você é evidentemente superior. Basta deixarem de fingir que não veem.",
    ef:"Projete sua superioridade: todos os presentes 'inferiores' a você (Perfeição mais alta que a Vontade/Juízo deles) hesitam — inimigos comuns podem ficar Atordoados ou recuar; PNJs tendem a obedecer ou reverenciar. Contra os fortes, só um arrepio de estar diante de algo maior."}
  ],
  [
   {n:"Forma Superior",cst:"2 Sintonia",ac:"Ação · 1×/cena",
    sab:"Por um momento, você é o que está se tornando.",
    ef:"Por [Juízo] turnos, aja como se sua Perfeição fosse +3 do que é, e ganhe uma capacidade sobre-humana à escolha pela duração — mover-se rápido demais para reagirem, sentidos que atravessam paredes, força que dobra metal, regeneração visível."},
   {n:"Além da Dor",cst:"—",ac:"Passiva",
    sab:"Ferir você é discutir com uma estátua sobre por que ela deveria rachar.",
    ef:"A partir de Perfeição 6, você ignora a primeira condição que sofreria a cada turno e reduz todo dano recebido em [metade da sua Perfeição]. (O reverso: seu teto de Lucidez a esta altura é tão baixo que uma única cena ruim pode te despedaçar.)"}
  ],
  [
   {n:"Quase Divino",cst:"—",ac:"Passiva",
    sab:"Você já não melhora aos poucos. Você melhora em tudo, o tempo todo.",
    ef:"O teto de Perfeição sobe para 15 (a Lucidez máxima continua caindo junto). O bônus passa a ser +1 a cada grau, não a cada 2. 1×/cena, declare que simplesmente é bom demais para falhar numa única coisa: um sucesso automático, de qualquer escala, sem rolar.",
    req:{nv:12}},
   {n:"A Última Evolução",cst:"leva a Perfeição a 15 (Lucidez máxima a ~0)",ac:"Ação · 1×/campanha",
    sab:"O último degrau não tem volta. E você vai subir mesmo assim.",
    ef:"Complete a ascensão: por uma cena, você é essencialmente um deus menor — reescreve o resultado de qualquer coisa ao seu redor, sua vontade acontece, nada humano te alcança. Ao fim, Perfeição em 15, Lucidez máxima em zero, e você transcende para sempre: sai da escala do jogo, vira força/entidade/lenda que a mesa narra mas não controla mais.",
    req:{nv:12}}
  ]
 ]},
{n:"Marcado pelo Pacto",el:"pac",s:"o que troca",
 regra:{n:"Dívida",ef:"As habilidades do Pacto não gastam Sintonia — adicionam Dívida (começa cada sessão em 0). Com Dívida ≥5, o Outro Lado fica interessado e o mestre pode complicar seus momentos. Ao chegar ao teto, o credor coleta (Cobrança maior) e a Dívida volta a 5. Pagar é ativo: 1 Vida, 1 Lucidez ou uma Sina abatem 2 de Dívida. A espinha é OFERECER PACTO: você aluga, emprestado, um efeito de outra classe ou domínio; ganha Dívida = o Grau (1–5) do efeito; o Grau máximo sobe por nível (2→3→4→5), por Ruído, e com Dívida ≥5 (+1 de Grau grátis)."},
 medidor:{chave:"divida",nome:"Dívida",min:0,tetos:[10,10,10,15],reset:"sessao"},
 st:[
  [
   {n:"Primeiro Trato",cst:"—",ac:"Passiva",
    sab:"Você assinou antes de ler. E descobriu que gostava da caneta.",
    ef:"Oferecer Pacto está liberado (Grau máx. 2). Você sempre sabe sua Dívida exata e sente quando ela cruza 5. 1×/cena, um trato de Grau 1 não adiciona Dívida — a primeira dose é sempre cortesia da casa."},
   {n:"Fiador",cst:"adiciona 2 de Dívida",ac:"Reação",
    sab:"A letra miúda, dessa vez, trabalha pra você.",
    ef:"Anule um dano ou condição que acabou de atingir você ou um aliado à vista — o Outro Lado cobre a ferida, a conta é sua. Com Dívida já ≥5, custa 3 em vez de 2."}
  ],
  [
   {n:"Transferência",cst:"adiciona 2 de Dívida",ac:"Ação · Toque/Curto",
    sab:"Nada se cura. Nada some. Só muda de dono.",
    ef:"Mova um dano recente, uma condição, ou um efeito ativo de um alvo para outro ao alcance. Num trato maior (+2 Dívida), transfira também algo bom: roube um bônus, uma postura, ou a próxima ação preparada de um inimigo."},
   {n:"Credor",cst:"—",ac:"Passiva",
    sab:"Você parou de só dever. Agora empresta — e cobra juros.",
    ef:"Quando você aplica um efeito negativo a um inimigo via Pacto, ele passa a carregar uma Dívida sua. 1×/cena por inimigo endividado, chame a conta: ele sofre uma Cobrança e você abate 2 da sua Dívida. Grau máx. de Oferecer Pacto sobe para 3."}
  ],
  [
   {n:"Usurário",cst:"—",ac:"Passiva",
    sab:"O mercado é seu. Você define as taxas.",
    ef:"Grau máx. sobe para 4. Quando você quita Dívida pagando com Vida/Lucidez/Sina, abate 3 por ponto em vez de 2. 1×/cena, empurre até 4 pontos da sua Dívida para um inimigo que carregue sua Dívida (Credor): ele sofre 1 de dano verdadeiro por ponto e testa Resistência (Limiar = pontos) ou fica Apavorado."},
   {n:"Contrato Aberto",cst:"adiciona 3 de Dívida",ac:"Ação · 1×/cena",
    sab:"Por que alugar uma coisa quando a prateleira inteira está à venda?",
    ef:"Mantenha até dois efeitos alugados de Oferecer Pacto ativos ao mesmo tempo por uma cena. Por essa cena, você é literalmente duas classes de uma vez. A conta dobrada é o preço da onipresença."}
  ],
  [
   {n:"Sócio Majoritário",cst:"—",ac:"Passiva",
    sab:"Vocês dois querem as mesmas coisas agora. É o que apavora.",
    ef:"Grau máx. sobe para 5 — você aluga milagres. O teto de Dívida sobe para 15 e a coleta automática em 10 some: entre 10 e 15, você escolhe quando o credor age, e cada vez que permite ganha um benefício (um trato grátis, um sucesso garantido). Acima de 15, ele coleta tudo de uma vez — catastrófico.",
    req:{nv:12}},
   {n:"O Grande Contrato",cst:"adiciona 8 de Dívida (ou vai a 15, o que for maior)",ac:"Ação · 1×/campanha",
    sab:"Você pede a coisa impossível. Ela vem. Que Deus te ajude na hora de cobrarem.",
    ef:"Um único efeito de escala quase divina, dentro do tema — desfazer uma morte recente, forçar qualquer criatura a um acordo vinculante, alugar o poder pleno de qualquer classe por uma cena, reescrever um 'não' do mundo em 'sim'. O mestre concede, sem regatear. A Dívida resultante vai coletar ao fim da cena, sem apelação.",
    req:{nv:12}}
  ]
 ]},
{n:"Marcado pelo Germe",el:"ger",s:"o que infecta",
 regra:{n:"A Carne é Adubo",ef:"As habilidades do Germe custam Carne (Vida) em vez de Sintonia. Você sacrifica pontos de Vida para conjurar, de bom grado — a carne é matéria-prima. Tudo é úmido, grotesco, invasivo. O Germe é o elemento que mais ajuda os outros (cura, protege, salva), mas sempre de formas repugnantes que dão nojo em quem recebe. Como paga em Vida, vive perto da própria morte, contando com sua regeneração grotesca para não cair."},
 st:[
  [
   {n:"Primeira Semente",cst:"—",ac:"Passiva",
    sab:"Algo cresce em você. Você aprendeu a gostar.",
    ef:"Você conhece a magia Broto Faminto automaticamente (não conta no limite) e a conjura com +1. Seus efeitos do Germe que crescem sozinhos continuam crescendo mesmo se você cair inconsciente ou morrer. Sente doença, infecção e carne morta em Curto; carniça não o enjoa."},
   {n:"Enxerto",cst:"1 de Vida",ac:"Ação · Toque",
    sab:"Você abre a própria mão, arranca o que cresce lá dentro e planta no outro. Funciona. É horrível, mas funciona.",
    ef:"Enfie uma semente sua em alguém. Em inimigo: 2 de dano por turno até ser extraída (Medicina 8) e −1 enquanto durar. Em aliado disposto: remove veneno, infecção ou condição física e cura 1d4. Você mantém até [Juízo] sementes ativas ao mesmo tempo."}
  ],
  [
   {n:"Casca de Fungo",cst:"2 de Vida",ac:"Ação · dura a cena",
    sab:"Uma couraça úmida e viva cresce sobre a sua pele, respirando por você.",
    ef:"Absorção 4 enquanto durar. Quando absorve um golpe corpo a corpo, os esporos reagem: o atacante sofre 1 de dano e testa contra ficar coberto de fungo (−1 até se limpar). Estender a um aliado adjacente não custa Vida extra — a casca cresce nos dois."},
   {n:"Colheita de Carne",cst:"—",ac:"Ação",
    sab:"Tudo que suas sementes comeram, volta para você. Vivo.",
    ef:"Recupere Vida igual a todo o dano que suas sementes, enxertos e jardins causaram desde seu último turno, sem teto. O transbordo (Vida além do seu máximo) pode ser distribuído entre vários aliados à vista como enxerto de cura."}
  ],
  [
   {n:"Jardim de Carniça",cst:"3 de Vida",ac:"Ação · área Média",
    sab:"O chão respira. Devagar. E tem dentes.",
    ef:"Infeste uma área Média por [Juízo] turnos: terreno difícil e vivo para inimigos, e quem começar o turno ali sofre 3 de dano (sem teste) e fica coberto de esporos. Aliados no jardim regeneram 1d4 de Vida por turno e têm +1 na Defesa."},
   {n:"Hospedeiro",cst:"—",ac:"Passiva",
    sab:"O Germe cuida do que é dele. E você é dele agora.",
    ef:"Imune a doença e veneno. Enquanto abaixo da metade da Vida, regenera 1d4+[Juízo] no início de todo turno. Ao cair a 0, 1×/cena você não morre: brota de volta a 1d4 de Vida no próximo turno, se houver carne/jardim seu por perto. Cura de terceiros rende metade em você."}
  ],
  [
   {n:"Mãe da Carne",cst:"—",ac:"Passiva",
    sab:"Você parou de ser uma pessoa que planta. Você é o solo agora.",
    ef:"O custo em Vida de todas as suas habilidades do Germe cai pela metade (mín. 1), e a Colheita de Carne passa a curar você e todos os aliados à vista pelo valor colhido. Seus efeitos ativos agem sozinhos no início de cada turno. Você pode ter dois jardins ativos ao mesmo tempo.",
    req:{nv:12}},
   {n:"Floração",cst:"5 de Vida (pode descer até 1 de Vida para pagar; não pode morrer para pagar)",ac:"Ação · 1×/cena",
    sab:"Você se abre inteiro. Não sobra quase nada de humano — mas o que floresce salva ou condena tudo ao redor.",
    ef:"Rasgue-se e transforme uma área ampla num organismo vivo por [Juízo] turnos. Inimigos na área: −2 em tudo, 2 de dano por turno, e Coragem (8) ao entrar ou ficam Apavorados. Aliados: regeneram 1d4 de Vida por turno, imunes a medo e a novas condições físicas. Você: sua regeneração do Hospedeiro dispara todo turno. Ao fim, você fica Exausto pela cena.",
    req:{nv:12}}
  ]
 ]}
]}
};

/* ---- ELEMENTOS (Grimório dos Seis) ---- */
/* obs (piloto de escopofobia): sussurros escalonados — impessoal → pessoal → íntimo */
const SUS_OBS={
lo:["há algo na porta","você não fechou a cortina","isto não estava assim antes","a sala parece diferente quando você não olha","alguém esteve aqui"],
mid:["ele te viu chegar","continue. estou anotando.","não olhe para trás","você está sendo observado agora","por que você parou de digitar?"],
hi:["eu vi você fazer aquilo","sei o que você está pensando agora","você sente, não sente?","não precisa se virar. eu já sei onde você está.","estou olhando através da tela"]};
/* vaz: o oposto do obs — estas frases não perseguem, dispensam */
const SUS_VAZ={
lo:["sobra menos a cada dia","ninguém vai notar a falta","isto também vai passar","não há ninguém do outro lado","estava tudo vazio antes de você chegar"],
mid:["você podia parar agora e seria igual","nada do que você fez ficou","o silêncio não está esperando você","não há um plano. nunca houve.","você não é necessário"],
hi:["você é uma pausa curta entre dois nadas","quando isto acabar, não terá havido diferença","nem o vazio vai lembrar do seu nome","você já está quase todo apagado","não havia motivo. desculpe."]};
/* eco: o familiar que azeda — e que às vezes se repete literalmente */
const SUS_ECO={
lo:["você já leu isso","isto já aconteceu","de novo","você reconhece este momento","já estava assim"],
mid:["você já esteve exatamente aqui","a resposta veio antes da pergunta","quantas vezes já?","você não saiu daqui","outra vez. outra vez. outra vez."],
hi:["você lembra. eu sei que lembra.","aconteceu de novo, como sempre acontece","você já viveu isto e vai viver outra vez","não foi a primeira vez. não vai ser a última.","volte ao começo. você sabe o caminho."]};
/* asc: nada aqui ameaça nem lamenta — é sereno, superior, com certeza absoluta de estar certo.
   soa quase gentil, e é exatamente isso que arrepia */
const SUS_ASC={
lo:["a carne é lenta","você pode ser melhor que isto","a dor é só um sinal mal projetado","por que ainda sente?","a carne é fraca, substitua-a"],
mid:["remova o que falha","emoção é ineficiência","o metal não hesita","você não precisa mais dormir","um parafuso a mais"],
hi:["não sinto mais falta de nada. você também não vai.","a carne era o rascunho","eu me consertei. você ainda pode.","logo você vai agradecer","não dói mais. nada mais dói."]};
/* pac: as únicas frases dirigidas A VOCÊ. não são clima — são resposta, oferta e negociação.
   {nome} é trocado na hora de falar (ver pacTx): personagem, jogador, ou o fallback neutro */
const SUS_PAC={
lo:["eu ouvi isso","continue. estou interessado.","você queria dizer outra coisa","sei que você está aí","fale. eu escuto."],
mid:["posso fazer isso valer a pena","é só pedir","você já sabe o preço","deixa eu ajudar","nós podemos resolver isso agora"],
hi:["{nome}. eu sei o que você quer.","aceite e acabou, {nome}","você me chamou primeiro","não foi você que começou esta conversa?","diga sim. só isso."]};
/* ger: o nojo é de TEXTURA e de INVASÃO — úmido, morno, algo criando raiz sob a pele.
   nada de sangue nem víscera: o que embrulha é a ideia de já estar hospedando aquilo */
const SUS_GER={
lo:["está quente aqui dentro","algo se mexeu sob a sua pele","você sente coçar?","está germinando","não coce. vai espalhar.",
 "tem algo crescendo aí","o cheiro é seu","está úmido","isso não é sujeira","já criou raiz"],
mid:["está dentro de você agora","não adianta lavar","você já faz parte","sente inchar?","abriu uma fresta e entrou",
 "está se alimentando","logo vai romper a pele","você está mais quente que ontem","não é febre. é vida.","cresce quando você dorme",
 "tem gosto na sua boca?","já chegou no osso"],
hi:["você é solo fértil, {nome}","obrigado por hospedar","não vai doer. só vai abrir.","estamos quase prontos para florescer",
 "você nunca esteve sozinho aí dentro","sinta as raízes","isto sempre foi um jardim","seu corpo já não é só seu",
 "respire fundo. nós respiramos junto.","quase lá. mais um pouco e brotamos.","você vai gostar do que nasce","não resista. floresça."]};
const ELEMS=[
{id:"obs",g:"⊙",n:"Observação",v:"registra",fr:"O que você vê fica registrado. O que registra você, também.",
lei:["Lei do Registro","O que você vê através da Observação fica registrado — revisitável mentalmente e transmissível: um toque na testa compartilha o registro em flash. E espiar o anômalo tem preço: a coisa pode notar o olhar."],
marca:["Você pisca pouco demais; quem conversa com você sente que está sendo anotado — −1 em interações calorosas, +1 em Percepção passiva.","Seus olhos refletem luz como vidro; em fotos, você está sempre olhando para a lente — mesmo de costas. Quem repara de perto testa Coragem (7) ou perde 1 Lucidez.","Você enxerga o quadro inteiro antes das pessoas nele — −1 para inspirar confiança, e 1×/cena o mestre aponta de graça o detalhe fora do lugar."],
sus:["estão te observando","isso ficou registrado","não pisque","alguém consulta o seu arquivo","você está sempre olhando para a lente"],susB:SUS_OBS},
{id:"eco",g:"☊",n:"Eco",v:"repete",fr:"O Eco não cria. Devolve — meio segundo atrasado.",
lei:["Lei do Retorno","O Eco não cria — devolve. Toda magia do Eco exige uma fonte: algo que aconteceu, foi dito, foi feito. Sem fonte, não conjura. E o Sulco: repetir a mesma magia na mesma cena dá +1 cumulativo (máx +2)."],
marca:["Você repete baixinho a última palavra dos outros, meio segundo depois — −1 em primeiras impressões, +1 para recordar diálogos com exatidão.","Seus passos ecoam duas vezes; relógios atrasam no seu pulso. Quem anda com você no silêncio, na primeira vez, testa Coragem (7).","Você responde perguntas um instante antes de serem feitas — −1 em interações calorosas, +1 para agir primeiro em qualquer confronto."],
sus:SUS_ECO.lo,susB:SUS_ECO},
{id:"vaz",g:"◌",n:"Vazio",v:"subtrai",fr:"O que se aproxima volta com menos do que tinha.",
lei:["Lei da Subtração","O Vazio não adiciona — remove. Contra dano do Vazio, Absorção conta pela metade. E o que o Vazio apaga — luz, som, calor, memória — não volta sozinho: precisa ser reaceso, refeito, relembrado."],
marca:["As pessoas esquecem seu rosto rápido demais — −1 para ser lembrado ou reconhecido, +1 para passar despercebido.","Sua sombra atrasa um instante; falta um reflexo seu no espelho de vez em quando — quem repara perde 1 Lucidez.","O silêncio te segue; sons somem ao seu redor — −1 em qualquer interação calorosa, +1 em Furtividade e Intimidação pela frieza."],
sus:["sobra menos","o que faltava aqui?","ninguém lembra","o silêncio anda com você","onde foi parar"],susB:SUS_VAZ},
{id:"asc",g:"⌬",n:"Ascensão",v:"acumula",fr:"A carne é um rascunho. A Ascensão não teve paciência de esperar a versão final.",
lei:["Sem Regra","A Ascensão é o único elemento cuja Sobrecarga não tem teto de Juízo — empilhe quanto quiser. Mas cada ponto além do seu Juízo soma +2 ao Refluxo. E a carne lembra: toda magia da Ascensão sobre si mesmo deixa um traço físico visível enquanto durar."],
marca:["Um zumbido baixo sob a pele; relógios adiantam perto de você — −1 em contato gentil (mãos frias, duras demais), +1 em testes técnicos.","Uma junta range ao acordar; há algo duro sob o antebraço que médicos querem examinar — −1 social com quem nota o errado; máquinas simples funcionam melhor na sua mão.","Seu peso está errado para o seu tamanho; a voz carrega um sopro de estática — −1 com estranhos, e 1×/cena uma máquina próxima “coopera” de graça."],
sus:SUS_ASC.lo,susB:SUS_ASC},
{id:"pac",g:"⚖",n:"Pacto",v:"troca",fr:"Tudo se anota. Nada se esquece.",
lei:["Lei do Consentimento","O Pacto prefere acordos. Sobre alvos voluntários: conjure com +1 e sem resistência. Involuntários resistem, e a maioria dos efeitos exige o Nome, sangue ou algo pessoal. Forçar é possível — e sempre mancha. Cada barganha fica registrada."],
marca:["Uma marca fina e elegante na pele, que ninguém lembra de ter visto surgir — −1 para esconder o que você é de quem entende, +1 em negociação formal.","As pessoas sentem, sem saber por quê, que devem algo a você — −1 em convívio casual; papéis e contratos que você toca não se perdem nem rasgam por acidente.","Sua assinatura aparece onde você nunca assinou — −1 em amizade desinteressada (tudo soa cláusula), e 1×/sessão você sabe o preço exato de alguém."],
sus:SUS_PAC.lo,susB:SUS_PAC},
{id:"ger",g:"❋",n:"Germe",v:"infecta",fr:"O que você planta fica plantado.",
lei:["Lei da Semeadura","O Germe não conjura efeitos: planta sementes. Todo efeito contínuo compõe sozinho, turno a turno, e não expira por tempo: precisa ser tratado, queimado ou arrancado. E a Sobrecarga do Germe não come Sintonia: come Vida."],
marca:["Cheiro de terra molhada e de algo doce; plantas se inclinam de leve para você — −1 em ambientes assépticos e formais, imune a enjoo por cheiro.","Suas feridas fecham com um musgo fino; comida estraga rápido perto de você — −1 para dividir mesa e teto, +1 em Resistência contra doença e veneno.","Algo verde se move sob a sua pele quando ninguém olha; flores pequenas nascem onde você dorme — quem repara testa Coragem (7); venenos comuns não fazem mais efeito."],
sus:SUS_GER.lo,susB:SUS_GER}];

const GRAUS=[{g:1,lim:6,rq:"⟑⋏⊙⌖◊ ≥1"},{g:2,lim:8,rq:"⟑⋏⊙⌖◊ ≥2 · nível 4"},{g:3,lim:10,rq:"⟑⋏⊙⌖◊ ≥4 · nível 8"},{g:4,lim:12,rq:"⟑⋏⊙⌖◊ ≥6 · nível 12"}];
function grauOK(g,ru,nv){if(g===1)return ru>=1;if(g===2)return ru>=2&&nv>=4;if(g===3)return ru>=4&&nv>=8;return ru>=6&&nv>=12;}

const MAGIAS_AUTO=["Reviver","Lança do Nada","Broto Faminto"];
/* magias embutidas (parcial — o Grimório completo entra por fases; o editor cobre o resto) */
const MAGIAS=[
{el:"obs",g:1,n:"Catalogar",tipo:"INVENTÁRIO",cst:"1 Sintonia",exe:"Ação Livre",alc:"Visível (um ambiente)",dur:"Instantânea",p:"Inventário geral — o mestre lista os objetos notáveis.",t:"Inventário completo e anotado: tudo contado e classificado; o fora do lugar fica destacado.",c:"E o catálogo aponta uma ausência — o que deveria estar ali e não está.",sob:"+1 Sintonia = cataloga o interior de recipientes fechados não-trancados.",fal:"Excesso de Dados: tudo vira lista, até o irrelevante. Atordoado 1 turno."},
{el:"obs",g:1,n:"Olho Emprestado",tipo:"SENSOR",cst:"1 Sintonia + 1 Lucidez",exe:"Ação",alc:"Toque (um ponto)",dur:"[Juízo] horas",p:"O olho registra; você confere o material ao voltar a Curto dele.",t:"Espia por ele à distância (Ação, mesma cidade) — cone fixo, sem som.",c:"Tem som, gira, e te alerta quando algo cruza o campo.",sob:"+1 Sintonia = +[Juízo] horas. Máx [Juízo] olhos; achá-lo: Percepção (10).",fal:"Olho Vadio: registros inúteis — e, num deles, algo olha de volta. 1 Lucidez."},
{el:"obs",g:1,n:"Linha de Visão",tipo:"CANAL",cst:"1 Sintonia",exe:"Ação Livre",alc:"Curto (aliado voluntário)",dur:"Cena",p:"Flashes — 1×/turno, um de vocês “pisca” e vê 2 segundos pelo outro.",t:"Canal contínuo — qualquer um olha pelo outro como Ação Livre; dá até para mirar pelo que ele vê (−1).",c:"Canal perfeito: ambos veem ambos sem custo, e mirar pela visão alheia perde o −1.",sob:"+1 Sintonia = alcance Médio; +2 = +1 aliado na linha.",fal:"Linha Cruzada: por 1 turno, vocês dois só veem pelos olhos do outro."},
{el:"obs",g:1,n:"Realçar",tipo:"FORENSE",cst:"1 Sintonia",exe:"Ação",alc:"Curto",dur:"Cena",p:"Escolha uma categoria — sangue e fluidos · toques recentes · coisas movidas · passagens dissimuladas — e ela brilha fraco.",t:"Duas categorias, brilho claro, com idade (mais recente = mais vivo).",c:"Todas, e o realce aponta a anomalia-mestra: a única coisa que não bate com o resto.",sob:"+1 Sintonia = alcance Médio. Não revela o magicamente oculto.",fal:"Brilho Errado: tudo acende igual — −1 em Percepção e Investigação na cena."},
{el:"obs",g:3,n:"Ver de Verdade",tipo:"VISÃO VERDADEIRA",cst:"3 Sintonia + 2 Lucidez",exe:"Ação",alc:"Pessoal",dur:"Sustentada (1 Sintonia/turno)",p:"Vê através de disfarces mundanos e ilusões fracas; o invisível aparece como contorno trêmulo.",t:"O oculto inteiro: invisibilidade, disfarces sobrenaturais, Espelhos fora de registro, possessões.",c:"E a natureza: o elemento de cada coisa anômala presente, como assinatura visual.",sob:"+2 Sintonia = estende a um aliado em contato. Cada coisa revelada custa a Lucidez que custaria ao ser vista; o Olhar de Volta é automático.",fal:"Viu Demais: por 1 turno você vê tudo de tudo — 1d4 Lucidez e Atordoado."},
{el:"obs",g:3,n:"Panóptico Menor",tipo:"REDE DE OLHOS",cst:"3 Sintonia + 2 Lucidez",exe:"Ação",alc:"Até 3 pontos em Médio",dur:"Sustentada (1 Sintonia/turno)",p:"Monitora um por vez (alterna como Ação Livre); os demais gravam.",t:"Monitora todos simultaneamente — aliados avisados não podem ser surpreendidos nessas zonas.",c:"E os olhos miram: ataques à distância contra alvos nos campos ganham +1 e ignoram cobertura parcial.",sob:"+1 Sintonia = +1 olho (máx 5). Olhos invisíveis (Percepção 10).",fal:"Realimentação: o loop volta para você — Atordoado 1 turno, e tudo colapsa."},
{el:"obs",g:4,n:"O Arquivo",tipo:"CONSULTA AO REGISTRO",cst:"5 Sintonia + 3 Lucidez",exe:"Ritual (cena; espelhos em círculo; silêncio)",alc:"Pessoal",dur:"[Juízo] consultas",p:"Cada consulta retorna um registro visual relevante, sem índice: você pesca com palavras-chave.",t:"Registros completos e datados — “mostre a última vez que [X] foi visto” funciona, se algum olho da Observação esteve lá.",c:"Uma consulta pode ser sobre algo que nenhum humano jamais viu (1d4 Lucidez).",sob:"Nenhuma. Ao fim, 1d6 por consulta: qualquer 1 = os Olheiros abrem um registro sobre você.",fal:"Ficha Solicitada: o Arquivo nega — e consulta você. 1d4 Lucidez."},
{el:"obs",g:4,n:"Visto por Todos",tipo:"A SENTENÇA",cst:"5 Sintonia + 4 Lucidez",exe:"Ação (apontar e sentenciar)",alc:"Visível",dur:"[Têmpera] horas",p:"Ele perde furtividade, disfarce e invisibilidade pela duração; anômalos em Longo sentem a posição dele.",t:"A transmissão é regional — tudo de anômalo na cidade recebe o registro: rosto, cheiro de medo, posição.",c:"A sentença gruda: mesmo depois, a primeira tentativa de ocultação dele por dia falha, por um arco.",sob:"Nenhuma. Em você mesmo: vira a isca absoluta — e ganha +2 em Coragem enquanto durar.",fal:"—"},
{el:"ger",g:2,n:"Jardim Súbito",tipo:"ÁREA SEMEADA",cst:"2 Sintonia + 1 Lucidez",exe:"Ação",alc:"Área Curta em Médio",dur:"Até ser queimado ou tratado",p:"A área vira terreno difícil (espinho, cipó, chão mole) para quem você não nomear.",t:"E quem termina o turno lá dentro fica Semeado (1) (Resistência 8 nega, a cada turno).",c:"E o jardim cresce: +1 área Curta adjacente por rodada, até o dobro.",sob:"+1 de Vida = o Total aplica Semeado (2). Fogo limpa uma área por turno.",fal:"Canteiro Invasor: nasce centrado em você — e não te reconhece como jardineiro."},
{el:"ger",g:2,n:"Praga Menor",tipo:"DEBUFF CONTAGIOSO",cst:"2 Sintonia + 1 Lucidez",exe:"Ação",alc:"Curto",dur:"Cena",p:"O alvo testa Resistência (8) ou fica −1 em tudo pela cena — febril, suando frio.",t:"E a praga contagia: o primeiro que tocá-lo testa também.",c:"−2 em vez de −1, e ele sabe que está doente de um jeito errado — Coragem (7) ou perde a próxima ação em pânico.",sob:"+1 de Vida = +1 alvo inicial.",fal:"Paciente Zero: a febre estreia em você — −1 por 2 turnos."},
{el:"ger",g:2,n:"Sugar a Doença",tipo:"REMOÇÃO MAIOR",cst:"2 Sintonia + 1 Lucidez",exe:"Ação",alc:"Toque",dur:"Instantânea",p:"Remove uma doença, veneno ou infecção não-anômala do alvo — ela passa a você em forma branda (−1) até o fim da cena.",t:"Igual, sem o desconto: o Germe come na hora, satisfeito.",c:"E o alvo cura 1d4 — o corpo dele agradece a desocupação.",sob:"+1 de Vida = alcança uma aflição anômala de Grau ≤2 (o aluguel vira Semeado (1) em você por 2 turnos).",fal:"Hóspede Teimoso: não sai dele — e uma versão fraca pega em você."},
{el:"ger",g:2,n:"Casca de Musgo",tipo:"DEFESA QUE PLANTA",cst:"2 Sintonia + 1 de Vida",exe:"Ação",alc:"Pessoal ou toque",dur:"Cena",p:"Absorção 1.",t:"Absorção 2, e quem te acertar corpo a corpo fica Semeado (1).",c:"Absorção 2 e imune a Sangrando enquanto durar.",sob:"+1 de Vida = também em um aliado tocado. Você range e cheira a mato: −1 em Furtividade e social fino.",fal:"Casca Verde Demais: Absorção 1, mas gruda — remover no fim da cena custa 1 de dano."},
{el:"asc",g:3,n:"Arsenal da Carne",tipo:"TRANSMUTAÇÃO",cst:"3 Sintonia + 2 Lucidez",exe:"Ação",alc:"Pessoal",dur:"Cena",p:"Sai instável (−1 com ela).",t:"Plena.",c:"Plena e viciada em servir: +1 com ela, e o primeiro golpe da cena tem Vantagem.",sob:"+2 Sintonia = duas formas ao mesmo tempo. Escolha: Lâmina (dano +2, Sangrando em Total) · Disparador (Curto, dano +2, 1 de Vida por tiro) · Escudo (+2 Limiar).",fal:"Parto Seco: nasce pela metade — −1 em tudo até gastar uma Ação empurrando de volta."},
{el:"asc",g:3,n:"Colheita de Força",tipo:"DRENAGEM",cst:"3 Sintonia + 2 Lucidez",exe:"Ação",alc:"Toque (alvo agarrado, caído ou incapacitado)",dur:"Até o fim da cena",p:"Rouba 1 ponto de atributo físico por uma cena (ele −1, você +1).",t:"Rouba 2 pontos, ou 1 físico + a perícia treinada que ele mais usa.",c:"Rouba 2, e a devolução é incompleta: ele fica −1 até descansar.",sob:"+2 Sintonia = rouba à distância Curta. A extração dói: 1 de dano no alvo.",fal:"Refluxo de Carne: ganha o bônus, mas com espasmos — 1–2 num d6 = a ação sai violenta demais ou errada."},
{el:"asc",g:3,n:"Fusão",tipo:"UNIÃO",cst:"3 Sintonia + 2 Lucidez",exe:"Ação (tocando o veículo)",alc:"Toque",dur:"Cena, ou até sair",p:"Fusão rasa — opera com +1, mas colisões doem: metade do dano estrutural vira seu.",t:"Fusão plena — +2 para operar, manobras impossíveis viram possíveis, +2 Percepção ao redor do casco.",c:"O veículo desperta junto: +1 numa característica dele pela cena.",sob:"+2 Sintonia = a fusão dura até você dormir. Sair: Ação.",fal:"Engrenado: sair exige Têmpera (9), e cada falha custa 1 Lucidez. Ela gostou de ter mãos."},
{el:"asc",g:4,n:"Despertar a Fábrica",tipo:"DOMÍNIO",cst:"5 Sintonia + 3 Lucidez",exe:"Ação",alc:"Médio",dur:"Cena · Sustentada (1 Sintonia/turno)",p:"O ambiente vira hostil aos inimigos — terreno difícil, e 1 ataque ambiental por turno (1d4).",t:"2 ataques/turno, e você sela ou abre qualquer passagem como Ação Livre.",c:"—",sob:"—",fal:"—"},
{el:"pac",g:4,n:"Audiência",tipo:"COMUNHÃO",cst:"4 Sintonia + 2 Lucidez",exe:"Ritual (cena; círculo selado; oferta digna)",alc:"O círculo",dur:"[Têmpera] perguntas, ou 10 min",p:"Audiência curta, contraparte impaciente: meias-respostas, preços um degrau acima.",t:"Audiência plena; respostas verdadeiras (e literais); preço de tabela.",c:"Você impressionou — uma resposta gratuita, ou um desconto real num acordo fechado agora.",sob:"+2 Sintonia = convoca uma potência específica que você saiba nomear. Dentro do círculo ninguém mente — cada mentira: 1d4.",fal:"Protocolo Quebrado: nada respondido, oferta consumida, e sua próxima magia do Pacto custa +1 Lucidez."},
{el:"eco",g:1,n:"Reviver",tipo:"AUTOMÁTICA DO MARCADO",cst:"—",exe:"—",alc:"—",dur:"—",p:"",t:"Magia automática de quem é Marcado pelo Eco — não conta no limite de conhecidas. (Texto completo no Grimório.)",c:"",sob:"",fal:"",auto:true},
{el:"vaz",g:1,n:"Lança do Nada",tipo:"AUTOMÁTICA DO MARCADO",cst:"—",exe:"—",alc:"—",dur:"—",p:"",t:"Magia automática de quem é Marcado pelo Vazio — não conta no limite de conhecidas. (Texto completo no Grimório.)",c:"",sob:"",fal:"",auto:true},
{el:"ger",g:1,n:"Broto Faminto",tipo:"AUTOMÁTICA DO MARCADO",cst:"—",exe:"—",alc:"—",dur:"—",p:"",t:"Magia automática de quem é Marcado pelo Germe — não conta no limite de conhecidas. (Texto completo no Grimório.)",c:"",sob:"",fal:"",auto:true}];

/* ---- TALENTOS (Cap. 14) ---- */
const TALENTOS=[
[1,"Casca Grossa","+1 de Vida máximo a cada nível par (no nível 15, são +7 acumulados)."],
[1,"Reflexos Treinados","+1 na iniciativa."],
[1,"Pé Rápido","Em perseguição, você age primeiro na abertura e ganha +1 na primeira rodada."],
[1,"Fuga Limpa","1×/cena, numa perseguição: ignore um obstáculo ou ganhe um sucesso extra na corrida."],
[1,"Esconderijo Improvisado","1×/cena, com qualquer cobertura, você some de vista por um turno, mesmo perseguido."],
[1,"Mão Trocada","Sacar ou trocar de arma ou ferramenta nunca gasta ação."],
[1,"Gatuno","+1 em Mãos Hábeis; arrombar e furtar leva metade do tempo; num Parcial de arrombamento, a complicação nunca é barulho."],
[1,"Faro de Saída","Ao entrar num lugar, o mestre te diz a saída mais próxima — inclusive as não-óbvias."],
[1,"Faro de Investigador","1×/cena, ao Examinar uma cena, faça uma pergunta extra ao mestre sobre ela."],
[1,"Memória Fotográfica","Grave uma cena, objeto ou rosto; depois reexamine a imagem mental sem teste, quantas vezes quiser."],
[1,"Pulso Firme","1×/cena, ignore a primeira reação de medo que a cena exigiria — o teste de Coragem não acontece."],
[1,"Estômago de Ferro","Imune a enjoo, comida estragada e embriaguez leve; +1 contra venenos ingeridos."],
[1,"Improviso Útil","1×/sessão, declare ter um item simples e barato com você: isqueiro, barbante, canivete, giz."],
[1,"Pechincha","1×/sessão, consiga um item ou serviço por muito menos — ou de graça, por um favor que o mestre anota."],
[1,"Contato Fiel","+1 de Gente máximo, e um contato menor de confiança, fixo, na sua região."],
[1,"Resoluto","+1 de Lucidez máximo."],
[2,"Adrenalina","Abaixo de 1/3 da Vida: +1 em todos os testes físicos, e ferimentos não reduzem seu deslocamento."],
[2,"Descarga de Adrenalina","1×/sessão, logo após um susto ou ferimento grave, tome uma ação extra agora, fora da ordem."],
[2,"Saque Veloz","1×/cena, sacar não gasta ação, e o primeiro ataque após o saque ganha +1 se o alvo não esperava."],
[2,"Tiro Certeiro","Gaste 1 de Fôlego para somar +2 a um ataque à distância (declare antes de rolar)."],
[2,"Combatente Sujo","1×/cena, ao acertar, declare o golpe baixo: o alvo testa Carne (7) ou fica Atordoado."],
[2,"Improvisador de Combate","1×/cena, transforme um objeto do cenário em arma (+1) ou em vantagem tática."],
[2,"Carga de Guerra","Usa armas pesadas sem preparo e ignora 1 ponto do requisito de Força delas."],
[2,"Duro de Matar","1×/sessão, ao cair a 0 de Vida, fique em 1. Não acumula com outra rede do tipo na mesma queda."],
[2,"Segundo Fôlego","1×/cena, gaste sua Ação para recuperar [Têmpera + 1] de Fôlego e remover Lento ou Exausto."],
[2,"Especialista","Escolha 1 perícia: nela, Parciais (6–9) contam como Totais. Recomprável (outras perícias)."],
[2,"Dois Ofícios","Escolha 2 perícias e um nicho para cada; dentro do nicho, contam como treinadas."],
[2,"Intuição Aguçada","1×/cena, faça ao mestre uma pergunta de sim ou não sobre a cena; a resposta é honesta.",["tem",1]],
[2,"Leitura Fria","Ação (1 min de conversa): descubra um fato verdadeiro que a pessoa esconde."],
[2,"Negociador de Crise","1×/cena, force uma pausa num impasse: quem atacar testa Têmpera (7) ou segura a mão por 1 rodada; na pausa, os testes sociais do grupo ganham +1."],
[2,"Mente Blindada","+2 contra a primeira perda de Lucidez de cada cena.",["tem",1]],
[2,"Plano de Fuga","1×/sessão, você e os aliados próximos escapam de um cerco; descreva a rota, o mestre define o que fica para trás."],
[2,"Improviso Médico","Sucata vira kit: estabiliza e trata sem material próprio, com −1."],
[2,"Mãos de Curandeiro","Você Estabiliza com Vantagem, e seus primeiros socorros também curam um pouco de Vida."],
[2,"Rede de Contatos","+2 de Gente máximo, e Cultivar Gente no downtime rende mais."],
[3,"Mente Inquebrável","Se uma única perda de Lucidez te levaria a 0, você para em 1. Acúmulos na mesma cena ainda derrubam.",["tem",2]],
[3,"Marca de Sorte","1×/sessão, “arme” a sorte: o próximo par de dados iguais que você rolar é tratado como 6+6."],
[3,"O Improvável","1×/sessão, declare uma ação impossível-mas-imaginável: ela acontece como Parcial garantido, e o mestre define o preço."],
[3,"Premonição de Perigo","1×/sessão, anule completamente uma emboscada, traição ou armadilha contra o grupo."],
[3,"Veterano de Mil Cenas","Defina um tipo de cena; nela, 1×/cena, role com Vantagem. Recomprável (outro tipo)."],
[3,"Sortudo Teimoso","Seu teto de Brio sobe para 7, e você começa cada sessão com +1 de Brio."],
[3,"Presença de Comando","1×/cena, gaste uma Ação e sua Lábia para dar Vantagem a um aliado, ou remover dele um Apavorado ou Confuso."],
[3,"Faro Sobrenatural","O mestre te avisa quando há algo paranormal por perto. Em troca, você cruza os limiares de ⟑⋏⊙⌖◊ um ponto mais cedo."]];

const FX_SUS_GER=["“Você aceita?”"]; /* reservado */
const BANDS=[[0,0,"Silêncio"],[1,3,"Estática"],[4,7,"Interferência"],[8,12,"Distorção"],[13,16,"Invasão"],[17,20,"Colapso"]];
function bandOf(r){for(let i=BANDS.length-1;i>=0;i--)if(r>=BANDS[i][0]&&r<=BANDS[i][1]||r>=BANDS[i][0]&&i===BANDS.length-1)if(r>=BANDS[i][0])return i;return 0;}

# DOCUMENTO-FONTE DA CAMPANHA
## Protocolo — Horror Cósmico · Porto Alegre, 2002

> **O QUE É ESTE DOCUMENTO**
> Esta é a fonte-de-verdade que reúne TODO o material de campanha que foi desenvolvido em conversa e que **não está no repositório GitHub**. Ele existe para ser lido ao lado do cânone que já está no repo. Juntos — repo + este documento — formam o pacote completo para escrever o **Livro de Campanha** (o "guia do mestre", estilo *Curse of Strahd*).
>
> **Este documento é material de MESTRE.** Ele contém segredos que os jogadores nunca podem saber. Leia a Seção 0 (Instruções) antes de qualquer coisa.

---

# SEÇÃO 0 · INSTRUÇÕES PARA QUEM VAI ESCREVER O LIVRO

## 0.1 · A tarefa
Escrever o **Livro de Campanha** — um livro de mestre robusto, completo e, acima de tudo, **fácil de navegar e de narrar sob pressão** (no meio de uma sessão, com jogadores esperando). Referência de módulo publicado: *Curse of Strahd*. Cada bairro é detalhado local por local, sala por sala, com testes, boxed text e tabelas. A meta de qualidade é "300 páginas se for preciso, contanto que seja tudo útil e localizável".

Este livro é **como narrar**, não **como jogar**. As regras do sistema (dados, criação de personagem, números) NÃO entram aqui — elas vivem nos livros de regra do Protocolo e na ficha. Ver Seção 11.

## 0.2 · As duas fontes de verdade (leia AMBAS)
1. **O REPOSITÓRIO GITHUB** — o cânone cosmológico e o sistema. Contém:
   - `Historia/livro_do_passado.html` — cosmogonia, a Forja, o Acordo do Começo, os 8 mundos descartados.
   - `Historia/registro_dos_antigos.html` — o Escultor + os 6 Ápices (dossiês completos).
   - `Criaturas/bestiario.html` — as 30 criaturas/fenômenos.
   - *(Se existirem no repo)* documentos dos Chefes, e `Sistema/grimorio.html` (o Grimório dos Seis).
   - `Ficha/data.js` e `Ficha_Automatica.html` — a ficha (NÃO ALTERAR).
2. **ESTE DOCUMENTO** — tudo o que foi criado depois e que não foi para o repo: a abertura, a estrutura da campanha, o blueprint dos bairros, o molde de local, as regras de tom e a distribuição.

> Onde este documento e o repo divergirem, **o mais recente vence** — e o mais recente é, em geral, este documento (o cânone evoluiu; ex.: os elementos passaram de 5 para 6, com a entrada do **Germe**). Ver Seção 11.

## 0.3 · AS REGRAS DE OURO (inegociáveis)

**REGRA 1 — A camada de segredo.** Este universo tem DUAS verdades: a dos jogadores e a do mestre. O Livro de Campanha é do mestre, então PODE conter os nomes cósmicos. MAS **nada que seja lido em voz alta ou entregue aos jogadores (boxed text, handouts, documentos-prop) pode conter esses nomes**. Nunca em material de jogador: **o Escultor**, os nomes dos **Ápices** (Kénoma, Amálgama, Antífona, Synthékos, Argos, Perpétua), os nomes das **criaturas** (o Oco, o Corretor, etc.), as palavras **"Forja"**, **"Ápice"**, **"Acordo do Começo"**, **"Sem-Nome"**. Os jogadores sentem a mão descer; nunca leem o nome da mão. Regra prática: **boxed text e props = linguagem de jogador (sem nomes cósmicos); texto de mestre = pode nomear tudo.**

**REGRA 2 — Amplie o mistério, nunca o resolva.** Toda revelação abre duas perguntas novas. Não "complete" lacunas com explicações cósmicas. Se um trecho estiver misterioso de propósito, mantenha-o misterioso.

**REGRA 3 — O terreiro é competente, não é a fonte do horror.** (Detalhado em 2.8 / Parte I.) Batuque, Umbanda e Quimbanda FUNCIONAM para o sobrenatural comum; quem os pratica é sábio e aliado, e é o primeiro a dizer "isso não é nosso, não mexe". O antagonista humano é **quem acha que sabe** e **quem persegue quem sabe** — nunca a fé de terreiro. Isto é inegociável.

**REGRA 4 — Fonte única.** Não reescreva lore que já existe no repo. Referencie pelo nome / por link. O cânone completo das criaturas, Ápices e mundos vive nos documentos de mestre; o Livro de Campanha traz apenas a **ficha de uso rápido** + ponteiro para o doc completo.

**REGRA 5 — O ano é 2002.** Sem celular na mão (orelhão, cartão), internet discada, VHS/fita/disquete, a Copa de 2002, ano de eleição. Nunca use anacronismos (não há smartphone, não há redes sociais; Orkut só existe em 2004).

## 0.4 · O molde a replicar
O formato das fichas de local e de bairro está na Seção 7, com um exemplo completo (o Mercado Público, C1). **Replique esse molde exatamente** em todos os locais dos seis bairros. O blueprint da Seção 8 diz *o que* existe em cada bairro; o molde diz *como* escrever cada local.

## 0.5 · O que NÃO fazer
- Não invente mecânica nova nem números de regra (isso é da ficha; ver Seção 11).
- Não promova apelidos locais a cânone (ex.: "Ápeiron", "argivo" são apelidos que o povo dá, escritos em minúscula; não são nomes cósmicos oficiais).
- Não coloque nomes cósmicos em boxed text/props.
- Não contradiga o repo; na dúvida, consulte-o.

---

# SEÇÃO 1 · ARQUITETURA DO LIVRO DE CAMPANHA

Um volume único, navegável ao extremo (índice mestre + menu lateral fixo + âncora em cada local, NPC, gancho e criatura). **Feio-funcional é uma escolha:** alto contraste, fonte legível, cores só como código de navegação (cada bairro/elemento com sua cor), tabelas de referência rápida. É ferramenta de trabalho, não objeto de arte.

**As 6 partes:**
- **Parte I — O Mestre.** Como conduzir: tom, régua da Forja, Relógio do Acabamento + o martelo, a camada de segredo, a Atenção, a regra do terreiro, a teia, o ritmo de revelação. (Conteúdo completo na Seção 2 deste documento.)
- **Parte II — A Verdade (só do mestre).** Resumo-chave do cosmos que o Grimório esconde, + ponteiros para os docs de mestre. (Seção 3.)
- **Parte III — A Cidade.** Porto Alegre 2002, cidade-espelho, os 6 bairros em consulta rápida, os nós de gravidade. (Seção 4 — visão geral; Seção 8 — o blueprint detalhado dos bairros.)
- **Parte IV — A Teia & o Relógio.** Os 8 ganchos com os fios entre eles, os 4 nós de gravidade, as 4 estações do Acabamento, onde os Chefes acordam. (Seções 6 e 9.)
- **Parte V — A Abertura.** "O Velório" beat a beat, o Jonas, o gancho do formulário. (Seção 5.)
- **Parte VI — Bestiário de Mesa.** Criaturas e Chefes em ficha de uso rápido (o essencial na hora + link pro doc completo). Fonte: `Criaturas/bestiario.html` e os docs dos Chefes no repo.

**Formato por tipo (decidido):** LOCAIS e CENAS têm boxed text (leitura em voz alta). PERSONAGENS e CRIATURAS não têm boxed text (o mestre improvisa a fala) — só informação enxuta de interpretação.

---

# SEÇÃO 2 · PARTE I — O MESTRE (conteúdo completo)

## 2.1 · A regra de ouro
**Amplie o mistério, nunca o resolva.** Cada revelação abre duas perguntas novas. Se os jogadores entenderam tudo, você explicou demais. O horror não é o desconhecido que ataca — é o *conhecido chegando errado*: o amor que não solta, o morto que volta, o descanso que cobra tudo. Nada neste mundo odeia os jogadores. Pior: tudo os *quer*.

## 2.2 · A frase que resume tudo
> *"Você não está sendo atacado. Você está sendo terminado."*

As coisas não querem matar os personagens. Querem *completá-los, guardá-los, mantê-los* — por amor. É isso que apavora.

## 2.3 · A régua da Forja (o termômetro secreto)
Tudo está entre **quente** e **frio**. Quente = perto da mão que trabalha = vivo, mutável, sendo feito. Frio = longe da mão = pronto, fixo, acabado, morto. *O que está pronto está morto.* A cidade inteira esfria rumo ao pronto. Ao descrever qualquer coisa, pergunte onde ela está na régua: vivo é quente, caótico, barulhento; quase-terminado é silencioso, frio, imóvel, "perfeito". **Frieza e silêncio são os sinais de que algo está quase pronto — quase morto.**

## 2.4 · O Relógio do Acabamento
Um mostrador de **1 a 12**, só do mestre, que **só anda pra frente**. Começa em 1 (o Velório) e termina em 12 (o fim). Avança por duas forças:
- **Tique natural:** a cada marco ou punhado de sessões, sobe 1 — faça o que fizerem.
- **Tique provocado:** quando alguém compreende demais, brilha demais, é notado demais (traduz um glifo, aceita um pacto, vence um Chefe com espetáculo), o mostrador **salta**. **Ser notado acelera o fim.**

**As quatro estações** (a cidade inteira responde de uma vez):
- **Frescor (1–3):** algo está errado. Anomalias sutis, negáveis.
- **Esfriando (4–6):** não é coincidência. Ganchos não-tocados pioram sozinhos; some gente.
- **Endurecendo (7–9):** a cidade muda. Bairros esfriam; Chefes saem dos covis.
- **Acabamento (10–12):** está quase pronto. A cidade vira um mundo morto em tempo real.

**A lição que os jogadores aprendem sem você dizer:** discrição sobrevive, heroísmo acelera o fim. Resolver um gancho com cuidado (respeitando as regras de sobrevivência) não avança o Relógio; resolver no espetáculo, avança.

## 2.5 · O martelo (o som do Relógio)
Toque um som de **martelo** a cada avanço do Relógio. **Começa alto e perto; fica mais distante e mais espaçado** a cada estação. Enquanto bate perto, a peça (a cidade, eles) ainda está sendo trabalhada — viva. Quando fica longe e raro, a mão se afastou: está deixando a peça esfriar. **O silêncio final não é paz — é o momento em que estão prontos.** Os jogadores vão torcer, sem saber por quê, pra continuar ouvindo o martelo. (Ritmo: no Frescor, batidas próximas e ritmadas; no Acabamento, uma batida solitária ecoando. Última sessão: uma martelada final, e depois nada.)

## 2.6 · A camada de segredo
Ver REGRA 1 (Seção 0.3). A verdade dos jogadores está no Grimório e na cidade (forças sem dono, elementos, preços). A do mestre está aqui e nos docs de mestre (os nomes). Nunca diga na mesa nem coloque em handout: o Escultor, os nomes dos Ápices, os nomes das criaturas, "a Forja", o Acordo, o Sem-Nome. Se perguntarem "quem faz isso?", a resposta do mundo é sempre silêncio ou um palpite errado (e reconfortante).

## 2.7 · A Atenção (o Escultor, sem nome)
O medidor de mestre (antes chamado de Dharma) agora é **a Atenção**. Enche quando os personagens são notados (usam poder oculto, compreendem demais, brilham). Cheio, *algo* repara neles e a mão se aproxima. **Nunca nomeie o dono da Atenção.** O jogador vê o medidor subir e sente que está sendo observado por *alguma coisa*. É o Escultor. Ele nunca saberá disso.

## 2.8 · O vocabulário religioso (regra não-negociável)
No Rio Grande do Sul o terreiro é **competente**. Batuque, Umbanda, Quimbanda **funcionam** — para tudo que é do mundo. A gramática do povo para o invisível está certa, e quem a domina é **autoridade e aliado**, nunca a fonte do horror. **Regra fixa: quem conhece o terreiro é o primeiro a dizer "isso não é nosso, não mexe".** Os praticantes são sábios; o antagonista humano é **quem acha que sabe** (o charlatão, o exorcista arrogante) e **quem persegue quem sabe** (o fanático intolerante, o que queima o barracão). O horror é que essas molduras competentes *quase* servem — dão nome, ritual e algum controle — e erram o alvo, porque o que acontece não é entidade nem feitiço: é mais antigo, mais frio, e não responde a oferenda nenhuma. Deixe os personagens tentarem. **A moldura que quase encaixa é mais assustadora que o abismo aberto.**

## 2.9 · Como usar a teia
Nada é isolado. Todo gancho toca pelo menos dois outros. Quando os jogadores puxam um fio, mexa outro — o objeto do lugar A é a fraqueza do horror do lugar F. **O arquivo do Jonas é a teia feita literal:** a parede de barbante é o índice de ganchos. Quando não souber pra onde a sessão vai, olhe a teia e veja qual fio o último puxou.

## 2.10 · O ritmo de revelação (a escada)
1. O mundo errado antes do monstro (deixe estranho por uma sessão).
2. Fenômeno antes de Besta (assombra a cabeça antes de arrombar a porta).
3. Um testemunho pra dar escala (isto é maior e mais antigo do que parece).
4. Um Chefe como espelho, não como parede (bate numa emoção).
5. O cânone só no fim (vira tudo de cabeça pra baixo; e quem traduz, se acende).

---

# SEÇÃO 3 · PARTE II — A VERDADE (só do mestre)

> Nada aqui pode vazar. É o que o mestre sabe e os jogadores passam a campanha tentando descobrir. Resumo-chave; o cosmos completo está nos docs de mestre do repo (ponteiros ao fim).

## 3.1 · Em uma frase
Existe um deus que não ataca — ele **termina**. Guarda o que ama empurrando pro acabamento. E acabar, no idioma dele, é a mesma palavra que morrer.

## 3.2 · A Forja
O mundo é uma peça sobre uma bigorna. **Posição = estado de conclusão.** Perto da mão: quente, vivo, mutável. Longe: frio, pronto, morto. As criaturas não invadem de fora — **afloram** do mundo reaquecido pela atenção do Fazedor, como bolhas num metal que voltou ao fogo. Não há portal a defender; só o chão de casa lembrando que ainda é maleável.

## 3.3 · O Escultor
O deus no topo, de todos os elementos. Não é hostil — é **amoroso**, do pior jeito. Não suporta que algo que ele ama acabe; então mantém, guarda, termina — e o terminado está pronto, e o pronto está morto. Ser notado por ele é o primeiro corte, porque a atenção dele é a mão descendo. É a "Atenção" da ficha. **Os jogadores nunca sabem o nome dele.**

## 3.4 · Os seis Ápices (as forças puras)
Cada um é um elemento levado ao absoluto — o cinzel que ganhou vontade. **Nomes só do mestre:**
- **Kénoma** (Vazio) — o zero, o repouso de tudo; o que o próprio Escultor teme.
- **Amálgama** (Ascensão) — carne e metal, o acúmulo sem fim.
- **Antífona** (Eco) — o coro dos mortos que jura estar vivo.
- **Synthékos** (Pacto) — a página em branco do livro-razão; é o próprio preço.
- **Argos** (Observação) — o olho sem pálpebra.
- **Perpétua** (Germe) — a Lei da Semeadura, o jardim que engole.

Cada Marca de jogador é um desses tocando o personagem por dentro (ver Seção 11). O jogador vive a mecânica; nunca sabe o nome.

## 3.5 · O Acordo do Começo (o fundo falso)
No início houve uma dívida. Duas partes: uma fez, a outra pagou. Ninguém sabe quem é o devedor. Três leituras circulam, nenhuma confirmada — **nunca confirme nenhuma.** Segredo do mestre: favoreça em silêncio a leitura de que o Escultor deve ao Kénoma (o medo do Vazio vira medo de credor). É o mistério que a mesa orbita para sempre sem tocar o fundo.

## 3.6 · O Sem-Nome (a advertência)
Houve um que juntou fragmentos de todos os elementos e chegou perto demais de ser o que só o Escultor é. O Escultor não tolera um segundo "de todos". Então o **terminou**. Virou lenda-aviso. *(Regra opcional avançada, fora do livro dos jogadores: um jogador que acumule Marcas de vários elementos evoca o Sem-Nome — e atrai a Atenção pessoalmente.)*

## 3.7 · Onde achar o resto
Cosmos completo, com dossiês, lendas e feitos:
- **Livro do Passado** — cosmogonia, a Forja, o Acordo, os mundos descartados.
- **Registro dos Antigos** — o Escultor + os 6 Ápices.
- **Bestiário** — as 30 criaturas.
- **Os Chefes** — os 6 antagonistas nomeados (Alytros, Loki, Theoros, Mnemos, Vressalha, Thánatos-Nul).

O Livro de Campanha **aponta; não repete**.

---

# SEÇÃO 4 · PARTE III — A CIDADE (visão geral)

## 4.1 · O essencial em três linhas
Porto Alegre, 2002, cidade-espelho. Já parece uma peça esfriando antes de qualquer anomalia: úmida, cinza, fria, neblina subindo do Guaíba. O horror não invade — é a cidade sendo *mais o que já era*. E os mapas não batem: há bairros que não estão em planta nenhuma, ruas que voltam diferentes. *Há outros mundos além destes — alguns com o mesmo endereço.*

## 4.2 · As quatro ferramentas de 2002
- **Sem celular na mão:** orelhão exposto, cartão; sumir é fácil, demora pra notar.
- **Internet discada:** a linha ocupa, ninguém te alcança online; LAN house entre estranhos; ICQ/mIRC/MSN; sem redes sociais.
- **Mídia que degrada:** VHS, fita cassete, disquete, CD gravado — guardam coisa errada.
- **Atenção de massa:** a mesma novela, o mesmo Jornal Nacional, a Copa de 2002 (o penta), ano de eleição — a cidade toda olhando pra mesma coisa.

## 4.3 · A régua na cidade
O **Guaíba** é a borda fria — a face local da régua. Ao poente, depois do pôr do sol, a água vira a direção que não existe. A cidade inteira, muito devagar, escorre pra lá. Quanto mais o Relógio avança, mais forte o Guaíba puxa.

## 4.4 · Os seis bairros (um por elemento) — resumo
- **O Casario** (Observação) — centro histórico apodrecendo; janelas demais.
- **A Baixa** (Pacto) — boemia noturna; encruzilhadas, tratos.
- **As Ilhas** (Germe) — delta que alaga; mato, mofo, a paz que planta.
- **O Alto** (Vazio) — dinheiro velho parado; ausência preservada, frio.
- **O Aterro** (Ascensão) — periferia/ferro-velho; acúmulo que cresce.
- **A Várzea** (Eco) — parque e brique; rituais que se repetem.

*(Detalhamento completo na Seção 8.)*

## 4.5 · Os quatro nós de gravidade (pra onde tudo puxa)
- **O apartamento do Jonas** — a base involuntária; a parede de barbante é o índice dos ganchos. Piora a cada visita (mais barbante, mais anotações que não estavam lá).
- **O Guaíba / o poente** — o dreno; a morte do Jonas leva pra cá no dia 1; pra onde tudo escorre.
- **A instituição** — o "Castelo" que se move (clínica, estande, van); caçada a campanha toda; sem endereço fixo. Forte candidata a sede: a Vila Serena, no Alto (A4).
- **O nó pessoal de cada jogador** — o lugar da ferida revelada pelo formulário; onde o primeiro contato dele acontece.

---

# SEÇÃO 5 · PARTE V — A ABERTURA ("O Velório")

## 5.1 · O Jonas — o louco que estava certo
Jonas era o "maluco do outro lado": acreditava em tudo, via conspiração em cada esquina, parede coberta de recortes e barbante vermelho, postava de madrugada em fórum estranho. Ninguém o levava a sério. **E ele estava certo.** Afogou no Guaíba, que ele vivia dizendo ser "uma porta" — e o rio não devolveu o corpo. Choram-no como um coitado que se perdeu no rio; ninguém sabe que ele foi o único que enxergou. Perseguiu todas as conspirações; a única real o encontrou. Preencheu o Formulário *animado*, achando que tinha enfim achado "eles". Foi admitido. Morreu.

## 5.2 · O arquivo (o motor da investigação)
Jonas deixou uma montanha de material "insano" — cadernos, prints de fórum, fitas VHS, gravações de cassete, a parede de barbante. Todos achavam lixo de doente. Agora que ele morreu, o arquivo começa a *bater*. É a forma diegética de entregar o lore: as teorias do Jonas são meio certas, meio erradas, tentadoras e perigosas.
- **A parede de barbante = o índice de ganchos.** Os 8 ganchos (Seção 9) são o que está pregado na parede, com barbante ligando um ao outro. O arquivo é o mapa da campanha; cada fio que os jogadores puxarem prova, mais um pouco, que o Jonas nunca foi louco.
- **O arquivo carrega os documentos de superfície** (o panfleto "nada que se ama tem permissão de acabar", os prints da pichação "há outros mundos além destes", o bilhete da melodia). A primeira vez que os jogadores os veem é na coleção do Jonas.

## 5.3 · A ligação com os jogadores
Cada jogador tem uma relação diferente com a loucura do Jonas (família envergonhada, crente secreto, vítima das ligações às 3h, o amigo que o descartava). O que une o grupo: **nas últimas semanas, o Jonas ficou frenético e tentou avisar cada um deles** — um pacote, uma fita, um e-mail delirante, um telefonema — e todos ignoraram. Ele morreu. Culpa + curiosidade = o grupo.

## 5.4 · O Lúcio (ponta em aberto proposital)
O Lúcio existe, está por aí e **não sabe que o Jonas morreu**. O Jonas foi o único que tentou avisá-lo de que o pacto dele (com o poder do Pacto) era uma armadilha; o Lúcio riu do amigo maluco. É o espelho do Chefe Alytros: a ilusão de importância (Lúcio) vs. a paranoia correta descartada (Jonas). **Ele entra em jogo quando o mestre entrar junto com os jogadores** — timing de mesa real. NÃO cristalizar agora.

## 5.5 · A instituição + o formulário (unificados)
A instituição não tem lugar fixo — é a coisa que chega para quem o Jonas tocou. Ele preencheu o Formulário, foi admitido, morreu. Agora chega aos jogadores: **você é o próximo.** (O Formulário de Admissão é o dispositivo de session zero — ver Seção 12; a folha de diagnóstico do mestre mapeia o elemento mais propício de cada jogador.)

## 5.6 · A cena de abertura — "O Velório" (6 beats, pronta para rodar)
- **Beat 0 — Session zero (o truque do formulário):** os jogadores preenchem o Formulário achando que é criação de personagem. O punch: no fim da sessão 1, o mesmo formulário chega aos personagens dentro da ficção.
- **Beat 1 — A convocação:** inverno, garoa, cidade cinza. Cada personagem recebe a notícia de um jeito diferente e chega a uma sala de velório modesta.
- **Beat 2 — O velório:** o luto envergonhado de quando morre "o maluco". Meio pesar, meio alívio. Estranhos entre si.
- **Beat 3 — A rachadura:** **não há corpo** — só uma foto e uma missa ("o rio não devolveu nada"). E, no fundo da sala, **um estranho** que ninguém conhece, que assina o livro de presença com um nome que não bate com pessoa nenhuma e sai antes do fim (a instituição, observando).
- **Beat 4 — O encontro:** os personagens descobrem que todos receberam uma última mensagem frenética do Jonas, que cada um ignorou. Comparando os fragmentos, percebem que era um recado só, partido em pedaços.
- **Beat 5 — O arquivo:** a família (aliviada) entrega a "tranqueira" do Jonas: cadernos, fitas, a parede de barbante. *"Levem isso, não quero essa loucura em casa."*
- **Beat 6 — O cliffhanger:** dias depois, chega pelo correio, para cada um, sem remetente: **o Formulário de Admissão**, com o nome já preenchido no rodapé. *Você é o próximo.* Fim da sessão 1.

---

# SEÇÃO 6 · PARTE IV — A TEIA & O RELÓGIO (a estrutura da campanha, modelo *Curse of Strahd*)

## 6.1 · O princípio
Sandbox com gravidade: os jogadores vão aonde quiserem, mas todo lugar importa e tudo se interliga como um mundo real. Isso se consegue com: **dois cubos** (ganchos que tocam todos os outros), **fios concretos** entre ganchos (um objeto, uma pista, um efeito — nunca uma conexão vaga), um **fundo** em cada fio (gancho → besta → Chefe → Ápice), e a **espinha** (o arquivo do Jonas).

## 6.2 · Os dois cubos
- **O Casario (Observação)** — VÊ os outros horrores. A janela a mais dá pra dentro de outro gancho; a Foto da Multidão contém rostos de outros ganchos. É a torre de onde a teia é visível.
- **A Baixa (Pacto)** — VENDE a saída dos outros. O Corretor oferece a solução de qualquer gancho, por um preço. Todo travamento tem um atalho aqui — que alimenta um Chefe.

## 6.3 · Os fios (resumo — detalhe nas ligações da Seção 8)
- **Guaíba ↔ Ilhas** (a mesma água que não devolve) ↔ **Alto** (o ausente levado pelo rio) ↔ **Jonas** (afogou aqui).
- **Alto ↔ Aterro** (o que o Alto esvazia, o Aterro acumula — polos opostos, mesmo fio).
- **Ilhas ↔ Várzea** (as vozes da família-jardim estão na Fita).
- **Várzea ↔ Aterro** (a fita destruída volta porque o descartado retorna pelo Ferro-Velho).
- **Casario ↔ tudo** (vê) e **Baixa ↔ tudo** (vende).

## 6.4 · Onde moram os Chefes (mistura: alguns com covil, outros circulam)
- **Com covil:** **Vressalha** → As Ilhas (é o jardim que a enchente fez). **Theoros** → O Casario (a cidade de olhos onde engorda). **Mnemos** → A Várzea (onde o passado não passa; a Fita é a isca).
- **Circulam livres:** **Alytros** (Pacto+Vazio) — persegue o Synthékos usando as pessoas; gravita pro Lúcio e pros jogadores; o "lacaio que aparece pro jantar". **Loki** — o curinga; pode se passar por aliado em qualquer gancho e embaralhar os fios pela zoeira; o único que o Escultor não termina.
- **Zona que avança (nem covil nem andarilho):** **Thánatos-Nul** → o Guaíba, o poente. Não é covil que se invade; é a borda fria que se aproxima. O fim da régua.

## 6.5 · O fundo de cada fio
| Puxe este fio | chega em | e no fundo |
|---|---|---|
| Guaíba / Ilhas (a água) | Thánatos-Nul | **Kénoma** |
| Casario (ser visto) | Theoros | **Argos** |
| A Baixa (o trato) | Alytros | **Synthékos** |
| Ilhas (o jardim) | Vressalha | **Perpétua** |
| Várzea (o eco) | Mnemos | **Antífona** |
| Aterro (o acúmulo) | o Coletor / "ápeiron" | **Amálgama** |

## 6.6 · Os fios que andam (NPCs recorrentes que costuram a cidade)
- **O Estranho** do velório (a instituição, sempre na beira das cenas, observando).
- **O Corretor** (o trato, em qualquer bairro).
- **Loki** (o curinga que pode ser o "aliado" de qualquer arco).

## 6.7 · As engrenagens do Relógio ligadas à teia
- **Cada gancho não-tocado avança sozinho.** Se os jogadores passam três sessões no Casario e ignoram as Ilhas, quando chegarem lá a Enchente já cobrou mais gente. Os lugares não esperam.
- **Os Chefes "acordam" por faixa do Relógio.** Os de covil acordam no Esfriando; os que circulam ficam perigosos no Endurecendo; Thánatos-Nul é o Acabamento em pessoa.

---

# SEÇÃO 7 · O MOLDE (replicar em todos os locais e bairros)

## 7.1 · Molde de BAIRRO (abertura de capítulo)
Cada bairro abre com: **Nome · Elemento · epíteto** · **Onde fica** · **A espinha** (a planta e como os locais se ligam, em texto) · **A história** · **O clima de mesa** (como narrar) · **Lista de locais** · **NPCs-chave** · **Ligações internas** (a teia do bairro) · **Ligações externas** (pra outros bairros) · **Distribuição** (ganchos, documentos, loot) · **Tabela de loot** (d20/d66, temática do elemento) · **Tabela de encontros/eventos** (o que acontece se vagam).

## 7.2 · Molde de LOCAL (repetir para cada local nomeado)
Cada local recebe um código (ex.: C1, C2…) e esta ficha fixa:

**C# · NOME DO LOCAL** · *(elemento/temperatura, se relevante)*
> **[boxed text]** — o que os jogadores veem/ouvem/cheiram ao chegar. 2–4 linhas para ler em voz alta. **SEM nomes cósmicos.**

- **O que é:** uma linha — a função mundana do lugar.
- **Localização:** onde fica no bairro, o que há ao redor.
- **As salas/áreas:** lista numerada (C#.1, C#.2…), cada uma com o que tem, o que se vê, o que está escondido.
- **Quem está aqui:** ocupantes (link para a ficha de NPC).
- **A verdade (mestre):** o que realmente se passa. (Pode conter nomes cósmicos — é texto de mestre.)
- **Testes para achar:** o que se descobre, com qual perícia+atributo e qual Limiar. Formato: *Atributo+Perícia, Limiar N: [o que revela]*. (Atributos do Protocolo: Carne, Nervo, Juízo, Têmpera, Lábia. Ver Seção 11.)
- **Loot:** o que se encontra/leva + rolagem na tabela do bairro.
- **O fio:** como conecta a outros locais/ganchos/bairros.
- **Se escalar:** o que muda no local conforme o Relógio (Frescor → Esfriando → Endurecendo → Acabamento).

## 7.3 · EXEMPLO COMPLETO — C1 (usar como gabarito de qualidade e formato)

**C1 · O MERCADO PÚBLICO**
> *"Um casarão de ferro e vidro de outro século, dois andares de bancas sob uma clarabóia encardida. Peixe, especiaria, erva, chimarrão, miudezas. O barulho é de multidão, mas dá pra sentir, na nuca, que no meio de todos esses olhos que não te conhecem tem um ou dois que te conhecem bem demais. No mezanino, alguém está debruçado na grade, olhando pra baixo. Olhando pra você."*

- **O que é:** o mercado central da cidade — comida, ervas e o coração social do Casario. Todo mundo passa por aqui.
- **Localização:** pé da Rua da Praia, entre a espinha do bairro e o Cais. Térreo + mezanino.
- **As salas/áreas:**
  - **C1.1 · O salão térreo** — dezenas de bancas. Compra-se de tudo e ouve-se *tudo* (centro de fofoca da cidade — ótimo para informação). Uma banca de ervas é de **Dona Percília** (erveira; sabe do sobrenatural, é aliada).
  - **C1.2 · O mezanino** — bancas quietas, miudezas e usados. Do parapeito vê-se o salão inteiro. É de lá que *alguém sempre observa* — e às vezes esse alguém não devia estar ali.
  - **C1.3 · Os fundos / câmara fria** — depósito, gelo, caixas. Onde some coisa. Frio demais até para uma câmara fria.
- **Quem está aqui:** Dona Percília (erveira, aliada); Seu Adão (o zelador que conta as janelas; aparece muito aqui); vendedores e fregueses.
- **A verdade (mestre):** o mezanino é um dos pontos onde o Casario "vê demais" — quem passa muito tempo no parapeito olhando o salão começa a ser contado como janela (fenômeno de Observação / Argos). A câmara fria está esfriando *além* do normal: um ponto onde a régua já pendeu pro pronto.
- **Testes para achar:**
  - *Presença/Lábia + Intuição, Limiar 6:* alguém no mezanino te observa desde que você entrou.
  - *Juízo + Investigação, Limiar 8:* nos últimos meses, três pessoas "sumiram" do mercado e ninguém lembra os nomes — só a banca vazia que ninguém reabre.
  - *Juízo + Ciências/Ofício, Limiar 10:* a câmara fria perde calor rápido demais; a física não fecha.
- **Loot:** ervas de Dona Percília (incluem as que *funcionam* contra o sobrenatural comum — ver tabela de loot); miudezas do mezanino (1 rolagem na Tabela de Loot do Casario); na câmara fria, algo escondido no gelo (rolagem com vantagem, mas custa Atenção pegar). **Documento (Superfície):** o panfleto "nada que se ama tem permissão de acabar" numa banca.
- **O fio:** Dona Percília manda os jogadores à Praça das Almas (C7) e a Seu Adão. A câmara fria conecta ao Alto (o frio, o pronto). O mezanino "que observa" é o primeiro sinal do gancho do Zelador.
- **Se escalar:** *Frescor* — só a sensação de ser olhado. *Esfriando* — a banca de quem sumiu continua lá, intacta, mercadoria "fresca". *Endurecendo* — o mezanino tem sempre uma pessoa a mais do que dá pra contar. *Acabamento* — a câmara fria se espalhou; metade do mercado é gelo e silêncio, as bancas "prontas", perfeitas, mortas.

---

# SEÇÃO 8 · O BLUEPRINT DOS SEIS BAIRROS (Fase A — a planta a detalhar)

> Esta seção é o mapa geral. Cada local abaixo (69 no total) deve ser expandido no molde da Seção 7.2/7.3. NPCs (30) recebem ficha própria (sem boxed text). As ligações e a distribuição já estão definidas — respeite-as.

## 8.1 · O CASARIO · Observação · *o bairro que conta as janelas*
**Onde fica:** centro histórico, encostado no Guaíba a oeste, subindo ao norte até o Alto. Denso, vertical, superpovoado. Ruas de paralelepípedo, sobrados grudados, um mercado de ferro, viadutos, a igreja no ponto alto.
**A espinha:** a Rua da Praia (leste-oeste) desce até o Mercado e o Cais; becos sobem até a Praça das Almas, no alto.

**Locais (13):**
- **C1 · Mercado Público** — coração social; fofoca, ervas, uma câmara fria que esfria demais. *(exemplo completo na Seção 7.3)*
- **C2 · Pensão Boa Vista** — quartos de aluguel; a dona anota tudo; o quarto 304 "ocupado" por quem ninguém vê.
- **C3 · Locadora Fita-Mágica** — VHS; fitas sem rótulo que gravam o bairro sozinhas e voltam quando destruídas.
- **C4 · O Orelhão da Praça** — telefone público que toca sozinho; atende e ouve os sons da *sua* casa.
- **C5 · Os Cortiços do Beco** — habitação coletiva empilhada; onde o Zelador conta as janelas.
- **C6 · O Arquivo Municipal** — repartição de registros mofada; papéis que não deviam existir.
- **C7 · Praça e Igreja das Almas** — o ponto alto; a igreja, o adro, o terreiro que funciona ao lado.
- **C8 · O Cais Velho** — porto morto; onde o Casario toca o Guaíba; barcos que não remam pro poente.
- **C9 · O Estúdio do Retratista** — fotógrafo antigo; a Foto da Multidão nasce aqui.
- **C10 · O Cinema Íris** — cinema decadente em meia-luz; a plateia que assiste a você.
- **C11 · A Sobreloja da Vigília** — sede de um "grupo de observação de bairro"; a instituição espreita aqui.
- **C12 · O Sobrado do Zelador** — a casa de Seu Adão; a parede com a contagem das janelas.
- **C13 · O Vão Entre os Prédios** — uma fresta-rua que não está em mapa nenhum; a cidade-espelho vaza aqui.

**NPCs-chave (5):** Dona Percília (erveira do Mercado; sábia do terreiro; aliada; a primeira a dizer "não é nosso"); Seu Adão (o zelador que conta as janelas; testemunha central; meio tomado); Dona Ilva (dona da pensão; anota entradas e saídas; paranoica, valiosa); Ivo (dono da locadora; assustado com o próprio acervo); O Homem da Sobreloja (sem nome; educado; o rosto local da instituição — o Estranho do velório circula aqui).

**Ligações internas:** Caderno da Ilva (C2) + contagem do Zelador (C5/C12) = o padrão dos sumiços · Mercado (C1), Cortiços (C5), Cinema (C10) = os pontos onde "se é contado como janela" · Locadora (C3) + Orelhão (C4) + Retratista (C9) = a Observação virando registro material · Cais (C8) e Vão (C13) = as duas saídas pro sobrenatural maior · Igreja/terreiro (C7) = refúgio e sabedoria.
**Ligações externas:** Cais (C8) → Guaíba (lenda do Barqueiro; morte do Jonas) · Câmara fria (C1)/o frio → O Alto (o pronto, o Vazio) · Sótão da pensão (C2)/acervo → O Aterro · Fitas (C3) → A Várzea (o Eco) · A Sobreloja (C11) → a instituição.
**Distribuição:** Ganchos: o Zelador que Contava as Janelas (C5/C12); a Foto da Multidão (C9). Documentos — estreia da Superfície: panfleto "nada que se ama" (C1); pichação "há outros mundos" (C13, o Vão); bilhete da melodia (C2, sótão). Testemunho: rascunho da Carta do astrônomo (C6) — a Carta "oficial" fica no Alto (A6). Cânone (ato final): a página da Bigorna (C6, fundo do Arquivo, ou levada à instituição). Loot: temática de Observação (lentes, espelhos, binóculos, fotos, cadernos, fitas).

## 8.2 · A BAIXA · Pacto · *onde todo negócio tem uma cláusula que você não leu*
**Onde fica:** logo abaixo do Casario, descendo ao sul — zona boêmia, plana, que só acorda de noite. Bares, cabarés, casas de jogo, pensões de hora. Ruas que se cruzam em ângulos que não deviam fechar.
**A espinha:** a Travessa dos Aflitos (a rua dos bares) corta a Baixa; dela saem becos até a Praça do Mercado Negro e as encruzilhadas.

**Locais (12):**
- **B1 · O Bar do Trato** — botequim onde os acordos se fecham; guardanapos que viram contrato.
- **B2 · A Casa de Tângelo** — cabaré; o dono empresta dinheiro e nunca envelhece.
- **B3 · A Encruzilhada dos Aflitos** — cruzamento onde as oferendas são de verdade; onde o Pacto nasce.
- **B4 · A Casa de Penhores "O Fiador"** — penhora qualquer coisa, inclusive o que não é objeto.
- **B5 · O Cortiço da Meia-Noite** — pensão de hora; gente escondida, gente devendo.
- **B6 · A Sala de Sinuca/Jogo** — apostas altas; dívidas de jogo que cobram fora do jogo.
- **B7 · A Igreja dos Desesperados** — capela que atende quem os bares quebraram; pede-se milagre, paga-se caro.
- **B8 · A Farmácia de Manipulação** — remédios, e outras receitas; o boticário troca cura por favor.
- **B9 · O Beco do Corretor** — onde *ele* aparece pra quem mais precisa; ponto móvel.
- **B10 · O Salão de Baile Éden** — dancing decadente; onde as promessas embriagadas viram lei.
- **B11 · O Ferro-Velho Ambulante** — carroceiro que compra e vende de tudo; ponte pro Aterro.
- **B12 · A Pensão da Dívida** — onde moram os que já pagaram demais e não conseguem sair.

**NPCs-chave (5):** Tângelo (dono do cabaré e agiota que não envelhece; encantador, paciente, terrível); O Corretor (sem rosto fixo; a voz que oferece o que você mais quer; o Estranho da instituição também usa esta face); Seu Bonifácio (dono dos penhores; sabe o preço de tudo, inclusive de você); Mãe Diná (do terreiro da Baixa; alerta sobre as encruzilhadas erradas; aliada); Zaira (cantora do Éden; deve a Tângelo; sabe demais e tem medo).

**Ligações internas:** Bar (B1) + Encruzilhada (B3) + Beco do Corretor (B9) = onde os tratos se fecham · Penhores (B4) + Sinuca (B6) + Pensão da Dívida (B12) = o ciclo do endividamento · Cabaré (B2) e Éden (B10) = a rede de Tângelo · Igreja (B7) e terreiro de Mãe Diná = os avisos.
**Ligações externas:** O Corretor (B9) vende a saída dos ganchos dos outros bairros (o hub-Pacto toca todos) · Ferro-Velho Ambulante (B11) → O Aterro · Encruzilhadas (B3) → a instituição (admissão = pacto) · Pensão da Dívida (B12) → tematicamente Vazio/Alto.
**Distribuição:** Gancho: o Guardanapo com o Contrato (B1). Cânone: a página em branco do Livro-Razão (B4, o penhor mais fundo, ou com o Corretor). Loot: temática de Pacto (contratos, joias penhoradas, cartas de baralho, oferendas, objetos com "dono anterior").

## 8.3 · AS ILHAS · Germe · *a beirada que alaga e floresce por cima dos afogados*
**Onde fica:** delta pobre e úmido a oeste/sul, no Guaíba — arquipélago de ilhas de pescadores, palafitas, banhado. Alaga a cada cheia; o mato volta por cima de tudo.
**A espinha:** não há ruas — há a água, as pontes de madeira e os caminhos de barco. A Ilha Grande é o centro; as menores, mais isoladas e mais tomadas.

**Locais (11):**
- **I1 · O Trapiche / a Vila de Pescadores** — o centro; barcos, redes, o comércio de peixe.
- **I2 · A Ilha do Jardineiro** — onde uma família inteira "virou jardim"; floresce errado.
- **I3 · A Casa das Palafitas Fundas** — habitação sobre a água; quem dorme aqui cria raiz.
- **I4 · O Banhado** — pântano; cheiro doce, névoa, coisas serenas demais lá dentro.
- **I5 · A Capela Alagada** — igrejinha meio submersa; santos cobertos de limo, paz pesada.
- **I6 · O Terreiro da Ilha** — de Pai Jorge; o que mais entende, o que mais avisa.
- **I7 · A Estufa Abandonada** — viveiro de plantas que ninguém cuida e que crescem sozinhas.
- **I8 · O Cemitério de Barcos** — cascos apodrecendo; ponte pro Aterro e pro Guaíba.
- **I9 · A Ilha Sem Nome** — a mais isolada; ninguém vai; totalmente tomada pelo jardim.
- **I10 · A Casa da Parteira** — dona Aurora, que "cuida" dos doentes e velhos até eles descansarem.
- **I11 · O Mercado de Peixe Flutuante** — comércio sobre balsas; onde se ouvem os boatos das águas.

**NPCs-chave (5):** Pai Jorge (do terreiro; sábio-mor; sabe que o jardim "não é coisa de santo"; aliado firme); Dona Aurora (parteira/curandeira que planta os que cuida; gentil, sincera, aterrorizante — não se acha vilã); Seu Firmino (velho pescador; conhece a lenda do Barqueiro; não rema pro poente); A Família Enflorada (os que a enchente levou, I2; serenos, sorrindo, ainda "vivos" no jardim); Menino Tico (garoto que some e volta diferente; sinal ambulante).

**Ligações internas:** Ilha do Jardineiro (I2) + Ilha Sem Nome (I9) + Banhado (I4) = o coração do Germe (covil da tentação) · Palafitas (I3) + Capela (I5) + Casa da Parteira (I10) = os lugares que "convidam a descansar" · Terreiro (I6) = aviso e refúgio.
**Ligações externas:** Trapiche/Cemitério de Barcos (I1/I8) → Guaíba (a mesma água; os corpos que não voltaram) · As vozes da família (I2) → A Fita da Várzea · o jardim/apodrecer → tematicamente O Aterro.
**Distribuição:** Gancho: a Enchente que Não Devolveu os Corpos (I2). Testemunho: o Diário do Jardineiro (I2, na casa afogada). Cânone: a heresia do Germe (escondida no terreiro ou na capela). Loot: temática de Germe (ervas, sementes, conservas, amuletos de terra, coisas orgânicas).

## 8.4 · O ALTO · Vazio · *o bairro rico e parado, onde tudo já está pronto*
**Onde fica:** a colina nobre ao norte, acima do Casario. Ruas arborizadas, mansões, silêncio. Faz mais frio aqui. O dinheiro velho da cidade.
**A espinha:** a Alameda dos Plátanos sobe a colina; dela saem ruas curtas e caladas com os casarões; no topo, o Belvedere (mirante) sobre a cidade.

**Locais (11):**
- **A1 · A Casa que Espera** — o casarão-símbolo; preservado idêntico ao dia de uma partida; encaixa vivos no lugar dos ausentes.
- **A2 · O Solar dos Andrade** — família tradicional em disputa de herança; um quarto-relicário lacrado.
- **A3 · O Belvedere** — o mirante; dali se vê a cidade toda esfriando; o Guaíba ao longe.
- **A4 · A Clínica de Repouso "Vila Serena"** — casa de repouso silenciosa; **forte candidata a sede da instituição**.
- **A5 · O Colégio Interno Desativado** — internato fechado; corredores vazios que guardam o eco de quem partiu.
- **A6 · O Observatório do Astrônomo** — casa do sábio que mapeou "a direção que não existe".
- **A7 · A Capela Particular** — capela de família, gelada, onde se reza pra ausências.
- **A8 · O Jardim de Inverno Congelado** — estufa dos ricos onde nada mais cresce; o oposto das Ilhas.
- **A9 · A Mansão Vazia à Venda** — imóvel "impecável" que ninguém compra; o telefone toca sozinho.
- **A10 · A Alameda dos Plátanos** — a rua-símbolo; silêncio que engole som.
- **A11 · O Necrotério Fino / Casa Funerária** — funerária da elite; caixões bonitos, muito frio.

**NPCs-chave (5):** Dona Esmeralda (viúva da Casa que Espera; serena, convida você a ficar, a ocupar o lugar dele); Dr. Vasconcelos (diretor da Vila Serena; educadíssimo; o rosto elegante da instituição); O Astrônomo — Prof. Heldbrandt (quase esvaziado; escreveu a Carta; fala baixo, esquece palavras); Os Irmãos Andrade (herdeiros em guerra por uma casa que "prefere" um deles); Silêncio (o mordomo idoso da Casa que Espera, que quase não está mais lá).

**Ligações internas:** Casa que Espera (A1) + Mansão à Venda (A9) + Solar (A2) = os lugares que "guardam a ausência" · Belvedere (A3) + Observatório (A6) = de onde se *vê* o Vazio/o Guaíba (amarra com Observação/Casario) · Vila Serena (A4) + Funerária (A11) = onde o Alto toca a instituição e a morte "bonita".
**Ligações externas:** O ausente que a Casa espera (A1) → foi levado pelo Guaíba · O que some no Alto → reaparece no Aterro · Vila Serena (A4) → a instituição · Observatório (A6) → a direção que não existe / Guaíba / Kénoma.
**Distribuição:** Gancho: a Casa que Espera (A1). Testemunho: **a Carta do astrônomo "oficial" fica aqui (A6)**; o rascunho fica no Arquivo do Casario (C6). Cânone: a página em branco do arquivo do Hades (A11, a funerária) ou a heresia do Vazio. Loot: temática de Vazio (relíquias intactas, objetos de ausentes, prata fria, retratos, chaves de quartos lacrados).

## 8.5 · O ATERRO · Ascensão · *a cidade que cresce por cima de si mesma*
**Onde fica:** zona de expansão a leste/sul — terreno ganho ao aterro, ferro-velho, galpões, porto de carga, ocupações que sobem. Tudo acumula, nada some.
**A espinha:** a Estrada do Aterro (via de terra e caminhão) atravessa; dela crescem os ferros-velhos, os galpões e a ocupação, camada sobre camada.

**Locais (12):**
- **T1 · O Ferro-Velho que Cresce** — o covil; maior por dentro; guarda o descartado e, com o tempo, gente.
- **T2 · O Galpão do Porto** — depósito de carga que "tem mais dentro do que cabe".
- **T3 · A Ocupação Vertical** — puxadinhos empilhados que sobem sem parar; a construção que não termina.
- **T4 · O Lixão** — aterro sanitário; mexe-se à noite.
- **T5 · O Barracão do Colecionador** — casa de um acumulador cujo barracão cresceu por dentro.
- **T6 · A Feira do Rolo** — mercado de usados infinito; tudo que a cidade jogou fora, à venda.
- **T7 · A Fundição Desativada** — a "forja" industrial morta; ecoa marteladas à noite (**o único lugar onde o martelo do Relógio é diegético**).
- **T8 · A Oficina do "ápeiron"** — mecânico que "melhora" máquinas e pessoas além do que devem ser. *(apelido local, minúsculo — não é cânone.)*
- **T9 · O Cais de Carga** — onde o Aterro toca o Guaíba; contêineres que não esvaziam.
- **T10 · A Igreja de Lata** — templo feito de sucata; pastor que prega a prosperidade sem fim.
- **T11 · O Depósito Municipal de Achados e Perdidos** — pra onde vai o que some no Alto; reaparece aqui.
- **T12 · A Torre de Água** — ponto alto; de onde se vê o Aterro engolir o horizonte.

**NPCs-chave (5):** Seu "ápeiron" (mecânico/sucateiro; melhora o que não devia; frio, superior — apelido local, minúsculo); A Colecionadora (dona do barracão T5; não solta nada, nem gente); Pastor Aurélio (da Igreja de Lata; prega o "mais"; sincero e perigoso); Os Catadores (comunidade do lixão; sabem o que se mexe à noite; testemunhas); O Guarda do Achados e Perdidos (burocrata que "arquiva" o que aparece; ponte com o Alto/instituição).

**Ligações internas:** Ferro-Velho (T1) + Galpão (T2) + Barracão (T5) + Contêineres (T9) = os lugares "maiores por dentro" · Ocupação (T3) + Igreja de Lata (T10) = o "crescer sem teto" · Fundição (T7) = a forja morta (eco temático; martelo diegético).
**Ligações externas:** Achados e Perdidos (T11) ← O Alto (o que some lá, chega aqui) · Cais de Carga (T9) → Guaíba · Ferro-Velho Ambulante ← A Baixa (B11) · a fita indestrutível volta pelo Aterro → A Várzea.
**Distribuição:** Gancho: o Ferro-Velho que Cresce (T1). Cânone: possível esconderijo do Livro-Razão (o acúmulo de todas as dívidas) — coordenar com a Baixa (B4). Loot: **a mais rica do jogo**, temática de Ascensão (ferramentas, peças, tesouros no lixo, itens "melhorados", coisas de donos anteriores). *Observação: o Aterro guarda objetos, não textos — é o bom lugar para achados perdidos de outros bairros reaparecerem.*

## 8.6 · A VÁRZEA · Eco · *o parque onde a mesma tarde se repete*
**Onde fica:** a grande área verde central-leste — o parque, o campo, o bairro boêmio-intelectual ao redor. Onde a cidade vai relembrar. Alamedas antigas, o brique de domingo.
**A espinha:** a Alameda Central corta o parque; ao redor, o Coreto, o Chafariz, o Brique (aos domingos), e as ruas boêmias com os cafés e sebos.

**Locais (12):**
- **V1 · O Brique de Domingo** — feira de velharias; a Fita que sempre volta; tudo já teve outro dono.
- **V2 · O Coreto** — toca a mesma valsa; a banda que não troca de música.
- **V3 · O Chafariz** — fonte onde os pedidos (moedas) ecoam; reflexos que atrasam.
- **V4 · O Sebo Infinito** — livraria usada labiríntica; livros que se reescrevem.
- **V5 · O Café dos Poetas** — boêmia intelectual; os mesmos velhos contando as mesmas histórias (que mudam).
- **V6 · O Cine-Teatro** — casa de espetáculos; a mesma peça, plateia que já viu tudo.
- **V7 · O Banco do Velho** — onde Seu Aristides conta a mesma história, cada vez mais podre.
- **V8 · A Concha Acústica** — palco ao ar livre; ecos que voltam com atraso e com vozes a mais.
- **V9 · A Casa de Câmbio de Memórias** — sebo de fotos e cartas de estranhos; passados à venda.
- **V10 · O Carrossel Parado** — parquinho antigo; gira sozinho de madrugada com a mesma música.
- **V11 · O Estúdio de Rádio (AM)** — emissora local; transmite o que já foi ao ar; ondas dos mortos.
- **V12 · A Alameda dos Plátanos Gêmeos** — trecho do parque onde você jura já ter passado agora mesmo.

**NPCs-chave (5):** Seu Aristides (o velho do banco; a mesma história que apodrece; testemunha-relíquia); Dona Cló (do brique; vende a Fita e não lembra de onde ela vem — sempre volta pra banca dela); O Locutor Noturno (voz do rádio AM; transmite de madrugada pra ninguém; talvez já morto); Os Poetas do Café (trio de boêmios que repete as mesmas discussões há 30 anos); A Menina do Carrossel (criança que só aparece quando o carrossel gira sozinho).

**Ligações internas:** Brique (V1) + Câmbio de Memórias (V9) + Sebo (V4) = onde o passado dos outros é vendido · Coreto (V2) + Concha (V8) + Carrossel (V10) + Rádio (V11) = os pontos de som que ecoa/repete · Banco do Velho (V7) + Café (V5) = a repetição humana (histórias em loop).
**Ligações externas:** A Fita (V1) guarda as vozes das Ilhas e do Guaíba · a fita destruída volta pelo Aterro → reaparece no Brique · O Rádio (V11) transmite vozes de mortos de toda a cidade.
**Distribuição:** Gancho: a Fita do Brique (V1). Testemunho: a Fita cassete da língua-morta (V1 ou V11, o rádio). Cânone: bom lugar para esconder qualquer um dos cânones "que voltam". Loot: temática de Eco (fitas, discos, fotos antigas, cartas de estranhos, relíquias com "história", itens de segunda mão).

---

# SEÇÃO 9 · OS 8 GANCHOS + A LENDA DO LAGO (mínimo jogável)

> Formato: **o achado** (a prop) / **a verdade** (uma linha) / **a regra de sobrevivência**. Cada gancho é jogável na hora com estas três coisas. Aprofundar só quando um jogador morder.

## 9.1 · A lenda do lago — "O Barqueiro que Não Rema pro Poente" (Guaíba)
Depois que o sol se afoga, a água do lado oeste deixa de ser água: vira **a direção que não existe** — aquela pra onde a cidade inteira, muito devagar, escorre (o Kénoma). Quem entra na bruma rumo ao poente não se afoga; apenas *deixa de ter estado ali*. Por isso os barqueiros viram o barco quando a neblina fecha, e ninguém rema pro lado onde o sol já se pôs. Boato que ninguém confirma: há uma outra Porto Alegre afogada sob a superfície — o reflexo da cidade-espelho — e em noites de neblina as luzes dela acendem lá embaixo; os que remaram pro poente estão nas janelas, acesos, sorrindo. **Se vir alguém que perdeu numa janela submersa: não acene de volta.** *(O Jonas é candidato a estar numa dessas janelas no clímax.)*

## 9.2 · Os oito ganchos
| Bairro | Gancho / Achado | Verdade (1 linha) | Regra de sobrevivência |
|---|---|---|---|
| **Guaíba** | O Barqueiro / **Carta Náutica Rasurada** | água oeste = direção-que-não-existe; cidade afogada | não remar pro poente; não acenar de volta |
| **Casario** | O Zelador que Contava as Janelas / **caderno de contagem** | sempre uma janela acesa a mais = Observação | não contar as janelas; não acender sua luz |
| **Casario** | A Foto da Multidão / **foto + verso anotado** | mais um rosto virado a cada olhar = Assembleia | não olhar duas vezes; não se procurar |
| **A Baixa** | O Guardanapo com o Contrato / **guardanapo assinado** | trato não lembrado vencendo = Corretor/Pacto | não assinar; não apertar a mão; não dizer "eu topo" |
| **As Ilhas** | A Enchente que Não Devolveu os Corpos / **recorte + cartaz** | a família virou o jardim = Perpétua | não comer o que cresce; não dormir; não sentar |
| **O Alto** | A Casa que Espera / **inventário que lista uma pessoa** | encaixa um vivo no lugar do ausente = Viúva/O Oco | não passar a noite; não ocupar o lugar do ausente |
| **O Aterro** | O Ferro-Velho que Cresce / **livro-caixa que não fecha** | maior por dentro; guarda gente = Coletor | não entrar pra procurar; não sair carregando |
| **A Várzea** | A Fita do Brique / **a fita** | reaparece sempre; toca os mortos = Antífona | não tocar até o fim; não responder à voz |

---

# SEÇÃO 10 · PLANO DE DISTRIBUIÇÃO (loot + documentos)

## 10.1 · Os documentos dos jogadores (3 camadas) — onde moram
- **Superfície** (panfleto "nada que se ama", pichação "há outros mundos", bilhete da melodia): espalhados por toda a cidade, mas a **estreia** de cada um cai no **Casario** (o hub) — dentro do arquivo do Jonas na abertura, e depois "no mundo".
- **Testemunho** (Diário do Jardineiro, Fita da língua-morta, Carta do astrônomo): no bairro do elemento — Diário nas **Ilhas** (I2), Fita na **Várzea** (V1/V11), Carta no **Alto** (A6, com rascunho no Casario C6).
- **Cânone** (a Bigorna, o Livro-Razão, a página do Hades, as duas heresias): nos nós de gravidade e no fundo dos ganchos, ato final — Bigorna no **Casario** (C6/instituição); Livro-Razão na **Baixa** (B4)/**Aterro**; página do Hades no **Alto** (A11); heresias distribuídas (Germe nas Ilhas, Vazio no Alto).

## 10.2 · Os achados dos 8 ganchos
Cada um no seu bairro (ver Seção 9.2). No Casario caem **dois** (o caderno do Zelador e a Foto).

## 10.3 · O loot genérico
Tabela por bairro, temática do elemento (ver "Loot" na distribuição de cada bairro, Seção 8). O Aterro tem a tabela mais rica. Detalhar as tabelas (d20 ou d66) na escrita final, com itens mundanos + itens "tocados" (com um sinal do elemento) + raros ligados aos ganchos.

## 10.4 · Regra de distribuição
Cada documento e achado num **local específico**, com o **teste para achar** (perícia+atributo+Limiar). Marcar isso na ficha de cada local ao detalhar.

---

# SEÇÃO 11 · O SISTEMA (Protocolo) ↔ O LORE — reconciliação e pendências

> O Livro de Campanha é "como narrar", não "como jogar". Esta seção existe para o texto **não contradizer** o sistema. **Não invente números nem regras novas** — isso pertence aos livros de regra e à ficha.

## 11.1 · O motor
2d6 + Atributo + Perícia vs Limiar. **5− falha com consequência · 6–9 Sucesso Parcial (o coração: funciona, mas cobra preço) · 10+ limpo.** Críticos por dados iguais. Vantagem/Desvantagem = 3d6 (melhores/piores 2). Forçar a Rolagem (insistir fora de combate; falhar vira falha crítica). A narração dá bônus (+1 criatividade, +2 usar info da investigação; boa estratégia reduz o Limiar).

## 11.2 · Atributos e recursos
- **Atributos:** Carne, Nervo, Juízo, Têmpera, Lábia.
- **Recursos:** Fôlego (esforço do corpo), Sintonia (esforço do oculto), Lucidez (sanidade), + Brio, Sina, Gente, Raiz, e **Ruído** (o quanto o sobrenatural entrou em você — o índice de corrupção; = a régua da Forja aplicada ao personagem).

## 11.3 · A investigação
Regra de ouro: **pista essencial nunca depende de dado.** Dados dão pistas extras/profundas. Existe a **Conexão** (deixa a investigação decidir o clímax sem travar a trilha).

## 11.4 · A corrupção — os seis Marcados (cada elemento uma "faca")
Cada Marca é um Ápice tocando o personagem por dentro (só o mestre sabe o nome):
- **Germe → Sobrecarga:** o poder gasta **Vida** direto; o que se planta com a Vida floresce e não volta. *(= Perpétua)*
- **Pacto → Dívida:** conta que **persiste** entre sessões e cresce; vence e cobra "ou equivalente". *(= Synthékos)*
- **Vazio → Erosão:** medidor que **só sobe**; apaga algo definitivo (memória, afeto, sentido, laço, nome); recompensa por desaparecer. *(= Kénoma)*
- **Ascensão → Perfeição:** medidor que **só sobe**; cada grau dá bônus permanente mas encolhe o teto de Lucidez; no fim, **transcendência** (sai de jogo). *(= Amálgama)*
- **Observação → Registro/Marcas:** acumula Marcas; a Lucidez que custa **não volta**; ver é ser visto. *(= Argos)*
- **Eco → Ecos:** repete/reescreve o passado; perde o original — inclusive a certeza de ser o real. *(= Antífona)*

## 11.5 · A Atenção
O antigo **Dharma** foi reenquadrado como **a Atenção** (o Escultor reparando, sem nome). Enche com Ruído/exposição; cheio, a mão se aproxima. (Ver 2.7.)

## 11.6 · Os quatro livros de regra (separados deste Livro de Campanha)
Livro Básico · Dossiê de Profissões (Ocultista/Sintonizador com os 6 Marcados) · **Grimório dos Seis** (elementos, Marcas, magias — no repo, `Sistema/grimorio.html`) · Equipamentos (arsenal 2002).

## 11.7 · PENDÊNCIAS (não resolver aqui; anotar como "a cravar com a ficha")
- Os **números** das seis facas (custo de cada Dádiva; taxas de subida dos medidores; PV/Fôlego/Lucidez iniciais).
- **Magias e talentos** na `Ficha_Automatica.html` (incompleta).
- Cravar isso é etapa separada, com a ficha. O Livro de Campanha deve **referenciar** essas mecânicas em sabor, nunca fixar números.

---

# SEÇÃO 12 · INVENTÁRIO DE ATIVOS EXISTENTES

## 12.1 · No repositório (cânone — LER)
- `Historia/livro_do_passado.html` · `Historia/registro_dos_antigos.html` · `Criaturas/bestiario.html` · docs dos Chefes · `Sistema/grimorio.html` · `Presente/a_cidade.html` · `Presente/lendas_e_locais.html` · `Ficha/data.js` (NÃO ALTERAR) · `Ficha_Automatica.html` (NÃO ALTERAR).

## 12.2 · Dispositivos de session zero (já prontos)
- **Formulário de Admissão** — questionário diegético (estilo web Windows 2002) que os jogadores preenchem achando ser criação de personagem; chega aos personagens no fim da sessão 1 ("você é o próximo"). 25 itens + 7 iscas (uma por elemento + bônus); cadastro/nome por último (tema: o nome é o menos importante).
- **Folha de Diagnóstico do Mestre** — mapeia, sem forçar, o elemento mais propício de cada jogador a partir das respostas, e sugere o primeiro contato anômalo por elemento. É material de mestre.

## 12.3 · O padrão de referência cruzada
O projeto usa **fonte única**: a variável CSS `--mist` e a classe `a.ref` para links a conteúdo canônico. Todo documento novo que cite cânone existente **linka** com `a.ref` em vez de reescrever.

---

# SEÇÃO 13 · DECISÕES JÁ TOMADAS (pontas que estavam soltas — resolvidas)
- **Ano:** 2002 (definitivo; corrigido de um lapso "1979").
- **Carta do astrônomo:** oficial no Observatório do Alto (A6); rascunho no Arquivo do Casario (C6).
- **Livro-Razão (cânone do Pacto):** na Casa de Penhores da Baixa (B4); o Aterro pode guardar uma "segunda via" temática.
- **Sede provável da instituição:** a Vila Serena, no Alto (A4) — mas ela também se move (clínica/estande/van).
- **Formato por tipo:** locais e cenas têm boxed text; personagens e criaturas não.
- **Livro de campanha:** volume único, feio-funcional, navegação máxima (índice mestre + menu lateral fixo + âncora em tudo).

---

*Fim do Documento-Fonte. Este documento + o repositório = o pacote completo para o Livro de Campanha. Em caso de conflito, o mais recente vence (em geral, este documento). Na dúvida sobre cosmologia, consulte os docs de mestre no repo. Nunca deixe nomes cósmicos vazarem para material de jogador.*

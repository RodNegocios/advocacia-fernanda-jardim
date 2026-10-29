# Inventário e direção de arte

Todos os 11 arquivos da main foram examinados. Os originais estão preservados em `materials/`; os derivados das fotografias e do logotipo são apenas imagens redimensionadas/comprimidas. Não houve retoque facial ou alteração da identidade nas fotografias da advogada.

| Arquivo original | Decisão e justificativa |
|---|---|
| `foto da advogada fernando jardim1.png` | **Capa.** Retrato frontal de blazer preto: postura firme, contato visual e neutralidade do fundo favorecem o arco editorial. O contraste com vinho/dourado reforça a área criminal. |
| `fodo da advogada fernando jardim 3.png` | **Apresentação.** Foto sorrindo à mesa cria proximidade e contrasta com a formalidade da capa. |
| `foto da advogada fernanda jardim.png` | Preservada, não publicada. Mesmo figurino do retrato principal; a orientação lateral competiria com o contato visual escolhido para a capa. Evitou-se repetição. |
| `foto da advogada fernanda jardim2.png` | Preservada, não publicada. Retrato com roupa clara e fundo escuro é uma alternativa válida, mas criaria uma terceira linguagem fotográfica sem acrescentar informação à narrativa. |
| `logotipo da advocacia.png` | **Utilizado.** Monograma original FJ nos cabeçalhos; arquivo completo otimizado preservado nos assets. O nome é texto acessível ao lado do monograma, para legibilidade. |
| `logoditpo com a paleta para ver  a paleta que deve usar.png` | **Base cromática.** Vinho profundo e dourado suave. A captura completa não foi publicada, pois inclui controles de uma rede social e repete a marca. |
| `referencia de design.jpg` | Referência para hierarquia humana, foco no retrato, contraste quente e CTAs. Não publicada: contém outra pessoa, marca e contatos alheios. |
| `referencia de design1.jpg` | Referência de tipografia em grande escala e pequenos detalhes jurídicos. Não publicada: composição de outra marca e conteúdo sobre paternidade, fora do conteúdo confirmado. |
| `referência de design.jpg` | Referência de atmosfera cinematográfica, profundidade e camadas. Não publicada: identidade e retrato de terceiros. |
| `referência de landing page, se inspire na esturtas formas etc...jpg` | Referência estrutural: apresentação, atuação, etapas, FAQ e contato. Não reutilizamos alegações de experiência, serviços previdenciários, avaliações ou textos de outra profissional. |
| `referência e elemnto que pode ser usado de design.jpg` | Referência de iluminação e equilíbrio. A estátua não foi publicada para manter a narrativa centrada na advogada e evitar símbolos decorativos redundantes; a balança aparece em SVG e no monograma. |

## Composição e movimento

Vinho e marfim alternam capítulos; serifada Cormorant Garamond dialoga com o logotipo, enquanto Manrope sustenta a leitura. Arcos fotográficos, linhas orbitais e camadas de luz criam profundidade sem usar vídeos genéricos. Não havia vídeo no material recebido; a atmosfera é desenhada localmente em canvas.

O canvas limita a resolução a 1,5× e a taxa a aproximadamente 30 quadros/s. Pausa fora da área visível, com a aba oculta, com movimento reduzido ou pelo botão de pausa. Pointer Events atendem mouse, caneta e toque sem bloquear a rolagem. O texto usa BlurText somente na capa; as demais animações usam GSAP/ScrollTrigger, incluindo parallax, linhas progressivas, revelação recortada e etapas ligadas à posição da rolagem. No celular, a sequência é vertical, sem fixação ou captura do gesto de rolagem.

## Referências externas e licenças

- `motionsites.ai`, `awwwards.com/websites` e `reactbits.dev/llms.txt` retornaram 403 no ambiente. Não alegamos ter navegado nas demos.
- O código oficial de BlurText e a licença foram obtidos de `github.com/DavidHDev/react-bits`, diretório `src/content/TextAnimations/BlurText/BlurText.jsx` e arquivo `LICENSE.md`.
- Adaptação mantida neste website: variante blur, trigger de carregamento/visibilidade, intervalos moderados; removidos modos não utilizados. Adicionados HTML semântico com spans, texto visível na pré-renderização, preferência por movimento reduzido e limpeza de timers/observers.
- Licença React Bits consultada: **MIT + Commons Clause**, uso comercial como parte de um website permitido; componentes isolados não são o produto desta entrega. Texto integral preservado em `REACT-BITS-LICENSE.txt` e nas licenças públicas.
- GSAP 3.15.0 mantém o aviso da licença padrão no bundle e no documento de licenças. React/Motion e fontes têm seus avisos preservados.

## Refinamento editorial

A versão enxuta elimina slogans repetidos, legendas ornamentais e descrições redundantes. Preserva as qualificações fornecidas, as três áreas de atuação, Comodoro/MT, WhatsApp, Instagram, a frase institucional e os cuidados de privacidade. As explicações das áreas continuam disponíveis em “Saiba mais”; três perguntas frequentes reúnem as orientações de contato, local e questões extrajudiciais.

O atendimento agora aparece em três etapas com ícones SVG locais — Escuta, Análise e Direção — conectadas por uma linha animada na rolagem. Os ícones são decorativos e acompanhados de rótulos e frases curtas; a compreensão não depende da animação. A sequência usa os recursos GSAP existentes, sem novas bibliotecas, solicitações externas ou reprodução contínua. A preferência por movimento reduzido e o botão de pausa também se aplicam a ela.

## Estátua no quarto bloco

Após a revisão editorial, o cliente forneceu uma nova referência de uma estátua da Justiça em bronze e solicitou sua inclusão no quarto bloco físico da página (frase institucional, depois da apresentação da advogada). `justica-recorte.png` é uma versão com transparência preparada por edição assistida a partir desse anexo, não uma cópia binária do arquivo original. As fotografias da advogada e o logotipo permanecem inalterados.

O bronze complementa o vinho e o dourado. A figura fica em coluna própria no desktop e abaixo da frase no celular. A máscara suave na base integra o recorte ao fundo, sem encobrir o texto. Entrada e parallax têm elementos independentes; os deslocamentos diminuem no celular. Os efeitos são desativados com movimento reduzido ou pelo botão de pausa. Como decoração, a figura tem texto alternativo vazio e fica fora da árvore de acessibilidade, sem retirar conteúdo informativo.

Publicação: AVIF/WebP locais em 400 e 800 px, com transparência, dimensões declaradas e carregamento sob demanda. O PNG de edição permanece somente na pasta de materiais protegida. Nenhuma biblioteca, conexão externa, reprodução de vídeo ou loop contínuo foi adicionado.

## Unificação da imagem com o atendimento

Por solicitação do cliente, o quarto e o quinto blocos foram fundidos. A frase institucional, a estátua e as etapas Escuta, Análise e Direção pertencem agora à mesma seção, com âncora `#caminho`. O antigo título intermediário foi removido para evitar repetição. Todas as orientações das etapas foram preservadas.

O fundo vinho é contínuo; no desktop, o roteiro fica à esquerda da estátua. No celular, título, figura e etapas seguem uma ordem vertical, sem sobreposição. Cada etapa tem entrada de posição e animação de ícone, com a linha de ligação desenhada pela rolagem. O texto mantém opacidade total para preservar contraste. O parallax da figura, a pausa de movimentos e a preferência por movimento reduzido continuam ativos. Não foram acrescentados recursos externos ou imagens.

## Moldura da apresentação

A foto original à mesa foi mantida. A moldura combina aro dourado, passe-partout vinho, cantos em SVG, contorno posterior e selo jurídico menor. Não acrescenta texto nem altera as demais seções.

Referências consultadas no repositório oficial do React Bits:

- [TiltedCard](https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/TiltedCard/TiltedCard.jsx): perspectiva suave a partir da posição normalizada do ponteiro.
- [SpotlightCard](https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/SpotlightCard/SpotlightCard.jsx): luz localizada no contorno, com máscara CSS que preserva a fotografia.
- [Licença](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md): MIT + Commons Clause, conferida novamente; idêntica à cópia já incluída nesta entrega. Uso como parte deste website permitido.

`src/components/PortraitFrame.jsx` e seu CSS implementam uma adaptação específica com o GSAP já instalado. A inclinação é limitada a 2,5°/3°, apenas com ponteiro fino. O scroll desenha o contorno, conduz um reflexo no aro e desloca discretamente a foto em sua janela. Camadas separadas evitam conflito entre entrada, parallax e ponteiro. A animação não usa loop contínuo, giroscópio, permissão de sensores, scripts de terceiros ou nova dependência. Os efeitos de ponteiro param fora da tela e na aba oculta; todos respeitam pausa e preferência por movimento reduzido, inclusive quando alterada durante a visita. No toque, a rolagem permanece nativa. Sem JavaScript, moldura e foto continuam visíveis.

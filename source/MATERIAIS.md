# Inventário e direção de arte

Todos os 11 arquivos da main foram examinados. Os originais estão preservados em `materials/`; os derivados públicos são apenas imagens redimensionadas/comprimidas. Não houve retoque facial, recorte generativo ou alteração da identidade da advogada.

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

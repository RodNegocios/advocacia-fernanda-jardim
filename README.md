# Fernanda Jardim — Advocacia e Consultoria Jurídica

Site estático, em português, com identidade vinho/dourado/marfim, fotografias reais da advogada, GSAP + ScrollTrigger, BlurText adaptado do React Bits e fundo canvas responsivo ao ponteiro/toque. O HTML é pré-renderizado: o conteúdo, os contatos e os elementos nativos continuam acessíveis sem JavaScript.

## Estrutura

- `index.html`, `privacidade.html`, `assets/`, `robots.txt`, `.htaccess`: saída de produção, pronta na raiz.
- `source/src/`: componentes, estilos e conteúdo editável.
- `source/src/content.js`: telefone, Instagram, áreas e perguntas frequentes.
- `source/materials/`: os 11 materiais originais preservados e o recorte decorativo preparado a partir do novo anexo.
- `source/MATERIAIS.md`: inventário, decisões de direção de arte e referências.
- `source/VALIDACAO.md`: verificações e limites da entrega.

## Desenvolvimento e atualização

Node.js 24 e npm 11 foram utilizados. Trabalhe na `main`, no checkout existente; não é necessário criar worktrees.

```sh
cd source
npm ci
npm run dev
```

Para gerar e validar a versão que será publicada:

```sh
cd source
npm run build
npm test
npm audit
```

O teste usa Chromium em `/usr/bin/chromium`; defina `CHROMIUM_PATH` para outro caminho instalado. Para verificar apenas a produção localmente: `node scripts/serve.mjs`. Esse servidor expõe somente a saída pública e destina-se ao desenvolvimento. A Hostinger serve diretamente os arquivos estáticos.

Depois de alterar conteúdo ou estilo, regenere a saída e inclua tanto `source/` quanto os novos arquivos de produção no commit da `main`. Não edite manualmente os arquivos JavaScript/CSS com hash. `npm run build -- --skip-images` pode ser usado durante ajustes de código quando as imagens de produção já existem e não foram alteradas; a compilação completa regenera as imagens.

## Hostinger + GitHub

Não há build, Node.js ou variáveis secretas necessários na Hostinger. Configure a integração Git da hospedagem para o repositório e a branch **main**, usando a raiz do checkout como diretório publicado (normalmente `public_html`). Preserve `.htaccess` no deploy.

**Artefatos estritamente públicos:** `index.html`, `privacidade.html`, `robots.txt`, `.htaccess` e `assets/`. Caso use um pipeline de upload, publique apenas esses caminhos; não envie `source/`, `.git/`, `README.md`, caches, dependências ou arquivos de ambiente.

Se o deploy nativo da Hostinger clonar o repositório inteiro em `public_html`, as regras `.htaccess` bloqueiam `source/`, arquivos ocultos, Git e documentação. Confirme que a hospedagem Apache/LiteSpeed respeita essas regras antes de liberar o domínio. Para servidores que não interpretam `.htaccess`, publique **somente** os artefatos públicos listados acima.

A integração, o webhook e o domínio dependem da conta da hospedagem; não são configurados por um push ao GitHub. Depois do deploy, valide HTTPS, página inicial, WhatsApp, Instagram e respostas 403/404 para `/source/package.json`, `/.git/config` e `/README.md`. Ative redirecionamento HTTP → HTTPS no painel quando o certificado estiver instalado.

## Conteúdo pendente

Não foram inventados número da OAB, endereço completo, e-mail ou horário de 24 horas. As avaliações e depoimentos não foram publicados. Antes da divulgação pública, complete a identificação profissional com a OAB/UF e revise a comunicação conforme as regras aplicáveis à advocacia.

O domínio final não foi informado: `canonical`, sitemap com URLs absolutas e imagem social absoluta devem ser acrescentados depois da definição do domínio. Os metadados essenciais (título, descrição, idioma e Open Graph textual) já estão presentes. Não há reivindicação de garantia de resultado.

## Segurança e privacidade

Nenhum formulário, cookie de publicidade, analytics, pixel, CDN de execução, armazenamento local ou integração de envio de dados. WhatsApp e Instagram são links externos com `noopener noreferrer`. Fontes, scripts e imagens são locais. A política CSP limita execução à própria origem; os estilos inline são necessários para GSAP/Motion. A proteção de arquivos internos depende da configuração de hospedagem descrita acima.

As licenças utilizadas constam em `assets/third-party-licenses.txt`. React Bits: MIT + Commons Clause, usado como parte deste website, sem redistribuição comercial de componentes isolados. GSAP: licença padrão gratuita para uso no website. Fontes: OFL. Fotos e logotipo: materiais fornecidos pelo cliente, sem geração ou alteração de identidade por IA.

A estátua do quarto bloco usa um recorte com transparência preparado por edição assistida a partir da imagem anexada pelo cliente. É uma imagem decorativa local, com entrada e parallax pelo GSAP existente, carregamento sob demanda e versões AVIF/WebP. Não adiciona bibliotecas ou serviços de execução.

O quarto bloco reúne a estátua e as três etapas de atendimento em uma única seção vinho. A âncora `#caminho` leva a essa seção integrada. No desktop, as etapas ficam ao lado da imagem; no celular, a leitura segue verticalmente sobre o mesmo fundo.

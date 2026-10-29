# Validação da entrega

Executada em 29/10/2026, na saída estática da raiz, com Chromium real e Playwright. Node.js 24.19.0, npm 11.9.0.

## Resultados

- Build de produção e pré-renderização concluídos, com HTML contendo o conteúdo da página e sem dependência de servidor React.
- **128 verificações funcionais aprovadas** no script `scripts/check.mjs`: larguras 1440, 1024, 768, 390 e 320 px; ausência de overflow horizontal; imagens carregadas; um H1; âncoras existentes; número oficial em todos os links de WhatsApp; abrir/fechar os seis accordions; operação por teclado; menu mobile e Escape; diálogo de privacidade e Escape; pausa das animações; movimento reduzido; conteúdo/FAQ e política de privacidade sem JavaScript; ausência de erros de navegador/hidratação.
- Axe: nenhuma violação detectada nos critérios automatizados WCAG 2 A/AA e 2.1 AA nas cinco larguras. Isso não substitui avaliação humana completa de acessibilidade.
- Inspeção visual desktop e mobile, incluindo a sequência visual de atendimento. Conferência específica do texto da seção animada quando entra na área visível.
- Nenhuma requisição de execução para terceiros durante os testes. Fontes e dependências servidas localmente.
- `npm audit`: **0 vulnerabilidades conhecidas**, incluindo dependências de desenvolvimento. Sharp atualizado para 0.35.5 após diagnóstico da versão anterior.
- `git diff --check`: sem erros de espaços/conflitos.
- Imagens da capa: AVIF de aproximadamente 24 KB (640 px) e 46 KB (1080 px); WebP como fallback. Foto de apresentação carregada sob demanda. JavaScript de produção: aproximadamente 164 KB gzip; CSS: aproximadamente 7 KB gzip. Valores de tamanho, não uma pontuação de Lighthouse.

## Reprodução

```sh
cd source
npm ci
npm run build
npm test
npm audit
node scripts/inspect.mjs
```

Os testes iniciam e encerram seu próprio servidor estático local. Chromium é requerido; `CHROMIUM_PATH` permite selecionar outro binário. Resultados e capturas são gravados em `.test-results/`, ignorado pelo Git. As capturas de página inteira usam movimento reduzido para que seções fora da tela não apareçam no estado inicial de animações de scroll.

## Limites e pendências

- Não houve acesso à conta ou domínio final da Hostinger. Deploy, HTTPS e regras `.htaccess` devem ser conferidos no servidor real. O servidor de teste aplica uma lista explícita de arquivos públicos; ele não interpreta regras Apache. A política CSP equivalente foi exercitada no Chromium.
- Links externos foram conferidos quanto a destino, número e atributos de segurança. Nenhuma mensagem foi enviada e nenhum atendimento foi solicitado.
- OAB/UF e endereço completo não foram fornecidos. Horário de 24 horas não confirmado. Não constam na página.
- Avaliações, depoimentos e números de resultados não foram usados. Comunicação baseada nos dados profissionais fornecidos pelo cliente.
- Domínio final necessário para canonical, sitemap e imagem social absoluta. Os demais metadados essenciais estão presentes.
- Demos dos três sites de referência retornaram 403; a licença e o código do React Bits foram consultados no repositório oficial.

## Revisão de concisão

Textos visíveis com os accordions fechados passaram de aproximadamente 484 para 236 palavras (excluídos ícones, texto exclusivo de leitor de tela, documentos de privacidade e conteúdo expansível). A redução vem de repetições; informações profissionais, contatos, cidade e orientações essenciais permanecem. O número de verificações passou de 148 para 128 porque cinco perguntas frequentes foram consolidadas em três; cada accordion é aberto e fechado nas cinco larguras. Os critérios de validação não foram desativados.

Sem alteração de dependências nesta revisão. JavaScript de produção: aproximadamente 163 KB gzip; CSS: aproximadamente 6,7 KB gzip.

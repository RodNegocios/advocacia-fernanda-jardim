// Dados fornecidos pela cliente. Atualize aqui; execute npm run build em source/.
// OAB, endereço completo, domínio e horário não foram confirmados: não inferir.
export const contact = {
  phone: "5569992023034",
  phoneLabel: "(69) 99202-3034",
  email: "",
  city: "Comodoro, Mato Grosso",
  oab: "",
  domain: "",
  instagram: "https://www.instagram.com/fernandajardim.advogada/",
};
export const areas = [
  {
    number: "01",
    title: "Direito Penal",
    subtitle: "& Processo Penal",
    icon: "scales",
    label: "ATUAÇÃO PRINCIPAL",
    description: "Defesa de direitos com atenção a cada detalhe.",
    detail:
      "Atuação especializada em Direito Penal e Processo Penal. Cada situação é analisada de forma individual, considerando suas particularidades e os caminhos jurídicos disponíveis.",
  },
  {
    number: "02",
    title: "Direito Cível",
    subtitle: "",
    icon: "document",
    label: "SEUS DIREITOS NO DIA A DIA",
    description: "Orientação para questões da vida civil.",
    detail:
      "Atendimento a demandas cíveis, com análise das necessidades de cada cliente e orientação sobre as possibilidades judiciais e extrajudiciais aplicáveis ao caso.",
  },
  {
    number: "03",
    title: "Direito Trabalhista",
    subtitle: "",
    icon: "shield",
    label: "RELAÇÕES DE TRABALHO",
    description: "Clareza nas relações e nos direitos trabalhistas.",
    detail:
      "Atendimento a demandas trabalhistas, com avaliação individual da situação e dos documentos pertinentes para orientar os próximos passos.",
  },
];
export const whatsappUrl = () =>
  `https://wa.me/${contact.phone}?text=${encodeURIComponent("Olá, Dra. Fernanda. Gostaria de informações sobre o atendimento jurídico.")}`;
export const faqs = [
  [
    "Quais são as áreas de atuação?",
    "Fernanda Jardim é advogada criminalista, com atuação especializada em Direito Penal e Processo Penal. Também atende demandas de Direito Cível e Direito Trabalhista.",
  ],
  [
    "Como posso solicitar um atendimento?",
    "Entre em contato pelo WhatsApp (69) 99202-3034. Informe, de forma breve, o assunto sobre o qual precisa de orientação e combine diretamente as condições e a disponibilidade para atendimento.",
  ],
  [
    "Onde a advogada atua?",
    "A cidade de atendimento informada é Comodoro, em Mato Grosso. Para consultar a modalidade de atendimento e o endereço do escritório, entre em contato pelo WhatsApp.",
  ],
  [
    "O que devo preparar para o primeiro contato?",
    "Tenha em mãos uma breve descrição da situação e informe se existe algum prazo em andamento. Aguarde a orientação da advogada antes de encaminhar documentos ou informações sensíveis.",
  ],
  [
    "É possível tratar questões extrajudiciais?",
    "Sim. O atendimento contempla a análise de questões judiciais e extrajudiciais. A possibilidade de uma solução extrajudicial depende das características de cada caso.",
  ],
];

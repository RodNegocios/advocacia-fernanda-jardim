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
    detail:
      "Defesa em Direito Penal e Processo Penal, com análise individual do caso e dos caminhos jurídicos disponíveis.",
  },
  {
    number: "02",
    title: "Direito Cível",
    subtitle: "",
    icon: "document",
    detail:
      "Orientação em questões da vida civil, com avaliação das possibilidades judiciais e extrajudiciais de cada caso.",
  },
  {
    number: "03",
    title: "Direito Trabalhista",
    subtitle: "",
    icon: "shield",
    detail:
      "Análise de demandas e documentos relacionados aos direitos e às relações de trabalho.",
  },
];
export const whatsappUrl = () =>
  `https://wa.me/${contact.phone}?text=${encodeURIComponent("Olá, Dra. Fernanda. Gostaria de informações sobre o atendimento jurídico.")}`;
export const faqs = [
  [
    "Como iniciar o atendimento?",
    "Envie uma breve descrição pelo WhatsApp e informe eventuais prazos. Confirme disponibilidade e condições; aguarde orientação antes de enviar documentos ou dados sensíveis.",
  ],
  [
    "Onde é o atendimento?",
    "Em Comodoro, Mato Grosso. Consulte o endereço do escritório e a modalidade de atendimento pelo WhatsApp.",
  ],
  [
    "É possível tratar questões extrajudiciais?",
    "Sim. As possibilidades judiciais e extrajudiciais são avaliadas conforme as particularidades de cada caso.",
  ],
];

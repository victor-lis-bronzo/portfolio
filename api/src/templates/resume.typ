// Carrega os dados escritos pelo Node.js
#let data = json("data.json")

// Configurações Globais (Coluna única, fonte limpa e segura para ATS)
#set page(margin: (x: 2cm, y: 2cm))
#set text(font: "Libertinus Serif", size: 11pt)
#set par(justify: true)

// --- CABEÇALHO ---
#align(center)[
  #text(weight: "bold", size: 24pt)[#data.name] \
  #text(size: 14pt, style: "italic")[#data.position] \
  #v(5pt)
  #data.contactInformation.email | #data.contactInformation.address \
  #link("https://" + data.contactInformation.linkedin)[LinkedIn] |
  #link("https://" + data.contactInformation.github)[GitHub] |
  #link("https://" + data.contactInformation.portfolio)[Portfólio]
]
#v(10pt)
#line(length: 100%, stroke: 0.5pt)

// --- RESUMO ---
= Resumo
#data.summary
#v(10pt)

// --- EXPERIÊNCIA ---
= Experiência Profissional
#for exp in data.workExperience [
  *#exp.position* | #exp.company \
  #emph[#exp.startYear - #exp.endYear] \
  #exp.description
  #for achievement in exp.keyAchievements [
    - #achievement
  ]
  #v(10pt)
]

// --- PROJETOS ---
= Projetos
#for proj in data.projects [
  *#proj.name* - #link("https://" + proj.link)[Ver Repositório] \
  #proj.description \
  _Stack: #proj.technologies.join(", ")_
  #v(10pt)
]

// --- EDUCAÇÃO E SKILLS ---
= Formação
#for edu in data.education [
  *#edu.degree* | #edu.school \
  #emph[#edu.startYear - #edu.endYear]
  #v(10pt)
]

= Competências Técnicas
*Linguagens:* #data.skills.languages.join(", ") \
*Frameworks:* #data.skills.frameworks.join(", ") \
*Ferramentas:* #data.skills.tools.join(", ")

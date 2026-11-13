# QA Portfolio — Bruno Aurelio

Portfólio profissional de **QA Software Analyst**: automação de testes (Playwright, Cypress, Jest), testes de API, CI/CD e relatórios de qualidade.

> 🔗 **Site:** _adicione aqui a URL publicada na Vercel_

<!-- Sugestão: adicione um print da página inicial em docs/preview.png e descomente a linha abaixo -->
<!-- ![Prévia do portfólio](docs/preview.png) -->

## 🧰 Tecnologias

- HTML, CSS e JavaScript puro — sem dependências e sem etapa de build
- Google Fonts (Space Mono e Syne)
- [Formspree](https://formspree.io) para o formulário de contato
- Deploy estático na [Vercel](https://vercel.com)

## 💻 Rodando localmente

Qualquer servidor estático funciona. Por exemplo:

```bash
npx serve .
```

Depois acesse `http://localhost:3000`.

## 📁 Estrutura

```
porfolio/
├── index.html     # Estrutura e conteúdo
├── style.css      # Estilo dark "terminal"
├── main.js        # Interações (menu, contadores, animações, formulário)
├── vercel.json    # Config de deploy da Vercel
└── README.md
```

## ✉️ Formulário de contato

O formulário envia as mensagens via Formspree:

1. Crie um formulário gratuito em [formspree.io](https://formspree.io).
2. Em `index.html`, troque `SEU_FORM_ID` no atributo `action` do `#contato-form` pelo ID gerado.

Enquanto o ID não for configurado, o botão **Enviar** abre o app de e-mail do visitante com a mensagem preenchida (`mailto`), então nenhuma mensagem é perdida.

## ✏️ Personalização

| O que alterar | Onde |
|---|---|
| Nome e cargo | `index.html` → `.hero-title`, `.hero-label` e `<title>` |
| E-mail de contato | `index.html` → `.contato-links` e `data-fallback-email` do formulário |
| Links GitHub / LinkedIn | `index.html` → `.contato-links` e `.projeto-links` |
| Projetos | `index.html` → `#projetos` → `.projetos-grid` |
| Nível das skills | `index.html` → `.skill-level` (Avançado / Intermediário / Básico) |
| Números das métricas | `index.html` → `data-target="XX"` |

## ♿ Acessibilidade

- Navegação por teclado com foco visível
- Menu mobile com `aria-expanded` e fechamento pela tecla Esc
- Animações desativadas para quem usa `prefers-reduced-motion`

## 🚀 Deploy

Importe o repositório na Vercel (Framework: **Other**) ou use a CLI:

```bash
npx vercel
```

## 🔭 Melhorias futuras

- Adicionar imagem Open Graph (`og:image`) para a prévia em redes sociais
- Substituir as métricas da seção "Números que importam" por resultados de impacto (ex.: redução de bugs em produção, tempo de regressão)
- Testes E2E do próprio portfólio com Playwright rodando no GitHub Actions

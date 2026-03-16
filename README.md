# QA Portfolio — Bruno Ferreira

Portfólio profissional de QA Software Analyst. Construído com HTML, CSS e JavaScript puro — sem dependências, zero build step, pronto para deploy na Vercel.

## 🚀 Como publicar

### 1. Suba para o GitHub

```bash
git init
git add .
git commit -m "feat: QA portfolio inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/qa-portfolio.git
git push -u origin main
```

### 2. Deploy na Vercel

**Opção A — Vercel CLI:**
```bash
npm i -g vercel
vercel
```

**Opção B — Vercel Dashboard:**
1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Importe o repositório do GitHub
4. Mantenha as configurações padrão (Framework: **Other**)
5. Clique em **Deploy** — pronto! ✅

## ✏️ Personalização

| O que alterar | Onde |
|---|---|
| Nome | `index.html` → `.hero-title` |
| Email de contato | `index.html` → `#contato` + `main.js` |
| Links GitHub / LinkedIn | `index.html` → `.contato-links` + `.projeto-links` |
| Projetos | `index.html` → `#projetos` → `.projetos-grid` |
| Percentuais das skills | `index.html` → `data-level="XX"` |
| Números das métricas | `index.html` → `data-target="XX"` |

## 📁 Estrutura

```
portfolio-qa/
├── index.html     # Estrutura e conteúdo
├── style.css      # Estilo dark tech-noir
├── main.js        # Interações (scroll, counters, form)
├── vercel.json    # Config de deploy Vercel
└── README.md
```

## 🔗 Formulário de contato

O formulário atual simula o envio. Para ativar envio real, use:

- **[Formspree](https://formspree.io)** — gratuito, sem backend
- **[EmailJS](https://emailjs.com)** — direto no front-end
- **[Resend](https://resend.com)** — moderno, REST API

Substituir em `main.js` o bloco `await new Promise(...)` pelo fetch da API desejada.

---

> Construído com ☕ e qualidade de software.

# 🎨 Gerador de Paletas de Cores

> Uma aplicação web moderna e intuitiva para gerar paletas de cores harmoniosas baseadas em teoria das cores.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ✨ Características

### 🎯 Funcionalidades Principais
- **Geração Inteligente**: 5 tipos de harmonias de cores baseadas em teoria das cores
- **Sistema de Salvamento**: Armazene até 10 paletas favoritas localmente
- **Copy to Clipboard**: Clique para copiar códigos hexadecimais instantaneamente
- **Design Responsivo**: Experiência otimizada para desktop e mobile
- **Atalhos de Teclado**: Navegação rápida e eficiente
- **Suporte Touch**: Controle por gestos em dispositivos móveis

### 🎨 Tipos de Harmonias
- **Monocromática**: Variações de uma única cor
- **Análoga**: Cores adjacentes no círculo cromático
- **Complementar**: Cores opostas no círculo cromático
- **Triádica**: Três cores igualmente espaçadas
- **Split-Complementary**: Uma cor base + duas adjacentes à complementar

### 🔧 Recursos Técnicos
- **Vanilla JavaScript**: Performance otimizada sem dependências
- **CSS Grid/Flexbox**: Layout moderno e flexível
- **Local Storage**: Persistência de dados sem backend
- **Semantic HTML**: Estrutura acessível e SEO-friendly
- **CSS Variables**: Sistema de cores dinâmico e manutenível

## 🚀 Demo

[**Ver Demo Online**](https://devalex-full.github.io/Gerador-de-Paletas-de-Cores/)

## 💻 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Google Fonts (Poppins)
- **Icons**: SVG customizados
- **Storage**: localStorage API
- **Design**: CSS Grid, Flexbox, CSS Variables

## 📦 Instalação

### Pré-requisitos
- Navegador web moderno
- Servidor HTTP local (opcional)

### Clone o repositório
```bash
git clone https://github.com/DevAlex-full/gerador-paletas-cores.git
cd gerador-paletas-cores
```

### Executar localmente
```bash
# Opção 1: Abrir diretamente no navegador
open index.html

# Opção 2: Usar servidor HTTP simples
python -m http.server 3000
# ou
npx serve .
```

## 📁 Estrutura do Projeto

```
gerador-paletas-cores/
│
├── index.html                  # Estrutura HTML principal
├── src/                        # Código fonte
│   ├── css/                    # Arquivos de estilo
│   │   ├── reset.css           # Reset CSS normalizado
│   │   └── main.css            # Estilos principais e responsivos
│   └── scripts/                # Scripts JavaScript
│       └── engine.js           # Lógica da aplicação
├── README.md                   # Documentação do projeto
└── assets/                     # Recursos adicionais (opcional)
    └── images/
```

## 🎮 Como Usar

### 🖱️ Controles com Mouse
- **Clique** em qualquer cor para copiar o código hexadecimal
- **Botão "Gerar Nova Paleta"** para criar nova combinação
- **Botão "Salvar Paleta"** para armazenar a paleta atual
- **Botões de ação** nas paletas salvas para carregar ou excluir

### ⌨️ Atalhos de Teclado
| Atalho | Ação |
|--------|------|
| `Espaço` | Gerar nova paleta |
| `Ctrl + S` | Salvar paleta atual |
| `Ctrl + E` | Exportar como CSS |
| `Ctrl + J` | Exportar como JSON |

### 📱 Controles Touch (Mobile)
- **Swipe Left** → Gerar nova paleta
- **Tap** em qualquer cor para copiar
- **Long Press** para ações adicionais

## 🔧 Configuração

### Personalizar Cores Base
Edite as variáveis CSS em `src/css/main.css`:

```css
:root {
    --primary-color: #6B46C1;
    --secondary-color: #9333EA;
    --accent-color: #A855F7;
    /* ... outras variáveis */
}
```

### Ajustar Algoritmos de Cores
Modifique os métodos de geração em `src/scripts/engine.js`:

```javascript
// Exemplo: Customizar paleta monocromática
generateMonochromaticPalette(baseHue) {
    // Sua lógica personalizada aqui
}
```

## 🎯 Roadmap

- [ ] **v2.0**: Temas personalizáveis
- [ ] **v2.1**: Export para Adobe Swatch Exchange (.ase)
- [ ] **v2.2**: Integração com APIs de cores
- [ ] **v2.3**: Análise de contraste WCAG
- [ ] **v2.4**: Modo escuro/claro
- [ ] **v2.5**: Histórico de paletas com navegação

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Veja como você pode ajudar:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

### 🐛 Reportar Bugs
- Use as [Issues](https://github.com/DevAlex-full/gerador-paletas-cores/issues) para reportar bugs
- Descreva o comportamento esperado vs atual
- Inclua screenshots se possível
- Especifique navegador e sistema operacional

### 💡 Sugerir Features
- Abra uma [Issue](https://github.com/DevAlex-full/gerador-paletas-cores/issues) com o label `enhancement`
- Descreva detalhadamente a funcionalidade desejada
- Explique o caso de uso

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**DevAlex-full**
- GitHub: [@DevAlex-full](https://github.com/DevAlex-full)
- LinkedIn: [Alexander Bueno](https://www.linkedin.com/in/alexander-bueno-43823a358/)
- Portfolio: [portifoliodevalex.netlify.app](https://portifoliodevalex.netlify.app/)

## 🙏 Agradecimentos

- **Google Fonts** pela fonte Poppins
- **Teoria das Cores** por Johannes Itten
- **Community** pelos feedbacks e contribuições
- **Inspiração** em ferramenias como Coolors.co e Adobe Color

## 📊 Estatísticas

<div align="center">
  
![GitHub stars](https://img.shields.io/github/stars/DevAlex-full/gerador-paletas-cores?style=social)
![GitHub forks](https://img.shields.io/github/forks/DevAlex-full/gerador-paletas-cores?style=social)
![GitHub issues](https://img.shields.io/github/issues/DevAlex-full/gerador-paletas-cores)
![GitHub pull requests](https://img.shields.io/github/issues-pr/DevAlex-full/gerador-paletas-cores)

</div>

---

<div align="center">
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
  <p>Feito com ❤️ e muito ☕</p>
</div>

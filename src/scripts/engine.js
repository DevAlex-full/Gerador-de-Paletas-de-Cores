// Color Palette Generator Engine
class ColorPaletteGenerator {
    constructor() {
        this.init();
        this.bindEvents();
        this.loadSavedPalettes();
    }

    init() {
        // DOM elements
        this.colorCards = document.querySelectorAll('.color-card');
        this.generateBtn = document.getElementById('generateBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.toast = document.getElementById('toast');
        this.savedList = document.getElementById('savedList');
        
        // Current palette colors
        this.currentPalette = [];
        
        // Initialize with current colors
        this.updateCurrentPalette();
    }

    bindEvents() {
        // Generate new palette
        this.generateBtn.addEventListener('click', () => {
            this.generateNewPalette();
        });

        // Save current palette
        this.saveBtn.addEventListener('click', () => {
            this.savePalette();
        });

        // Copy color codes
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const colorCode = btn.parentElement.querySelector('.color-code').textContent;
                this.copyToClipboard(colorCode);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.generateNewPalette();
            }
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.savePalette();
            }
        });

        // Click on color card to copy
        this.colorCards.forEach(card => {
            card.addEventListener('click', () => {
                const colorCode = card.querySelector('.color-code').textContent;
                this.copyToClipboard(colorCode);
            });
        });
    }

    // Generate random hex color
    generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Generate harmonious colors based on color theory
    generateHarmoniousPalette() {
        const baseHue = Math.floor(Math.random() * 360);
        const palette = [];

        // Generate colors with different harmony types
        const harmonyTypes = [
            // Monochromatic
            () => this.generateMonochromaticPalette(baseHue),
            // Analogous
            () => this.generateAnalogousPalette(baseHue),
            // Complementary
            () => this.generateComplementaryPalette(baseHue),
            // Triadic
            () => this.generateTriadicPalette(baseHue),
            // Split Complementary
            () => this.generateSplitComplementaryPalette(baseHue)
        ];

        const randomHarmony = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];
        return randomHarmony();
    }

    generateMonochromaticPalette(baseHue) {
        const palette = [];
        const saturations = [90, 70, 50, 30, 10];
        const lightnesses = [20, 40, 60, 80, 95];

        for (let i = 0; i < 5; i++) {
            const color = this.hslToHex(baseHue, saturations[i], lightnesses[i]);
            palette.push(color);
        }
        return palette;
    }

    generateAnalogousPalette(baseHue) {
        const palette = [];
        const hueOffsets = [-30, -15, 0, 15, 30];
        
        for (let i = 0; i < 5; i++) {
            const hue = (baseHue + hueOffsets[i] + 360) % 360;
            const saturation = 60 + Math.random() * 30;
            const lightness = 40 + Math.random() * 40;
            palette.push(this.hslToHex(hue, saturation, lightness));
        }
        return palette;
    }

    generateComplementaryPalette(baseHue) {
        const complementaryHue = (baseHue + 180) % 360;
        const palette = [];
        
        // Base color variations
        palette.push(this.hslToHex(baseHue, 80, 30));
        palette.push(this.hslToHex(baseHue, 60, 50));
        palette.push(this.hslToHex(baseHue, 40, 70));
        
        // Complementary variations
        palette.push(this.hslToHex(complementaryHue, 70, 45));
        palette.push(this.hslToHex(complementaryHue, 50, 80));
        
        return palette;
    }

    generateTriadicPalette(baseHue) {
        const palette = [];
        const hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
        
        // Add two colors from first hue
        palette.push(this.hslToHex(hues[0], 80, 35));
        palette.push(this.hslToHex(hues[0], 60, 65));
        
        // Add colors from other hues
        palette.push(this.hslToHex(hues[1], 70, 50));
        palette.push(this.hslToHex(hues[2], 65, 45));
        palette.push(this.hslToHex(hues[1], 40, 80));
        
        return palette;
    }

    generateSplitComplementaryPalette(baseHue) {
        const palette = [];
        const complementary = (baseHue + 180) % 360;
        const splitComp1 = (complementary - 30 + 360) % 360;
        const splitComp2 = (complementary + 30) % 360;
        
        palette.push(this.hslToHex(baseHue, 85, 25));
        palette.push(this.hslToHex(baseHue, 65, 55));
        palette.push(this.hslToHex(splitComp1, 75, 40));
        palette.push(this.hslToHex(splitComp2, 70, 35));
        palette.push(this.hslToHex(baseHue, 30, 85));
        
        return palette;
    }

    // HSL to Hex conversion
    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
    }

    // Generate new palette with animation
    generateNewPalette() {
        // Add loading animation
        this.generateBtn.classList.add('loading');
        this.generateBtn.innerHTML = '<span>GERANDO...</span>';
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            const newPalette = this.generateHarmoniousPalette();
            
            this.colorCards.forEach((card, index) => {
                const colorDisplay = card.querySelector('.color-display');
                const colorCode = card.querySelector('.color-code');
                
                // Add animation class
                card.classList.add('bounce-in');
                
                // Update color
                setTimeout(() => {
                    colorDisplay.style.backgroundColor = newPalette[index];
                    colorCode.textContent = newPalette[index];
                }, index * 100);
                
                // Remove animation class
                setTimeout(() => {
                    card.classList.remove('bounce-in');
                }, 600);
            });
            
            // Update current palette
            this.currentPalette = newPalette;
            
            // Reset button
            setTimeout(() => {
                this.generateBtn.classList.remove('loading');
                this.generateBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
                    </svg>
                    GERAR NOVA PALETA
                `;
            }, 1000);
            
        }, 500);
    }

    // Update current palette from DOM
    updateCurrentPalette() {
        this.currentPalette = [];
        this.colorCards.forEach(card => {
            const colorCode = card.querySelector('.color-code').textContent;
            this.currentPalette.push(colorCode);
        });
    }

    // Copy color to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast(`Cor ${text} copiada!`, 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                this.showToast(`Cor ${text} copiada!`, 'success');
            } catch (err) {
                this.showToast('Erro ao copiar cor', 'error');
            }
            
            document.body.removeChild(textArea);
        }
    }

    // Save current palette to localStorage
    savePalette() {
        this.updateCurrentPalette();
        
        const savedPalettes = this.getSavedPalettes();
        const newPalette = {
            id: Date.now(),
            colors: [...this.currentPalette],
            date: new Date().toLocaleDateString('pt-BR'),
            time: new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };
        
        savedPalettes.push(newPalette);
        
        // Keep only last 10 palettes
        if (savedPalettes.length > 10) {
            savedPalettes.shift();
        }
        
        localStorage.setItem('colorPalettes', JSON.stringify(savedPalettes));
        this.renderSavedPalettes();
        this.showToast('Paleta salva com sucesso!', 'success');
    }

    // Get saved palettes from localStorage
    getSavedPalettes() {
        try {
            const saved = localStorage.getItem('colorPalettes');
            return saved ? JSON.parse(saved) : [];
        } catch (err) {
            console.error('Error loading saved palettes:', err);
            return [];
        }
    }

    // Load saved palettes on init
    loadSavedPalettes() {
        this.renderSavedPalettes();
    }

    // Render saved palettes in the UI
    renderSavedPalettes() {
        const savedPalettes = this.getSavedPalettes();
        
        if (savedPalettes.length === 0) {
            this.savedList.innerHTML = '<p class="no-saved">Nenhuma paleta salva ainda</p>';
            return;
        }
        
        this.savedList.innerHTML = savedPalettes
            .reverse()
            .map(palette => `
                <div class="saved-palette" data-id="${palette.id}">
                    <div class="saved-palette-colors">
                        ${palette.colors.map(color => 
                            `<div class="saved-color" style="background-color: ${color};" title="${color}"></div>`
                        ).join('')}
                    </div>
                    <div class="saved-palette-date">
                        ${palette.date} às ${palette.time}
                    </div>
                    <div class="saved-palette-actions">
                        <button class="load-btn" onclick="colorGenerator.loadPalette(${palette.id})">
                            Carregar
                        </button>
                        <button class="delete-btn" onclick="colorGenerator.deletePalette(${palette.id})">
                            Excluir
                        </button>
                    </div>
                </div>
            `).join('');
    }

    // Load a specific palette
    loadPalette(id) {
        const savedPalettes = this.getSavedPalettes();
        const palette = savedPalettes.find(p => p.id === id);
        
        if (!palette) {
            this.showToast('Paleta não encontrada', 'error');
            return;
        }
        
        this.colorCards.forEach((card, index) => {
            const colorDisplay = card.querySelector('.color-display');
            const colorCode = card.querySelector('.color-code');
            
            card.classList.add('fade-in');
            
            setTimeout(() => {
                colorDisplay.style.backgroundColor = palette.colors[index];
                colorCode.textContent = palette.colors[index];
            }, index * 50);
            
            setTimeout(() => {
                card.classList.remove('fade-in');
            }, 500);
        });
        
        this.currentPalette = [...palette.colors];
        this.showToast('Paleta carregada!', 'success');
    }

    // Delete a specific palette
    deletePalette(id) {
        if (!confirm('Deseja excluir esta paleta?')) return;
        
        let savedPalettes = this.getSavedPalettes();
        savedPalettes = savedPalettes.filter(p => p.id !== id);
        
        localStorage.setItem('colorPalettes', JSON.stringify(savedPalettes));
        this.renderSavedPalettes();
        this.showToast('Paleta excluída', 'success');
    }

    // Show toast notification
    showToast(message, type = 'success') {
        const toastMessage = this.toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        
        // Reset classes
        this.toast.className = 'toast';
        
        // Add type class
        if (type !== 'success') {
            this.toast.classList.add(type);
        }
        
        // Show toast
        this.toast.classList.add('show');
        
        // Hide toast after delay
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    // Export palette as CSS variables
    exportAsCSS() {
        this.updateCurrentPalette();
        
        const cssVariables = this.currentPalette
            .map((color, index) => `  --color-${index + 1}: ${color};`)
            .join('\n');
        
        const cssCode = `:root {\n${cssVariables}\n}`;
        
        this.copyToClipboard(cssCode);
        this.showToast('CSS exportado para área de transferência!', 'success');
    }

    // Export palette as JSON
    exportAsJSON() {
        this.updateCurrentPalette();
        
        const paletteData = {
            name: `Paleta ${new Date().toLocaleDateString('pt-BR')}`,
            colors: this.currentPalette,
            created: new Date().toISOString()
        };
        
        const jsonCode = JSON.stringify(paletteData, null, 2);
        
        this.copyToClipboard(jsonCode);
        this.showToast('JSON exportado para área de transferência!', 'success');
    }
}

// Initialize the color generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.colorGenerator = new ColorPaletteGenerator();
});

// Add export buttons functionality (can be added to HTML if needed)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        window.colorGenerator.exportAsCSS();
    }
    if (e.ctrlKey && e.key === 'j') {
        e.preventDefault();
        window.colorGenerator.exportAsJSON();
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - generate new palette
            window.colorGenerator.generateNewPalette();
        }
    }
}
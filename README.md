# Calculadora de Gastos Diários

Este projeto é uma Calculadora de Gastos Diários desenvolvida como SPA / PWA simples.

## Funcionalidades:

✅ Adicionar gastos com descrição e valor  
✅ Listar os gastos do dia  
✅ Calcular e exibir o total do dia  
✅ Remover gastos  
✅ Persistência com LocalStorage  
✅ Responsiva  
✅ Deploy no Vercel  

## Deploy:
👉 https://calculadora-gastos-livid.vercel.app

## Cronograma: 




👉 Imagem ou descrição das fases (exemplo: Planejamento, Desenvolvimento, Testes, Deploy)

## Board do Trello:

👉 https://trello.com/invite/b/684760b2953fda13d2d6c14c/ATTIaedb02b3e8d02e032ca743892b0da98711ABD4E9/calculadora-de-gastos

## Interação com Claude.ai:

### Prompt 1 - *"Claude, explique o seguinte código de calculadora de gastos em JavaScript (OBS. O código foi colado no Claude.ai). O que ele faz? Como ele usa o LocalStorage? Tem algum ponto que poderia ser melhorado?"*

**Resposta:**  
Este código implementa uma **calculadora de gastos pessoais** que permite ao usuário adicionar, visualizar e remover despesas, com persistência de dados no navegador.

## O que o código faz:

O aplicativo permite que o usuário:
- **Adicione gastos** com descrição e valor através de um formulário
- **Visualize todos os gastos** em uma lista na tela
- **Remova gastos individuais** clicando no botão "Remover"
- **Veja o total** de todos os gastos somados
- **Mantenha os dados salvos** mesmo após fechar o navegador

## Como usa o LocalStorage:

O LocalStorage é usado para **persistir os dados** entre sessões do navegador:

```javascript
// Carrega dados salvos ao iniciar
let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

// Salva sempre que há mudanças
function salvarGastos() {
    localStorage.setItem('gastos', JSON.stringify(gastos));
}
```

Os gastos são armazenados como uma string JSON no LocalStorage e convertidos de volta para array quando carregados.

## Pontos que poderiam ser melhorados:

**1. Validação mais robusta:**
```javascript
// Validar valores negativos e números muito grandes
if (!descricao.trim() || isNaN(valor) || valor <= 0 || valor > 999999) {
    alert('Dados inválidos!');
    return;
}
```

**2. Tratamento de erros do LocalStorage:**
```javascript
function salvarGastos() {
    try {
        localStorage.setItem('gastos', JSON.stringify(gastos));
    } catch (error) {
        alert('Erro ao salvar dados!');
    }
}
```

**3. Melhor experiência do usuário:**
- Confirmar antes de remover gastos
- Permitir editar gastos existentes
- Adicionar categorias aos gastos
- Melhorar o design visual

**4. Formatação de moeda:**
```javascript
// Usar Intl.NumberFormat para melhor formatação
const formatarMoeda = (valor) => 
    new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(valor);
```

**5. Organização do código:**
- Separar em módulos
- Usar classes para melhor estruturação
- Adicionar comentários mais detalhados

O código está funcional e bem estruturado para um projeto simples, mas essas melhorias o tornariam mais robusto e profissional.

### Prompt 2 - *"Como tornar esta aplicação uma PWA? Está correto usar um manifest.json dessa forma?"*

**Resposta:**  
**Não exatamente.** Apenas ter um `manifest.json` não torna sua aplicação um PWA completo. O manifest é apenas **um dos requisitos**, mas um PWA completo precisa de mais componentes.

## Para ser um PWA completo, você precisa de:

### 1. **Web App Manifest** (que você já tem)
Cada PWA deve incluir um único manifest por aplicação, normalmente hospedado na pasta raiz. Exemplo de um manifest.json completo:

```json
{
  "name": "Calculadora de Gastos",
  "short_name": "Gastos",
  "description": "Gerencie seus gastos pessoais",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196f3",
  "orientation": "portrait",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. **Service Worker** (essencial e você não tem)
O Service Worker é **obrigatório** para PWAs. Ele permite:
- Funcionamento offline
- Cache de recursos
- Notificações push

```javascript
// sw.js
const CACHE_NAME = 'gastos-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/script.js',
  '/icon-192x192.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      }
    )
  );
});
```

### 3. **Registrar o Service Worker**
No seu HTML principal:

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('SW registrado:', registration);
    })
    .catch(function(error) {
      console.log('Erro no SW:', error);
    });
}
```

### 4. **HTTPS obrigatório**
Para um PWA ser instalável, deve ser servido usando protocolo HTTPS, ou do ambiente de desenvolvimento local usando localhost.

### 5. **Ícones necessários**
Para ícones do manifest, você precisará criar ícones pwa-192x192.png e pwa-512x512.png. Os ícones especificados são o mínimo necessário.

## Como melhorar seu PWA:

### **1. Adicionar funcionalidade offline:**
```javascript
// Modificar seu código para funcionar offline
function salvarGastos() {
    try {
        localStorage.setItem('gastos', JSON.stringify(gastos));
        // Sincronizar quando voltar online
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
            navigator.serviceWorker.ready.then(sw => {
                return sw.sync.register('sync-gastos');
            });
        }
    } catch (error) {
        console.error('Erro ao salvar:', error);
    }
}
```

### **2. Implementar estratégia de cache:**
- Cache First: para recursos estáticos
- Network First: para dados dinâmicos
- Stale While Revalidate: para conteúdo que muda ocasionalmente

### **3. Adicionar instalabilidade:**
```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt = e;
  // Mostrar botão de instalação personalizado
  showInstallButton();
});
```

### **4. Melhorar o manifest:**
- Adicionar screenshots
- Configurar shortcuts
- Definir categorias

Atualmente, sua aplicação está apenas **parcialmente** PWA. Para ser completa, o Service Worker é fundamental, pois sem ele não há cache offline nem instalabilidade real.

## Tecnologias utilizadas:
- HTML
- CSS
- JavaScript (Vanilla JS)
- LocalStorage
- GitHub + Vercel

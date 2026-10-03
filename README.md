# 🍽️ GastroHub Guariba

> **Guia Gastronômico & Plataforma de Pedidos Online de Guariba - SP**

O **GastroHub Guariba** é uma aplicação web moderna desenvolvida para conectar os moradores e visitantes da cidade de Guariba aos melhores restaurantes, hamburguerias, lanchonetes e pizzarias locais. 

A plataforma oferece uma experiência completa de catálogo e delivery, permitindo explorar cardápios com fotos em alta definição, montar sacolas de compras, finalizar pedidos e acompanhar a entrega em tempo real direto pelo navegador.

---

## 📖 Sobre o Projeto

O projeto foi pensado para valorizar o comércio gastronômico de Guariba - SP, reunindo estabelecimentos reais do município (como *Pizzaria Kid*, *Pizzaria Saltes*, *Original Burg*, *Fogão de Lenha*, *Casa do Mineiro*, *Boteco da Vila*, entre outros) em uma interface ágil, intuitiva e totalmente responsiva (adaptada para celulares, tablets e computadores).

### ✨ Principais Funcionalidades:

- **Catálogo Gastronômico por Categorias:** Navegação rápida entre Pizzarias, Lanchonetes & Burgers e Restaurantes/Bistrôs.
- **Busca em Tempo Real:** Pesquisa instantânea por nome do local, pratos do cardápio, culinária ou bairro de Guariba.
- **Filtros Avançados:** Filtre locais abertos no momento, entrega grátis, mais bem avaliados (nota 4.8+) e favoritos.
- **Cardápio Interativo com Fotos e Preços:** Visualização de descrições detalhadas, ingredientes, horários de atendimento, endereço e telefone.
- **Sacola de Compras & Checkout Integrado:** Adicione itens à sacola, ajuste quantidades, selecione o endereço de entrega e escolha entre Pix, cartão na entrega ou dinheiro com troco.
- **Rastreamento de Pedidos em Tempo Real:** Linha do tempo interativa mostrando as etapas do pedido (*Recebido*, *Na Cozinha*, *A Caminho* e *Entregue*), além de código Pix Copia e Cola funcional.
- **Autenticação de Usuários:** Cadastro e login de clientes para salvar endereços de entrega e manter o histórico de pedidos.
- **Cadastro de Estabelecimentos:** Formulário completo para inclusão de novos restaurantes e lanchonetes de Guariba no catálogo.
- **Modo Escuro / Claro (Dark & Light Theme):** Alternância instantânea de tema com preservação da preferência do usuário.
- **Persistência de Dados Local (LocalStorage):** Todos os dados (carrinho, favoritos, usuários, histórico de pedidos e estabelecimentos cadastrados) são mantidos no navegador do usuário.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web puras (Vanilla), sem dependência de frameworks pesados, garantindo carregamento ultrarrápido:

- **HTML5:** Estrutura semântica, acessível e otimizada para SEO local.
- **CSS3 Moderno:**
  - Design Responsivo (Mobile-First / Flexbox & CSS Grid)
  - Variáveis de Cor (Custom Properties) para alternância dinâmica entre Tema Claro e Tema Escuro
  - Animações e transições suaves de interface
- **JavaScript (ES6+):**
  - Manipulação avançada do DOM e arquitetura orientada a eventos
  - Persistência assíncrona e local via **Web Storage API (`localStorage`)**
  - Gerenciamento de estado da sacola, checkout, autenticação e filtros
- **Font Awesome 6:** Biblioteca de ícones vetoriais.
- **Unsplash CDN:** Imagens de capa e pratos gastronômicos em alta resolução.

---

## 📂 Estrutura de Arquivos

```plaintext
projetoapp/
├── index.html          # Estrutura principal da página, modais e drawer da sacola
├── css/
│   └── styles.css      # Estilização completa, variáveis de tema e responsividade
├── js/
│   ├── data.js         # Base de dados com estabelecimentos e cardápios de Guariba - SP
│   └── app.js          # Lógica da aplicação, carrinho, pedidos, filtros e modais
└── README.md           # Documentação do projeto
```

---

## 💻 Como Usar e Executar

Não é necessário instalar ferramentas complexas ou gerenciadores de pacotes como Node.js para rodar o projeto. Basta um navegador de internet moderno (Google Chrome, Microsoft Edge, Mozilla Firefox, Opera, etc.).

### 1. Executando Localmente

1. **Baixe ou clone** a pasta do projeto em seu computador.
2. Dê um **duplo clique no arquivo `index.html`** para abri-lo diretamente no seu navegador padrão.
3. *Opcional (para desenvolvedores):* Se utilizar o VS Code, clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

---

### 2. Guia de Uso da Plataforma

1. **Explorar Estabelecimentos:**
   - Utilize as pílulas de categoria (*Pizzarias*, *Lanchonetes*, *Restaurantes*) no topo para filtrar a lista.
   - Digite o nome de um prato ou rua de Guariba no campo de busca para encontrar opções específicas.
2. **Visualizar Cardápio e Fazer Pedido:**
   - Clique em qualquer card para abrir os detalhes do restaurante e o cardápio.
   - Clique em **"+ Adicionar à Sacola"** nos pratos desejados.
3. **Finalizar a Compra:**
   - Abra a **Sacola** no canto superior direito.
   - Clique em **"Avançar para o Pagamento"**, informe o endereço em Guariba, selecione a forma de pagamento e confirme.
   - Acompanhe o pedido na tela de **Rastreamento em Tempo Real**.
4. **Cadastrar Novo Estabelecimento:**
   - Clique no botão **"+ Estabelecimento"** na barra superior e preencha os dados do restaurante para adicioná-lo imediatamente ao catálogo.
5. **Restaurar Dados Originais:**
   - Caso queira retornar aos dados padrão de Guariba, clique no botão **"Restaurar locais de Guariba"** no rodapé do site.

---

## 📍 Localização

Projeto focado e contextualizado para o município de **Guariba - SP**, atendendo aos bairros Centro, Vila Virgínia, Cecap, Jardim das Palmeiras, Cohab e regiões vizinhas (DDD 16).

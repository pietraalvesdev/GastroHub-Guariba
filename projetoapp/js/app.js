/**
 * GastroHub - Sistema Interativo de Restaurantes, Lanchonetes e Pizzarias
 * Inclui: Catálogo, Cadastro de Estabelecimentos, Autenticação de Usuários e Pedidos Online
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // CONSTANTES E CHAVES DE ARMAZENAMENTO LOCAL
  // ============================================================
  const STORAGE_KEYS = {
    PLACES: 'gastrohub_places_guariba_v3',
    FAVORITES: 'gastrohub_favorites_guariba_v3',
    THEME: 'gastrohub_theme_v2',
    USERS: 'gastrohub_users_v2',
    SESSION: 'gastrohub_session_v2',
    CART: 'gastrohub_cart_guariba_v3',
    ORDERS: 'gastrohub_orders_v2'
  };

  // ============================================================
  // ESTADO DA APLICAÇÃO
  // ============================================================
  let places = loadPlaces();
  let favorites = loadFavorites();
  let users = loadUsers();
  let currentUser = loadCurrentSession();
  let cart = loadCart();
  let orders = loadOrders();

  let activeCategory = 'all';
  let searchQuery = '';
  let activeFilters = {
    open: false,
    freeDelivery: false,
    topRated: false,
    favorites: false
  };
  let currentSort = 'rating';

  // ============================================================
  // SELETORES DO DOM
  // ============================================================
  // Navbar e Controles Gerais
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const favoritesFilterBtn = document.getElementById('favoritesFilterBtn');
  const favoritesCountEl = document.getElementById('favoritesCount');
  const openCartBtn = document.getElementById('openCartBtn');
  const cartBadge = document.getElementById('cartBadge');
  const userAuthArea = document.getElementById('userAuthArea');
  const openAddModalBtn = document.getElementById('openAddModalBtn');
  const logoLink = document.getElementById('logoLink');
  
  // Hero e Filtros
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const statPlacesCount = document.getElementById('statPlacesCount');
  const categoryPillsContainer = document.getElementById('categoryPills');
  const filterChips = document.querySelectorAll('.filter-chip');
  const resultsCountEl = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('sortSelect');
  const placesGrid = document.getElementById('placesGrid');

  // Sacola / Drawer de Pedidos
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartRestaurantName = document.getElementById('cartRestaurantName');
  const cartBody = document.getElementById('cartBody');
  const cartFooter = document.getElementById('cartFooter');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartDeliveryFee = document.getElementById('cartDeliveryFee');
  const cartTotal = document.getElementById('cartTotal');
  const goToCheckoutBtn = document.getElementById('goToCheckoutBtn');
  const checkoutView = document.getElementById('checkoutView');
  const backToCartBtn = document.getElementById('backToCartBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutAddressDisplay = document.getElementById('checkoutAddressDisplay');
  const checkoutAddressText = document.getElementById('checkoutAddressText');
  const editAddressBtn = document.getElementById('editAddressBtn');
  const addressEditFields = document.getElementById('addressEditFields');
  const orderAddress = document.getElementById('orderAddress');
  const orderComplement = document.getElementById('orderComplement');
  const trocoContainer = document.getElementById('trocoContainer');
  const checkoutFinalTotal = document.getElementById('checkoutFinalTotal');

  // Modais
  const detailsModal = document.getElementById('detailsModal');
  const closeDetailsModalBtn = document.getElementById('closeDetailsModalBtn');
  const modalViewCartBtn = document.getElementById('modalViewCartBtn');
  const addPlaceModal = document.getElementById('addPlaceModal');
  const closeAddModalBtn = document.getElementById('closeAddModalBtn');
  const cancelAddBtn = document.getElementById('cancelAddBtn');
  const addPlaceForm = document.getElementById('addPlaceForm');
  const formCategory = document.getElementById('formCategory');
  const formImageInput = document.getElementById('formImage');
  const presetImagesContainer = document.getElementById('presetImagesContainer');

  // Modal Detalhes do Estabelecimento
  const modalCoverImg = document.getElementById('modalCoverImg');
  const modalCategoryBadge = document.getElementById('modalCategoryBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalRating = document.getElementById('modalRating');
  const modalDescription = document.getElementById('modalDescription');
  const modalAddress = document.getElementById('modalAddress');
  const modalHours = document.getElementById('modalHours');
  const modalDelivery = document.getElementById('modalDelivery');
  const modalPrice = document.getElementById('modalPrice');
  const modalMenuList = document.getElementById('modalMenuList');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  // Modal Auth (Login / Cadastro)
  const authModal = document.getElementById('authModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Modal Rastreamento do Pedido
  const orderTrackingModal = document.getElementById('orderTrackingModal');
  const closeTrackingModalBtn = document.getElementById('closeTrackingModalBtn');
  const trackOrderNumber = document.getElementById('trackOrderNumber');
  const trackRestaurantName = document.getElementById('trackRestaurantName');
  const trackAddress = document.getElementById('trackAddress');
  const trackPayment = document.getElementById('trackPayment');
  const trackItemsList = document.getElementById('trackItemsList');
  const trackTotal = document.getElementById('trackTotal');
  const pixPaymentBox = document.getElementById('pixPaymentBox');
  const copyPixBtn = document.getElementById('copyPixBtn');
  const pixCodeInput = document.getElementById('pixCodeInput');
  const finishTrackingBtn = document.getElementById('finishTrackingBtn');

  // Modal Histórico de Pedidos
  const ordersHistoryModal = document.getElementById('ordersHistoryModal');
  const closeOrdersModalBtn = document.getElementById('closeOrdersModalBtn');
  const ordersHistoryList = document.getElementById('ordersHistoryList');

  // Toasts e Reset
  const toastContainer = document.getElementById('toastContainer');
  const resetDataBtn = document.getElementById('resetDataBtn');

  // Estabelecimento atualmente aberto no modal de detalhes
  let currentViewingPlace = null;

  // ============================================================
  // INICIALIZAÇÃO
  // ============================================================
  initTheme();
  renderUserAuthArea();
  updateFavoritesBadge();
  updateCartBadge();
  updatePresetImages('pizzaria');
  renderPlaces();
  setupEventListeners();

  // ============================================================
  // PERSISTÊNCIA (LOCALSTORAGE)
  // ============================================================
  function loadPlaces() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLACES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some(p => (p.neighborhood && p.neighborhood.toLowerCase().includes('guariba')) || (p.address && p.address.toLowerCase().includes('guariba')))) {
          return parsed;
        }
      }
    } catch (e) { console.warn(e); }
    return [...INITIAL_PLACES];
  }

  function savePlaces() {
    localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
  }

  function loadFavorites() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (saved) return JSON.parse(saved);
    } catch (e) { console.warn(e); }
    return [];
  }

  function saveFavorites() {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }

  function loadUsers() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      if (saved) return JSON.parse(saved);
    } catch (e) { console.warn(e); }
    // Usuário de demonstração inicial
    return [
      {
        name: 'Cliente Vip',
        email: 'cliente@exemplo.com',
        phone: '(11) 98888-7777',
        password: '123',
        address: 'Rua das Palmeiras, 350 - Jardins',
        complement: 'Apto 42'
      }
    ];
  }

  function saveUsers() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  function loadCurrentSession() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (saved) return JSON.parse(saved);
    } catch (e) { console.warn(e); }
    return null;
  }

  function saveCurrentSession(user) {
    currentUser = user;
    if (user) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
    renderUserAuthArea();
  }

  function loadCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) { console.warn(e); }
    return {
      restaurantId: null,
      restaurantName: '',
      deliveryFeeNum: 0,
      deliveryFeeText: 'Grátis',
      items: []
    };
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartBadge();
  }

  function loadOrders() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) { console.warn(e); }
    return [];
  }

  function saveOrders() {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }

  // ============================================================
  // TEMA (DARK / LIGHT)
  // ============================================================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      themeToggleBtn.title = 'Alternar para Modo Claro';
    } else {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      themeToggleBtn.title = 'Alternar para Modo Escuro';
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Modo ${next === 'dark' ? 'Escuro' : 'Claro'} ativado`, 'info');
  }

  // ============================================================
  // AUTENTICAÇÃO E ÁREA DO USUÁRIO
  // ============================================================
  function renderUserAuthArea() {
    if (currentUser) {
      const firstName = currentUser.name.split(' ')[0];
      const initial = firstName.charAt(0).toUpperCase();

      userAuthArea.innerHTML = `
        <div class="user-profile-menu" id="userMenuTrigger">
          <div class="user-avatar-circle">${initial}</div>
          <span class="user-name-label">Olá, ${firstName}</span>
          <i class="fa-solid fa-chevron-down" style="font-size: 0.72rem; opacity: 0.7;"></i>
        </div>
        <div class="user-dropdown" id="userDropdown">
          <button class="dropdown-item" id="openOrdersHistoryBtn">
            <i class="fa-solid fa-clock-rotate-left"></i> Meus Pedidos
          </button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item danger" id="logoutBtn">
            <i class="fa-solid fa-right-from-bracket"></i> Sair da Conta
          </button>
        </div>
      `;

      // Eventos do Dropdown
      const trigger = document.getElementById('userMenuTrigger');
      const dropdown = document.getElementById('userDropdown');
      
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });

      document.getElementById('openOrdersHistoryBtn').addEventListener('click', () => {
        dropdown.classList.remove('show');
        openOrdersHistoryModal();
      });

      document.getElementById('logoutBtn').addEventListener('click', () => {
        dropdown.classList.remove('show');
        handleLogout();
      });

      document.addEventListener('click', () => dropdown.classList.remove('show'));
    } else {
      userAuthArea.innerHTML = `
        <button class="btn-secondary btn-login" id="openAuthModalBtn">
          <i class="fa-regular fa-user"></i>
          <span>Entrar / Cadastrar</span>
        </button>
      `;

      document.getElementById('openAuthModalBtn').addEventListener('click', () => {
        openAuthModal('login');
      });
    }
  }

  function openAuthModal(initialTab = 'login') {
    switchAuthTab(initialTab);
    authModal.classList.add('active');
    authModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeAuthModal() {
    authModal.classList.remove('active');
    authModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function switchAuthTab(tab) {
    if (tab === 'login') {
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    } else {
      tabRegisterBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (user) {
      saveCurrentSession(user);
      closeAuthModal();
      loginForm.reset();
      showToast(`Bem-vindo(a) de volta, ${user.name.split(' ')[0]}!`, 'success');
      
      // Se estava no checkout, atualiza o endereço
      updateCheckoutAddress();
    } else {
      showToast('E-mail ou senha incorretos. Verifique ou crie uma conta.', 'info');
    }
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const address = document.getElementById('regAddress').value.trim();
    const complement = document.getElementById('regComplement').value.trim();

    if (users.some(u => u.email.toLowerCase() === email)) {
      showToast('Já existe uma conta com este e-mail. Faça login.', 'info');
      switchAuthTab('login');
      return;
    }

    const newUser = { name, email, phone, password, address, complement };
    users.push(newUser);
    saveUsers();

    saveCurrentSession(newUser);
    closeAuthModal();
    registerForm.reset();
    showToast(`Cadastro realizado com sucesso! Bem-vindo(a), ${name.split(' ')[0]}!`, 'success');

    updateCheckoutAddress();
  }

  function handleLogout() {
    saveCurrentSession(null);
    showToast('Você saiu da sua conta', 'info');
  }

  // ============================================================
  // GESTÃO DA SACOLA DE PEDIDOS (CARRINHO)
  // ============================================================
  function updateCartBadge() {
    const totalItems = cart.items.reduce((sum, i) => sum + i.qty, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  function openCartDrawer() {
    cartOverlay.classList.add('active');
    cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Volta para visão de itens da sacola
    checkoutView.style.display = 'none';
    cartBody.style.display = 'flex';
    if (cart.items.length > 0) {
      cartFooter.style.display = 'block';
    }
    renderCart();
  }

  function closeCartDrawer() {
    cartOverlay.classList.remove('active');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function addToCart(place, item, customNotes = '') {
    // Validação de restaurante diferente
    if (cart.restaurantId && cart.restaurantId !== place.id && cart.items.length > 0) {
      const confirmChange = confirm(
        `Sua sacola já contém itens de "${cart.restaurantName}".\n\nDeseja esvaziar a sacola para adicionar itens de "${place.name}"?`
      );
      if (!confirmChange) return;
      cart.items = [];
    }

    cart.restaurantId = place.id;
    cart.restaurantName = place.name;
    cart.deliveryFeeNum = place.deliveryFeeNum || 0;
    cart.deliveryFeeText = place.deliveryFee || 'Grátis';

    // Converte o preço string "R$ 68,90" para float
    const priceNum = parseFloat(
      item.price.replace(/[^\d.,]/g, '').replace(',', '.')
    ) || 0;

    // Verifica se já existe o mesmo prato na sacola
    const existingIndex = cart.items.findIndex(i => i.name === item.name && i.notes === customNotes);
    if (existingIndex > -1) {
      cart.items[existingIndex].qty += 1;
    } else {
      cart.items.push({
        id: 'item-' + Date.now() + Math.random().toString(36).substr(2, 4),
        name: item.name,
        priceText: item.price,
        priceNum: priceNum,
        qty: 1,
        notes: customNotes,
        image: item.image || place.image
      });
    }

    saveCart();
    renderCart();
    showToast(`"${item.name}" foi adicionado à sua sacola!`, 'success');
  }

  function updateItemQty(index, delta) {
    if (!cart.items[index]) return;
    cart.items[index].qty += delta;

    if (cart.items[index].qty <= 0) {
      cart.items.splice(index, 1);
    }

    if (cart.items.length === 0) {
      cart.restaurantId = null;
      cart.restaurantName = '';
    }

    saveCart();
    renderCart();
  }

  function renderCart() {
    if (cart.items.length === 0) {
      cartRestaurantName.textContent = 'Sua sacola está vazia';
      cartBody.innerHTML = `
        <div class="empty-state" style="border: none; padding: 40px 10px;">
          <div class="empty-state-icon">🛍️</div>
          <h3 class="empty-state-title">Sua sacola está vazia</h3>
          <p class="empty-state-text">Explore os restaurantes e adicione seus pratos favoritos!</p>
          <button class="btn-primary" id="btnExploreNow" style="margin-top: 10px;">
            <i class="fa-solid fa-utensils"></i> Explorar Cardápios
          </button>
        </div>
      `;
      cartFooter.style.display = 'none';

      document.getElementById('btnExploreNow')?.addEventListener('click', () => {
        closeCartDrawer();
      });
      return;
    }

    cartRestaurantName.textContent = cart.restaurantName;
    cartFooter.style.display = 'block';

    let subtotal = 0;

    cartBody.innerHTML = cart.items.map((item, index) => {
      const itemSubtotal = item.priceNum * item.qty;
      subtotal += itemSubtotal;

      return `
        <div class="cart-item-card">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">R$ ${itemSubtotal.toFixed(2).replace('.', ',')}</div>
            ${item.notes ? `<div class="cart-item-notes">Obs: ${item.notes}</div>` : ''}
          </div>
          <div class="qty-stepper">
            <button class="btn-qty" data-decrease="${index}" title="Diminuir">-</button>
            <span class="qty-count">${item.qty}</span>
            <button class="btn-qty" data-increase="${index}" title="Aumentar">+</button>
          </div>
        </div>
      `;
    }).join('');

    const total = subtotal + (cart.deliveryFeeNum || 0);

    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    cartDeliveryFee.textContent = cart.deliveryFeeText;
    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    checkoutFinalTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    // Eventos dos botões de quantidade
    cartBody.querySelectorAll('[data-increase]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-increase'));
        updateItemQty(idx, 1);
      });
    });

    cartBody.querySelectorAll('[data-decrease]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-decrease'));
        updateItemQty(idx, -1);
      });
    });
  }

  // ============================================================
  // FLUXO DE CHECKOUT E FINALIZAÇÃO DE PEDIDOS
  // ============================================================
  function startCheckoutFlow() {
    if (!currentUser) {
      showToast('Por favor, faça login ou cadastre-se para concluir seu pedido.', 'info');
      openAuthModal('login');
      return;
    }

    // Exibe a tela de checkout
    cartBody.style.display = 'none';
    cartFooter.style.display = 'none';
    checkoutView.style.display = 'flex';

    updateCheckoutAddress();
  }

  function updateCheckoutAddress() {
    if (currentUser) {
      const fullAddr = `${currentUser.address}${currentUser.complement ? ' - ' + currentUser.complement : ''}`;
      checkoutAddressText.textContent = fullAddr;
      orderAddress.value = currentUser.address || '';
      orderComplement.value = currentUser.complement || '';
    } else {
      checkoutAddressText.textContent = 'Faça login para selecionar o endereço de entrega.';
    }
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();

    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    if (cart.items.length === 0) {
      showToast('Sua sacola está vazia!', 'info');
      return;
    }

    const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'pix';
    const notes = document.getElementById('orderNotes').value.trim();
    const address = orderAddress.value.trim() || currentUser.address;
    const complement = orderComplement.value.trim() || currentUser.complement;
    const troco = document.getElementById('cashChangeInput').value.trim();

    const subtotal = cart.items.reduce((sum, i) => sum + (i.priceNum * i.qty), 0);
    const total = subtotal + (cart.deliveryFeeNum || 0);
    const orderNumber = `#GH-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: 'order-' + Date.now(),
      orderNumber,
      userEmail: currentUser.email,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      restaurantId: cart.restaurantId,
      restaurantName: cart.restaurantName,
      items: [...cart.items],
      subtotal,
      deliveryFee: cart.deliveryFeeText,
      total,
      address: `${address}${complement ? ' - ' + complement : ''}`,
      paymentMethod,
      notes,
      troco: paymentMethod === 'cash' ? troco : null,
      status: 'em_preparo',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('pt-BR')
    };

    orders.unshift(newOrder);
    saveOrders();

    // Limpa a sacola
    cart.items = [];
    cart.restaurantId = null;
    cart.restaurantName = '';
    saveCart();

    // Fecha a sacola e abre o rastreador
    closeCartDrawer();
    checkoutForm.reset();
    showToast(`Pedido ${orderNumber} realizado com sucesso!`, 'success');

    openOrderTracking(newOrder);
  }

  // ============================================================
  // RASTREAMENTO DO PEDIDO EM TEMPO REAL
  // ============================================================
  function openOrderTracking(order) {
    trackOrderNumber.textContent = order.orderNumber;
    trackRestaurantName.textContent = `Estabelecimento: ${order.restaurantName}`;
    trackAddress.textContent = order.address;
    
    let paymentLabel = 'Pix Instantâneo';
    if (order.paymentMethod === 'card_delivery') paymentLabel = 'Cartão na Entrega';
    if (order.paymentMethod === 'cash') paymentLabel = order.troco ? `Dinheiro (Troco para ${order.troco})` : 'Dinheiro';
    trackPayment.textContent = paymentLabel;

    // Se for Pix, exibe código copia e cola
    if (order.paymentMethod === 'pix') {
      pixPaymentBox.style.display = 'block';
    } else {
      pixPaymentBox.style.display = 'none';
    }

    // Itens
    trackItemsList.innerHTML = order.items.map(item => `
      <li style="display: flex; justify-content: space-between;">
        <span>${item.qty}x ${item.name}</span>
        <strong>R$ ${(item.priceNum * item.qty).toFixed(2).replace('.', ',')}</strong>
      </li>
    `).join('');

    trackTotal.textContent = `R$ ${order.total.toFixed(2).replace('.', ',')}`;

    // Timeline animada
    const stepReceived = document.getElementById('stepReceived');
    const stepKitchen = document.getElementById('stepKitchen');
    const stepDelivery = document.getElementById('stepDelivery');
    const line1 = document.getElementById('line1');

    stepReceived.className = 'timeline-step completed';
    line1.className = 'timeline-line completed';
    stepKitchen.className = 'timeline-step current';
    stepDelivery.className = 'timeline-step';

    orderTrackingModal.classList.add('active');
    orderTrackingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderTracking() {
    orderTrackingModal.classList.remove('active');
    orderTrackingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ============================================================
  // HISTÓRICO "MEUS PEDIDOS"
  // ============================================================
  function openOrdersHistoryModal() {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    const userOrders = orders.filter(o => o.userEmail === currentUser.email);

    if (userOrders.length === 0) {
      ordersHistoryList.innerHTML = `
        <div class="empty-state" style="border: none; padding: 30px 10px;">
          <div class="empty-state-icon">📋</div>
          <h3 class="empty-state-title">Nenhum pedido ainda</h3>
          <p class="empty-state-text">Você ainda não realizou pedidos no GastroHub. Peça algo delicioso agora!</p>
        </div>
      `;
    } else {
      ordersHistoryList.innerHTML = userOrders.map(order => `
        <div class="order-history-card">
          <div class="order-history-header">
            <div>
              <strong style="font-size: 1.05rem; color: var(--text-main);">${order.restaurantName}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${order.date} às ${order.createdAt} • ${order.orderNumber}</div>
            </div>
            <span class="order-history-status em_preparo">
              <i class="fa-solid fa-clock"></i> Em Preparo
            </span>
          </div>

          <div style="font-size: 0.88rem; color: var(--text-muted); margin: 8px 0;">
            ${order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px dashed var(--border-color);">
            <strong style="color: var(--primary);">Total: R$ ${order.total.toFixed(2).replace('.', ',')}</strong>
            <button class="btn-secondary" style="padding: 6px 14px; font-size: 0.8rem;" data-track-id="${order.id}">
              <i class="fa-solid fa-location-arrow"></i> Rastrear Pedido
            </button>
          </div>
        </div>
      `).join('');

      ordersHistoryList.querySelectorAll('[data-track-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-track-id');
          const order = orders.find(o => o.id === id);
          if (order) {
            closeOrdersModal();
            openOrderTracking(order);
          }
        });
      });
    }

    ordersHistoryModal.classList.add('active');
    ordersHistoryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeOrdersModal() {
    ordersHistoryModal.classList.remove('active');
    ordersHistoryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ============================================================
  // FILTRAGEM, BUSCA E RENDERIZAÇÃO DOS ESTABELECIMENTOS
  // ============================================================
  function getFilteredPlaces() {
    return places.filter(place => {
      if (activeCategory !== 'all' && place.category !== activeCategory) return false;

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = place.name.toLowerCase().includes(query);
        const matchDesc = place.description && place.description.toLowerCase().includes(query);
        const matchNeighborhood = place.neighborhood && place.neighborhood.toLowerCase().includes(query);
        const matchCategory = place.categoryLabel && place.categoryLabel.toLowerCase().includes(query);
        const matchTags = place.tags && place.tags.some(t => t.toLowerCase().includes(query));
        const matchMenu = place.menu && place.menu.some(m => 
          m.name.toLowerCase().includes(query) || (m.desc && m.desc.toLowerCase().includes(query))
        );

        if (!matchName && !matchDesc && !matchNeighborhood && !matchCategory && !matchTags && !matchMenu) {
          return false;
        }
      }

      if (activeFilters.open && !place.isOpen) return false;
      if (activeFilters.freeDelivery && place.deliveryFeeNum > 0) return false;
      if (activeFilters.topRated && place.rating < 4.8) return false;
      if (activeFilters.favorites && !favorites.includes(place.id)) return false;

      return true;
    }).sort((a, b) => {
      switch (currentSort) {
        case 'rating': return b.rating - a.rating;
        case 'reviews': return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        case 'time': return (parseInt(a.deliveryTime) || 99) - (parseInt(b.deliveryTime) || 99);
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
  }

  function renderPlaces() {
    const filtered = getFilteredPlaces();
    resultsCountEl.innerHTML = `Mostrando <strong>${filtered.length}</strong> de ${places.length} locais`;
    statPlacesCount.textContent = places.length;

    if (filtered.length === 0) {
      placesGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🍽️</div>
          <h3 class="empty-state-title">Nenhum estabelecimento encontrado</h3>
          <p class="empty-state-text">Tente alterar os termos da busca ou desativar alguns filtros.</p>
          <button class="btn-primary" id="resetFiltersBtn">
            <i class="fa-solid fa-filter-circle-xmark"></i> Limpar Filtros
          </button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', resetAllFilters);
      return;
    }

    placesGrid.innerHTML = filtered.map(place => {
      const isFav = favorites.includes(place.id);
      const categoryIcon = getCategoryIcon(place.category);

      return `
        <article class="place-card" data-id="${place.id}">
          <div class="place-card-media">
            <img src="${place.image}" alt="${place.name}" class="place-card-img" loading="lazy">
            <div class="card-overlay"></div>
            
            <div class="card-top-badges">
              <span class="cat-badge">
                ${categoryIcon} ${place.categoryLabel || place.category}
              </span>
              <button class="btn-favorite ${isFav ? 'active' : ''}" data-fav-id="${place.id}" title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}" aria-label="Favoritar">
                <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
              </button>
            </div>

            <div class="card-bottom-badges">
              <span class="status-indicator ${place.isOpen ? 'open' : 'closed'}">
                <span class="status-dot"></span>
                ${place.isOpen ? 'Aberto Agora' : 'Fechado'}
              </span>
              <span class="price-tag">${place.priceLevel || '$$'}</span>
            </div>
          </div>

          <div class="place-card-body">
            <div class="card-header-row">
              <h3 class="place-title">${place.name}</h3>
              <div class="place-rating">
                <i class="fa-solid fa-star"></i>
                <span>${place.rating.toFixed(1)}</span>
                <span style="font-weight: 400; opacity: 0.75; font-size: 0.75rem;">(${place.reviewsCount || 10})</span>
              </div>
            </div>

            <p class="place-desc">${place.description || 'Deliciosas opções gastronômicas preparadas com ingredientes selecionados.'}</p>

            <div class="place-meta-info">
              <div class="meta-item">
                <i class="fa-solid fa-location-dot"></i>
                <span>${place.neighborhood || 'Região Central'}</span>
              </div>
              <div class="meta-item">
                <i class="fa-solid fa-clock"></i>
                <span>${place.deliveryTime || '30-45 min'}</span>
              </div>
              <div class="meta-item">
                <i class="fa-solid fa-motorcycle"></i>
                <span>${place.deliveryFee || 'Grátis'}</span>
              </div>
            </div>
          </div>

          <div class="place-card-footer">
            <button class="btn-card-details" data-open-details="${place.id}">
              <span>Ver Cardápio & Pedir Online</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </article>
      `;
    }).join('');

    setupCardActions();
  }

  function getCategoryIcon(cat) {
    switch(cat) {
      case 'pizzaria': return '🍕';
      case 'lanchonete': return '🍔';
      case 'restaurante': return '🍷';
      default: return '🍽️';
    }
  }

  function setupCardActions() {
    document.querySelectorAll('.btn-favorite').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.getAttribute('data-fav-id'));
      });
    });

    document.querySelectorAll('[data-open-details]').forEach(btn => {
      btn.addEventListener('click', () => {
        openPlaceDetails(btn.getAttribute('data-open-details'));
      });
    });
  }

  function toggleFavorite(id) {
    const place = places.find(p => p.id === id);
    const placeName = place ? place.name : 'Estabelecimento';

    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
      showToast(`${placeName} removido dos favoritos`, 'info');
    } else {
      favorites.push(id);
      showToast(`${placeName} adicionado aos favoritos!`, 'success');
    }

    saveFavorites();
    updateFavoritesBadge();
    renderPlaces();
  }

  function updateFavoritesBadge() {
    favoritesCountEl.textContent = favorites.length;
    favoritesCountEl.style.display = favorites.length > 0 ? 'flex' : 'none';
  }

  // ============================================================
  // MODAL DE DETALHES COM CARDÁPIO & ADIÇÃO DIRETA À SACOLA
  // ============================================================
  function openPlaceDetails(id) {
    const place = places.find(p => p.id === id);
    if (!place) return;

    currentViewingPlace = place;

    modalCoverImg.src = place.image;
    modalCoverImg.alt = place.name;
    modalCategoryBadge.textContent = `${getCategoryIcon(place.category)} ${place.categoryLabel || place.category}`;
    modalTitle.textContent = place.name;
    modalRating.innerHTML = `<i class="fa-solid fa-star"></i> <span>${place.rating.toFixed(1)}</span> (${place.reviewsCount || 10} avaliações)`;
    modalDescription.textContent = place.description || '';
    modalAddress.textContent = place.address || `${place.neighborhood} - Guariba/SP`;
    modalHours.textContent = place.openingHours || 'Aberto todos os dias';
    modalDelivery.textContent = `${place.deliveryTime || '30-45 min'} • Taxa: ${place.deliveryFee || 'Grátis'}`;
    modalPrice.textContent = `${place.priceLevel || '$$'} (${place.priceLevel === '$' ? 'Econômico' : place.priceLevel === '$$$' ? 'Sofisticado' : 'Excelente Custo-Benefício'})`;

    // Renderiza itens do cardápio com botão "+ Adicionar à Sacola"
    if (place.menu && place.menu.length > 0) {
      modalMenuList.innerHTML = place.menu.map((item, itemIdx) => `
        <div class="menu-item-row">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-thumb">` : ''}
          <div class="menu-item-info">
            <div class="menu-item-header">
              <span class="menu-item-name">${item.name}</span>
              <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-desc">${item.desc || 'Especialidade da casa com ingredientes selecionados.'}</p>
            <button type="button" class="btn-add-item" data-add-menu-idx="${itemIdx}">
              <i class="fa-solid fa-plus"></i>
              <span>Adicionar à Sacola</span>
            </button>
          </div>
        </div>
      `).join('');

      modalMenuList.querySelectorAll('[data-add-menu-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-add-menu-idx'));
          const selectedItem = place.menu[idx];
          
          // Pergunta observação opcional
          const notes = prompt(`Alguma observação para "${selectedItem.name}"? (Ex: Sem cebola, bem passado - Opcional):`) || '';
          addToCart(place, selectedItem, notes.trim());
        });
      });
    } else {
      modalMenuList.innerHTML = `
        <p style="color: var(--text-muted); font-size: 0.9rem; padding: 10px 0;">
          Consulte o cardápio completo diretamente pelo WhatsApp do estabelecimento!
        </p>
      `;
    }

    // Link do WhatsApp
    const phone = place.whatsapp || '5511999999999';
    const message = encodeURIComponent(`Olá! Encontrei o *${place.name}* no GastroHub e gostaria de ver o cardápio completo.`);
    modalWhatsappBtn.href = `https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`;

    detailsModal.classList.add('active');
    detailsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailsModal() {
    detailsModal.classList.remove('active');
    detailsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ============================================================
  // MODAL DE CADASTRO DE ESTABELECIMENTO
  // ============================================================
  function openAddModal() {
    addPlaceModal.classList.add('active');
    addPlaceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updatePresetImages(formCategory.value);
  }

  function closeAddModal() {
    addPlaceModal.classList.remove('active');
    addPlaceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updatePresetImages(category) {
    const list = PRESET_IMAGES[category] || PRESET_IMAGES['pizzaria'];
    presetImagesContainer.innerHTML = list.map((item, index) => `
      <div class="preset-thumb ${index === 0 ? 'selected' : ''}" data-url="${item.url}" title="${item.label}">
        <img src="${item.url}" alt="${item.label}">
      </div>
    `).join('');

    if (!formImageInput.value || formImageInput.value.includes('unsplash.com')) {
      formImageInput.value = list[0].url;
    }

    presetImagesContainer.querySelectorAll('.preset-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        presetImagesContainer.querySelectorAll('.preset-thumb').forEach(t => t.classList.remove('selected'));
        thumb.classList.add('selected');
        formImageInput.value = thumb.getAttribute('data-url');
      });
    });
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const category = document.getElementById('formCategory').value;
    const neighborhood = document.getElementById('formNeighborhood').value.trim();
    const address = document.getElementById('formAddress').value.trim();
    const image = document.getElementById('formImage').value.trim();
    const priceLevel = document.getElementById('formPrice').value;
    const deliveryTime = document.getElementById('formDeliveryTime').value.trim() || '30-45 min';
    const deliveryFee = document.getElementById('formDeliveryFee').value.trim() || 'Grátis';
    const whatsapp = document.getElementById('formWhatsapp').value.trim();
    const description = document.getElementById('formDescription').value.trim();
    
    const itemName = document.getElementById('formItemName').value.trim();
    const itemPrice = document.getElementById('formItemPrice').value.trim();
    const itemDesc = document.getElementById('formItemDesc').value.trim();

    const menu = [];
    if (itemName) {
      menu.push({
        name: itemName,
        price: itemPrice || 'R$ 45,00',
        desc: itemDesc || 'Especialidade da casa'
      });
    }

    const categoryLabels = {
      pizzaria: 'Pizzaria',
      lanchonete: 'Lanchonete',
      restaurante: 'Restaurante'
    };

    const isFree = deliveryFee.toLowerCase().includes('grátis') || deliveryFee === '0' || deliveryFee.toLowerCase().includes('gratis');
    const feeNum = isFree ? 0 : (parseFloat(deliveryFee.replace(/[^\d.,]/g, '').replace(',', '.')) || 5.0);

    const newPlace = {
      id: 'custom-' + Date.now(),
      name,
      category,
      categoryLabel: categoryLabels[category] || 'Gastronomia',
      image: image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
      rating: 5.0,
      reviewsCount: 1,
      priceLevel,
      deliveryTime,
      deliveryFee,
      deliveryFeeNum: feeNum,
      neighborhood,
      address: address || `${neighborhood} - Guariba/SP`,
      phone: whatsapp ? `(${whatsapp.slice(0, 2)}) ${whatsapp.slice(2)}` : '(16) 99999-9999',
      whatsapp: whatsapp ? '55' + whatsapp.replace(/\D/g, '') : '5516999999999',
      isOpen: true,
      openingHours: 'Segunda a Domingo: 11:30 às 23:00',
      description: description || `Venha conhecer as delícias de ${name}. Feito com carinho e qualidade.`,
      tags: [categoryLabels[category], 'Novo', 'Destaque'],
      menu
    };

    places.unshift(newPlace);
    savePlaces();
    closeAddModal();
    addPlaceForm.reset();
    renderPlaces();
    showToast(`"${name}" cadastrado com sucesso!`, 'success');
  }

  // ============================================================
  // EVENT LISTENERS GERAIS
  // ============================================================
  function setupEventListeners() {
    // Tema
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Sacola de Pedidos
    openCartBtn.addEventListener('click', openCartDrawer);
    closeCartBtn.addEventListener('click', closeCartDrawer);
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCartDrawer();
    });

    // Modal de Detalhes -> Ver Sacola
    modalViewCartBtn.addEventListener('click', () => {
      closeDetailsModal();
      openCartDrawer();
    });

    // Fluxo de Checkout
    goToCheckoutBtn.addEventListener('click', startCheckoutFlow);
    backToCartBtn.addEventListener('click', () => {
      checkoutView.style.display = 'none';
      cartBody.style.display = 'flex';
      cartFooter.style.display = 'block';
    });

    // Alterar Endereço no Checkout
    editAddressBtn.addEventListener('click', () => {
      addressEditFields.style.display = addressEditFields.style.display === 'none' ? 'block' : 'none';
      editAddressBtn.textContent = addressEditFields.style.display === 'none' ? 'Alterar' : 'Fechar';
    });

    // Formas de Pagamento no Checkout
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
        e.target.closest('.payment-method-card').classList.add('active');

        if (e.target.value === 'cash') {
          trocoContainer.style.display = 'block';
        } else {
          trocoContainer.style.display = 'none';
        }
      });
    });

    // Envio do formulário de checkout
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    // Copiar código Pix
    copyPixBtn.addEventListener('click', () => {
      pixCodeInput.select();
      navigator.clipboard.writeText(pixCodeInput.value).then(() => {
        showToast('Código Pix copiado para a área de transferência!', 'success');
      });
    });

    // Rastreamento Fechar
    closeTrackingModalBtn.addEventListener('click', closeOrderTracking);
    finishTrackingBtn.addEventListener('click', () => {
      closeOrderTracking();
      openOrdersHistoryModal();
    });

    // Histórico de Pedidos Fechar
    closeOrdersModalBtn.addEventListener('click', closeOrdersModal);

    // Autenticação (Abas e Envio)
    tabLoginBtn.addEventListener('click', () => switchAuthTab('login'));
    tabRegisterBtn.addEventListener('click', () => switchAuthTab('register'));
    loginForm.addEventListener('submit', handleLoginSubmit);
    registerForm.addEventListener('submit', handleRegisterSubmit);
    closeAuthModalBtn.addEventListener('click', closeAuthModal);
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });

    // Favoritos no Header
    favoritesFilterBtn.addEventListener('click', () => {
      const favFilter = document.getElementById('filterFavoritesOnly');
      activeFilters.favorites = !activeFilters.favorites;
      favFilter.classList.toggle('active', activeFilters.favorites);
      renderPlaces();
    });

    // Logo -> Reset de filtros
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
    });

    // Busca
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      clearSearchBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
      renderPlaces();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
      renderPlaces();
    });

    // Pílulas de Categoria
    categoryPillsContainer.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPillsContainer.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-category');
        renderPlaces();
      });
    });

    // Filtros secundários
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filterType = chip.getAttribute('data-filter');
        activeFilters[filterType] = !activeFilters[filterType];
        chip.classList.toggle('active', activeFilters[filterType]);
        renderPlaces();
      });
    });

    // Ordenação
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderPlaces();
    });

    // Modal de Detalhes
    closeDetailsModalBtn.addEventListener('click', closeDetailsModal);
    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) closeDetailsModal();
    });

    // Modal de Cadastro de Estabelecimento
    openAddModalBtn.addEventListener('click', openAddModal);
    closeAddModalBtn.addEventListener('click', closeAddModal);
    cancelAddBtn.addEventListener('click', closeAddModal);
    addPlaceModal.addEventListener('click', (e) => {
      if (e.target === addPlaceModal) closeAddModal();
    });

    formCategory.addEventListener('change', (e) => {
      updatePresetImages(e.target.value);
    });

    addPlaceForm.addEventListener('submit', handleAddPlaceSubmit);

    // Tecla ESC para fechar qualquer modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDetailsModal();
        closeAddModal();
        closeAuthModal();
        closeCartDrawer();
        closeOrderTracking();
        closeOrdersModal();
      }
    });

    // Restaurar dados padrão de demonstração
    resetDataBtn?.addEventListener('click', () => {
      if (confirm('Deseja restaurar os estabelecimentos padrão de demonstração?')) {
        localStorage.removeItem(STORAGE_KEYS.PLACES);
        places = [...INITIAL_PLACES];
        savePlaces();
        renderPlaces();
        showToast('Catálogo restaurado com sucesso!', 'info');
      }
    });
  }

  function resetAllFilters() {
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';

    activeCategory = 'all';
    categoryPillsContainer.querySelectorAll('.cat-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-category') === 'all');
    });

    activeFilters = {
      open: false,
      freeDelivery: false,
      topRated: false,
      favorites: false
    };

    filterChips.forEach(c => c.classList.remove('active'));
    currentSort = 'rating';
    sortSelect.value = 'rating';

    renderPlaces();
    showToast('Filtros redefinidos', 'info');
  }

  // ============================================================
  // TOAST NOTIFICATIONS
  // ============================================================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `
      <i class="fa-solid ${icon} toast-icon"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 3200);
  }
});

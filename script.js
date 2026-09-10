/* =========================================================
   ysswide — Галерея проектов
   Файл: script.js
   Описание: рендер галереи из массива + модальное окно
   ========================================================= */

(function () {
    'use strict';

    /* ---------- ДАННЫЕ ГАЛЕРЕИ ----------
       Замени ссылки src на свои картинки.
       title — подпись, которая появится при наведении и в модалке.
    ------------------------------------ */
    const images = [
        { src: 'https://picsum.photos/id/1/400/400',   title: 'Городской пейзаж' },
        { src: 'https://picsum.photos/id/26/400/400',  title: 'Природа и горы' },
        { src: 'https://picsum.photos/id/64/400/400',  title: 'Уютное кафе' },
        { src: 'https://picsum.photos/id/96/400/400',  title: 'Творческая мастерская' },
        { src: 'https://picsum.photos/id/106/400/400', title: 'Прогулка по парку' },
        { src: 'https://picsum.photos/id/148/400/400', title: 'Архитектура' },
        { src: 'https://picsum.photos/id/177/400/400', title: 'Закат на море' },
        { src: 'https://picsum.photos/id/188/400/400', title: 'Ночной город' }
    ];

    /* ---------- ССЫЛКИ НА DOM-ЭЛЕМЕНТЫ ---------- */
    const galleryGrid  = document.getElementById('galleryGrid');
    const modal        = document.getElementById('imageModal');
    const modalImg     = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose   = document.getElementById('modalClose');

    /* ---------- ПРОВЕРКА, ЧТО ЭЛЕМЕНТЫ СУЩЕСТВУЮТ ---------- */
    if (!galleryGrid || !modal || !modalImg || !modalCaption || !modalClose) {
        console.warn('ysswide: не найдены нужные элементы галереи в DOM.');
        return;
    }

    /* ---------- РЕНДЕР ГАЛЕРЕИ ----------
       Проходим по массиву images и создаём карточки.
    ------------------------------------ */
    function renderGallery() {
        galleryGrid.innerHTML = '';

        images.forEach(function (item, index) {
            const card = document.createElement('div');
            card.className = 'gallery-item';
            card.setAttribute('data-index', index);
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Открыть изображение: ' + item.title);

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.title;
            img.loading = 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.innerHTML = '<i class="fas fa-search-plus"></i> ' + item.title;

            card.appendChild(img);
            card.appendChild(overlay);
            galleryGrid.appendChild(card);
        });
    }

    /* ---------- ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ---------- */
    function openModal(index) {
        const item = images[index];
        if (!item) return;

        modalImg.src = item.src;
        modalImg.alt = item.title;
        modalCaption.textContent = item.title;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /* ---------- ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ---------- */
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    /* ---------- ОБРАБОТЧИКИ СОБЫТИЙ ---------- */

    // Клик по карточке галереи (делегирование)
    galleryGrid.addEventListener('click', function (e) {
        const target = e.target.closest('.gallery-item');
        if (!target) return;
        const index = parseInt(target.getAttribute('data-index'), 10);
        if (!isNaN(index)) openModal(index);
    });

    // Открытие с клавиатуры (Enter / Space) — для доступности
    galleryGrid.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const target = e.target.closest('.gallery-item');
        if (!target) return;
        e.preventDefault();
        const index = parseInt(target.getAttribute('data-index'), 10);
        if (!isNaN(index)) openModal(index);
    });

    // Кнопка ✕ в модалке
    modalClose.addEventListener('click', closeModal);

    // Клик по тёмному фону (но не по самой картинке)
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    // Клавиша Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ---------- СТАРТ ---------- */
    renderGallery();

    // Приятный бонус: сообщение в консоль
    console.log('%c ysswide ', 'background:#6c5ce7;color:#fff;padding:4px 10px;border-radius:6px;font-weight:bold;', 'Галерея загружена ✓');
})();

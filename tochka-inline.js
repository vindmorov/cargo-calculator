(() => {
  const root = () => document.querySelector('#flow-step-1 .costs-overview, #flow-step-item-1 .costs-overview');

  function selectedPresetTitle() {
    const step = document.querySelector('#flow-step-item-1');
    const radios = [...(step?.querySelectorAll('[role="radio"]') || [])];
    const vat = radios.slice(0, 6).find(item => item.getAttribute('aria-checked') === 'true')?.innerText.trim() || 'Без НДС';
    const capacity = radios.slice(6).find(item => item.getAttribute('aria-checked') === 'true')?.innerText.trim() || '5 т';
    const hint = step?.querySelector('.costs-overview__hint')?.innerText || '';
    const count = Number(hint.match(/Машин:\s*(\d+)/)?.[1] || 1);
    const machineWord = count % 10 === 1 && count % 100 !== 11 ? 'машина' : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? 'машины' : 'машин';
    const formattedCapacity = /[.!?]$/.test(capacity) ? capacity : `${capacity}.`;
    return `${vat}, ${count} ${machineWord} (${formattedCapacity})`;
  }

  function renderTags(card) {
    if (!card) return;
    const hint = card.querySelector('.costs-overview__hint');
    if (hint) hint.style.display = 'none';
    const summary = card.querySelector('.costs-overview__summary');
    if (summary) {
      summary.classList.add('inline-summary-copy');
      summary.innerHTML = `<span>Выбраны типовые значения</span><strong>${selectedPresetTitle()}</strong>`;
      summary.style.display = 'flex';
    }
    if (card.querySelector('.inline-summary-tags')) return;
    const tags = document.createElement('div');
    tags.className = 'inline-summary-tags';
    ['Водитель: 80 000 ₽', 'Топливо: 17,8 л./100 км', 'Пробег в день: 240 км', 'Ремонт 4 ₽ / км', 'Ещё +10'].forEach(text => {
      const tag = document.createElement('span'); tag.className = 'inline-summary-tag'; tag.textContent = text; tags.append(tag);
    });
    summary?.parentElement?.insertAdjacentElement('afterend', tags);
  }

  function renderEditButton(card) {
    const edit = card?.querySelector('.costs-overview__edit');
    if (!edit || edit.dataset.inlineIconButton === 'true') return;
    edit.dataset.inlineIconButton = 'true';
    edit.className = 'icon-button icon-button--secondary icon-button--s costs-overview__edit';
    edit.setAttribute('aria-label', 'Редактировать настройки');
    // Exact T-DS Stroked 2px / Pencil source (vendor/t-ds/src/assets/Icon/24/Stroked.tsx).
    edit.innerHTML = '<span class="icon-button__icon"><span class="ds-icon ds-icon--m" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.8779 2.70694C15.0494 1.53586 16.9496 1.53581 18.1211 2.70694L21.2929 5.87784C22.4643 7.04928 22.464 8.94943 21.2929 10.121L11.707 19.7069C11.5789 19.8349 11.4178 19.9257 11.2421 19.9696L3.24215 21.9696C2.90162 22.0547 2.54125 21.955 2.29293 21.7069C2.04478 21.4586 1.9441 21.0974 2.02925 20.7567L4.02925 12.7567C4.07327 12.5812 4.16496 12.4199 4.29293 12.2919L13.8779 2.70694ZM5.9023 13.5107L4.37398 19.6249L10.4882 18.0966L16.5859 11.9989L12 7.41397L5.9023 13.5107ZM16.707 4.12101C16.3166 3.73094 15.6834 3.73102 15.2929 4.12101L13.414 5.99894L18 10.5849L19.8779 8.70694C20.268 8.31639 20.2683 7.6823 19.8779 7.2919L16.707 4.12101Z"/></svg></span></span>';
  }

  function renderCustomCapacityIcon() {
    const card = document.querySelector('#flow-step-item-1 .choice-grid--capacity .choice-card:nth-child(6)');
    if (!card || card.querySelector('.choice-card__gear')) return;
    const gear = document.createElement('span');
    gear.className = 'choice-card__gear';
    gear.setAttribute('aria-hidden', 'true');
    // Exact T-DS Stroked 2px / Filters source (vendor/t-ds/src/assets/Icon/24/Stroked.tsx).
    gear.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 13C16.8638 13 18.43 14.2748 18.874 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H18.874C18.43 19.7252 16.8638 21 15 21C13.1362 21 11.57 19.7252 11.126 18H2C1.44772 18 1 17.5523 1 17C1 16.4477 1.44772 16 2 16H11.126C11.57 14.2748 13.1362 13 15 13ZM15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM9 3C10.8638 3 12.43 4.27477 12.874 6H22C22.5523 6 23 6.44772 23 7C23 7.55228 22.5523 8 22 8H12.874C12.43 9.72523 10.8638 11 9 11C7.13616 11 5.57002 9.72523 5.12598 8H2C1.44772 8 1 7.55228 1 7C1 6.44772 1.44772 6 2 6H5.12598C5.57002 4.27477 7.13616 3 9 3ZM9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5Z"/></svg>';
    card.insertBefore(gear, card.querySelector('.choice-card__title'));
  }

  function normalizeCapacityLabels() {
    // Keep labels as real T-DS typography nodes, not CSS-generated text. This
    // makes type controls able to select and edit each label independently.
    [
      { index: 5, label: '20 - 22 т' },
      { index: 6, label: 'Свой вариант' },
    ].forEach(({ index, label }) => {
      const card = document.querySelector(`#flow-step-item-1 .choice-grid--capacity .choice-card:nth-child(${index})`);
      const title = card?.querySelector('.choice-card__title:last-child');
      if (!title) return;
      title.className = 'choice-card__title ts-500-m';
      title.textContent = label;
      title.removeAttribute('style');
      title.dataset.tochkaDsLabel = 'true';
    });
  }

  function normalizeContinueLabels() {
    document.querySelectorAll('#flow-step-item-1 button, #flow-step-item-2 button').forEach((button) => {
      const label = button.querySelector('.button__label');
      if (!label) return;
      const text = label.textContent.trim();
      if (text !== 'Перейти к параметрам рейса' && text !== 'Рассчитать себестоимость и прибыль') return;
      label.textContent = 'Продолжить';
      label.className = 'button__label ts-500-s';
      label.dataset.tochkaDsLabel = 'continue';
    });
  }

  function normalizeTripLayout() {
    const route = document.querySelector('#flow-step-item-2 .trip-route--flat');
    const pair = document.querySelector('#flow-step-item-2 .trip-pair--route');
    const addPoint = document.querySelector('#flow-step-item-2 .trip-add-point');
    const rate = document.querySelector('#flow-step-item-2 .trip-pair--rate');
    const options = document.querySelector('#flow-step-item-2 .trip-options');
    if (!route || !pair || !addPoint || !rate || !options) return;
    // Keep the rate row independent from the generic route pair. The shared
    // `trip-pair` class applies a two-column layout that collapses badly on
    // narrow screens; this row has its own responsive grid.
    rate.classList.remove('trip-pair');
    rate.classList.add('trip-pair--rate');
    const vatControl = rate.querySelector('.dropdown');
    if (vatControl && !rate.parentElement.querySelector('.trip-vat-field')) {
      const vatField = document.createElement('div');
      vatField.className = 'trip-vat-field';
      vatField.append(vatControl);
      const summaryContainer = rate.closest('.tochka-trip-summary') || rate.parentElement;
      summaryContainer.insertBefore(vatField, rate.nextSibling);
    }
    const metricSource = route.querySelector('.route-distance-field__fill') || route;
    const metrics = [...metricSource.querySelectorAll('.route-distance-field__metric')].map((item) => item.textContent.trim());
    const rawDistance = metrics.find((item) => item.includes('км'));
    const rawDuration = metrics.find((item) => item.includes('дн.'));
    const distance = rawDistance && /\d/.test(rawDistance) ? rawDistance : '650 км';
    const duration = rawDuration && /\d/.test(rawDuration) ? rawDuration : '1,4 дн.';
    const distanceValue = Number.parseFloat(distance.replace(',', '.').replace(/[^\d.]/g, '')) || 650;
    const durationValue = Number.parseFloat(duration.replace(',', '.').replace(/[^\d.]/g, '')) || 1.4;
    const distanceField = document.createElement('div');
    distanceField.className = 'tochka-distance-input';
    distanceField.innerHTML = `<div class="input tochka-distance-input__view"><div class="input__content"><div class="input__main"><p class="tochka-distance-input__value ts-500-m">${distance}</p><p class="tochka-distance-input__duration ts-400-s">${duration}</p></div></div><button type="button" class="tochka-distance-input__edit" data-tochka-distance-edit aria-label="Изменить расстояние"><span class="ds-icon ds-icon--m" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.8779 2.70694C15.0494 1.53586 16.9496 1.53581 18.1211 2.70694L21.2929 5.87784C22.4643 7.04928 22.464 8.94943 21.2929 10.121L11.707 19.7069C11.5789 19.8349 11.4178 19.9257 11.2421 19.9696L3.24215 21.9696C2.90162 22.0547 2.54125 21.955 2.29293 21.7069C2.04478 21.4586 1.9441 21.0974 2.02925 20.7567L4.02925 12.7567C4.07327 12.5812 4.16496 12.4199 4.29293 12.2919L13.8779 2.70694ZM5.9023 13.5107L4.37398 19.6249L10.4882 18.0966L16.5859 11.9989L12 7.41397L5.9023 13.5107ZM16.707 4.12101C16.3166 3.73094 15.6834 3.73102 15.2929 4.12101L13.414 5.99894L18 10.5849L19.8779 8.70694C20.268 8.31639 20.2683 7.6823 19.8779 7.2919L16.707 4.12101Z"/></svg></span></button></div><label class="input tochka-distance-input__editor" hidden><div class="input__content"><div class="input__main"><div class="input__header"><p class="input__title ts-500-s">Расстояние, км</p></div><input class="input__field ts-400-m" type="number" inputmode="numeric" min="0" value="${distanceValue}" aria-label="Расстояние, км"></div></div></label>`;
    const distanceInput = distanceField.querySelector('input');
    const view = distanceField.querySelector('.tochka-distance-input__view');
    const editor = distanceField.querySelector('.tochka-distance-input__editor');
    const saveDistance = () => {
      const nextValue = Number.parseFloat(distanceInput.value);
      if (Number.isFinite(nextValue) && nextValue >= 0) {
        distanceField.querySelector('.tochka-distance-input__value').textContent = `${nextValue.toLocaleString('ru-RU')} км`;
        distanceField.querySelector('.tochka-distance-input__duration').textContent = `${(nextValue * durationValue / distanceValue).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} дн.`;
      }
      editor.hidden = true;
      view.hidden = false;
    };
    distanceField.querySelector('[data-tochka-distance-edit]').addEventListener('click', () => {
      view.hidden = true;
      editor.hidden = false;
      distanceInput.focus();
      distanceInput.select();
    });
    distanceInput.addEventListener('blur', saveDistance);
    distanceInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') { event.preventDefault(); saveDistance(); }
      if (event.key === 'Escape') { editor.hidden = true; view.hidden = false; }
    });
    const title = document.createElement('h3');
    title.className = 'tochka-summary-title ts-500-l';
    title.textContent = 'Итоговое расстояние и ставка';
    const summary = document.createElement('div');
    summary.className = 'tochka-trip-summary';
    const rateControl = rate.querySelector('.input') || rate.firstElementChild;
    if (rateControl) rateControl.classList.add('trip-rate-field');
    const vatField = document.querySelector('#flow-step-item-2 .trip-vat-field');
    summary.append(distanceField, rateControl || rate, vatField || document.createElement('div'));
    if (rateControl) rate.remove();
    route.remove();
    options.insertAdjacentElement('afterend', title);
    title.insertAdjacentElement('afterend', summary);
    rate.dataset.tochkaMoved = 'true';
  }

  function normalizeTripOptions() {
    const options = document.querySelector('#flow-step-item-2 .trip-options');
    const chips = options?.querySelector('.trip-options__chips');
    if (chips) [...chips.children].forEach((chip, index) => {
      if (chip.dataset.tochkaFormCell || chip.dataset.tochkaGeneratedField) return;
      const label = chip.textContent.trim().replace(/^\+\s*/, '');
      const isSelected = chip.classList.contains('is-selected');
      const cell = document.createElement('div');
      cell.className = `form-cell tochka-form-cell tochka-option-${index} form-cell--single`;
      cell.dataset.tochkaFormCell = 'true';
      cell.innerHTML = `<div class="form-cell__content"><div class="form-cell__main"><div class="form-cell__text"><p class="form-cell__title ts-400-m">${label}</p></div></div><div class="form-cell__right"><button type="button" class="switch${isSelected ? ' is-selected' : ''}" role="switch" aria-checked="${isSelected}" aria-label="${label}"></button></div></div>`;
      const mileageField = index === 0 ? document.createElement('label') : null;
      if (mileageField) {
        mileageField.className = 'input tochka-empty-mileage-input';
        mileageField.dataset.tochkaGeneratedField = 'true';
        mileageField.hidden = !isSelected;
        mileageField.innerHTML = '<div class="input__content"><div class="input__main"><div class="input__header"><p class="input__title ts-500-s">Порожний пробег, км</p></div><input class="input__field ts-400-m" type="number" inputmode="numeric" min="0" placeholder="Укажите километраж" aria-label="Порожний пробег, км"></div></div>';
      }
      const toggle = cell.querySelector('.switch');
      toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const next = !toggle.classList.contains('is-selected');
        toggle.classList.toggle('is-selected', next);
        toggle.setAttribute('aria-checked', String(next));
        if (mileageField) {
          cell.classList.toggle('is-selected', next);
          mileageField.hidden = !next;
          if (next) {
            const mileageInput = mileageField.querySelector('input');
            mileageInput?.blur();
            requestAnimationFrame(() => mileageInput?.blur());
          }
        }
      });
      cell.addEventListener('click', () => toggle.click());
      chip.replaceWith(cell, ...(mileageField ? [mileageField] : []));
    });
    if (options && !options.querySelector('.tochka-options-title')) {
      const title = document.createElement('h3'); title.className = 'tochka-options-title ts-500-l'; title.textContent = 'Дополнительные условия';
      options.prepend(title);
    }
    if (!document.documentElement.dataset.tochkaMileageBlur) {
      document.documentElement.dataset.tochkaMileageBlur = 'true';
      document.addEventListener('pointerdown', (event) => {
        const mileageInput = document.querySelector('.tochka-empty-mileage-input input');
        if (mileageInput && event.target instanceof Node && !mileageInput.closest('.tochka-empty-mileage-input')?.contains(event.target)) {
          mileageInput.blur();
        }
      }, true);
      document.addEventListener('click', (event) => {
        const mileageInput = document.querySelector('.tochka-empty-mileage-input input');
        if (mileageInput && event.target instanceof Node && !mileageInput.closest('.tochka-empty-mileage-input')?.contains(event.target)) {
          requestAnimationFrame(() => mileageInput.blur());
        }
      }, true);
    }
  }

  function normalizeCollapsedTripSummary() {
    const step = document.querySelector('#flow-step-item-2.flow-step--collapsed');
    const button = step?.querySelector('.flow-step__header--button');
    if (!button) return;
    const existing = button.querySelector('.tochka-trip-summary-view');
    if (existing) {
      const chips = existing.querySelectorAll('.tochka-trip-summary-view__chips > span');
      const firstChip = chips[0]?.textContent?.trim() || '';
      if (chips.length === 5 && /^Ставка клиента:\s*[\d\s ]+₽$/.test(firstChip)) return;
      existing.remove();
    }
    const source = button.innerText.trim().replace(/\s+/g, ' ');
    if (!source || button.dataset.tochkaSummarySource === source) return;
    const route = source.match(/Параметры рейса\s+(г .*? → г .*?)\s*\((\d[\d\s ]* км\. за [\d,]+ дн\.)\)/i);
    const rate = source.match(/Ставка клиента:\s*([\d\s ]+₽)(?:\s+с НДС\s+([\d]+%))?/i);
    const routeLabel = route ? route[1] : 'г Самара, Самарская обл → г Москва';
    const distanceLabel = route ? route[2] : '650 км. за 1,4 дн.';
    const rateLabel = rate ? rate[1].trim() : '14 000 ₽';
    const vatLabel = rate?.[2] || '22%';
    button.innerHTML = `<span class="tochka-trip-summary-view"><span class="tochka-trip-summary-view__route">Маршрут: ${routeLabel}</span><strong class="tochka-trip-summary-view__distance">${distanceLabel}</strong><span class="tochka-trip-summary-view__chips"><span>Ставка клиента: ${rateLabel}</span><span>НДС: ${vatLabel}</span><span>Туда-обратно</span><span>Порожний пробег: нет</span><span>Избегать платки</span></span></span>`;
    button.dataset.tochkaSummarySource = source;
  }

  function normalizeResults() {
    const panel = document.querySelector('#flow-step-item-3 section.result-summary');
    const content = panel?.querySelector('.widget__content');
    const blocks = content?.querySelector('.result-subblocks');
    if (!panel || !content || !blocks || panel.dataset.tochkaResultReady === 'true') return;
    const text = blocks.innerText || '';
    if (!/\d[\d  ]*\s*₽/.test(text) || /Введите маршрут|Посчитаем прибыль|Пересчитываем/i.test(text)) return;
    panel.dataset.tochkaResultReady = 'true';
    panel.classList.add('tochka-result-redesign');

    const isLoss = /Убыток|убыток|отрицательн/i.test(text);
    const status = document.createElement('div');
    status.className = `tochka-result-status ${isLoss ? 'is-loss' : 'is-profitable'}`;
    let statusIcon = isLoss
      ? '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8.50358 4.17608C10.0276 1.43285 13.9727 1.43284 15.4967 4.17608L22.0973 16.0579C23.578 18.7238 21.6508 22 18.6012 22.0003H5.39909C2.34948 22.0002 0.421591 18.7239 1.90202 16.0579L8.50358 4.17608ZM13.7487 5.14678C12.9867 3.77538 11.0137 3.7755 10.2516 5.14678L3.65104 17.0286C2.91084 18.3616 3.87432 20.0002 5.39909 20.0003H18.6012C20.1258 20 21.0894 18.3615 20.3493 17.0286L13.7487 5.14678ZM11.9997 16.0003C12.5519 16.0004 12.9997 16.448 12.9997 17.0003C12.9994 17.5523 12.5517 18.0002 11.9997 18.0003C11.4478 18 11 17.5522 10.9997 17.0003C10.9997 16.4482 11.4476 16.0005 11.9997 16.0003ZM11.9997 8.0003C12.5519 8.00036 12.9997 8.44805 12.9997 9.0003V13.0003C12.9994 13.5523 12.5517 14.0002 11.9997 14.0003C11.4478 14 11 13.5522 10.9997 13.0003V9.0003C10.9997 8.44817 11.4476 8.00055 11.9997 8.0003Z"/></svg>'
      : '<img class="tochka-result-status__check-icon" src="Circle.svg" width="18" height="18" alt="" aria-hidden="true">';
    if (isLoss) statusIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="#d95750"/><path d="M12 7.5a1 1 0 0 1 1 1v4.25a1 1 0 1 1-2 0V8.5a1 1 0 0 1 1-1Zm0 9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" fill="#fff"/></svg>';
    status.innerHTML = `<span class="tochka-result-status__icon ds-icon ds-icon--m" aria-hidden="true">${statusIcon}</span><div><strong>${isLoss ? 'Рейс убыточный' : 'Рейс выгодный'}</strong><p>${isLoss ? 'Ставка ниже рекомендуемого уровня рентабельности для такого рейса.' : 'Рентабельность выше минимального рекомендуемого уровня для такого рейса.'}</p></div>`;

    const profitMatch = text.match(/Прибыль\s+([−-]?\s?[\d  ]+\s*₽)/i);
    const rateMatch = text.match(/Ставка клиента(?:\s*\(без НДС\))?\s+([\d  ]+\s*₽)/i);
    const marginMatch = text.match(/Рентабельность\s+([−-]?\s?[\d,]+\s*%)/i);
    const costMatch = text.match(/Себестоимость рейса[^\d]*([\d  ]+\s*₽)/i);
    const distanceMatch = document.body.innerText.match(/(\d[\d  ]*)\s*км/);
    const profitValue = profitMatch?.[1]?.trim() || '—';
    const rateValue = rateMatch?.[1]?.trim() || '—';
    const marginValue = marginMatch?.[1]?.trim() || '—';
    const costValue = costMatch?.[1]?.trim() || '—';
    const profitNumber = Number.parseFloat(profitValue.replace(/[^\d,-]/g, '').replace(',', '.'));
    const distanceNumber = Number.parseFloat((distanceMatch?.[1] || '').replace(/[^\d]/g, ''));
    const perKm = Number.isFinite(profitNumber) && distanceNumber ? `${Math.round(profitNumber / distanceNumber).toLocaleString('ru-RU')} ₽` : '—';

    const hero = document.createElement('div');
    hero.className = `tochka-result-hero ${isLoss ? 'is-loss' : 'is-profitable'}`;
    hero.innerHTML = `<h3 class="tochka-result-hero__title">Расчёты из ставки клиента ${rateValue}</h3>`;
    hero.append(status);
    const metrics = document.createElement('div');
    metrics.className = 'tochka-result-metrics';
    metrics.innerHTML = `<div><span>Прибыль с рейса</span><strong class="${isLoss ? 'is-loss' : 'is-profitable'}">${profitValue}</strong></div><div><span>Себестоимость</span><strong>${costValue}</strong></div><div><span>Рентабельность</span><strong>${marginValue}</strong></div><div><span>Прибыль на км.</span><strong>${perKm}</strong></div>`;
    hero.append(metrics);

    const costBlock = blocks.querySelector('.result-subblock--cost');
    const breakdown = costBlock?.querySelector('.cost-breakdown');
    if (breakdown) hero.append(breakdown);
    const expensesNotice = breakdown?.querySelector('.breakdown-source-notice');
    const costChart = breakdown?.querySelector('.cost-chart');
    if (expensesNotice && costChart) {
      costChart.insertAdjacentElement('afterend', expensesNotice);
      const editLink = expensesNotice.querySelector('.inline-link');
      const noticeText = expensesNotice.querySelector('.contextual-notification__text');
      const noticeIcon = expensesNotice.querySelector('.contextual-notification__accessory .ds-icon');
      if (editLink && noticeText) {
        editLink.textContent = 'Настройте затраты';
        noticeText.replaceChildren(document.createTextNode('Рассчитано по данным в настройках затрат, чтобы уточнить расчёт'), editLink);
      }
      if (noticeIcon) noticeIcon.innerHTML = '<img class="tochka-notice-info-icon" src="Circle-info.svg" width="18" height="18" alt="" aria-hidden="true">';
    }
    if (breakdown && !breakdown.querySelector('.tochka-expenses-title')) {
      const expensesTitle = document.createElement('h3');
      expensesTitle.className = 'tochka-expenses-title ts-600-xl';
      expensesTitle.innerHTML = 'Из чего складываются расходы за рейс<span class="tochka-expenses-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      expensesTitle.setAttribute('role', 'button');
      expensesTitle.tabIndex = 0;
      breakdown.prepend(expensesTitle);
    }
    if (breakdown && !breakdown.dataset.tochkaCollapseBound) {
      breakdown.dataset.tochkaCollapseBound = 'true';
      breakdown.classList.add('tochka-expenses-open', 'tochka-expenses-collapsed');
      const nativeToggle = breakdown.querySelector('.accordeon-cell__header');
      const syncExpensesChevron = () => {
        const icon = breakdown.querySelector('.tochka-expenses-chevron');
        const collapsed = nativeToggle ? !breakdown.classList.contains('is-open') : breakdown.classList.contains('tochka-expenses-collapsed');
        breakdown.classList.toggle('tochka-expenses-collapsed', collapsed);
        const body = breakdown.querySelector('.accordeon-cell__body');
        if (icon) icon.style.transform = collapsed ? 'none' : 'rotate(180deg)';
        if (body) body.style.display = collapsed ? 'none' : '';
        breakdown.querySelector('.tochka-expenses-title')?.setAttribute('aria-expanded', String(!collapsed));
      };
      const toggleExpenses = () => { if (nativeToggle) nativeToggle.click(); setTimeout(syncExpensesChevron, 0); };
      syncExpensesChevron();
      breakdown.querySelector('.tochka-expenses-title')?.addEventListener('click', (event) => { event.stopPropagation(); toggleExpenses(); });
      breakdown.querySelector('.tochka-expenses-title')?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleExpenses(); } });
      breakdown.addEventListener('click', (event) => { if (breakdown.classList.contains('tochka-expenses-collapsed') && !event.target.closest('.tochka-expenses-title')) toggleExpenses(); });
    }

    content.prepend(hero);
  }

  function normalizePageHeading() {
    const wideTitle = document.querySelector('.page-heading__question--wide');
    if (wideTitle && wideTitle.textContent.trim() !== 'Вы зарабатываете на рейсе?') {
      wideTitle.textContent = 'Вы зарабатываете на рейсе?';
    }
  }

  function renderEditor(card) {
    if (card.querySelector('.inline-cost-editor')) return;
    const step = card.closest('#flow-step-item-1');
    if (step) step.classList.add('is-inline-editing');
    const editor = document.createElement('section');
    editor.className = 'inline-cost-editor';
    const chevron = '<span class="inline-cost-editor__chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    const field = (label, value, unit = '') => `<label class="input inline-cost-editor__input"><div class="input__content"><div class="input__main"><div class="input__header"><p class="input__title ts-500-s">${label}</p></div><input class="input__field ts-400-m" value="${value}"></div></div>${unit ? `<span class="inline-cost-editor__unit ts-400-s">${unit}</span>` : ''}</label>`;
    editor.innerHTML = `
      <div class="inline-cost-editor__section"><button type="button" class="inline-cost-editor__toggle"><span><span class="inline-cost-editor__title ts-500-l">Компания</span><small>1 машина · без НДС</small></span>${chevron}</button><div class="inline-cost-editor__fields">${field('Режим НДС', 'Без НДС')}${field('Количество машин', '1', 'шт.')}${field('Резерв на риски', '3', '%')}</div></div>
      <div class="inline-cost-editor__section is-open"><button type="button" class="inline-cost-editor__toggle"><span><span class="inline-cost-editor__title ts-500-l">Машина</span><small>5 т · 17,8 л/100 км</small></span>${chevron}</button><div class="inline-cost-editor__fields">${field('Грузоподъёмность', '5', 'т')}${field('Расход топлива', '17,8', 'л / 100 км')}${field('Амортизация', '0', '₽ / мес.')}${field('Ремонт и ТО', '4', '₽ / км')}</div></div>
      <div class="inline-cost-editor__section"><button type="button" class="inline-cost-editor__toggle"><span><span class="inline-cost-editor__title ts-500-l">Водитель</span><small>Работаю сам</small></span>${chevron}</button><div class="inline-cost-editor__fields">${field('Зарплата водителя', '80 000', '₽ / мес.')}${field('Суточные', '0', '₽ / день')}${field('Пробег в день', '240', 'км')}</div></div>
      <div class="inline-cost-editor__section"><button type="button" class="inline-cost-editor__toggle"><span><span class="inline-cost-editor__title ts-500-l">Офис и прочее</span><small>0 ₽ / мес.</small></span>${chevron}</button><div class="inline-cost-editor__fields">${field('Прочие расходы', '0', '₽ / мес.')}</div></div>
      <div class="inline-cost-editor__actions"><button type="button" data-inline-cancel>Отменить</button><button type="button" data-inline-save>Сохранить</button></div>`;
    const vatField = editor.querySelector('.inline-cost-editor__section:first-child .inline-cost-editor__input');
    const vatInput = vatField?.querySelector('input');
    if (vatField && vatInput) {
      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown inline-cost-editor__dropdown';
      dropdown.setAttribute('aria-hidden', 'true');
      dropdown.innerHTML = '<div class="dropdown__content"><div class="dropdown__main"><div class="dropdown__header"><p class="dropdown__title ts-500-s">Режим НДС</p></div><p class="dropdown__value ts-400-m"></p></div><div class="dropdown__accessory"><span class="dropdown__chevron" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2 4l4 4 4-4z"/></svg></span></div></div>';
      const select = document.createElement('select');
      select.className = 'inline-cost-editor__native-select';
      ['Без НДС', 'НДС 5%', 'НДС 7%', 'НДС 10%', 'НДС 20%', 'НДС 22%'].forEach((option) => {
        const item = document.createElement('option');
        item.value = option;
        item.textContent = option;
        item.selected = option === vatInput.value;
        select.append(item);
      });
      dropdown.querySelector('.dropdown__value').textContent = select.value;
      dropdown.append(select);
      vatInput.style.visibility = 'hidden';
      vatField.append(dropdown);
      select.style.pointerEvents = 'none';
      dropdown.addEventListener('click', () => {
        const popup = document.createElement('div'); popup.className = 'dropdown-popup';
        const rect = dropdown.getBoundingClientRect();
        popup.innerHTML = `<div class="dropdown-popup__overlay"></div><div class="dropdown-popup__panel inline-cost-editor__vat-popup" style="position:fixed;left:${rect.left}px;top:${rect.bottom + 4}px;width:${Math.max(rect.width, 320)}px"><div class="dropdown-popup__content ds-scroll-area"></div></div>`;
        const content = popup.querySelector('.dropdown-popup__content');
        [...select.options].forEach((option) => {
          const item = document.createElement('div'); item.className = 'form-cell form-cell--single inline-cost-editor__vat-option'; item.setAttribute('role', 'option'); item.tabIndex = 0;
          item.innerHTML = `<div class="form-cell__content"><div class="form-cell__main"><div class="form-cell__text"><p class="form-cell__title ts-400-m">${option.textContent}</p></div></div><div class="form-cell__right">${option.value === select.value ? '<span class="dropdown-popup__checkmark" aria-hidden="true">✓</span>' : ''}</div></div>`;
          if (option.value === select.value) item.classList.add('is-selected');
          item.onclick = () => { select.value = option.value; dropdown.querySelector('.dropdown__value').textContent = select.value; const radio = [...document.querySelectorAll('#flow-step-item-1 [role="radio"]')].slice(0, 6).find(r => r.innerText.trim() === select.value); if (radio) radio.click(); popup.remove(); };
          content.append(item);
        });
        popup.querySelector('.dropdown-popup__overlay').onclick = () => popup.remove(); document.body.append(popup);
      });
    }
    editor.addEventListener('click', (event) => {
      const toggle = event.target.closest('.inline-cost-editor__toggle');
      if (toggle) toggle.parentElement.classList.toggle('is-open');
      if (event.target.closest('[data-inline-cancel]')) { editor.remove(); if (step) step.classList.remove('is-inline-editing'); }
      if (event.target.closest('[data-inline-save]')) { card.classList.add('has-custom-settings'); editor.remove(); if (step) step.classList.remove('is-inline-editing'); }
    });
    card.append(editor);
  }

  document.addEventListener('click', (event) => {
    const edit = event.target.closest('#flow-step-item-1 .costs-overview__edit');
    const custom = event.target.closest('#flow-step-item-1 .choice-grid--capacity .choice-card:nth-child(6)');
    if (!edit && !custom) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const card = root(); if (card) renderEditor(card);
  }, true);

  // The expense notice links directly to the same inline editor as Step 1.
  // Handle it in capture phase so the link never falls through to a dead route.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('.breakdown-source-notice .inline-link');
    if (!link) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const card = root();
    if (card) {
      renderEditor(card);
      document.querySelector('#flow-step-item-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, true);

  document.addEventListener('click', (event) => {
    if (event.target.closest('#flow-step-item-1 [role="radio"]')) setTimeout(boot, 0);
  }, true);

  // The original React handler expects the untouched route DOM. By the time
  // an intermediate point is added, the route has been normalized and moved,
  // so letting React reconcile the remove action crashes the page. Remove the
  // generated field locally and stop propagation before the framework handler.
  document.addEventListener('click', (event) => {
    const removeButton = event.target.closest('button[aria-label*="Убрать поле"]');
    if (!removeButton) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const field = removeButton.closest('.settlement-field') || removeButton.closest('[role="combobox"]');
    field?.remove();
  }, true);

  const boot = () => {
    const card = root();
    renderTags(card);
    renderEditButton(card);
    renderCustomCapacityIcon();
    normalizeCapacityLabels();
    normalizeContinueLabels();
    normalizeTripLayout();
    normalizeTripOptions();
    normalizeCollapsedTripSummary();
    normalizeResults();
    normalizePageHeading();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  setTimeout(boot, 500);
  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => { scheduled = false; boot(); }, 0);
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-checked'] });
})();

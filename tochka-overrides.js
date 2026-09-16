(() => {
  const stepSelector = "#flow-step-item-1";
  const cardSelector = `${stepSelector} .costs-overview`;
  const headerSelector = `${stepSelector} .flow-step__header--button`;
  const interactiveSelector = "button, a, input, select, textarea, [role='button']";

  const syncCollapsedCard = () => {
    const card = document.querySelector(cardSelector);
    const header = document.querySelector(headerSelector);
    if (!card || !header) return;

    const isCollapsed = header.getAttribute("aria-expanded") === "false";
    card.toggleAttribute("data-expand-control", isCollapsed);

    if (isCollapsed) {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Развернуть основные параметры");
    } else {
      card.removeAttribute("role");
      card.removeAttribute("tabindex");
      card.removeAttribute("aria-label");
    }
  };

  const syncCopy = () => {
    const summary = document.querySelector(
      `${stepSelector} .costs-overview__summary`
    );

    if (summary?.querySelector(".costs-hint__value--user")) {
      const values = summary.textContent.match(/\d+/g) ?? [];
      const total = Number(values[0] ?? 19);
      const manual = Number(values.at(-1) ?? 0);
      const copy = manual > 0
        ? `Всего ${total} параметров, изменено в ручную ${manual}`
        : `Всего ${total} параметров, настроенны автоматически`;

      if (summary.textContent !== copy) summary.textContent = copy;
    }

    const stepTwoTitle = document.querySelector(
      "#flow-step-item-2 .flow-step__title"
    );
    if (stepTwoTitle && stepTwoTitle.textContent !== "Шаг 2. Маршрут") {
      stepTwoTitle.textContent = "Шаг 2. Маршрут";
    }

    const stepThreeTitle = document.querySelector(
      "#flow-step-item-3 .flow-step__title"
    );
    if (stepThreeTitle && stepThreeTitle.textContent !== "Шаг 3. Результат расчёта") {
      stepThreeTitle.textContent = "Шаг 3. Результат расчёта";
    }

    const firstContinue = document.querySelector(
      "#flow-step-1 > .flow-panel > .button .button__label"
    );
    if (firstContinue && firstContinue.textContent !== "Продолжить") {
      firstContinue.textContent = "Продолжить";
    }

    const secondContinue = document.querySelector(
      "#flow-step-2 .flow-trip-footer .button--primary .button__label"
    );
    if (secondContinue && secondContinue.textContent !== "Продолжить") {
      secondContinue.textContent = "Продолжить";
    }

    document
      .querySelectorAll(`${stepSelector} .costs-overview__edit .button__label`)
      .forEach((label) => {
        if (label.textContent !== "Редактировать") label.textContent = "Редактировать";
      });

    const capacityCards = document.querySelectorAll(
      `${stepSelector} .choice-grid--capacity .choice-card`
    );
    if (capacityCards[4]) {
      const titles = capacityCards[4].querySelectorAll(".choice-card__title");
      const title = titles[titles.length - 1];
      if (title) title.textContent = "20 - 22 т";
    }
    if (capacityCards[5]) {
      capacityCards[5].classList.add("is-custom-variant");
      const titles = capacityCards[5].querySelectorAll(".choice-card__title");
      const title = titles[titles.length - 1];
      if (title) title.textContent = "Свой вариант";
      capacityCards[5].setAttribute("aria-label", "Свой вариант");
    }

    const costs = document.querySelector(`${stepSelector} .costs-overview`);
    if (costs && !costs.dataset.visualReady) {
      const header = costs.querySelector(".costs-overview__header");
      const hint = costs.querySelector(".costs-overview__hint");
      if (header && hint) {
        const eyebrow = document.createElement("p");
        eyebrow.className = "costs-overview__eyebrow";
        eyebrow.textContent = "Мы подставили типовые значения";
        const title = document.createElement("h3");
        title.className = "costs-overview__title";
        title.textContent = "Владелец автопарка";
        header.insertBefore(eyebrow, header.firstChild);
        header.insertBefore(title, header.children[1]);

        const tags = document.createElement("div");
        tags.className = "costs-overview__tags";
        ["Без НДС", "5 машин", "32 л / 100 км", "Ремонт 4 ₽ / км"].forEach((label) => {
          const tag = document.createElement("span");
          tag.className = "costs-overview__tag";
          tag.textContent = label;
          tags.appendChild(tag);
        });
        costs.appendChild(tags);
        costs.classList.add("costs-overview--visual");
        costs.dataset.visualReady = "true";
      }
    }
  };

  const syncOverrides = () => {
    syncCollapsedCard();
    syncCopy();
  };

  const expandStep = () => {
    const header = document.querySelector(headerSelector);
    if (header?.getAttribute("aria-expanded") === "false") header.click();
  };

  document.addEventListener("click", (event) => {
    const card = event.target.closest?.(cardSelector);
    const interactiveTarget = event.target.closest?.(interactiveSelector);
    if (!card || (interactiveTarget && interactiveTarget !== card)) return;
    expandStep();
  });

  document.addEventListener("keydown", (event) => {
    const card = event.target.closest?.(cardSelector);
    if (!card || !card.hasAttribute("data-expand-control")) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    expandStep();
  });

  document.addEventListener("click", (event) => {
    const custom = event.target.closest?.(
      `${stepSelector} .choice-grid--capacity .choice-card.is-custom-variant`
    );
    if (!custom) return;
    event.preventDefault();
    event.stopPropagation();
    document.querySelector(`${stepSelector} .costs-overview__edit`)?.click();
  }, true);

  const startOverrides = () => {
    window.setTimeout(() => {
      syncOverrides();
      new MutationObserver(syncOverrides).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["aria-expanded"],
        subtree: true,
      });
    }, 500);
  };

  if (document.readyState === "complete") startOverrides();
  else window.addEventListener("load", startOverrides, { once: true });
})();

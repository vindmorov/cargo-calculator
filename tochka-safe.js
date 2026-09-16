(() => {
  let forwardingHeaderClick = false;

  document.addEventListener("click", (event) => {
    const header = event.target.closest?.(
      "#flow-step-item-1 .flow-step__header--button"
    );
    if (header && !forwardingHeaderClick) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const card = event.target.closest?.("#flow-step-item-1 .costs-overview");
    const interactive = event.target.closest?.("button, a, input, select, textarea");
    if (card && !interactive) {
      const stepHeader = document.querySelector(
        "#flow-step-item-1 .flow-step__header--button"
      );
      if (stepHeader?.getAttribute("aria-expanded") === "false") {
        forwardingHeaderClick = true;
        stepHeader.click();
        forwardingHeaderClick = false;
      } else {
        // On the active step there is no collapsible header. Treat the card
        // itself as the disclosure control and open the inline-styled editor.
        const edit = document.querySelector(
          "#flow-step-item-1 .costs-overview__edit"
        );
        edit?.click();
      }
    }
  }, true);

  // Forward the configurable capacity card to the existing edit modal without
  // mutating React-managed DOM nodes.
  document.addEventListener("click", (event) => {
    const custom = event.target.closest?.(
      "#flow-step-item-1 .choice-grid--capacity .choice-card:nth-child(6)"
    );
    if (!custom) return;
    const edit = document.querySelector("#flow-step-item-1 .costs-overview__edit");
    if (!edit) return;
    event.preventDefault();
    event.stopPropagation();
    edit.click();
  }, true);
})();

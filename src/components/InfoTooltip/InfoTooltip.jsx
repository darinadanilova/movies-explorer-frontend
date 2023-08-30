import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onConfirm, infoTooltipMessage }) {
  const tooltipOpened = isOpen ? "tooltip_opened" : "";

  return (
    <div className={`tooltip tooltip__popup ${tooltipOpened}`}>
      <div className="tooltip__container tooltip__container-notification">
        <button
          className="tooltip__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={onConfirm}
        ></button>
        <h2 className="tooltip__notification-title">{infoTooltipMessage}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;

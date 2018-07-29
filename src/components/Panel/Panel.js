export function toggleStateActive(event) {
  const panel = event.target;
  const $panel = $(panel);
  const stateClass = {
    active: 'Panel_state_active',
    default: 'Panel_state_default',
  };

  if ($panel.hasClass(stateClass.active)) {
    $panel.removeClass(stateClass.active).addClass(stateClass.default);
  } else if ($panel.hasClass(stateClass.default)) {
    $panel.removeClass(stateClass.default).addClass(stateClass.active);
  } else {
    console.warn('Panel | state not set.');
  }
}

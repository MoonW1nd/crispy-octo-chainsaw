export function toggleStateActive(event) {
  const target = event.target;
  const $panel = $(target).hasClass('Panel') ? $(target) : $(target).closest('.Panel');
  $panel.toggleClass('Panel_state_active');
}

export default {
  toggleStateActive,
};

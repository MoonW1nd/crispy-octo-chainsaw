export function toggleStateActive(event) {
  const target = event.currentTarget;
  target.classList.toggle('Panel_state_active');
}

export default {
  toggleStateActive,
};

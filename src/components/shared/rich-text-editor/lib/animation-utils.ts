export function getAnimationClasses(attributes: any): string {
  const { animationType, animationDuration, animationDelay, animationRepeat, animationEase, animationHoverPause } = attributes || {};
  if (!animationType) return '';

  const classes: string[] = [];

  switch (animationType) {
    case 'bounce': classes.push('animate-bounce'); break;
    case 'jump-in': classes.push('animate-jump-in'); break;
    case 'fade': classes.push('animate-fade'); break;
    case 'fade-left': classes.push('animate-fade-left'); break;
    case 'fade-right': classes.push('animate-fade-right'); break;
    case 'fade-up': classes.push('animate-fade-up'); break;
    case 'fade-down': classes.push('animate-fade-down'); break;
    case 'pulse': classes.push('animate-pulse'); break;
    case 'ping': classes.push('animate-ping'); break;
    case 'spin': classes.push('animate-spin', ' origin-center'); break;
    default: break;
  }

  // duration
  if (animationDuration === '500ms') classes.push('animate-duration-500');
  else if (animationDuration === '1000ms') classes.push('animate-duration-1000');
  else if (animationDuration === '1500ms') classes.push('animate-duration-[1500ms]');
  else if (animationDuration === '2000ms') classes.push('animate-duration-[2000ms]');
  else if (animationDuration === '3000ms') classes.push('animate-duration-[3000ms]');

  // delay
  if (animationDelay === '100ms') classes.push('animate-delay-100');
  else if (animationDelay === '200ms') classes.push('animate-delay-200');
  else if (animationDelay === '300ms') classes.push('animate-delay-300');
  else if (animationDelay === '500ms') classes.push('animate-delay-500');

  // repeat
  if (animationRepeat === 'infinite') classes.push('animate-infinite');
  else classes.push('animate-once');

  // ease (just append whatever string provided)
  if (animationEase) classes.push(animationEase);

  // hover pause
  if (animationHoverPause) classes.push('hover:animate-none');

  return classes.join(' ').trim();
}

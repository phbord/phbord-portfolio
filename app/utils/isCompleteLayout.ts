export default function isCompleteLayout(pathname: string, idRoute: string): boolean {
  if (pathname === '/signup' 
      || pathname === '/signin' 
      || pathname === '/oblique-strategies'
      || idRoute === 'routes/$') {
    return false;
  }
  return true;
}
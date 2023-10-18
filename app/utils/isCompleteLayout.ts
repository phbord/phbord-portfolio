export default function isCompleteLayout(pathname: string): boolean {
  if (pathname === '/signup' 
      || pathname === '/signin' 
      || pathname === '/oblique-strategies' 
      || pathname == '/error-404') {
    return false;
  }
  return true;
}
import { ActionFunction, redirect } from '@remix-run/node';

export const action: ActionFunction = async ({ request }) => {
  return redirect('/signin');
};

export const loader = () => {
  // Redirect to `/` if user tried to access `/signout`
  return redirect("/");
};
// This is just a redirector page.
// In a real app, you might have a different logic,
// for example, checking if the user is already logged in.
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  redirect('/');
}

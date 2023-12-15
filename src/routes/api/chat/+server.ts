import { json } from '@sveltejs/kit';
import { mockChat } from '$lib/data/mockChat';

export function GET() {
  return json(mockChat);
}

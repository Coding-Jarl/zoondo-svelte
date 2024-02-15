import { game } from '$lib/stores/game';
import { addToast } from '$lib/stores/toast';
import { subscribeSocket } from './subscribeSocket';

type DragStartDetail = {
	cardInstance: Game.PlayerCard;
};
export function dragStart(evt: DragEvent, { cardInstance }: DragStartDetail) {
	if (!evt.dataTransfer) return;

	evt.dataTransfer.dropEffect = 'move';
	game.setDrag(cardInstance);
	// evt.dataTransfer.setData('cardId', id);
	// evt.dataTransfer.setData('card', JSON.stringify(cardInstance));
}

type DropDetail = {
	gameId: string;
	userId: string;
  room: string;
  destination: Game.Position
};
export function drop(
	evt: DragEvent & { currentTarget: HTMLElement },
	{ gameId, userId, room, destination }: DropDetail
) {
	if (!game.drag) return;

	const { socket } = subscribeSocket(room);

  console.log("DRAG", game.drag);

	const coords = `${destination.x};${destination.y}`;

	addToast({ msg: `Tried to drop ${game.drag.card.name} into ${coords}`, type: 'notice' });
	const newAction: DB.Action = {
		action_id: '',
		cardinstance_id: game.drag.instanceid,
		destination: coords,
		game_id: gameId,
		player_id: userId
	};
	socket.emit('gameAction', newAction);
}

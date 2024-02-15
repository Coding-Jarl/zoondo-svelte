import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// await prisma.card.upsert({
	// 	where: { card_id: 'cloboulon' },
	// 	update: {},
	// 	create: { card_id: 'cloboulon', moves: '[[0;1][1;1]]', name: 'Cloboulon', stats: '2/4/3/*' }
	// });
	// await prisma.card.upsert({
	// 	where: { card_id: 'gold-hure' },
	// 	update: {},
	// 	create: { card_id: 'gold-hure', moves: '[[0;1][1;1]]', name: 'Gold-Hure', stats: '2/4/3/*' }
	// });
	// await prisma.card.upsert({
	// 	where: { card_id: 'bouclefeuille' },
	// 	update: {},
	// 	create: {
	// 		card_id: 'bouclefeuille',
	// 		moves: '[[0;1][1;1]]',
	// 		name: 'Bouclefeuille',
	// 		stats: '2/4/3/*'
	// 	}
	// });
	// await prisma.card.upsert({
	// 	where: { card_id: 'grognard' },
	// 	update: {},
	// 	create: { card_id: 'grognard', moves: '[[0;1][1;1]]', name: 'Grognard', stats: '2/4/3/*' }
	// });
	// await prisma.card.upsert({
	// 	where: { card_id: 'grognard' },
	// 	update: {},
	// 	create: { card_id: 'grognard', moves: '[[0;1][1;1]]', name: 'Grognard', stats: '2/4/3/*' }
	// });
	// await prisma.card.upsert({
	// 	where: { card_id: 'kassin:0' },
	// 	update: {},
	// 	create: { card_id: 'kassin:0', moves: '[[0;1][1;1]]', name: 'Kassin', stats: '2/4/3/*' }
	// });
	// await prisma.card.upsert({
	// 	where: { card_id: 'kassin:1' },
	// 	update: {},
	// 	create: { card_id: 'kassin:1', moves: '[[0;1][1;1]]', name: 'Kassin', stats: '2/4/3/*' }
	// });
	// await prisma.card.upsert({
	// 	where: { card_id: 'sacrechene' },
	// 	update: {},
	// 	create: { card_id: 'sacrechene', moves: '[[0;1][1;1]]', name: 'Sacrechêne', stats: '2/4/3/*' }
	// });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

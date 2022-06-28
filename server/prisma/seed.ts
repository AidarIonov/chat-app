import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // await prisma.user.deleteMany({})
    await prisma.chat.deleteMany({})
    // const user = await prisma.user.create({
    //     data: {
    //         email: 'aidar@gmail.com',
    //         name: 'Aidar',
    //         avatarPath: 'uploads/1.jpg'
    //     }
    // })
    const chat = await prisma.chat.create({
        data: {
            messages: {
                create: [
                    {body: 'helloo', fromUserId: 7, toUserId: 8},
                    {body: 'damn, fuck u', fromUserId: 8, toUserId: 7},
                ]
            }
        }
    })

    console.log(chat)
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


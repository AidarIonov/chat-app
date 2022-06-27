import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'bakytbekovaidar@gmail.com',
            name: 'Aidar',
            avatarPath: 'uploads/1.jpg'
        }
    })

    console.log(user)
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import { bcryptAdapter } from "../../config";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const ubigeo_data = JSON.parse(fs.readFileSync('src/presentation/ubigeo/fixtures.json', 'utf8'));
  for (const item of ubigeo_data) {
    switch (item.model) {
      case 'inmomanager.department':
        await prisma.department.create({ data: { id: item.id, ...item.fields } });
        break;
      case 'inmomanager.province':
        await prisma.province.create({ data: { id: item.id, ...item.fields } });
        break;
      case 'inmomanager.district':
        await prisma.district.create({ data: { id: item.id, ...item.fields } });
        break;
    }
  }
  const user_data = JSON.parse(fs.readFileSync('src/presentation/auth/fixtures.json', 'utf8'));
  await prisma.user.create({
    data: {
      ...user_data.fields,
      password: bcryptAdapter.hash(user_data.fields.password),
    }
  });
}

main()
  .catch(e => { throw e })
  .finally(async () => { await prisma.$disconnect() })
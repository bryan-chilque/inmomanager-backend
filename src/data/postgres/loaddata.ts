const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs   = require('fs');

async function main() {
  const data = JSON.parse(fs.readFileSync('src/presentation/ubigeo/fixtures.json', 'utf8'));
  for (const item of data) {
    switch(item.model) {
      case 'inmomanager.department':
        await prisma.department.create({ data: { id: item.id, name: item.fields.name } });
        break;
      case 'inmomanager.province':
        await prisma.province.create({ data: { id: item.id, name: item.fields.name, departmentId: item.fields.departmentId } });
        break;
      case 'inmomanager.district':
        await prisma.district.create({ data: { id: item.id, name: item.fields.name, provinceId: item.fields.provinceId } });
        break;
    }
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
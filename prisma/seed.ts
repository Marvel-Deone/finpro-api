import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import * as bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
// const prisma = new PrismaClient(
  // {
  //   datasourceUrl: process.env.DATABASE_URL
  // }
  //   {
  //   datasources: {
  //     db: {
  //       url: process.env.DATABASE_URL,
  //     },
  //   },
  // }
// );

// const prisma = new PrismaClient();

async function main() {
  console.log('Got to seed: ', process.env.DATABASE_URL)
  // CREATE PERMISSIONS
  const permissionNames = [
    'SUBSIDIARY_CREATE',
    'SUBSIDIARY_READ',
    'SUBSIDIARY_UPDATE',
    'SUBSIDIARY_DELETE',
    'ROLE_CREATE',
    'ROLE_UPDATE',
    'ROLE_DELETE',
    'ROLE_ASSIGN',
    'PERMISSION_CREATE',
    'PERMISSION_UPDATE',
    'PERMISSION_DELETE',
    'EXAM_CREATE',
    'EXAM_READ',
    'EXAM_UPDATE',
    'EXAM_DELETE',
    'STOCK_CREATE',
    'STOCK_READ',
    'STOCK_UPDATE',
    'STOCK_DELETE',
    'LOAN_CREATE',
    'LOAN_READ',
    'LOAN_UPDATE',
    'LOAN_DELETE',
  ];

  // Create permissions if not exist
  for (const name of permissionNames) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Fetch all permissions
  const allPermissions = await prisma.permission.findMany();

  // CREATE ROLES
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SUPERADMIN' },
    update: {},
    create: { name: 'SUPERADMIN' },
  });

  const ceoRole = await prisma.role.upsert({
    where: { name: 'CEO' },
    update: {},
    create: { name: 'CEO' },
  });

  // ASSIGN ALL PERMISSIONS TO SUPERADMIN
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    });
  }

  // ASSIGN CEO PERMISSIONS

  const ceoPermissions = allPermissions.filter(
    (p) => p.name !== 'PERMISSION_DELETE', // example restriction
  );

  for (const permission of ceoPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: ceoRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: ceoRole.id,
        permissionId: permission.id,
      },
    });
  }

  // CREATE SUPERADMIN USER (ONLY ONCE)
  const hashedPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 10);

  await prisma.personnel.upsert({
    where: { identity: 'superadmin' },
    update: {},
    create: {
      identity: 'superadmin',
      password: hashedPassword,
      roleId: superAdminRole.id,
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
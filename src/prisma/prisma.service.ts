import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

function extendClient(base: PrismaClient) {
  return base.$extends(
    createSoftDeleteExtension({
      models: {
        Program: true,
        Course: true,
      },
      defaultConfig: {
        field: 'deletedAt',
        createValue(deleted) {
          if (deleted) {
            return new Date();
          }
          return null;
        },
      },
    }),
  );
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return extendClient(this) as this;
  }
}

const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0],
) => ReturnType<typeof extendClient>;

@Injectable()
export class PrismaService
  extends ExtendedPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

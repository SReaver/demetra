import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

export const getCacheConfig = async (
  configService: ConfigService,
): Promise<CacheModuleOptions> => ({
  store: await redisStore({
    socket: {
      host: configService.get('REDIS_HOST'),
      port: parseInt(configService.get('REDIS_PORT ') || '6379'),
    },
    ttl: configService.get('REDIS_TTL'),
  }),
});

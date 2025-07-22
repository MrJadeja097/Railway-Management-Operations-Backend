import { Logger } from '@nestjs/common';

export function LogExecutionTime(): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const startTime = Date.now();
      try {
        const result = await originalMethod.apply(this, args);
        const endTime = Date.now();
        const executionTime = endTime - startTime;
        
        Logger.log(`[${propertyKey}] Execution time: ${executionTime}ms`);
        return result;
      } catch (error) {
        const executionTime = Date.now() - startTime;
        Logger.error(
          `[${propertyKey}] Failed after ${executionTime}ms`,
          error.message,
          'LogExecutionTime'
        );
        throw error;
      }
    };
    return descriptor;
  };
}
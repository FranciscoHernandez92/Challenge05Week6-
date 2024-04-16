import { type PrismaClient } from '@prisma/client';
import { createApp, startApp } from './app';

describe('Given the function createApp ', () => {
  test('Then it should be call and return app', () => {
    const app = createApp();
    expect(app).toBeDefined();
  });
});

describe('Given the function startApp', () => {
  describe('When we call it', () => {
    test('then it call app.use', () => {
      const mockApp = createApp();
      jest.spyOn(mockApp, 'use');
      const prisma = {} as unknown as PrismaClient;
      startApp(mockApp, prisma);
      expect(mockApp.use).toHaveBeenCalled();
    });
  });
});

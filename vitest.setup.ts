import { afterEach } from 'vitest';

// Vitest runs the tests in a file one after another without giving the event loop a turn, so
// a file of synchronous tests (the generator checks) blocks the worker for as long as the whole
// file takes. The worker's progress messages to the main process time out after 60 seconds, so
// on a slow CI runner the run failed with "Timeout calling onTaskUpdate" although every test
// passed. A turn of the event loop after each test lets the replies arrive in time. The real
// setImmediate is kept here so that a test using fake timers cannot stop the yield.
const realSetImmediate = globalThis.setImmediate;

afterEach(() => new Promise<void>((resolve) => realSetImmediate(() => resolve())));

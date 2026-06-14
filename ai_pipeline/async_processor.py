"""Asynchronous event processor — spins worker tasks on spike triggers."""
import asyncio
from typing import Callable, Awaitable, Any
from ai_pipeline.spike_queue import SpikeQueue


class AsyncProcessor:
    def __init__(self, queue: SpikeQueue, workers: int = 4):
        self.queue = queue
        self.workers = workers
        self._handlers: list[Callable[[Any], Awaitable[None]]] = []
        self._running = False

    def register_handler(self, handler: Callable[[Any], Awaitable[None]]):
        self._handlers.append(handler)

    async def _worker(self, worker_id: int):
        while self._running:
            item = self.queue.pop()
            if item is None:
                await asyncio.sleep(0.1)
                continue
            for handler in self._handlers:
                await handler(item)

    async def start(self):
        self._running = True
        tasks = [asyncio.create_task(self._worker(i)) for i in range(self.workers)]
        return tasks

    async def stop(self):
        self._running = False

    async def submit(self, item: Any) -> bool:
        return self.queue.push(item)

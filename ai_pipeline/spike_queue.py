"""Spike event queue — buffers activations during peak motion bursts."""
from collections import deque
from dataclasses import dataclass
from typing import Generic, TypeVar, Optional
import threading

T = TypeVar("T")


@dataclass
class SpikeEvent:
    event_id: str
    priority: int
    payload: dict


class SpikeQueue(Generic[T]):
    def __init__(self, max_size: int = 100):
        self._queue: deque[T] = deque(maxlen=max_size)
        self._lock = threading.Lock()

    def push(self, item: T) -> bool:
        with self._lock:
            if len(self._queue) >= self._queue.maxlen:
                return False
            self._queue.append(item)
            return True

    def pop(self) -> Optional[T]:
        with self._lock:
            return self._queue.popleft() if self._queue else None

    def size(self) -> int:
        with self._lock:
            return len(self._queue)

    def peek_all(self) -> list[T]:
        with self._lock:
            return list(self._queue)

async-timeout
=============

asyncio-compatible timeout context manager.


Usage example
-------------


The context manager is useful in cases when you want to apply timeout
logic around block of code or in cases when ``asyncio.wait_for()`` is
not suitable. Also it's much faster than ``asyncio.wait_for()``
because ``timeout`` doesn't create a new task.

The ``timeout(timeout, *, loop=None)`` call returns a context manager
that cancels a block on *timeout* expiring::

   async with timeout(1.5):
       await inner()

1. If ``inner()`` is executed faster than in ``1.5`` seconds nothing
   happens.
2. Otherwise ``inner()`` is cancelled internally by sending
   ``asyncio.CancelledError`` into but ``asyncio.TimeoutError`` is
   raised outside of context manager scope.

*timeout* parameter could be ``None`` for skipping timeout functionality.


Context manager has ``.expired`` property for check if timeout happens
exactly in context manager::

   async with timeout(1.5) as cm:
       await inner()
   print(cm.expired)

The property is ``True`` is ``inner()`` execution is cancelled by
timeout context manager.

If ``inner()`` call explicitly raises ``TimeoutError`` ``cm.expired``
is ``False``.

Installation
------------

::

   $ pip install async-timeout

The library is Python 3 only!



Authors and License
-------------------

The module is written by Andrew Svetlov.

It's *Apache 2* licensed and freely available.


CHANGES
=======

1.3.0 (2017-08-23)
------------------

* Don't suppress nested exception on timeout. Exception context points
  on cancelled line with suspended `await` (#13)

* Introduce `.timeout` property (#16)

* Add methods for using as async context manager (#9)

1.2.1 (2017-05-02)
------------------

* Support unpublished event loop's "current_task" api.


1.2.0 (2017-03-11)
------------------

* Extra check on context manager exit

* 0 is no-op timeout


1.1.0 (2016-10-20)
------------------

* Rename to `async-timeout`

1.0.0 (2016-09-09)
------------------

* The first release.



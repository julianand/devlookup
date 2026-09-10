import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { octocatUser, responseWith } from '../test/github-user.fixture.ts'
import { useUserInfo } from './useUserInfo.ts'

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

it('fetches the default user on mount and exposes it', async () => {
  fetchMock.mockResolvedValue(responseWith(octocatUser))

  const { result } = renderHook(() => useUserInfo('octocat'))

  expect(fetchMock).toHaveBeenCalledWith(
    'https://api.github.com/users/octocat',
    expect.anything(),
  )
  expect(result.current.loading).toBe(true)

  await waitFor(() => {
    expect(result.current.loading).toBe(false)
  })
  expect(result.current.userInfo).toEqual(octocatUser)
  expect(result.current.searchError).toBe(false)
})

it('fetches the requested username on loadUser', async () => {
  fetchMock.mockResolvedValue(responseWith(octocatUser))

  const { result } = renderHook(() => useUserInfo('octocat'))
  await waitFor(() => {
    expect(result.current.loading).toBe(false)
  })

  act(() => {
    result.current.loadUser('torvalds')
  })

  expect(fetchMock).toHaveBeenLastCalledWith(
    'https://api.github.com/users/torvalds',
    expect.anything(),
  )
})

it('sets searchError on a 404 without updating userInfo', async () => {
  fetchMock
    .mockResolvedValueOnce(responseWith(octocatUser))
    .mockResolvedValueOnce(responseWith({ message: 'Not Found' }, false, 404))

  const { result } = renderHook(() => useUserInfo('octocat'))
  await waitFor(() => {
    expect(result.current.loading).toBe(false)
  })

  act(() => {
    result.current.loadUser('does-not-exist-404')
  })
  await waitFor(() => {
    expect(result.current.searchError).toBe(true)
  })

  expect(result.current.userInfo).toEqual(octocatUser)
})

it('aborts the previous fetch when a new search starts', async () => {
  const abortedSignals: AbortSignal[] = []
  fetchMock
    // mount: pending forever until it gets aborted by loadUser('first')
    .mockImplementationOnce(
      (_url: string, init: { signal: AbortSignal }) =>
        new Promise((_resolve, reject) => {
          init.signal.addEventListener('abort', () => reject(new Error('abort')))
        }),
    )
    // loadUser('first'): pending forever, captured to assert its abort
    .mockImplementationOnce(
      (_url: string, init: { signal: AbortSignal }) => {
        abortedSignals.push(init.signal)
        return new Promise(() => {})
      },
    )
    // loadUser('second'): resolves with the user
    .mockResolvedValueOnce(responseWith(octocatUser))

  const { result } = renderHook(() => useUserInfo('octocat'))

  act(() => {
    result.current.loadUser('first')
  })
  act(() => {
    result.current.loadUser('second')
  })
  await waitFor(() => {
    expect(result.current.loading).toBe(false)
  })

  expect(abortedSignals[0].aborted).toBe(true)
  expect(result.current.userInfo).toEqual(octocatUser)
  expect(result.current.searchError).toBe(false)
})

it('aborts the fetch on unmount without resolving the user', async () => {
  let signal: AbortSignal | undefined
  fetchMock.mockImplementationOnce(
    (_url: string, init: { signal: AbortSignal }) => {
      signal = init.signal
      return new Promise(() => {})
    },
  )

  const { result, unmount } = renderHook(() => useUserInfo('octocat'))
  const userBeforeUnmount = result.current.userInfo
  unmount()

  expect(signal?.aborted).toBe(true)
  expect(result.current.userInfo).toEqual(userBeforeUnmount)
})

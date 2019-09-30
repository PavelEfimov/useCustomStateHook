import { renderHook, act } from '@testing-library/react-hooks';

import { useCustomState } from './useCustomState';

test('update field product from 0 to 1', () => {
  const initialState = { product: 0 };
  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.set(1, 'product');
  });

  const [state] = result.current;

  expect(state.product).toBe(1);
});

test('set new field test with value test', () => {
  const initialState = { product: 0 };
  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.set('test', 'test');
  });

  const [state] = result.current;

  expect(state.test).toBe('test');
});

test('initial state => string, set to number', () => {
  const initialState = 'test';
  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.set(10);
  });

  const [state] = result.current;

  expect(state).toBe(10);
});

test('initial state => string, update to number', () => {
  const initialState = 'test';
  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.set(10);
  });

  const [state] = result.current;

  expect(state).toBe(10);
});

test('initial state => object with field object => update inner of this field', () => {
  const initialState = {
    field: {
      a: 4
    }
  };

  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.merge({ b: 'test' }, 'field');
  });

  const [state] = result.current;

  expect(state.field).toStrictEqual({ a: 4, b: 'test' });
});

test('initial state => object with 2 inner level field object => update inner of this field', () => {
  const initialState = {
    first: {
      second: {
        a: 4
      }
    }
  };

  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.merge({ b: 'test' }, 'first.second');
  });

  const [state] = result.current;

  expect(state).toStrictEqual({
    first: {
      second: {
        a: 4,
        b: 'test'
      }
    }
  });
});

test('initial state => object with 3 inner level field object => update inner of this field', () => {
  const initialState = {
    first: {
      second: {
        third: {
          a: 4
        }
      }
    }
  };

  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.merge({ b: 'test' }, 'first.second.third');
  });

  const [state] = result.current;

  expect(state).toStrictEqual({
    first: {
      second: {
        third: {
          a: 4,
          b: 'test'
        }
      }
    }
  });
});

test('initial state => array, merge state to 10', () => {
  const initialState = [0, 1, 2, 3, 4];
  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.merge(10);
  });

  const [state] = result.current;

  expect(state).toStrictEqual([0, 1, 2, 3, 4, 10]);
});

test('initial state => object with array field, merge this field to 10', () => {
  const initialState = {
    field: [0, 1, 2, 3, 4]
  };

  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.merge(10, 'field');
  });

  const [state] = result.current;

  expect(state).toStrictEqual({ field: [0, 1, 2, 3, 4, 10] });
});

test('initial state => object with 2 inner level field array => update inner of this field', () => {
  const initialState = {
    first: {
      field: [0, 1, 2, 3, 4]
    }
  };

  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.merge(10, 'first.field');
  });

  const [state] = result.current;

  expect(state).toStrictEqual({
    first: {
      field: [0, 1, 2, 3, 4, 10]
    }
  });
});

test('initial state => object with 2 inner level field array => set another value of this field', () => {
  const initialState = {
    first: {
      field: [0, 1, 2, 3, 4]
    }
  };

  const { result } = renderHook(() => useCustomState(initialState));

  act(() => {
    const [, actions] = result.current;

    actions.set(10, 'first.field');
  });

  const [state] = result.current;

  expect(state).toStrictEqual({
    first: {
      field: 10
    }
  });
});

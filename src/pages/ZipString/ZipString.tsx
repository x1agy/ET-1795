import { useReducer } from 'react';
import { Flex, Input } from 'antd';

// There is no shadowing
// eslint-disable-next-line no-shadow
enum ActionType {
  CHANGED_LEFT = 'left',
  CHANGED_RIGHT = 'right',
}

interface ChangeAction {
  type: ActionType;
  payload: string;
}

interface InputFieldsValues {
  left: string;
  right: string;
}

type ReducerFunction = (state: InputFieldsValues, action: ChangeAction) => InputFieldsValues;

const reducer = (state: InputFieldsValues, action: ChangeAction) => {
  switch (action.type) {
    case ActionType.CHANGED_LEFT: {
      if (action.payload.match(/[^A-Z]/)) {
        return state;
      } else {
        return {
          left: action.payload,
          right: action.payload.replace(/([A-Z])\1+/g, (match) =>
            match.length > 1 ? match.split('')[0] + match.length : match,
          ),
        };
      }
    }
    case ActionType.CHANGED_RIGHT: {
      if (action.payload.match(/[^A-Z0-9]|^\d|([A-Z])\1/)) {
        return state;
      } else {
        return {
          right: action.payload,
          left: action.payload.replace(/\w(\d+)/g, (match, p1) => {
            const matchLettersArr = match.split('');
            return matchLettersArr[0].repeat(Number(p1));
          }),
        };
      }
    }
  }
};

const ZipString = () => {
  const [state, dispatch] = useReducer<ReducerFunction>(reducer, { left: '', right: '' });

  return (
    <Flex>
      <Input
        value={state.left}
        onChange={(event) =>
          dispatch({ type: ActionType.CHANGED_LEFT, payload: event.target.value })
        }
      />
      <Input
        value={state.right}
        onChange={(event) =>
          dispatch({ type: ActionType.CHANGED_RIGHT, payload: event.target.value })
        }
      />
    </Flex>
  );
};

export default ZipString;

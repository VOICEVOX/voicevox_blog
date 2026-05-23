import { UnreachableError } from "@/helper";
import {
  useState,
  type ChangeEventHandler,
  type CompositionEventHandler,
} from "react";

type ImeAwareInputState = {
  input: string;
  committed: string;
};

export type ImeAwareInput = {
  input: string;
  committed: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onCompositionEnd: CompositionEventHandler<HTMLInputElement>;
  clear: () => void;
};

export function useImeAwareInput(initial: string): ImeAwareInput {
  const [state, setState] = useState<ImeAwareInputState>({
    input: initial,
    committed: initial,
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value;
    if (!(event.nativeEvent instanceof InputEvent)) {
      throw new UnreachableError();
    }
    const isComposing = event.nativeEvent.isComposing;
    setState((current) => ({
      input: value,
      committed: isComposing ? current.committed : value,
    }));
  };

  const onCompositionEnd: CompositionEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const value = event.currentTarget.value;
    setState({ input: value, committed: value });
  };

  const clear = () => {
    setState({ input: "", committed: "" });
  };

  return {
    input: state.input,
    committed: state.committed,
    onChange,
    onCompositionEnd,
    clear,
  };
}

import { Ref } from 'vue';
import { Maybe } from '~~/features/app/utils';

export const useTextField = (
  inputRef: Ref<Maybe<HTMLInputElement>>,
  inputValue: Ref<string>
) => {
  const cursorPosition = ref(0);
  const element = computed(() => unrefElement(inputRef));

  const currentWord = computed(() => {
    const wordStart =
      inputValue.value.slice(0, cursorPosition.value).lastIndexOf(' ') + 1;
    const nextSpaceIndex = inputValue.value
      .slice(cursorPosition.value)
      .indexOf(' ');
    const wordEnd =
      nextSpaceIndex === -1 ? undefined : nextSpaceIndex + cursorPosition.value;

    return inputValue.value.slice(wordStart, wordEnd);
  });

  const replaceCurrentWord = (newValue: string) => {
    if (!element.value) return;

    const prevSpace = inputValue.value
      .slice(0, cursorPosition.value)
      .lastIndexOf(' ');
    const before = inputValue.value.slice(0, prevSpace + 1);
    const nextSpace = inputValue.value.slice(cursorPosition.value).indexOf(' ');
    const after = inputValue.value.slice(
      cursorPosition.value,
      nextSpace >= 0 ? undefined : cursorPosition.value + nextSpace
    );

    const newWord = `${before}${newValue} ${after}`;
    element.value.value = newWord;
    inputValue.value = newWord;

    nextTick(() => {
      cursorPosition.value = unrefElement(element)?.selectionStart ?? 0;
    });
  };

  onMounted(() => {
    element.value?.addEventListener('keyup', () => {
      if (!element.value) return;

      const { selectionStart, selectionEnd } = element.value;
      if (selectionStart === selectionEnd) {
        cursorPosition.value = element.value.selectionStart ?? 0;
      }
    });

    element.value?.addEventListener('input', e => {
      const target = e.target as HTMLInputElement;
      inputValue.value = target.value;
    });
  });

  return { currentWord, cursorPosition, replaceCurrentWord };
};

import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const handleToggle = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useOutsideClickClose({
    isOpen,
    rootRef: sidebarRef,
    onChange: setIsOpen,
  });

  const updateFormField = (
    fieldName: keyof ArticleStateType
  ): ((selectedOption: OptionType) => void) => {
    return (selectedOption: OptionType): void => {
      setFormState((previousState) => ({
        ...previousState,
        [fieldName]: selectedOption,
      }));
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <div ref={sidebarRef}>
        <ArrowButton isOpen={isOpen} onClick={handleToggle} />

        <aside
          className={clsx(styles.container, {
            [styles.container_open]: isOpen,
          })}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <Text as="h2" size={31} weight={800} uppercase>
              Задайте параметры
            </Text>

            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={updateFormField('fontFamilyOption')}
            />

            <RadioGroup
              name="font-size"
              title="Размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={updateFormField('fontSizeOption')}
            />

            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={formState.fontColor}
              onChange={updateFormField('fontColor')}
            />

            <Separator />

            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={updateFormField('backgroundColor')}
            />

            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={updateFormField('contentWidth')}
            />

            <div className={styles.bottomContainer}>
              <Button
                title="Сбросить"
                htmlType="button"
                type="clear"
                onClick={handleReset}
              />
              <Button title="Применить" htmlType="submit" type="apply" />
            </div>
          </form>
        </aside>
      </div>
    </>
  );
};

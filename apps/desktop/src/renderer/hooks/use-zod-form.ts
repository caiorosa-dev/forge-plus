/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  useForm,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { z } from 'zod';

type UseZodFormProps<Input extends z.ZodType<any, any>, Output> = Omit<
  UseFormProps<z.infer<Input>>,
  'resolver'
> & {
  schema: Input;
  handler: (values: z.infer<Input>) => Output;
  onSubmitStart?: (data: z.input<Input>) => void;
  onSubmitError?: (error: any) => void;
  onSubmitSuccess?: (result: Output) => void;
  onSubmitStatusChange?: (isSubmitting: boolean) => void;
};

type UseZodFormReturn<Input extends z.ZodType<any, any>, Output> = Omit<
  UseFormReturn<z.infer<Input>>,
  'handleSubmit'
> & {
  isSubmitting: boolean;
  response: Output | null;
  error: any;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleSubmitOrigin: UseFormHandleSubmit<z.infer<Input>>;
  triggerSubmit?: () => void;
};

export const useZodForm = <Input extends z.ZodType<any, any>, Output>({
  schema,
  handler,
  onSubmitError,
  onSubmitSuccess,
  onSubmitStart,
  defaultValues,
  ...formOptions
}: UseZodFormProps<Input, Output>): UseZodFormReturn<Input, Output> => {
  const form = useForm<z.infer<Input>>({
    resolver: zodResolver(schema),
    ...formOptions,
    defaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState<Output | null>(null);

  const parseResultWithDefaultValue = (data: z.input<Input>) => {
    const result = {
      ...defaultValues,
      ...data,
    } as z.infer<Input>;

    return result;
  };

  const handleSubmit = form.handleSubmit(async (data: z.input<Input>) => {
    setIsSubmitting(true);

    try {
      const parsedData = parseResultWithDefaultValue(data);

      if (onSubmitStart) onSubmitStart(parsedData);

      const result = await handler(parsedData);

      setResponse(result);
      if (onSubmitSuccess) return onSubmitSuccess(result);
    } catch (error: any) {
      setError(error);

      if (onSubmitError) return onSubmitError(error);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  });

  const triggerSubmit = () => {
    form.handleSubmit(handleSubmit)();
  };

  return {
    ...form,
    handleSubmit,
    triggerSubmit,
    handleSubmitOrigin: form.handleSubmit,
    error,
    isSubmitting,
    response,
  };
};

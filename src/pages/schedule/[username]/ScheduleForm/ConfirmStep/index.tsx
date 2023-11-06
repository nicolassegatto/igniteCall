import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import {
  ConfirmForm,
  ConfirmFormActions,
  ConfirmFormError,
  ConfirmFormHeader,
} from './styled'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <ConfirmFormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2023
        </Text>
        <Text>
          <Clock />
          18:00
        </Text>
      </ConfirmFormHeader>

      <label>
        <Text size={'sm'}>Nome Completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && (
          <ConfirmFormError size={'sm'}>{errors.name.message}</ConfirmFormError>
        )}
      </label>

      <label>
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput
          placeholder="nicolasss@algartelecom.com.br"
          {...register('email')}
        />
        {errors.email && (
          <ConfirmFormError size={'sm'}>
            {errors.email.message}
          </ConfirmFormError>
        )}
      </label>

      <label>
        <Text size={'sm'}>Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <ConfirmFormActions>
        <Button type="button" variant={'tertiary'}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ConfirmFormActions>
    </ConfirmForm>
  )
}

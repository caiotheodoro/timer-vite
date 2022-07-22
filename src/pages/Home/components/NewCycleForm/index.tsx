import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Desenvolver o site" />
        <option value="Desenvolver o app" />
        <option value="Desenvolver o aplicativo" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmout"
        type="number"
        {...register('minutesAmount', { valueAsNumber: true })}
        placeholder="00"
        step={5}
        min={5}
        disabled={!!activeCycle}
        max={60}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}

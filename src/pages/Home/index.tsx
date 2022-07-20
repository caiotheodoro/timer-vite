import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">vou trabalhar em</label>
          <TaskInput id="task" list="task-suggestions" type="text" placeholder="Dê um nome para o seu projeto" />
          <datalist id="task-suggestions">
            <option value="Desenvolver o site" />
            <option value="Desenvolver o app" />
            <option value="Desenvolver o aplicativo" />
          </datalist>
          <label htmlFor="minutesAmout">durante</label>
          <MinutesAmountInput id="minutesAmout" type="number" placeholder="00"  step={5} min={5} max={60} />

          <span>minutos.</span>
        </FormContainer>


        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>

    </HomeContainer>
  )
}

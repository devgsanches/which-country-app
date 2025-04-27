import darkFlag from '../../assets/dark-emoji-flag.svg'
import lightFlag from '../../assets/light-emoji-flag.svg'
import darkIcon from '../../assets/emoji-dark-mode.svg'
import lightIcon from '../../assets/emoji-light-mode.svg'
import { Button } from '../Button'

type HeaderProps = {
  active: boolean
  set: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ active, set }: HeaderProps) => {
  function changeState() {
    set(!active)
  }

  return (
    <header
      className={`flex justify-between py-3 px-5 lg:py-5 lg:px-38 items-center border-b border-[#CACACA] ${
        active ? 'bg-[#161616] text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex items-center">
        <h1 className="lg:text-[2.5rem] text-3xl">Qual País?</h1>
        <img src={active ? lightFlag : darkFlag} alt="Ícone de bandeira" />
      </div>
      {active ? (
        <Button src={lightIcon} alt="Sun Icon" onClick={changeState}>
          Light Mode
        </Button>
      ) : (
        <Button src={darkIcon} alt="Moon Icon" onClick={changeState}>
          Dark Mode
        </Button>
      )}
    </header>
  )
}

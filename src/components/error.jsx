import errorIcon from "../assets/error-icon.svg"

export const Error = () => {
    return (
        <div>
          <p>Упс! Что-то сломалось !</p>
          <img src={errorIcon} alt="error-icon" />
          <p>Попробуйте чуть позже :(</p>
        </div>
    )
}
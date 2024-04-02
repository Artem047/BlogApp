import { NavLink } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div>
        <h1>Ooops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <NavLink to={'/auth/register'} className='underline text-purple-800'>Register</NavLink>
    </div>
  )
}

export default ErrorPage
import PropTypes from 'prop-types'



const Header = ({title}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <button className='btn'>Add</button>
        </header>
    )
}

Header.defaultProps = {
    title : 'Task Tracker',
}

Header.propTypes ={
    title: PropTypes.string.isRequired,
}

export default Header

// const Header = (props) => {
//     return (
//         <header>
//             <h1>{props.title}</h1>
//         </header>
//     )
// }
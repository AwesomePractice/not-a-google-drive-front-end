import "../../styles/Path.css"

const Path = ({path, handleChange}) => {
    console.log(path)
    
    return (
        <div className="path--container">
            <p className="path">
                {
                    path.map((item) => {
                        return <PathItem item={item} handleChange={handleChange} />
                    })
                }
            </p>
        </div>
    )
}

const PathItem = ({item, handleChange}) => {
    const handleClick = (e) => {
        e.preventDefault()
        handleChange(item.id)
    }
    return (
        <button onClick={handleClick} className="path__button">
            {item.name.toUpperCase() + " /"}
        </button>
    )
}

export default Path
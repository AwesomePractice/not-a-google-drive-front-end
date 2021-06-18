import "../../styles/Path.css"

const Path = ({path}) => {
    console.log(path)
    return (
        <div className="path--container">
            <p className="path">
                {path.map((item) => {
                    <a>
                        
                    </a>
                })}
                {/* {path[0].toUpperCase()} */}
            </p>
        </div>
    )
}

export default Path
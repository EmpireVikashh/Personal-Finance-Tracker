import "./button.css"
function Button({text,onClick,blue}) {
    return (  
          <div className="btn" onClick={onClick} > 
                    {text}
           </div>
         )
  }
  
  export default Button
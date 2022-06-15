const Error = ({ children }) => {
   
    return (
    <div className="bg-red-700 text-white text-center p-3
        uppercase font-bold mb-3 rounded-md shadow-md">
        <p>{ children }</p>
    </div>
  )
}

export default Error
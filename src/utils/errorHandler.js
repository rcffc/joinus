//Expand with custom errors

const errorHandler = (err) => {
  const data = { 
    error: true, 
    header: 'Error', 
    message: 'An error occured'
  }

  switch (err.name) {
  case 'LoadingError':
    data.message = 'Could not load page'
    break
  
  case 'CustomError':
    data.message = err.message
    break
    
  default:
    break
  }

  return data
}

export default errorHandler
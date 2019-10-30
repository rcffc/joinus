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
  
  default:
    break
  }

  return data
}

export default errorHandler
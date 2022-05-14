module.exports = (message, data) => {
  if (process.env.DEBUG) {
    console.log({
      message,
      data
    })
  }
}
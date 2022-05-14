module.exports = event => {
  return {
    method: event['requestContext']['http']['method'],
    data: event['body'] ? JSON.parse(event['body']) : {},
    query: event['queryStringParameters'],
    params: event['pathParameters'] || {}
  }
}
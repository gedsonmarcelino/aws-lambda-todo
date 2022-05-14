const normalizer = require('/opt/utils/normalizer');
const response = require('/opt/utils/response');
const debug = require('/opt/utils/debug')
const ToDo = require('/opt/models/ToDo')

exports.handler = async (event) => {
  try {
    debug('=>', event);
    const { params } = normalizer(event);

    let data = {}
    if (params && params.id) {
      data = await ToDo.getById(params.id)
    } else {
      data = await ToDo.getAll()
    }

    return response(200, data);
  } catch (error) {
    console.error(error)
    return response(500, 'Something went wrong!');
  }

};

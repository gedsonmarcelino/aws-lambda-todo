const normalizer = require('/opt/utils/normalizer');
const response = require('/opt/utils/response');
const debug = require('/opt/utils/debug')
const ToDo = require('/opt/models/ToDo')

exports.handler = async (event) => {
  try {
    debug('=>', event);
    const { data, method } = normalizer(event);
    const id = method === 'PUT' ? data.id : null;

    await ToDo.save(data, id)

    if (!id) {
      return response(201, `To Do has been created.`);
    } else {
      return response(200, `To Do (${id}) has been updated.`);
    }
  } catch (error) {
    console.error(error)
    return response(500, 'Something went wrong!');
  }

};

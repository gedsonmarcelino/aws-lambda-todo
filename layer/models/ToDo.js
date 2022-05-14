const debug = require('../utils/debug');

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const DEFAULT_PARAMS = {
  TableName: 'tb_todos'
};

class ToDo {
  static async getAll() {
    const result = await dynamo.scan(DEFAULT_PARAMS).promise();
    debug('getAll =>', result)
    return result
  }

  static async getById(id) {
    debug('Id =>', id)
    const result = await dynamo.get({
      ...DEFAULT_PARAMS,
      Key: {
        id
      }
    }).promise();
    debug(`getById:${id} =>`, result)
    return result
  }

  static async save(data, id = null) {
    debug('Save Data =>', data)
    if (!id) {
      await this._create(data)
    } else {
      await this._update(data, id)
    }
  }

  static async delete(id) {
    const params = {
      ...DEFAULT_PARAMS,
      Key: {
        id
      }
    };

    await dynamo.delete(params).promise()
  }

  static async _create(data) {
    const Item = {
      ...data,
      createdAt: new Date().toISOString()
    }
    await dynamo.put({
      ...DEFAULT_PARAMS,
      Item
    }).promise()
  }

  static async _update(data, id) {
    const params = {
      ...DEFAULT_PARAMS,
      Key: {
        id
      },
      UpdateExpression: 'set #a = :x, #b = :y',
      ExpressionAttributeNames: {
        '#a': 'title',
        '#b': 'finished'

      },
      ExpressionAttributeValues: {
        ':x': data.title,
        ':y': data.finished
      },
    };

    await dynamo.update(params).promise()
  }
}

module.exports = ToDo
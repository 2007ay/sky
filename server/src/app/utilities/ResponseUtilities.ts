/*jshint esnext: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, process*/

export class ResponseUtility {
  static sendError(res: any, err: any) {
    res.status(500).send(err);
  }

  static sendJSONArray(res: any, array: any) {
    res.status(200).json(array);
  }

  static sendBadRequest(res: any, msg = 'malformed request') {
    res.status(400).send(JSON.stringify(msg));
  }

  static sendJSONObject(res: any, obj: any) {
    res.status(200).json(obj);
  }

  static sendSuccess(res: any, msg = 'success') {
    res.status(200).send(JSON.stringify(msg));
  }
}

import { eventPostRequest } from "../../utils/external-url";
import { RedisClient } from "../../shared/database";
import { AppError } from "../../utils/app-error";
import { BaseController } from "../baseController";

export class PubSubController extends BaseController {

  /**
  * subscribe to a topic function with topic slug and post data
  */
  public subscribe = async (topic_slug: string, bodyData: any) => {
    bodyData = JSON.parse(JSON.stringify(bodyData));
    console.log("bodyData>>>>", bodyData);
    // create subscription
    const result = await RedisClient.set(topic_slug, JSON.stringify(bodyData));
    console.log(result);
    if (!result) {
      throw new AppError(`Error setting subscription into redis`);
    }
    return this.sendResponse(`Subscribed to ${topic_slug} 😁😁..`, null, 404);

  }

  /**
* publish topic function with topic slug and post data
*/
  public publish = async (topic_slug: string, bodyData: any) => {

    // Fetch subscription body
    await RedisClient.get(topic_slug, async (err, reply) => {
      const result = JSON.parse(reply);
      if (!result) {
        throw new AppError(`Error getting saved subscription`, null, 404);
      }
      const postData = {
        topic: topic_slug,
        body: JSON.stringify(bodyData),
      };

      // pass the data to post event url
      try {
        await eventPostRequest(`${result.url}`, postData);
      } catch (error) {
        throw new AppError(`Error publishing topic: ${error}`, null, 404);
      }
    });
    return this.sendResponse("Published..");
  }

  /**
* Event to trigger to subscribed users
*/
  public event = async (body: any) => {
    console.log("topic in Event ->", body.topic);
    console.log("body in Event ->", body.body);

    return this.sendResponse(body);
  }
}

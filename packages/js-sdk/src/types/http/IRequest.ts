import http from "http";
import Restana from "restana";

export default interface IRequest extends http.IncomingMessage, Restana.RequestExtensions { }
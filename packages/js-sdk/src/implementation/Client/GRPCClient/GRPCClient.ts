import * as grpc from "@grpc/grpc-js";
import { ChannelCredentials } from "@grpc/grpc-js";
import { DaprClient } from "../../../proto/dapr/proto/runtime/v1/dapr_grpc_pb"
import IClient from "../../../interfaces/Client/IClient";
import CommunicationProtocolEnum from "../../../enum/CommunicationProtocol.enum";
import { DaprClientOptions } from "../../../types/DaprClientOptions";

export default class GRPCClient implements IClient {
  private isInitialized: boolean;
  private readonly client: DaprClient;
  private readonly clientCredentials: grpc.ChannelCredentials;
  private readonly clientHost: string;
  private readonly clientPort: string;
  private readonly options: DaprClientOptions;

  constructor(host = "127.0.0.1", port = "50050", options: DaprClientOptions = {
    isKeepAlive: true
  }) {
    this.isInitialized = true;
    this.clientHost = host;
    this.clientPort = port;
    this.clientCredentials = ChannelCredentials.createInsecure();
    this.options = options;

    console.log(`[Dapr-JS][gRPC] Opening connection to ${this.clientHost}:${this.clientPort}`);
    this.client = new DaprClient(`${this.clientHost}:${this.clientPort}`, this.clientCredentials);
  }

  getClientHost(): string {
    return this.clientHost;
  }

  getClientPort(): string {
    return this.clientPort;
  }

  getClient(): DaprClient {
    return this.client;
  }

  getClientCommunicationProtocol(): CommunicationProtocolEnum {
    return CommunicationProtocolEnum.GRPC;
  }

  getOptions(): DaprClientOptions {
    return this.options;
  }

  async stop(): Promise<void> {
    this.client.close();
  }
}
import {program} from 'commander';

const options = program
  .requiredOption('--product-id <number>', '')
  .option('--schedule-no <number>', '')
  .requiredOption('--slack-webhook-url <string>', '')
  .option('--poll-interval-millis <number>', '', '500');

export default class Config {
  static current: Config;

  readonly productId: number;
  readonly scheduleNo?: number;

  readonly slackWebhookUrl: string;
  readonly pollIntervalMillis: number;

  static parseCommandLineArguments() {
    this.current = Config.fromCommandLineArguments();
  }

  private static fromCommandLineArguments() {
    const opts = options.parse().opts();

    return this.of({
      productId: parseInt(opts.productId),
      scheduleNo: opts.scheduleNo != null ? parseInt(opts.scheduleNo) : undefined,
      slackWebhookUrl: opts.slackWebhookUrl,
      pollIntervalMillis: parseInt(opts.pollIntervalMillis),
    });
  }

  static of(partial: Partial<Config>) {
    return Object.assign(new Config(), partial);
  }
}

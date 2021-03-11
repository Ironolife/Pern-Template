const sleep = (ms: number): Promise<void> =>
  new Promise<void>((res) => setTimeout(res, ms));

export default sleep;

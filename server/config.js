// @flow
const NODE_ENV /*: string */ = process.env.NODE_ENV || "development";
const PORT /*: number */ = parseInt(process.env.PORT) || 4000;

export default { NODE_ENV, PORT };

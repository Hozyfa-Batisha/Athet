import test from "node:test";
import assert from "node:assert/strict";
import { clientIp } from "../server/lib/security.js";

const req = (forwarded) => ({
  headers: forwarded ? { "x-forwarded-for": forwarded } : {},
  socket: { remoteAddress: "172.19.0.2" },
});

test("clientIp ignores X-Forwarded-For unless TRUST_PROXY is on", () => {
  assert.equal(clientIp(req("1.2.3.4"), { trustProxy: false }), "172.19.0.2");
});

test("clientIp uses the address the proxy appended (last entry)", () => {
  assert.equal(clientIp(req("6.6.6.6, 1.2.3.4"), { trustProxy: true }), "1.2.3.4");
  assert.equal(clientIp(req(), { trustProxy: true }), "172.19.0.2");
});
